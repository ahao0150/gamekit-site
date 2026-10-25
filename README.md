# gamekit-site

gamekit 的静态站点。

- **主站**：https://gamekit.smxcx.top/ （自托管，nginx + Let's Encrypt，国内可直连）
- **镜像**：https://ahao0150.github.io/gamekit-site/ （GitHub Pages，会 301 跳到主站）
- **框架仓库**：[ahao0150/gamekit](https://github.com/ahao0150/gamekit)

## 结构

```
index.html     首页：特性、快速开始、示例工程、三端产物、.ui 速览
play.html      在线试玩：宽屏用 390×844 手机画框 iframe，窄屏点卡片直接整屏运行
guide.html     上手指南：从零到三端产物 + 四个踩过的坑
docs.html      文档中心：12 份文档索引 + 四条核心设计 + 目录结构
play/          三个示例的构建产物（与 mg build --all 的 build/web 一致）
  platformer/  ui-demo/  pindou-workshop/
assets/
  style.css    深色主题，无外部依赖
  app.js       复制按钮 + 导航高亮
```

纯静态，**没有构建步骤**。

## 部署

主站不跟 git 走，改完要手动同步到服务器（`ssh zhanghao_hql_test`）：

```bash
scp -r index.html play.html guide.html docs.html agent.html assets play \
  root@101.96.218.165:/data/www/gamekit/
ssh root@101.96.218.165 "chmod -R a+rX /data/www/gamekit"   # scp 会带出 700 权限，不修 nginx 读不了
```

推 `main` 只是更新 GitHub Pages 镜像（约 1 分钟），不影响主站。

**改 CSS 记得递增版本号**（当前 `style.css?v=5`）：浏览器缓存 + nginx 对 `js|css|png|webp|json`
设了 7 天长缓存（HTML 不缓存），不升版本号会有人看到旧样式。

## 服务器侧配置

- 站点目录 `/data/www/gamekit`，nginx 配置 `/etc/nginx/conf.d/gamekit.smxcx.top.conf`
- 证书 `/etc/nginx/ssl/gamekit.smxcx.top.fullchain.crt`，acme.sh webroot `/data/www/acme`，
  cron 已装（每日 3/9/15/21 点检查续期），与 `smxcx.top` 同一套机制
- 80 口只留 ACME 校验 + 301 到 https

## 更新示例产物

`play/<game>/` 是 gamekit 仓库 `games/<game>/build/web/` 的原样拷贝。框架或游戏改动后：

```bash
cd ../gamekit/games/platformer && pnpm build
# 然后把 build/web/* 覆盖到本仓库 play/platformer/
```

产物里的资源引用都是相对路径（`./game.js`、`assets/...`），放在子目录可以直接跑。
`games/bench` 是性能基准、没有 `build` 脚本，不放站点。

## 更新约定

文档正文在 [gamekit/docs](https://github.com/ahao0150/gamekit/tree/main/docs)，本站只放索引与摘要，
避免两处维护、两处过期。改框架能力（组件数量、包体数字、命令语义）时，同步检查本页对应的数字。
