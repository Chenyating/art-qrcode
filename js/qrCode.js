var qrBox = new Vue({
    el: "#qrBox",
    data: {
        canvasBg: null,
        inputMessage: "0",
        arrayLength: null,
        array: null,
        array4:null,
        array3:null,
        array21:null,
        array22:null,
        array1:null,
    },
    methods: {
        // 统计竖下来的方块4的个数
        countCol4() {
            var col4=0;
            this.array4=[];
            for (let i = 0; i < this.arrayLength-4; i++) {
                for (let j = 0; j < this.arrayLength; j++) {
                    //   遍历每一个数组里的值,如果这个小方块没有上色或者这个小方块被记录过了，那么我们就不用管它了！
                    if (this.array[i][j][0] == 0 || this.array[i][j][1] == 1) {
                        continue;
                    } else {
                        // console.log(i,j,"上色了，且没有被记录")
                        if(this.array[i][j][0] == 1&&this.array[i+1][j][0] == 1&&this.array[i+2][j][0] == 1&&this.array[i+3][j][0] == 1){
                            // 现在col4已经被记录了
                            this.array[i][j][1] = 1
                            this.array[i+1][j][1] = 1
                            this.array[i+2][j][1] = 1
                            this.array[i+3][j][1] = 1
                            this.array4[col4]=[];
                            this.array4[col4][0]=i;
                            this.array4[col4][1]=j
                            col4=col4+1;
                        }
                        else{
                            continue;
                        }
                        // 开始收收集4行的小方块数据；
                    }
                }
            }
            console.log(this.array4)
            this.countCol3();
        },
        // 统计竖下来的方块3的个数
        countCol3() {
            var col3=0;
            this.array3=[];
            for (let i = 0; i < this.arrayLength-3; i++) {
                for (let j = 0; j < this.arrayLength; j++) {
                    //   遍历每一个数组里的值,如果这个小方块没有上色或者这个小方块被记录过了，那么我们就不用管它了！
                    if (this.array[i][j][0] == 0 || this.array[i][j][1] == 1) {
                        continue;
                    } else {
                        // console.log(i,j,"上色了，且没有被记录")
                        if(this.array[i][j][0] == 1&&this.array[i+1][j][0] == 1&&this.array[i+2][j][0] == 1){
                            // 现在col3已经被记录了
                            this.array[i][j][1] = 1
                            this.array[i+1][j][1] = 1
                            this.array[i+2][j][1] = 1
                            this.array3[col3]=[];
                            this.array3[col3][0]=i;
                            this.array3[col3][1]=j
                            col3=col3+1;
                        }
                        else{
                            continue;
                        }
                        // 开始收收集4行的小方块数据；
                    }
                }
            }
            console.log(this.array3)
            // this.countCol3();
            console.log(this.array[8][4][1]);
        },
        // 统计竖下来的方块21-22的个数
        countCol2() {},
        // 统计竖下来的方块1的个数
        countCol1() {},
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
            console.log(this.array);
            this.countCol4();
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
    }
});