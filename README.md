# ART-QR-Code
blog详细的解说地址：https://blog.csdn.net/lemisi/article/details/88831289

[预览地址](http://yating.online/demo/qr/):http://yating.online/demo/qr/

如果你觉得还不错的话，给个star吧，谢谢~

<img src="https://img-blog.csdnimg.cn/20200114125345742.png" width="300"/>

## 存在问题：
 - 1、内容过于复杂，可能无法识别出来；
 - 2、有的二维码，用手机可以扫描出来，但是无法图片识别

## 生成二维码

> QRCode.js 是一个用于生成二维码的 JavaScript 库。主要是通过获取 DOM 的标签,再通过 HTML5 Canvas 绘制而成,不依赖任何库。

[qrcode.js地址](https://github.com/davidshimjs/qrcodejs)

基本的用法是：
```js
    var qrcode = new QRCode("test", {
        text: "www.yating.online",
        width: 128,
        height: 128,
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
    });
```


绘制二维码以后需要使用回调函数的方法：

```js
    var qrcode = new QRCode(document.getElementById("qrcode"), {
        text: "www.yating.online",
    width: 128,
    height: 128,
    colorDark : "#000000",
    colorLight : "#ffffff",
    correctLevel : QRCode.CorrectLevel.H
    },function(src){
    console.log(src)
    //回调方法
    });
```

> 因为最后导出的是以canvas的形式导出的二维码，很不方便我计算小黑快；
所以我在源码上面，改成最后以table的形式导出二维码，从而更方便计算小黑块的数目

<img src="https://img-blog.csdnimg.cn/2019032622043296.png" width="200"/>

 - 在源码中找到这个方法：Drawing.prototype.draw = function (oQRCode)
 - 把里面的内容删掉替换成现有的导出table的方法，代码如下：
 

  
```js
var _htOption = this._htOption;
            var _el = this._el;
            var nCount = oQRCode.getModuleCount();
            var nWidth = Math.floor(_htOption.width / nCount);
            var nHeight = Math.floor(_htOption.height / nCount);
            var aHTML = ['<table id="tableQR" style="border:0;border-collapse:collapse;">'];

        for (var row = 0; row < nCount; row++) {
            aHTML.push('<tr>');
        for (var col = 0; col < nCount; col++) {
            aHTML.push('<td style="border:0;border-collapse:collapse;padding:0;margin:0;width:' + nWidth + 'px;height:' + nHeight + 'px;background-color:' + (oQRCode.isDark(row, col) ? _htOption.colorDark : _htOption.colorLight) + ';"></td>');
        }

        aHTML.push('</tr>');
    }

    aHTML.push('</table>');
    _el.innerHTML = aHTML.join('');

    // Fix the margin values as real size.
    var elTable = _el.childNodes[0];
    var nLeftMarginTable = (_htOption.width - elTable.offsetWidth) / 2;
    var nTopMarginTable = (_htOption.height - elTable.offsetHeight) / 2;

    if (nLeftMarginTable > 0 && nTopMarginTable > 0) {
        elTable.style.margin = nTopMarginTable + "px " + nLeftMarginTable + "px";
    }
    this._bIsPainted = true;
```


### 计算二维码的小黑快

```js
//    首先把3个大框框保存下来；
    if ((i < 7 && j < 7) || (i > this.arrayLength - 8 && j < 8) || (i < 8 && j > this.arrayLength - 8)) {
        this.array[i][j][1] = 1;
    }
```

- array[i][j][0]=1:表示第i行j列的小方块是黑色的；

- array[i][j][1]=1：表示第i行j列的小方块待会不做记录处理；


```js
countWidth() {
    var tr = $("#tableQR tbody").find("tr");
    // 获取二维码一行的数量，从而得知是n*n个；设置一个n行n列的数组
    this.arrayLength = tr.length;
    // 开始遍历表格,把每一个td的上色情况存在array数组里；
    this.array = [];
    for (let i = 0; i < tr.length; i++) {
        this.array[i] = [];
        // 首先遍历tr数组
        // console.log("第", i, "行")
        for (let j = 0; j < tr[i].children.length; j++) {
            this.array[i][j] = []; //第一个是上色情况，第二个是记录情况
            // 遍历每个tr里的td，记录每个td的上色情况；
            if (tr[i].children[j].style.backgroundColor == 'black') {
                this.array[i][j][0] = 1;
                this.array[i][j][1] = 0;
                // this.array[i][j]= 1;
            } else {
                this.array[i][j][0] = 0;
                this.array[i][j][1] = 1;
                // this.array[i][j] = 0;
            }
            //    首先把3个大框框保存下来；
            if ((i < 7 && j < 7) || (i > this.arrayLength - 8 && j < 8) || (i < 8 && j > this.arrayLength - 8)) {
                this.array[i][j][1] = 1;
            }
        }
    }
},
```
   

### 随机填充小黑块；

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190326225039625.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2xlbWlzaQ==,size_16,color_FFFFFF,t_70)

> 最主要的精髓就是，填充小黑块的正中心，大概1/9分布到所有小黑块上去，就可以识别了。众所周知，只要把有颜色的图案，替换掉小黑块就可以识别出来了。

- ![在这里插入图片描述](https://img-blog.csdnimg.cn/20190326224518425.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2xlbWlzaQ==,size_16,color_FFFFFF,t_70)

所以。我给它设计了10种不同的填充方式：

![在这里插入图片描述](https://img-blog.csdnimg.cn/2019032622125084.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2xlbWlzaQ==,size_16,color_FFFFFF,t_70)

他们分别对应的小黑块是这个样子的：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190326221650715.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2xlbWlzaQ==,size_16,color_FFFFFF,t_70)

> 4、所以我们就要开始随机的去计算这10种可能的图案能把所有小黑快填满的数据；

每次生成的组成都是不一样的图案，给大家看一下例子；我把第一张图叫正7图案，因为看起来像7；第二张图叫反7；

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190326222047545.png)

```js
// 统计方块反7正7的个数
count7() {
    var positive7 = 0;
    this.arrayPositive7 = [];
    var reverse7 = 0;
    this.arrayRever7 = [];
    for (let i = 0; i < this.arrayLength - 2; i++) {
        //   遍历每一个数组里的值
        for (let j = 0; j < this.arrayLength - 2; j++) {
            // 如果这个小方块没有上色或者这个小方块被记录过了，那么我们就不用管它了！
            if (this.array[i][j][1] == 1) {
                continue;
            } else {
                // 随机记录正反7
                if (parseInt(Math.random() * 2) == 1) {
                    // 判断是否超出；
                    // 否则判断他是否是正7。
                    if (this.array[i][j][0] == 1 &&
                        this.array[i][j][1] == 0 &&
                        this.array[i + 1][j][0] == 0 &&
                        this.array[i][j + 1][0] == 1 &&
                        this.array[i][j + 1][1] == 0 &&
                        this.array[i + 1][j + 1][0] == 1 &&
                        this.array[i + 1][j + 1][1] == 0) {
                        // 现在positive7已经被记录了；
                        this.array[i][j][1] = 1
                        this.array[i][j + 1][1] = 1
                        this.array[i + 1][j + 1][1] = 1
                        // 把竖7的i，j记录进去；
                        // 开始收收集7行的小方块数据；
                        this.arrayPositive7[positive7] = [];
                        this.arrayPositive7[positive7][0] = j;
                        this.arrayPositive7[positive7][1] = i
                        positive7 = positive7 + 1;
                    } else {
                        continue;
                    }
                } else {
                    // 反7
                    if (this.array[i][j][0] == 1 &&
                        this.array[i][j][1] == 0 &&
                        this.array[i + 1][j + 1][0] == 0 &&
                        this.array[i][j + 1][0] == 1 &&
                        this.array[i][j + 1][1] == 0 &&
                        this.array[i + 1][j][0] == 1 &&
                        this.array[i + 1][j][1] == 0) {
                        // 现在positive7已经被记录了；
                        this.array[i][j][1] = 1
                        this.array[i][j + 1][1] = 1
                        this.array[i + 1][j][1] = 1
                        // 把竖7的i，j记录进去；
                        // 开始收收集7行的小方块数据；
                        this.arrayRever7[reverse7] = [];
                        this.arrayRever7[reverse7][0] = j;
                        this.arrayRever7[reverse7][1] = i
                        reverse7 = reverse7 + 1;
                    } else {
                        continue;
                    }
                    // 开始收收集7行的小方块数据；
                    // 否则判断他是否是横7。
                }
            }
        }
    }
    // console.log(this.arrayPositive7);
    // console.log(this.arrayRever7);
    this.pain(this.arrayRever7, 2, 2, 7, "re")
    this.pain(this.arrayPositive7, 2, 2, 7, "po")
},
```
     

统计田的方法：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190326222331794.png)

