
var qrBox = new Vue({
    el: "#qrBox",
    data: { 
        imginfo: {
            eye: "./img/eye.png",
            one: "./img/one.png",
            tian: "./img/tian.png",
            col2: "./img/col2.png",
            col3: "./img/col3.png",
            col4: "./img/col4.png",
            row2: "./img/row2.png",
            row3: "./img/row3.png",
            row4: "./img/row4.png",
            re7: "./img/re7.png",
            po7: "./img/po7.png",
        },
        qrinfo: {
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
