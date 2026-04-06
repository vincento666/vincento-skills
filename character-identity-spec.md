# Character Identity Spec — 角色身份规范

> 每个角色首次确认后，把规范写入本文件作为 canonical reference。
> 参考图统一存放在 `/workspace/user_input_files/`

---

## 风格框架（所有角色通用）

| 参数 | 值 |
|---|---|
| 头身比 | **3.5 头身**（八方旅人 HD-2D 标准） |
| 比例风格 | 非 Q 版、非写实；头大肩宽腿短的经典 JRPG 英雄比例 |
| 输出分辨率 | 先出 1K 小图，再 upscale 到 2K/4K |
| 轮廓线 | 黑色深色描边 |
| 背景 | 透明（棋盘格占位） |
| 风格词 | `pixel art, HD-2D Octopath Traveler style` |

---

## ✅ 已确认角色

### 1. Pixel — Ice Mage Knight（冰魔导骑士）

**参考图**：`/workspace/user_input_files/d4ccd682b7b3f6444e7fa3c633363cca.jpg`

| 部位 | 规范 |
|---|---|
| 头身比 | 3.5 头身 |
| 盔甲 | 银蓝色金属板甲，荧光青色发光电路纹 |
| 宝石 | 绿松石色纵向菱形（胸中央 + 腰带），向外散发青蓝微光 |
| 披风 | 靛紫色拖地披风，内侧暗紫，受光边缘丁香紫 |
| 头发 | 板岩灰色中短发，碎发刘海左右分开 |
| 眼睛 | 深咖啡色，2层高矩形像素，严肃专注 |
| 武器 | 右手浅冰蓝晶体阔刃 + 白色十字星芒特效 |
| 左手 | 灰蓝符文石板，布满青色闪烁像素点 |
| 比例 | 头大、肩宽（含夸张肩甲）、腿短，底盘稳 |

**Prompt 关键词：**
```
silver-blue metal plate armor, fluorescent cyan glowing circuit patterns,
turquoise lozenge gem on chest, indigo purple flowing cape,
slate grey hair, ice-blue crystal blade, rune tablet
```

---

### 2. Fire Mage Knight（火魔导骑士）

**参考图**：`/workspace/user_input_files/fire_mage_free_ref.jpg`

| 部位 | 规范 |
|---|---|
| 头身比 | 3.5 头身 |
| 发型 | 极长火红色波浪卷发 + 齐刘海 + 两侧长鬓角 |
| 眼睛 | 琥珀色 Amber，带火光神采 |
| 配色 | 红 + 黑/深褐 + 金三色为主 |
| 肩甲 | 金色羽翼状/火焰状肩甲，放射状金属片 |
| 服装 | 修身法师袍，胸口V形金纹，腰部几何图案，立领红宝石 |
| 法杖 | 金柄 + 巨大半透明橙色宝珠 + 顶部巨型火焰特效 |
| 披风 | 深蓝紫色 Midnight Blue，下摆破碎撕裂，向后飘扬 |
| 特效 | 身侧悬浮4个独立火球 + 左手聚火球 |
| 气质 | 高冷、尊贵、冷静自信 |

**Prompt 关键词：**
```
long fiery red wavy hair, amber eyes,
crimson and black mage robes, gold wing pauldrons,
golden staff with blazing flame crystal orb,
tattered dark blue cape, floating fireballs,
```

---

### 3. Warrior Knight（重甲战士）

**参考图**：`/workspace/multi-archetype/warrior.png`

| 部位 | 规范 |
|---|---|
| 头身比 | 3.5 头身 |
| 发色 | 银灰色 Silver-grey，中短发向后梳 |
| 盔甲 | 全身钢蓝色板甲，金色滚边，巨大圆弧肩甲 |
| 武器 | 双手阔剑（银刃 + 金柄），鸢形盾（银底金边 + 狮子纹章） |
| 披风 | 深红色 Crimson，从肩部垂下内侧深影 |
| 表情 | 坚毅，浓眉，典型英雄面孔 |

**Prompt 关键词：**
```
silver plate armor, gold trim, large pauldrons,
giant claymore sword, gold hilt, kite shield with lion crest,
crimson red cape flowing from shoulders
```

---

### 4. Sage Wizard（贤者）

**参考图**：`/workspace/multi-archetype/sage.png`

| 部位 | 规范 |
|---|---|
| 头身比 | 3.5 头身 |
| 发型 | 及腰亮白长发，蓬松白胡须，庄重冷静 |
| 袍子 | 深蓝色层叠法袍，银蓝星座/星图纹样，银白滚边 |
| 武器 | 扭曲树藤杖身 + 爪状包裹发光深蓝水晶球（顶部） |
| 特效 | 身环绕多个浅蓝双环魔法阵，粒子光效 |

**Prompt 关键词：**
```
long white hair and bushy white beard,
deep blue wizard robes with constellation patterns,
gnarled wooden staff, glowing blue orb,
floating blue magic circles and arcane runes
```

---

### 5. Lightning Mage（雷电法师）

**参考图**：`/workspace/multi-archetype/lightning_mage.png`

| 部位 | 规范 |
|---|---|
| 头身比 | 3.5 头身 |
| 发色 | 银蓝色短碎发，发丝向上翘，静电感 |
| 盔甲 | 深宝蓝 + 海军蓝魔导板甲，金/黄滚边，胸口发光黄色能量晶石 |
| 武器 | 雷电长矛/法杖，菱形蓝色发光晶体矛头，柄身缠绕电弧 |
| 特效 | 身周围不规则弧形闪电，青蓝电光球 |

**Prompt 关键词：**
```
spiky silvery blue hair, deep royal blue plate armor, gold trim,
glowing yellow gemstone on chest,
crystal lightning spear, arcing cyan lightning around body
```

---

### 6. Ranger Elf（哨兵精灵）

**参考图**：`/workspace/multi-archetype/ranger_elf.png`

| 部位 | 规范 |
|---|---|
| 头身比 | 3.5 头身 |
| 种族 | 精灵，标志性尖耳朵 |
| 发色 | 墨绿色长发及胸，自然散开 |
| 盔甲 | 棕色皮革轻甲 + 暗绿连帽披风，叶片纹饰 |
| 武器 | 精灵长弓（木纹），腰间短剑，背负箭筒 |
| 披风 | 宽大墨绿色连帽披风，垂至小腿 |
| 细节 | 银色带扣皮带，银色剑格，皮靴 |

**Prompt 关键词：**
```
dark green long hair, pointed elf ears,
brown leather armor with leaf embroidery,
dark green hooded cloak, wooden elven longbow,
quiver on back, forest color palette green and brown
```

---

## 📐 标准生成 Prompt 模板

```
pixel art, [头身比] head tall [职业描述],
[发型发色],
[眼睛],
[盔甲/服装样式+配色],
[武器],
[披风/特效],
full body sprite visible legs, transparent background
```

---

## ⚙️ 输出分辨率工作流

```
Step 1: MiniMax T2I  →  1K 小图（像素最真实）
Step 2: MiniMax I2I upscale  →  2K（保持锐度）
Step 3: 交付 2K PNG
```

> ⚠️ 直接出 1024px 会被插值模糊，1K → 2K upscale 效果最好

---

*最后更新：2026-04-06 by Pixel Agent*