```js
// 统计田
countTian() {
    var tian = 0;
    this.arrayTian = [];
    for (let i = 0; i < this.arrayLength - 2; i++) {
        //   遍历每一个数组里的值
        for (let j = 0; j < this.arrayLength - 2; j++) {
            // 如果这个小方块没有上色或者这个小方块被记录过了，那么我们就不用管它了！
            if (this.array[i][j][1] == 1) {
                continue;
            } else {
                if (
                    this.array[i][j][0] == 1 &&
                    this.array[i][j][1] == 0 &&
                    this.array[i + 1][j][0] == 1 &&
                    this.array[i + 1][j][1] == 0 &&
                    this.array[i][j + 1][0] == 1 &&
                    this.array[i][j + 1][1] == 0 &&
                    this.array[i + 1][j + 1][0] == 1 &&
                    this.array[i + 1][j + 1][1] == 0) {
                    // 现在positive7已经被记录了；
                    this.array[i][j][1] = 1
                    this.array[i + 1][j][1] = 1
                    this.array[i][j + 1][1] = 1
                    this.array[i + 1][j + 1][1] = 1
                    // 把竖7的i，j记录进去；
                    // 开始收收集7行的小方块数据；
                    this.arrayTian[tian] = [];
                    this.arrayTian[tian][0] = j;
                    this.arrayTian[tian][1] = i
                    tian = tian + 1;
                } else {
                    continue;
                }
            }
        }
    }
    this.pain(this.arrayTian, 2, 2, 22, "tian");
},
```
   
