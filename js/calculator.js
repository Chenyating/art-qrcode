var app = new Vue({
    el: "#app",
    data: {
      num: [], //输入的数值
      numValue: null, //输入的数值
      first: null, //第一位数的值
      showResult: null, //显示的结果
      Symbols: 0, //使用第几个运算方法
      dotBefore: null,
      dotAfter: null,
      k: null
    },
    methods: {
      //如果把小数点和数字存入数组中，例如1 2 . 6 3 得出12.63 的方法
      hasDotArray() {
        this.numValue = 0;
        this.num.forEach(i => {
          if (this.num[i] == '.') {
            this.k = i;
          }
        });
        //先找到小数点的位置k
        var l = this.k - 1;
        var m = 1;
        for (var j = 0; j <= this.num.length - 1; j++) {
          //先计算点之前的和
          if (j < this.k) {
            for (var n = l; n > 0; n--) {
              this.num[j] = this.num[j] * 10;
            }
            this.dotBefore = this.dotBefore + this.num[j];
            l = l - 1;
          }
          //再计算点之后的和
          if (j > this.k) {
            for (var o = m; o > 0; o--) {
              this.num[j] = this.num[j] / 10;
            }
            this.dotAfter = this.dotAfter + this.num[j];
            m = m + 1;
          }
        }
        this.numValue = this.dotBefore + this.dotAfter;
      },
      hasNoDotArray() {
        this.numValue = 0; //默认输入的数值为0
        for (var j = 0; j <= this.num.length - 1; j++) {
          for (var i = this.num.length - 2 - j; i >= 0; i--) {
            this.num[j] = this.num[j] * 10;
          }
          this.numValue = this.numValue + this.num[j];
        }
        // 以上是把每次输入的数字加入到数组， 然后算他们的值；
      },
      //清空数组
      clearArray() {
        this.num.splice(0, this.num.length);
        this.numValue = null;
      },
      //归零
      clear() {
        this.showResult = null;
        this.Symbols = 0;
        // this.clearArray();
        $("#number").html('');
      },
      addNum(i) {
        //显示输入的数值
        var temp = $("#number").html();
        $("#number").html("");
        $("#number").append(temp + i);
        this.num.push(i);
      },
      //获取数值
      numString() {
        //直接把字符串转成数值
        this.numValue = parseFloat($("#number").html());
      },
      //计算符号之前的结果
      Caculation() {
        this.numString();
        if (this.numValue > 0) {
          //若存在则获得输入的数值
          //判断第一位数是否为空
          if (this.first != null) {
            //若不为空，则根据这个数组之前的符合运算;
            if (this.Symbols == 1) {
              //+
              this.first = this.first + this.numValue;
            } else if (this.Symbols == 2) {
              //-
              this.first = this.first - this.numValue;
            } else if (this.Symbols == 3) {
              //*
              this.first = this.first * this.numValue;
            } else if (this.Symbols == 4) {
              // /
              this.first = this.first / this.numValue;
            } else if (this.Symbols == 0) {
              //无符号
              this.first = this.numValue;
            }
          } else {
            this.first = this.numValue;
          }
        } else {
          //若符号前没有数组，则第一位数为上一轮的结果。
          $("#number").html('');
          console.log(`符号前面没有数字不运算；结束运算过程；`);
          this.first = this.showResult;
          // $("#number").html('');
          // $("#number").append("输入有错误");
          return;
        }
        //显示符号之前的运算结果；
        this.showResult = this.first;
        console.log(`符号前面有数字，之前的结果为：` + this.showResult);
        //清空数组；
        // this.clearArray();
      },
      //加法
      addition() {
        this.Caculation();
        $("#number").append(this.showResult);
        $("#number").html(''); //清空输入的部分
        // $("#number").append("+");
        this.Symbols = 1;
      },
      //减法
      subtraction() {
        this.Caculation();
        $("#number").append(this.showResult);
        $("#number").html('');
        // $("#number").append("-");
        this.Symbols = 2;
      },
      //乘法
      multiplication() {
        this.Caculation();
        $("#number").append(this.showResult);
        $("#number").html('');
        // $("#number").append("*");
        this.Symbols = 3;
      },
      //除法
      division() {
        this.Caculation();
        $("#number").append(this.showResult);
        $("#number").html('');
        // $("#number").append("÷");
        this.Symbols = 4;
      },
      //等于
      result() {
        this.showResult = this.first;
        this.Caculation();
        this.Symbols = 0;
        $("#number").html('');
        // this.youdian();
      }
    }
  });