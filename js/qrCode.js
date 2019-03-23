var qrBox = new Vue({
    el: "#qrBox",
    data: {
        canvasBg: null,
        inputMessage: "0",
        arrayLength: null,
        array: null,
        arrayRow4: null, //行4
        arrayCol4: null, //竖4
        arrayRow3: null, //行3
        arrayCol3: null, //竖3
        arrayRever7: null, //反7
        arrayPositive7: null, //正7
        arrayTian: null,
        arrayRow2: null, //横2
        arrayCol2: null, //竖2
        array1: null, //单1
        imgOne: new Image()
    },
    methods: {
        // 绘制艺术二维码
        painQR() {
            //指定图片的URL
            this.imgOne.src = "../img/qr/tian.png";
            //浏览器加载图片完毕后再绘制图片
            this.imgOne.onload = () => {
                //以Canvas画布上的坐标(10,10)为起始点，绘制图像 //图像的宽度和高度分别缩放到350px和100px
                this.canvasBg.drawImage(this.imgOne, 10, 10, 350, 100);
            };
        },
        painTian(){
            if(this.arrayTian.length>0){
                for (let i = 0; i < this.arrayTian.length; i++) {
                    this.canvasBg.drawImage(this.imgOne, this.arrayTian[i][0]*10, this.arrayTian[i][1]*10, 40, 40);
                }
            }
            else{
                return;
            }
        },
        // 统计田
        countTian() {
            var tian = 0;
            this.arrayTian = [];
            for (let i = 0; i < this.arrayLength - 2; i++) {
                //   遍历每一个数组里的值
                for (let j = 0; j < this.arrayLength - 2; j++) {
                    // 如果这个小方块没有上色或者这个小方块被记录过了，那么我们就不用管它了！
                    if (this.array[i][j][0] == 0 || this.array[i][j][1] == 1) {
                        continue;
                    } else {
                        if (
                            this.array[i + 1][j][0] == 1 &
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
                            this.arrayTian[tian][0] = i;
                            this.arrayTian[tian][1] = j
                            tian = tian + 1;
                        } else {
                            continue;
                        }
                    }
                }
            }
            // console.log("田", this.arrayTian);
        },
        // 统计横竖下来的方块4的个数
        count4() {
            var col4 = 0;
            this.arrayCol4 = [];
            var row4 = 0;
            this.arrayRow4 = [];
            for (let i = 0; i < this.arrayLength; i++) {
                //   遍历每一个数组里的值
                for (let j = 0; j < this.arrayLength; j++) {
                    // 如果这个小方块没有上色或者这个小方块被记录过了，那么我们就不用管它了！
                    if (this.array[i][j][0] == 0 || this.array[i][j][1] == 1) {
                        continue;
                    } else {
                        // 随机记录行竖4
                        if (parseInt(Math.random() * 2) == 1) {
                            // 判断是否超出；
                            if (i >= this.arrayLength - 4) {
                                continue;
                            } else {
                                // 否则判断他是否是竖4。
                                if (this.array[i + 1][j][0] == 1 &&
                                    this.array[i + 1][j][1] == 0 &&
                                    this.array[i + 2][j][0] == 1 &&
                                    this.array[i + 2][j][1] == 0 &&
                                    this.array[i + 3][j][0] == 1 &&
                                    this.array[i + 3][j][1] == 0) {
                                    // 现在col4已经被记录了；
                                    this.array[i][j][1] = 1
                                    this.array[i + 1][j][1] = 1
                                    this.array[i + 2][j][1] = 1
                                    this.array[i + 3][j][1] = 1
                                    // 把竖4的i，j记录进去；
                                    // 开始收收集4行的小方块数据；
                                    this.arrayCol4[col4] = [];
                                    this.arrayCol4[col4][0] = i;
                                    this.arrayCol4[col4][1] = j
                                    col4 = col4 + 1;
                                } else {
                                    continue;
                                }
                            }
                        } else {
                            if (j >= this.arrayLength - 4) {
                                continue;
                            } else {

                                if (this.array[i][j + 1][0] == 1 &&
                                    this.array[i][j + 1][1] == 0 &&
                                    this.array[i][j + 2][0] == 1 &&
                                    this.array[i][j + 2][1] == 0 &&
                                    this.array[i][j + 3][0] == 1 &&
                                    this.array[i][j + 3][1] == 0) {
                                    // 现在row4已经被记录了；
                                    this.array[i][j][1] = 1
                                    this.array[i][j + 1][1] = 1
                                    this.array[i][j + 2][1] = 1
                                    this.array[i][j + 3][1] = 1
                                    // 把横4的i，j记录进去；
                                    this.arrayRow4[row4] = [];
                                    this.arrayRow4[row4][0] = i;
                                    this.arrayRow4[row4][1] = j
                                    row4 = row4 + 1;
                                } else {
                                    continue;
                                }
                                // 开始收收集4行的小方块数据；
                            }
                            // 否则判断他是否是横4。
                        }
                    }
                }
            }
            // console.log("竖4", this.arrayCol4);
            // console.log("横4", this.arrayRow4);
        },
        // 统计横竖下来的方块3的个数
        count3() {
            var col3 = 0;
            this.arrayCol3 = [];
            var row3 = 0;
            this.arrayRow3 = [];
            for (let i = 0; i < this.arrayLength; i++) {
                //   遍历每一个数组里的值
                for (let j = 0; j < this.arrayLength; j++) {
                    // 如果这个小方块没有上色或者这个小方块被记录过了，那么我们就不用管它了！
                    if (this.array[i][j][0] == 0 || this.array[i][j][1] == 1) {
                        continue;
                    } else {
                        // 随机记录行竖3
                        if (parseInt(Math.random() * 2) == 1) {
                            // 判断是否超出；
                            if (i >= this.arrayLength - 3) {
                                continue;
                            } else {
                                // 否则判断他是否是竖3。
                                if (this.array[i + 1][j][0] == 1 &&
                                    this.array[i + 1][j][1] == 0 &&
                                    this.array[i + 2][j][0] == 1 &&
                                    this.array[i + 2][j][1] == 0) {
                                    // 现在col3已经被记录了；
                                    this.array[i][j][1] = 1
                                    this.array[i + 1][j][1] = 1
                                    this.array[i + 2][j][1] = 1
                                    // 把竖3的i，j记录进去；
                                    // 开始收收集3行的小方块数据；
                                    this.arrayCol3[col3] = [];
                                    this.arrayCol3[col3][0] = i;
                                    this.arrayCol3[col3][1] = j
                                    col3 = col3 + 1;
                                } else {
                                    continue;
                                }
                            }
                        } else {
                            if (j >= this.arrayLength - 3) {
                                continue;
                            } else {

                                if (this.array[i][j + 1][0] == 1 &&
                                    this.array[i][j + 1][1] == 0 &&
                                    this.array[i][j + 2][0] == 1 &&
                                    this.array[i][j + 2][1] == 0) {
                                    // 现在row3已经被记录了；
                                    this.array[i][j][1] = 1
                                    this.array[i][j + 1][1] = 1
                                    this.array[i][j + 2][1] = 1
                                    // 把横3的i，j记录进去；
                                    this.arrayRow3[row3] = [];
                                    this.arrayRow3[row3][0] = i;
                                    this.arrayRow3[row3][1] = j
                                    row3 = row3 + 1;
                                } else {
                                    continue;
                                }
                                // 开始收收集3行的小方块数据；
                            }
                            // 否则判断他是否是横3。
                        }
                    }
                }
            }
            // console.log("横3", this.arrayCol3);
            // console.log("竖3", this.arrayRow3);
        },
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
                    if (this.array[i][j][0] == 0 || this.array[i][j][1] == 1) {
                        continue;
                    } else {
                        // 随机记录正反7
                        if (parseInt(Math.random() * 2) == 1) {
                            // 判断是否超出；
                            // 否则判断他是否是正7。
                            if (this.array[i + 1][j][0] == 0 &&
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
                                this.arrayPositive7[positive7][0] = i;
                                this.arrayPositive7[positive7][1] = j
                                positive7 = positive7 + 1;
                            } else {
                                continue;
                            }
                        } else {
                            // 反7
                            if (this.array[i + 1][j + 1][0] == 0 &&
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
                                this.arrayRever7[reverse7][0] = i;
                                this.arrayRever7[reverse7][1] = j
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
            // console.log("正7", this.arrayPositive7);
            // console.log("反7", this.arrayRever7);
        },
        // 统计竖下来的方块2的个数
        count2() {
            var col2 = 0;
            this.arrayCol2 = [];
            var row2 = 0;
            this.arrayRow2 = [];
            for (let i = 0; i < this.arrayLength - 2; i++) {
                //   遍历每一个数组里的值
                for (let j = 0; j < this.arrayLength - 2; j++) {
                    // 如果这个小方块没有上色或者这个小方块被记录过了，那么我们就不用管它了！
                    if (this.array[i][j][0] == 0 || this.array[i][j][1] == 1) {
                        continue;
                    } else {
                        // 随机记录横竖2
                        if (parseInt(Math.random() * 2) == 1) {
                            // 判断是否超出；
                            // 否则判断他是否是竖2。
                            if (
                                this.array[i + 1][j][0] == 1 &&
                                this.array[i + 1][j][1] == 0) {
                                // 现在横2已经被记录了；
                                this.array[i][j][1] = 1
                                this.array[i + 1][j][1] = 1
                                // 把横2的i，j记录进去；
                                // 开始收收集7行的小方块数据；
                                this.arrayRow2[row2] = [];
                                this.arrayRow2[row2][0] = i;
                                this.arrayRow2[row2][1] = j
                                row2 = row2 + 1;
                            } else {
                                continue;
                            }
                            // 开始收收集7行的小方块数据；
                            // 否则判断他是否是横7。
                        } else {
                            // 横2
                            if (this.array[i][j + 1][0] == 1 &&
                                this.array[i][j + 1][1] == 0) {
                                // 现在col2已经被记录了；
                                this.array[i][j][1] = 1
                                this.array[i][j + 1][1] = 1
                                // 把竖2的i，j记录进去；
                                // 开始收收集2行的小方块数据；
                                this.arrayCol2[col2] = [];
                                this.arrayCol2[col2][0] = i;
                                this.arrayCol2[col2][1] = j
                                col2 = col2 + 1;
                            } else {
                                continue;
                            }

                        }
                    }
                }
            }
            // console.log("竖2", this.arrayCol2);
            // console.log("横2", this.arrayRow2);
        },
        // 统计剩余1单个方块
        count1() {
            var col1 = 0;
            this.array1 = [];
            for (let i = 0; i < this.arrayLength - 2; i++) {
                //   遍历每一个数组里的值
                for (let j = 0; j < this.arrayLength - 2; j++) {
                    // 如果这个小方块没有上色或者这个小方块被记录过了，那么我们就不用管它了！
                    if (this.array[i][j][0] == 0 || this.array[i][j][1] == 1) {
                        continue;
                    } else {
                        this.array[i][j][1] = 1
                        // 剩下的按单个记录保存；
                        this.array1[col1] = [];
                        this.array1[col1][0] = i;
                        this.array1[col1][1] = j
                        col1 = col1 + 1;
                    }
                }
            }
            // console.log("单个", this.array1);
        },
        //计算二维码的一个小黑块的宽度
        countWidth() {
            console.log("开始回调")
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
                    } else {
                        this.array[i][j][0] = 0;
                    }
                    //    首先把3个大框框保存下来；
                    if ((i < 7 && j < 7) || (i > this.arrayLength - 8 && j < 7) || (i < 7 && j > this.arrayLength - 8)) {
                        this.array[i][j][1] = 1;
                    } else {
                        this.array[i][j][1] = 0;
                    }
                }
            }
            // console.log(this.array);
            this.countTian();
            this.count4();
            this.count3();
            this.count7();
            this.count2();
            this.count1();
        },
        // 清空原来的二维码，把内容二维码转为table格式；
        toBeTableQR() {
            var that = this;
            $("#qrcode").html("");
            // 绘制二维码
            var qrcode = new QRCode(document.getElementById("qrcode"), {
                text: this.inputMessage,
                width: 300,
                height: 300,
                colorDark: "black",
                colorLight: "transparent",
                correctLevel: QRCode.CorrectLevel.H
            }, function () {
                //  绘制结束回调函数；计算二维码的信息；
                that.countWidth();
            });
        },
        // 开始转为二维码的table
        toBeQR() {
            if (this.inputMessage == null) {
                console.log("内容不能为空");
                return;
            } else {
                this.toBeTableQR();
            }
        }
    },
    mounted() {
        this.toBeTableQR();
        // 获取canvas画布这个对象
        var c1 = document.getElementById("canvasQR");
        this.canvasBg = c1.getContext("2d");
        this.painQR();
    }
});