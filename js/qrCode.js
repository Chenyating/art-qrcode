var qrBox = new Vue({
    el: "#qrBox",
    data: {
        qrLength: 400,
        unit: null,
        canvasBg: null,
        inputMessage: "0",
        arrayLength: null,
        array: null,
        array4: {
            row: null,
            col: null
        },
        array3: {
            row: null,
            col: null
        },
        array2: {
            row: null,
            col: null
        },
        arrayRever7: null, //反7
        arrayPositive7: null, //正7
        arrayTian: null,//田
        array1: null, //单1
    },
    mounted() {
        this.toBeTableQR();
        // 获取canvas画布这个对象
        var c1 = document.getElementById("canvasQR");
        this.canvasBg = c1.getContext("2d");
        this.canvasBg.fillStyle = "transparent";
    },
    methods: {
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
        // 绘制艺术二维码
        painEye() {
            var img = new Image();
            img.src = "../img/qr/eye.png";
            //浏览器加载图片完毕后再绘制图片
            img.onload = () => {
                this.canvasBg.drawImage(img, 0 * this.unit, 0* this.unit, 7 * this.unit, 7 * this.unit);
                this.canvasBg.drawImage(img, (this.arrayLength-7) * this.unit, 0* this.unit, 7 * this.unit, 7 * this.unit);
                this.canvasBg.drawImage(img, 0 * this.unit, (this.arrayLength-7) * this.unit, 7 * this.unit, 7 * this.unit);
            };
        },
        // 绘制艺术二维码
        pain(arrayName, width, height, num, type) {
            console.log(arrayName.prototype)
            var img = new Image();
            img.src = this.imgSrc(num, type);
            //浏览器加载图片完毕后再绘制图片
            img.onload = () => {
                if (arrayName.length != 0) {
                    for (let i = 0; i < arrayName.length; i++) {
                        this.canvasBg.drawImage(img, arrayName[i][0] * this.unit, arrayName[i][1] * this.unit, width * this.unit, height * this.unit);
                    }
                } else {
                    return;
                }
            };
        },
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
        /*
         *返回判断条件；当数量为4、3、2个方块的；
         * 类型有：col和row；
         * i,j此时遍历的条件；
         */
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
            console.log("col" + num, this[arrayType].col);
            console.log("col" + num, this[arrayType].row);
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
                    if (this.array[i][j][1] == 1) {
                        continue;
                    } else {
                        // 随机记录行竖4
                        if (parseInt(Math.random() * 2) == 1) {
                            // 判断是否超出；
                            if (i >= this.arrayLength - 4) {
                                continue;
                            } else {
                                // 否则判断他是否是竖4。
                                if (this.array[i][j][0] == 1 &&
                                    this.array[i][j][1] == 0 &&
                                    this.array[i + 1][j][0] == 1 &&
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
                                    this.arrayCol4[col4][0] = j;
                                    this.arrayCol4[col4][1] = i
                                    col4 = col4 + 1;
                                } else {
                                    continue;
                                }
                            }
                        } else {
                            if (j >= this.arrayLength - 4) {
                                continue;
                            } else {

                                if (this.array[i][j][0] == 1 &&
                                    this.array[i][j][1] == 0 &&
                                    this.array[i][j + 1][0] == 1 &&
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
                                    this.arrayRow4[row4][0] = j;
                                    this.arrayRow4[row4][1] = i
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
            this.pain('arrayCol4', 1, 4);
            this.pain('arrayRow4', 4, 1);
        },
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
            console.log(this.arrayPositive7);
            console.log(this.arrayRever7);
            this.pain(this.arrayRever7, 2, 2, 7, "re")
            this.pain(this.arrayPositive7, 2, 2, 7, "po")
        },
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
            this.unit = this.qrLength / this.arrayLength;

            // 开始绘制
            this.canvasBg.clearRect(0, 0, this.qrLength, this.qrLength);
            this.countType("array4", 4)
            this.countType("array3", 3)
            this.countTian();
            this.count7();
            this.countType("array2", 2)
            this.count1();
            this.painEye();
        },
        // 清空原来的二维码，把内容二维码转为table格式；
        toBeTableQR() {
            var that = this;
            $("#qrcode").html("");
            // 绘制二维码
            var qrcode = new QRCode(document.getElementById("qrcode"), {
                text: this.inputMessage,
                width: this.qrLength,
                height: this.qrLength,
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
    }
});