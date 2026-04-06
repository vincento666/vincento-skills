# Pixel 角色身份规范 / Character Identity Spec

> 每次生成 Pixel 系列角色时，必须严格遵循本规范。
> 参考图：`/workspace/user_input_files/d4ccd682b7b3f6444e7fa3c633363cca.jpg`

---

## 🎭 Pixel 原型（Ice Mage Knight）

**角色名**：Pixel
**职业**：魔导骑士 / Ice Mage Knight
**比例**：3.5 头身（3.5 head tall）
**风格**：HD-2D Octopath Traveler，16-bit 经典 JRPG

---

### 精确视觉规范

#### 头发
- **颜色**：板岩灰 Slate Grey（主色）
- **阴影**：深炭灰 Charcoal Grey
- **高光**：浅鸽灰 Light Pigeon Grey
- **形状**：中短发，碎发状刘海左右分开，发丝线条硬朗

#### 眼睛
- **颜色**：深咖啡色 Deep Coffee（接近黑色）
- **形状**：2层高度横向矩形像素
- **神情**：坚定、严肃、战斗专注

#### 盔甲
- **主色**：银蓝色金属 Silver-blue Metal
- **亮部**：浅钢青 Light Steel Blue
- **阴影**：中灰蓝 Medium Grey Blue
- **勾边**：深蓝黑 Deep Blue Black
- **纹路**：全身布满荧光青色 Fluorescent Cyan 发光电路纹
- **肩甲**：圆弧形多层构造，边沿有青色光点
- **胸甲**：左右对称，中心有纵向青色发光槽
- **腿甲/战裙**：同样有青色垂直线条

#### 宝石（关键！）
- **颜色**：绿松石色 Turquoise → 薄荷青 Mint Cyan 渐变
- **形状**：纵向菱形 Lozenge（不是圆形，不是方形）
- **位置1**：胸甲正中心（主要视觉焦点）
- **位置2**：腰带中心/护裆位置
- **特效**：向外散发青蓝色微光

#### 披风
- **外色**：靛紫色 Indigo Purple
- **暗部**：暗紫色 Dark Violet
- **边缘**：丁香紫 Lilac（受光处）
- **长度**：拖地长披风
- **形状**：宽大流线型，随风向后飘动，底部参差不齐

#### 武器（右手）
- **形态**：短晶体阔刃 / Ice Crystal Blade
- **颜色**：半透明亮白 + 浅冰蓝 Ice Blue
- **特效**：十字形白色星芒 + 天蓝色 Sky Blue 散落粒子

#### 左手道具
- **形态**：矩形符文石板 Rune Tablet
- **颜色**：灰蓝色 Greyish Blue 板面
- **细节**：布满不规则青色 Cyan 闪烁像素点

#### 身体比例（关键！禁止偏离）
- **头身比**：3.5 头身
- 头大、肩宽（含夸张肩甲）、腿短、甲胄厚重
- 底盘稳——这是 Pixel 的标志性比例

---

## ✅ 错误描述修正

| 我之前写的（错） | 正确描述 |
|---|---|
| 祖母绿宝石 emerald green | 绿松石色/薄荷青 turquoise/mint cyan，菱形 lozenge |
| 银色盔甲 silver armor | 银蓝色金属 silver-blue metal |
| 紫色披风 purple | 靛紫色 indigo purple |
| 2.5-3 头身 | **3.5 头身**（正确） |
| 冰蓝光刃 ice-blue | 浅冰蓝 + 白色十字星芒 |

---

## ⚔️ 武器替换工作流

当需要生成「Pixel 换武器版本」时：

```
Step 1: 读取本规范
Step 2: 取参考图 input_files: ["/workspace/user_input_files/d4ccd682b7b3f6444e7fa3c633363cca.jpg"]
Step 3: 只修改武器描述，其余完全照搬
Step 4: prompt 基于 Stanford 格式两段式模板
```

### 武器替换示例

**原版（冰剑）**：`right hand holding glowing ice-blue crystal short sword with white cross sparkle`
**换冰杖**：`right hand holding glowing ice-blue crystal staff with frost orb crown top, frost rune carvings`
**换火杖**：`right hand holding ornate fire staff with blazing flame crystal at top`

