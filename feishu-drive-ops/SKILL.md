---
name: feishu-drive-ops
description: Upload and download files to/from Feishu Cloud Drive (Lark). Supports uploading local files to specified folder tokens, downloading files by token, and listing folder contents. Built in pure Node.js (no extra deps). Works in any OpenClaw agent once Feishu is configured.
tags: [feishu, lark, drive, upload, download, cloud, file]
---

# Feishu Drive Ops Skill

在 OpenClaw agent 之间共享的飞书云盘文件操作技能。纯 Node.js 实现，无额外依赖。

## 认证方式

**方式一（推荐，agent 共享时）：** 通过 `--token` 传入已有的 tenant_access_token
```bash
node index.js --action list --folder_token <token> --token <tenant_access_token>
```

**方式二：** 在运行环境中配置 `FEISHU_APP_ID` + `FEISHU_APP_SECRET` 环境变量

**方式三：** 自动从 `~/.openclaw/openclaw.json` 读取 `channels.feishu.appId/appSecret`（需 agent 有文件读取权限）

## 能力

| 操作 | 说明 |
|---|---|
| `upload` | 上传本地文件到指定飞书文件夹 |
| `download` | 根据 file_token 下载飞书文件到本地 |
| `list` | 列出文件夹内容（文件 + 子文件夹） |
| `token` | 获取新的 tenant_access_token（用于调试） |

## 使用示例

```bash
# 上传文件到指定文件夹
node index.js --action upload \
  --file /workspace/pixel-walk-test/walk_8frames.gif \
  --folder_token W3LSfTcIalC1QUdPKW9cQs80n52 \
  --name walk_8frames.gif \
  --token <tenant_access_token>

# 列出文件夹内容
node index.js --action list --folder_token W3LSfTcIalC1QUdPKW9cQs80n52 --token <token>

# 下载文件
node index.js --action download --token <file_token> --output ./downloaded.png --token <token>
```

## 飞书文件夹 Token

| 文件夹 | Token |
|---|---|
| 🚶 走路动画 | `W3LSfTcIalC1QUdPKW9cQs80n52` |
| ⚔️ 角色立绘 | `B21EffmsrlTBMqdOGZJcUmjcnHe` |

## 错误排查

- **"No Feishu credentials"**: 需要通过 `--token`、`FEISHU_APP_ID+APP_SECRET` 环境变量，或配置 openclaw.json 至少一种方式提供认证
- **code 10003 / permission denied**: 当前 token 没有目标文件夹的访问权限
- **code 1061042**: 文件夹内素材数量超限
