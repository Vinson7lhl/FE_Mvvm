# nuxtJs

## 启动步骤

```bash
# 安装依赖
$ npm i || cnpm i

# 默认以localhost:3000为热启动
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

此文件夹的作用是写入全局功能，供server端和client端调用，方法见详情，里面有三种方式绑定：

（1）只绑定client端，即Vue使用，通过Vue.prototype.$XXX，注意默认加上$前缀以表示这是Vue实例所用

（2）只绑定server端，即通过context.app

（3）两端都要使用的，默认会自动将名字加上$，所以不必单独加$

```
export default ({ app }, inject) => {
	// 只在server端
	app.fun_1 = str => {
		// 做点啥
	}
	// server 端和 client都可以用，通过this.$fun_2 || context.app.$fun_2
	inject('fun_2', str => {
		// 做点啥
	})
}
```

 [详细](https://nuxtjs.org/docs/2.x/directory-structure/plugins).