因为统计：4、3、2个方块的横竖方法类似，所以我把她们合并成一个方法来分别调用：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190326222457197.png)

```js
// 返回判断条件；当数量为4、3、2个方块的；
// 类型有：col和row；
// i,j此时遍历的条件；
//  
    
countType(arrayType, num) {
    var col = 0;
    this[arrayType].col = [];
    var row = 0;
    this[arrayType].row = [];
    for (let i = 0; i < this.arrayLength; i++) {
        //   遍历每一个数组里的值
        for (let j = 0; j < this.arrayLength; j++) {
            // 如果这个小方块没有上色或者这个小方块被记录过了，那么我们就不用管它了！
            if (this.array[i][j][1] == 1) {
                continue;
            } else {
                // 随机记录行竖4
                if (parseInt(Math.random() * 2) == 1) {
                    // 判断是否超出；
                    if (i >= this.arrayLength - num) {
                        continue;
                    } else {
                        // 否则判断他是否是竖4。
                        if (this.condition(num, "col", i, j)) {
                            // 现在col4已经被记录了；
                            for (k = 0; k < num; k++) {
                                this.array[i + k][j][1] = 1
                            }
                            // 把竖4的i，j记录进去；
                            // 开始收收集4行的小方块数据；
                            this[arrayType].col[col] = [];
                            this[arrayType].col[col][0] = j;
                            this[arrayType].col[col][1] = i
                            col = col + 1;
                        } else {
                            continue;
                        }
                    }
                } else {
                    if (j >= this.arrayLength - num) {
                        continue;
                    } else {

                        if (this.condition(num, "row", i, j)) {
                            // 现在row4已经被记录了；
                            for (k = 0; k < num; k++) {
                                this.array[i][j + k][1] = 1
                            }
                            // 把横4的i，j记录进去；
                            this[arrayType].row[row] = [];
                            this[arrayType].row[row][0] = j;
                            this[arrayType].row[row][1] = i
                            row = row + 1;
                        } else {
                            continue;
                        }
                    }
                }
            }
        }
    }
    this.pain(this[arrayType].row, num, 1, num, "row");
    this.pain(this[arrayType].col, 1, num, num, "col");
},
if（condition（））会返回判断该类型图片的条件

/*
    * 返回判断条件；当数量为4、3、2个方块的；
    * 类型有：col和row；
    * i,j此时遍历的条件；
    */
condition(num, type, i, j) {
    if (num == 4 && type == "row") {
        return (this.array[i][j][0] == 1 &&
            this.array[i][j][1] == 0 &&
            this.array[i][j + 1][0] == 1 &&
            this.array[i][j + 1][1] == 0 &&
            this.array[i][j + 2][0] == 1 &&
            this.array[i][j + 2][1] == 0 &&
            this.array[i][j + 3][0] == 1 &&
            this.array[i][j + 3][1] == 0)
    }
    if (num == 4 && type == "col") {
        return (this.array[i][j][0] == 1 &&
            this.array[i][j][1] == 0 &&
            this.array[i + 1][j][0] == 1 &&
            this.array[i + 1][j][1] == 0 &&
            this.array[i + 2][j][0] == 1 &&
            this.array[i + 2][j][1] == 0 &&
            this.array[i + 3][j][0] == 1 &&
            this.array[i + 3][j][1] == 0)
    }
    if (num == 3 && type == "row") {
        return (this.array[i][j][0] == 1 &&
            this.array[i][j][1] == 0 &&
            this.array[i][j + 1][0] == 1 &&
            this.array[i][j + 1][1] == 0 &&
            this.array[i][j + 2][0] == 1 &&
            this.array[i][j + 2][1] == 0)
    }
    if (num == 3 && type == "col") {
        return (this.array[i][j][0] == 1 &&
            this.array[i][j][1] == 0 &&
            this.array[i + 1][j][0] == 1 &&
            this.array[i + 1][j][1] == 0 &&
            this.array[i + 2][j][0] == 1 &&
            this.array[i + 2][j][1] == 0)
    }
    if (num == 2 && type == "row") {
        return (this.array[i][j][0] == 1 &&
            this.array[i][j][1] == 0 &&
            this.array[i][j + 1][0] == 1 &&
            this.array[i][j + 1][1] == 0)
    }
    if (num == 2 && type == "col") {
        return (this.array[i][j][0] == 1 &&
            this.array[i][j][1] == 0 &&
            this.array[i + 1][j][0] == 1 &&
            this.array[i + 1][j][1] == 0)
    }
},
```

     
最后没有填满的小黑块都均以1个小黑块来记录下来：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190326222610985.png)

