// 数组
var arr1 = [1, 2, 3];
arr1.push(4);
// arr1.push('5')  // 报错 因为该数组已经指定类型
// let arr2: string[] = arr1 // 报错  该数组类型为字符串
var arr2 = ['Hello', 1, true]; // 任意类型的数组可用any表示
console.log('arr1', arr1);
console.log('arr2', arr2);
// 函数
// (1) 函数的声明式写法
// 该函数为参数指定了类型和默认值,以及返回值的类型
// 函数的实参必需与形参的数量、类型一致,除非设置了默认值
function add(a, b) {
    if (a === void 0) { a = 1; }
    if (b === void 0) { b = 2; }
    return a + b;
}
var result = add(3);
console.log('result', result);
// (2) 函数表达式
// 函数表达式以第一个箭头为界,左边的是输入类型,右边为输出类型(并且该表达式也使用了es6的箭头函数)
var sum = function (a, b) {
    return a + b;
};
result = sum(3, 4);
console.log('result', result);
var myFun = function (source, str) { return source + "  " + str; };
var res = myFun('Hello', 'World');
console.log('res', res);
function fun2() {
    var value = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        value[_i] = arguments[_i];
    }
    var res = 0;
    for (var _a = 0, value_1 = value; _a < value_1.length; _a++) {
        var val = value_1[_a];
        res += val;
    }
    console.log('res', res);
}
fun2(1, 3, 5, 7, 9);
//# sourceMappingURL=index.js.map