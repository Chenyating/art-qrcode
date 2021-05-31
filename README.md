# ART-QR-Code
[预览地址](http://yating.online/demo/qr/): http://yating.online/ART-QRCode/
[解析原理](https://blog.csdn.net/lemisi/article/details/88831289)
## 使用方法
```js
import ".artQRCode.js";

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
           new getqrcode(this.qrinfo,this.imginfo).then(()=>{
               console.log("成功")
           }).catch(()=>{
               console.log("失败")
           })
        }
    }
});

```