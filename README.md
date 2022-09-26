# art-qrcode

[预览地址](https://chenyating.github.io/art-qrcode/): https://chenyating.github.io/art-qrcode/
[艺术二维码生成原理](https://blog.csdn.net/lemisi/article/details/88831289)https://blog.csdn.net/lemisi/article/details/88831289

<img src="readme/demo.gif" alt="Editor" width="250">

## 艺术二维码插件：普通版

git地址：https://github.com/Chenyating/art-qrcode

### 下载方式
```
npm i art-qrcode
```

### 使用方法
```js
import "artQRCode.js";

var qrBox = new Vue({
    el: "#qrBox",
    data: { 
        imginfo: {
            eye: "./img/eye.png",//必填
            one: "./img/one.png",//必填
            tian: "./img/tian.png",//可选
            col2: "./img/col2.png",//可选
            col3: "./img/col3.png",//可选
            col4: "./img/col4.png",//可选
            row2: "./img/row2.png",//可选
            row3: "./img/row3.png",//可选
            row4: "./img/row4.png",//可选
            re7: "./img/re7.png",//可选
            po7: "./img/po7.png",//可选
        },
        qrinfo: {//必填
            canvasid: 'qrcode',
            size: '360',
            text: '1',
        },
    },
    mounted() {
        this.start();
    },
    methods: {
        start() {
           new artqrcode(this.qrinfo,this.imginfo).then(()=>{
               console.log("成功")
           }).catch(()=>{
               console.log("失败")
           })
        }
    }
});

```


## 艺术二维码插件：小程序版
git地址：https://github.com/Chenyating/wx-art-qrcode

### 下载方式
```
npm i wx-art-qrcode
```

### 使用方法

```html
<canvas class="qrcode" style="width:200px;height:200px" canvas-id="qrcode"></canvas>
```

```js
// index.js
// 获取应用实例
import artqrcode from '../../utils/wx-art-qrcode.js';
Page({
  data: {
    imginfo: {
      eye: "../../img/eye.png", //必填
      one: "../../img/one.png", //必填
      tian: "../../img/tian.png", //可选
      col2: "../../img/col2.png", //可选
      col3: "../../img/col3.png", //可选
      col4: "../../img/col4.png", //可选
      row2: "../../img/row2.png", //可选
      row3: "../../img/row3.png", //可选
      row4: "../../img/row4.png", //可选
      re7: "../../img/re7.png", //可选
      po7: "../../img/po7.png", //可选
    },
    qrinfo: { //必填
      canvasid: 'qrcode',
      size: '200',
      text: '1',
    }
  },
  onLoad:function() {
    artqrcode(this.data.qrinfo, this.data.imginfo).then(() => {
      console.log("成功")
    }).catch(() => {
      console.log("失败")
    })
  }
})
```

## 设计指引
设计图片素材需循序规则设计：

建议最小单元one.png尺寸为：50*50px，分辨率：300像素.

以本网站为例：

![img](readme/rules.png)


## 注意：
其中：eye.png ,one.png两张图为必备图片。

元素图：

<img src="readme/rules1.png" alt="Editor" width="500">

生成效果图：

<img src="readme/rules2.png" alt="Editor" width="200">

## 工具
如果设计对你来说比较麻烦，欢迎使用我的小工具

<img src="readme/toolcode.jpg" alt="Editor" width="200">


可以在线生成艺术二维码，或解析黑白二维码为艺术二维码。

也可以自定义上传素材生成。

<img src="readme/tool.gif" alt="Editor" width="250">


## LICENSE
[MIT](https://github.com/Chenyating/art-qrcode/blob/master/LICENSE)
