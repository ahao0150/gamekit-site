# gamekit-site

gamekit 的静态站点，托管在 GitHub Pages。

- **站点**：https://ahao0150.github.io/gamekit-site/
- **框架仓库**：[ahao0150/gamekit](https://github.com/ahao0150/gamekit)

## 结构

```
index.html     首页：特性、快速开始、示例工程、三端产物、.ui 速览
guide.html     上手指南：从零到三端产物 + 四个踩过的坑
docs.html      文档中心：12 份文档索引 + 四条核心设计 + 目录结构
assets/
  style.css    深色主题，无外部依赖
  app.js       复制按钮 + 导航高亮
```

纯静态，**没有构建步骤**。改完直接推 `main`，Pages 自动更新（约 1 分钟）。

## 更新约定

文档正文在 [gamekit/docs](https://github.com/ahao0150/gamekit/tree/main/docs)，本站只放索引与摘要，
避免两处维护、两处过期。改框架能力（组件数量、包体红线、命令语义）时，同步检查本页对应的数字。
