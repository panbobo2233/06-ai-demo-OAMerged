# OA二期优化 · 对话回顾

> 导出时间：2026-06-28
> 项目：广州银行OA二期升级

---

## 一、项目概况

- **代码项目**：`d:\vscode_projects\06-ai-demo-OAMerged`（GitHub: `panbobo2233/06-ai-demo-OAMerged`）
- **工作区**：`d:\vscode_projects\20-ai-demo-OAMerged`
- **技术栈**：React 19 + TypeScript + Vite + Tailwind CSS + motion
- **厂商**：蓝凌 EKP
- **启动命令**：`cd d:\vscode_projects\06-ai-demo-OAMerged && npm run dev` → `http://localhost:3000`

---

## 二、已完成的工作台 Demo 优化（8项）

| # | 需求 | 改动文件 |
|---|------|---------|
| 1 | 默认首页改为工作台 + 公告迁移 | `src/App.tsx`、`src/pages/PortalPage.tsx`、`src/pages/WorkbenchPage.tsx` |
| 2 | 领导视图快捷入口 5→6，每行3个 | `src/pages/WorkbenchPage.tsx` |
| 3 | 新增「已处理」Tab + 已办/已阅筛选 | `src/pages/WorkbenchPage.tsx` |
| 4 | 二级菜单：全部/收文/发文/签报/印章/休假 | `src/pages/WorkbenchPage.tsx`、`src/components/workbench/types.ts` |
| 5 | 时钟下恢复日程 + 鸡汤鼓励语 | `src/components/workbench/CalendarPanel.tsx` |
| 6 | 列表≥6条 + 细滚动条 | `src/pages/WorkbenchPage.tsx`、`src/components/workbench/data.ts` |
| 7 | 标签颜色统一蓝色 | `src/pages/WorkbenchPage.tsx` |
| 8 | 头像替换圆点 | `src/pages/WorkbenchPage.tsx` |

提交：`43fcc32`，已推送到 GitHub `main` 分支。

---

## 三、OA二期规划材料

### 3.1 输入文件

| 文件 | 路径 | 说明 |
|------|------|------|
| 厂商功能清单 | `20-ai-demo-OAMerged/蓝凌EKP功能清单（结合标准产品及定制）0615(1).md` | 118项，已标注初步决策 |
| 会议意见汇总 | `20-ai-demo-OAMerged/OA系统升级方案意见征求会议意见汇总表(1).md` | 31条，含初步意见 |
| 流程优化诉求 | 待补充 | 各部门提交的审批流细项，后续对账 |

### 3.2 产出文件

| 文件 | 路径 | 说明 |
|------|------|------|
| 功能决策建议（初稿） | `20-ai-demo-OAMerged/OA二期功能决策建议（初稿）.md` | 厂商清单+会议意见对账、P0/P1分期 |
| 功能全景蓝图 | `20-ai-demo-OAMerged/OA二期功能全景蓝图.excalidraw` | 功能域矩阵 + 会议意见覆盖 + 分期 |
| 产品架构图（推荐用这版） | `20-ai-demo-OAMerged/OA二期产品架构图.excalidraw` | **五层架构，模块名称与厂商BOM对齐** |

### 3.3 决策框架

五层产品架构（上下分层）：

```
用户入口层 → PC三门户 + 移动端（待定）+ SSO
    ↓
业务应用层 → 公文域P0 / 流程域P0 / 会议督办域P0
            信息门户域P1 / 数据看板域P1 / 扩展应用暂缓
    ↓
AI智能体层 → 公文助手P0 / 流程助手P0 / 督办助手P1 / 知识助手暂缓
    ↓
平台底座层 → EKP核心P0 / WPS中台P0 / SSO P0 / TIC P1
    ↓
基础设施层 → 虚拟化P0 / 缓存优化P1 / 微服务P2
```

### 3.4 汇总数字

| 优先级 | 数量 |
|--------|------|
| P0（优先交付） | 14项 |
| P1（后续交付） | 19项 |
| 暂缓/需讨论 | 7项 |
| 不纳入 | 73项 |
| 会议意见覆盖 | 81%（25/31） |

### 3.5 已确定的决策

- ✅ 文档编辑：WPS文档中台

### 3.6 待领导拍板（4项）

1. 公文管理（政企版）是否升级？建议P0
2. 移动端入口：钉钉/企微/飞书/KK 四选一
3. 三重一大是否纳入？
4. 微服务拆分放P2是否可接受？

---

## 四、下一步

1. ⏳ 流程优化诉求表对账补充
2. ⏳ 领导拍板4个待决策问题
3. ⏳ 厂商正式报价对接
