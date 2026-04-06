#!/usr/bin/env node
/**
 * Feishu Drive Ops - Upload, Download, List
 * Pure Node.js HTTP — no curl, no extra deps
 *
 * Auth:
 *   --token <tenant_access_token>   (pass pre-existing token)
 *   or set env: FEISHU_APP_ID + FEISHU_APP_SECRET
 *   or read from ~/.openclaw/openclaw.json (appId/appSecret)
 */
const https = require('https');
const fs = require('fs');
const path = require('path');
const os = require('os');
const URL = require('url');

const FEISHU_API = 'open.feishu.cn';

// --- Read credentials from openclaw.json ---
function getCreds() {
  const cfgPath = path.join(os.homedir(), '.openclaw', 'openclaw.json');
  try {
    const raw = fs.readFileSync(cfgPath, 'utf8');
    const lines = raw.split('\n');
    let appId = '', appSecret = '';
    for (const line of lines) {
      const idM = line.match(/appId\s*:\s*"([^"]+)"/);
      const secM = line.match(/appSecret\s*:\s*"([^"]+)"/);
      if (idM) appId = idM[1];
      if (secM) appSecret = secM[1];
    }
    return { appId, appSecret };
  } catch {
    return {
      appId: process.env.FEISHU_APP_ID || '',
      appSecret: process.env.FEISHU_APP_SECRET || '',
    };
  }
}

// --- HTTP request helper ---
function httpReq(options, body) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => {
        const raw = Buffer.concat(chunks).toString('utf8');
        try {
          resolve(JSON.parse(raw));
        } catch {
          resolve(raw);
        }
      });
    });
    req.on('error', reject);
    req.setTimeout(30000, () => { req.destroy(); reject(new Error('Request timeout')); });
    if (body) req.write(body);
    req.end();
  });
}

// --- Get tenant access token ---
async function getToken() {
  const { appId, appSecret } = getCreds();
  if (!appId || !appSecret) {
    throw new Error(
      'No Feishu credentials. Set FEISHU_APP_ID + FEISHU_APP_SECRET env, ' +
      'or ensure ~/.openclaw/openclaw.json has channels.feishu.appId/appSecret.'
    );
  }
  const body = JSON.stringify({ app_id: appId, app_secret: appSecret });
  const res = await httpReq(
    { hostname: FEISHU_API, path: '/open-apis/auth/v3/tenant_access_token/internal', method: 'POST', headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) } },
    body
  );
  if (res.code !== 0) throw new Error(`Token error ${res.code}: ${res.msg}`);
  return res.tenant_access_token;
}

// --- Upload file ---
async function uploadFile(filePath, folderToken, fileName, token) {
  if (!token) token = await getToken();
  const fileSize = fs.statSync(filePath).size;
  const boundary = `FeishuBoundary${Date.now()}`;
  const fileContent = fs.readFileSync(filePath);

  const head = Buffer.from(
    `--${boundary}\r\nContent-Disposition: form-data; name="file_name"\r\n\r\n${fileName}\r\n` +
    `--${boundary}\r\nContent-Disposition: form-data; name="parent_type"\r\n\r\nexplorer\r\n` +
    `--${boundary}\r\nContent-Disposition: form-data; name="parent_node"\r\n\r\n${folderToken}\r\n` +
    `--${boundary}\r\nContent-Disposition: form-data; name="size"\r\n\r\n${fileSize}\r\n` +
    `--${boundary}\r\nContent-Disposition: form-data; name="file"; filename="${fileName}"\r\nContent-Type: application/octet-stream\r\n\r\n`,
    'utf8'
  );
  const tail = Buffer.from(`\r\n--${boundary}--\r\n`, 'utf8');
  const body = Buffer.concat([head, fileContent, tail]);

  const res = await httpReq({
    hostname: FEISHU_API,
    path: '/open-apis/drive/v1/files/upload_all',
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': `multipart/form-data; boundary=${boundary}`,
      'Content-Length': body.length,
    },
  }, body);

  if (res.code !== 0) throw new Error(`Upload error ${res.code}: ${res.msg}`);
  return res.data.file_token;
}

// --- Download file (returns raw buffer) ---
async function downloadFile(fileToken, token) {
  if (!token) token = await getToken();
  return new Promise((resolve, reject) => {
    const req = https.get({
      hostname: FEISHU_API,
      path: `/open-apis/drive/v1/files/${fileToken}/download`,
      headers: { 'Authorization': `Bearer ${token}` },
    }, (res) => {
      if (res.statusCode === 302 || res.statusCode === 301) {
        // Follow redirect
        https.get(res.headers.location, (r) => {
          const chunks = [];
          r.on('data', c => chunks.push(c));
          r.on('end', () => resolve(Buffer.concat(chunks)));
        }).on('error', reject);
        return;
      }
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
    });
    req.on('error', reject);
    req.setTimeout(30000, () => { req.destroy(); reject(new Error('Download timeout')); });
  });
}

// --- List folder ---
async function listFolder(folderToken, token) {
  if (!token) token = await getToken();
  const res = await httpReq({
    hostname: FEISHU_API,
    path: `/open-apis/drive/v1/files?folder_token=${encodeURIComponent(folderToken)}`,
    method: 'GET',
    headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' },
  });
  if (res.code !== 0) throw new Error(`List error ${res.code}: ${res.msg}`);
  return res.data ? res.data.files : [];
}

// --- CLI ---
async function main() {
  const args = process.argv.slice(2);
  const get = (flag) => {
    const idx = args.indexOf(flag);
    return idx !== -1 ? args[idx + 1] : undefined;
  };
  const action = get('--action');
  const token = get('--token');

  try {
    if (action === 'upload') {
      const filePath = get('--file');
      const folderToken = get('--folder_token');
      const fileName = get('--name') || (filePath ? path.basename(filePath) : 'file');
      if (!filePath || !folderToken) throw new Error('--file and --folder_token required');
      const fileToken = await uploadFile(filePath, folderToken, fileName, token);
      console.log(JSON.stringify({ success: true, file_token: fileToken, name: fileName }));
    } else if (action === 'download') {
      const fileToken = get('--token');
      const output = get('--output');
      if (!fileToken || !output) throw new Error('--token (file token) and --output required');
      const data = await downloadFile(fileToken, token);
      fs.writeFileSync(output, data);
      console.log(JSON.stringify({ success: true, path: output, size: data.length }));
    } else if (action === 'list') {
      const folderToken = get('--folder_token');
      if (!folderToken) throw new Error('--folder_token required');
      const files = await listFolder(folderToken, token);
      console.log(JSON.stringify({ success: true, files }));
    } else if (action === 'token') {
      const t = await getToken();
      console.log(JSON.stringify({ success: true, token: t }));
    } else {
      console.log(JSON.stringify({
        error: 'Unknown action. Use --action upload|download|list|token',
      }));
      process.exit(1);
    }
  } catch (e) {
    console.error(JSON.stringify({ success: false, error: e.message }));
    process.exit(1);
  }
}

main();
