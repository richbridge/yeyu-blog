# yeyu-blog

个人开发的全栈博客项目，部署在 vercel 上，只有域名花了钱，感谢/感恩 vercel

博客地址 [叶鱼 | 业余](https://www.useyeyu.cc)

> 国内访问速度不确定，可能需要「出国留学」才能访问（逃），我在手机上测试过，好像访问速度还挺快的，还没有失败过，不确保以后~

## 主要技术栈

- Nextjs
- React
- TypeScript
- Tailwind CSS
- Shadcnui
- Motion
- Zustand
- Prisma

## 截图展示

![light-mode-home-preview](.github/assets/light-home.png)

![dark-mode-note-preview](.github/assets/dark-note.png)

![light-mode-admin-preview](.github/assets/light-admin.png)

## 本地运行

确保你已安装：

- Git
- Pnpm
- Node.js >= 20

### 获取项目代码

```shell
git clone https://github.com/NeilYeTAT/yeyu-blog.git
```

### 安装依赖

```shell
pnpm install
```
将项目根目录下的 `.env.example` 和 `.env.local.example` 的 `example` 去掉:

现在你应该有一个 `.env` 文件和一个 `.env.local` 文件。

### 创建数据库

**本地测试时使用本地的 mysql 数据库用于演示，但项目使用的是 `postgresql`，需要去修改一下**

前往 `prisma/schema.prisma`，修改 `datasource db` 为：

```prisma
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}
```

**如果存在 `prisma/migrations` 文件夹，需要手动删除。**

接着修改 `.env` 中的 `DATABASE_URL`，示例：

```shell
DATABASE_URL="mysql://username:password@localhost:3306/yeyu_blog_db"
```

初始化表
```shell
npx prisma migrate dev --name init
```

启动！
```shell
pnpm dev
```

至此项目的前端展示是可以跑起来了，数据库也创建好了~

但控制台大概还在报错，问题不大，接下来会解决~

### admin 拦截

现在环境变量还有一些没有填写，控制台也在报错，如果此时直接访问 `http://localhost:3000/admin` 是可以直接访问的，没有任何拦截~

接下来就是配置 oauth 登录了。

[自动生成 AUTH_SECRET](https://authjs.dev/getting-started/installation?framework=Next.js)
运行：
```shell
npx auth secret
```

执行完后，`.env.local` 目录下多了环境变量 `AUTH_SECRET`，现在再访问 `/admin` 页面，会直接重定向到登录页面~

### admin 登录/创建 oauth 应用

前往 [oauth app](https://github.com/settings/applications/new) 创建你的 oauth 应用，获取 CLIENT_ID 和 CLIENT_SECRET。

填写：
Homepage URL: http://localhost:3000

Authorization callback URL: http://localhost:3000/api/auth/callback/github

就完成登录功能了~

### 配置管理员邮箱

设置 `.env.local` 下的环境变量 `NEXT_PUBLIC_ADMIN_EMAILS` 为你自己的邮箱，多个邮箱直接使用逗号隔开~

至此，本地的项目已经可以运行起来了，接下来就是 `vercel` 部署篇了~