---

## 🔥 标准 Prompt 模板（Stanford 格式）

> 来源：Vincent 提供的结构化提示词，确保角色一致性。

### 两段式结构

```
[不可变锚点 — 锁定风格/比例/表情，每次生成必须包含]
Classic JRPG HD Pixel Art Character, Inspired by Octopath Traveler.
Proportions: Classic JRPG heroic proportions (3.5 to 4 head heights).
Style Details: Extremely detailed pixel-level texture. Crisp edge outlines.
Rendering style must match the exact pixel grid fidelity of image_0.png.
Face & Expression (CRITICAL): Serious, focused, stern expression, as in image_0.png.
Background: Transparent (checkerboard pattern).

[可变细节参数 — 用户自定义部分]
Character Class: [职业]
Hair Style & Color: [发型+发色]
Eye Color: [瞳色]
Armor Style & Metal Color: [盔甲样式+主色]
Armor Accents GLOWING: [发光装饰颜色]
Weapon/Item (Right Hand): [右手武器]
Weapon/Item (Left Hand): [左手道具]
Specific Pose/Action: [具体姿态]
```

### Pixel 原型固定不可变部分

```
Classic JRPG HD Pixel Art Character, Inspired by Octopath Traveler.
Proportions: Classic JRPG heroic proportions (3.5 to 4 head heights).
Style Details: Extremely detailed pixel-level texture. Crisp edge outlines.
Rendering style must match the exact pixel grid fidelity of image_0.png.
Face & Expression (CRITICAL): Serious, focused, stern expression, as in image_0.png.
Background: Transparent (checkerboard pattern).

[所有需要一致性的元素，直接写 "as in image_0.png" 即可]
```

**一致性规则（每个角色只需描述一次）：**
```
Hair:           Same as image_0.png
Eyes:           Same as image_0.png
Face/Expression: Same as image_0.png
Armor Style:     Same as image_0.png
Armor Color:     Same as image_0.png
Cloak:           Same as image_0.png
Body Proportions: Same as image_0.png
```

### 可变参数示例（Pixel 换火杖版）

所有一致性元素全部引用 image_0.png，**只需描述变化的部分**：

```
Character Class: Fire Mage Knight.
Hair:           Same as image_0.png.
Eyes:           Same as image_0.png.
Face/Expression: Same as image_0.png.
Body Proportions: Same as image_0.png.
Armor Style:    Same as image_0.png.
Armor Accents GLOWING: Deep orange-red flame runes (change from cyan to fire color).
Cloak:          Same as image_0.png.
Weapon Right Hand: Ornate fire staff with blazing flame crystal orb (swap ice blade for this).
Weapon Left Hand: Same glowing rune tablet as image_0.png.
Pose: Full frontal standing combat ready with fire magic gathering in raised hand.
```

这样每个新角色/新变体的 prompt 都**极短**，只描述必要的变化。

---

## ✅ 已验证成功案例

| 日期 | 角色 | 武器 | 结果 | 路径 |
|---|---|---|---|---|
| 2026-04-06 | Pixel | 冰剑 | ✅ Vincent OK | `d4ccd682b7b3f6444e7fa3c633363cca.jpg` |
| 2026-04-06 | Pixel | 冰杖（4帧走路） | ✅ 帧间一致 | `/workspace/ice-staff-test/f1_stand_ice.png` |

### 冰杖版 4 帧走路循环规范

```
帧1（F1）：站立 idle — 右脚在前、重心居中
帧2（F2）：迈步 step — 右腿前伸、膝盖微弯
帧3（F3）：跨步 stride — 双腿最大跨幅、身体前倾
帧4（F4）：过渡 pass — 右腿过左腿、身体重心转移
```

---

## 📁 角色变体命名规范

格式：`{角色名}_{武器/形态}_{序号}`

示例：
- `pixel_ice_sword_01` — Pixel 原版（冰剑）
- `pixel_ice_staff_01` — Pixel 冰杖版 ✅已验证
- `pixel_fire_staff_01` — Pixel 火杖版（待生成）
- `fire_mage_01` — 独立火法师

---

*最后更新：2026-04-06 by Pixel Agent*