```js
// 统计剩余1单个方块
count1() {
    var col1 = 0;
    this.array1 = [];
    for (let i = 0; i < this.arrayLength; i++) {
        //   遍历每一个数组里的值
        for (let j = 0; j < this.arrayLength; j++) {
            // 如果这个小方块没有上色或者这个小方块被记录过了，那么我们就不用管它了！
            if (this.array[i][j][1] == 1) {
                continue;
            } else {
                this.array[i][j][1] = 1
                // 剩下的按单个记录保存；
                this.array1[col1] = [];
                this.array1[col1][0] = j;
                this.array1[col1][1] = i
                col1 = col1 + 1;
            }
        }
    }
    this.pain(this.array1, 1, 1, 1, "one");
},
```


## 开始绘制图案

每次计算好不同类型的图案的方式，紧接着我就会开始绘制该图案到canvas上：

因为i行j列，对应x、y轴时；

i对应y；

j对应x；

所以渲染的时候要注意一下以免搞混杂了。

```js
// 绘制艺术二维码
pain(arrayName, width, height, num, type) {
    var img = new Image();
    img.src = this.imgSrc(num, type);
    //浏览器加载图片完毕后再绘制图片
    img.onload = () => {
        //以Canvas画布上的坐标(10,10)为起始点，绘制图像 //图像的宽度和高度分别缩放到350px和100px
        if (arrayName.length != 0) {
            for (let i = 0; i < arrayName.length; i++) {
                this.canvasBg.drawImage(img, arrayName[i][0] * this.unit, arrayName[i][1] * this.unit, width * this.unit, height * this.unit);
            }
        } else {
            return;
        }
    };
},
```


