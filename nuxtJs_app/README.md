# nuxtJs

## 启动步骤

```bash
# 安装依赖
$ npm i || cnpm i

# 以localhost:3000为热启动
$ npm run dev

# 构建生产环境
$ npm run build
$ npm run start

# 构建静态
$ npm run generate
```



## 文件夹说明

### `assets`

存放要编译/压缩的文件：sass、图片、字体。 [详细](https://nuxtjs.org/docs/2.x/directory-structure/assets).

引入方式：模板中/sass文件中：'@/assets/imgs/demo_big.jpg'

### `components`

组件文件夹，所有组件存放在此处，建议公共放在根目录，单独属于某些页面的放在对应文件夹内 [详细](https://nuxtjs.org/docs/2.x/directory-structure/components).

### `layouts`

此文件夹放最顶级容器，即基本布局容器，一般情况一个就够用了，也可以多个。比如此文件可以包含header-content-footer三个模块，content为路由注入（通过<nuxt />）的某个page，page中的文件默认使用layouts/default.vue文件，page中也可以用其它，但需要在page中特别指定某容器

 [详细](https://nuxtjs.org/docs/2.x/directory-structure/layouts).


### `pages`

此文夹内的.vue文件结构会对应映射为router路由文件。每个文件可以用一个layout中的布局容器（默认为 layouts/default.vue）也可指定为其它容器， [详细](https://nuxtjs.org/docs/2.x/get-started/routing).

### `plugins`

The plugins directory contains JavaScript plugins that you want to run before instantiating the root Vue.js Application. This is the place to add Vue plugins and to inject functions or constants. Every time you need to use `Vue.use()`, you should create a file in `plugins/` and add its path to plugins in `nuxt.config.js`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/plugins).

### `static`

不需要编译的静态文件放在这里

引入方式 '/某文件' [详细](https://nuxtjs.org/docs/2.x/directory-structure/static).

### `store`

装载Vuex状态器，起始文件为index.js，其它文件为子module，不需要导入导出模块，只需要在每个文件中单独写state、mutations、actions等 [详细](https://nuxtjs.org/docs/2.x/directory-structure/store).
