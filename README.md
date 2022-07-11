### 贪吃蛇小游戏

整合了 Webpack + ts + electron

最近跟着 [尚硅谷的TS教程](https://www.bilibili.com/video/BV1Xy4y1v7S2?share_source=copy_web)，做了一个贪吃蛇的小游戏，希望能改动一下然后整合electron在桌面运行

但electron的配置一直出错，在网上找了很久，都是webpack + vue/react + electron 的整合教程，太重了

后来看到了个很有帮助的答案 [stack question](https://stackoverflow.com/questions/48972912/electron-typescript-webpack-boilerplate-example)

完成了从0开始的整合。

#### 目录结构

```
src
|-- common 放置通用文件
|-- main electron的主线程目录，运行在Nodejs
|-- renderer electron的渲染线程目录，实际为运行在浏览器里的js
```

#### 原理

执行npm run start 后 webpack会对main和renderer两个目录打包

之后electron执行`package.json`中main指定的入口文件创建主线程

electron主线程启动，窗口准备好了，会加载renderer下dist的index.html

而由于webpack的HTMLWebpackPlugin插件，index文件中已经引入了所需的样式和script文件

之后就和在浏览器里执行js是一样的

#### 收获

- 熟悉了解了ts知识，使用类型定义，类，接口，以及tsconfig
- 熟悉了从0开始配置webpack，配置ts，less文件的处理，以及一些常用的webpack插件
- 入门electron，并整合了原生的ts

#### 图片

![image](https://github.com/Yu15693/Snakes/blob/master/img/image.png?raw=true)