this.imgSrc（num，type）会根据不同的图案类型返回图片路径
```js

// 返回图片src
imgSrc(num, type) {
    if (num == 4 && type == "row") {
        return "../img/qr/row4.png";
    }
    if (num == 4 && type == "col") {
        return "../img/qr/col4.png";
    }
    if (num == 3 && type == "row") {
        return "../img/qr/row3.png";
    }
    if (num == 3 && type == "col") {
        return "../img/qr/col3.png";
    }
    if (num == 7 && type == "re") {
        return "../img/qr/re7.png";
    }
    if (num == 7 && type == "po") {
        return "../img/qr/po7.png";
    }
    if (num == 22 && type == "tian") {
        return "../img/qr/tian.png";
    }
    if (num == 2 && type == "row") {
        return "../img/qr/row2.png";
    }
    if (num == 2 && type == "col") {
        return "../img/qr/col2.png";
    }
    if (num == 1 && type == "one") {
        return "../img/qr/one.png";
    }
},
```
## 绘制码眼
最后我们开始绘制定位的码眼：它的宽度是7个小方块；

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190326223319539.png)

====》

![在这里插入图片描述](https://img-blog.csdnimg.cn/201903262233314.png)

```js
// 绘制艺术二维码
    painEye() {
        var img = new Image();
        img.src = "../img/qr/eye.png";
        //浏览器加载图片完毕后再绘制图片
        img.onload = () => {
            this.canvasBg.drawImage(img, 0 * this.unit, 0 * this.unit, 7 * this.unit, 7 * this.unit);
            this.canvasBg.drawImage(img, (this.arrayLength - 7) * this.unit, 0 * this.unit, 7 * this.unit, 7 * this.unit);
            this.canvasBg.drawImage(img, 0 * this.unit, (this.arrayLength - 7) * this.unit, 7 * this.unit, 7 * this.unit);
        };
    },
```

基本上到最后你就能生成一个这样的二维码了：

![在这里插入图片描述](https://img-blog.csdnimg.cn/2019032622344180.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2xlbWlzaQ==,size_16,color_FFFFFF,t_70)

然后我们再给它导出图片格式；就万事大吉了。



## 拓展
- 因为我还会加上一个背景，但是我的背景是img标签；如果你想要div截图成img输出；

可以使用html2canvas：http://html2canvas.hertzen.com/

html：
```html

    <div id="capture" style="padding: 10px; background: #f5da55">
        <h4 style="color: #000; ">Hello world!</h4>
    </div>
```

js：
```js
    html2canvas(document.querySelector("#capture")).then(canvas => {
        document.body.appendChild(canvas)
    });
```

- 解决html标签导出img不清晰的问题：

```js
toBeCanvas() {
    var copyDom = $("#canvasQR");
    var width = copyDom.offsetWidth; //dom宽
    var height = copyDom.offsetHeight; //dom高
    var scale = 2; //放大倍数
    html2canvas(this.$refs['order'], {
        dpi: window.devicePixelRatio * 2,
        scale: scale,
        width: width,
        heigth: height,
    }).then(canvas => {
        const context = canvas.getContext('2d');
        // 【重要】关闭抗锯齿 https://segmentfault.com/a/1190000011478657
        context.mozImageSmoothingEnabled = false;![在这里插入图片描述](https://img-blog.csdnimg.cn/20190326214809901.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2xlbWlzaQ==,size_16,color_FFFFFF,t_70)
        context.webkitImageSmoothingEnabled = false;
        context.msImageSmoothingEnabled = false;
        context.imageSmoothingEnabled = false;
        var url = canvas.toDataURL();
        var triggerDownload = $("<a>").attr("href", url).attr("download", "详情.png").appendTo("body");
        triggerDownload[0].click();
        triggerDownload.remove();
    });
},
```

这四行是关键：
```js
    context.mozImageSmoothingEnabled = false;
    context.webkitImageSmoothingEnabled = false;
    context.msImageSmoothingEnabled = false;
    context.imageSmoothingEnabled = false;
```
2、img绘制到canvas不清晰的解决方法：

```js
    <canvas width="320" height="180" style="width:160px;height:90px;"></canvas>
```

canvas的内容放大到两倍，以img的形式展示1倍；

绘制到canvas的图片绝对清晰；
