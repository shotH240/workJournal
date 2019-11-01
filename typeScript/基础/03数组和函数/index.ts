// 数组
let arr1: number[] = [1,2,3]
arr1.push(4)
// arr1.push('5')  // 报错 因为该数组已经指定类型

// let arr2: string[] = arr1 // 报错  该数组类型为字符串

let arr2: any[] = ['Hello', 1, true]  // 任意类型的数组可用any表示
console.log('arr1', arr1)
console.log('arr2', arr2)

// 函数

// (1) 函数的声明式写法
// 该函数为参数指定了类型和默认值,以及返回值的类型
// 函数的实参必需与形参的数量、类型一致,除非设置了默认值
function add(a: number = 1, b: number = 2): number {    // 声明式写法
    return a + b
}

let result = add(3)
console.log('result', result)

// (2) 函数表达式
// 函数表达式以第一个箭头为界,左边的是输入类型,右边为输出类型(并且该表达式也使用了es6的箭头函数)
let sum: (a: number, b: number) => number = (a: number, b: number): number => { // 函数表达式
    return a + b
}

result = sum(3, 4)
console.log('result', result)

// (3) 接口描述函数

interface SearchFunc {
    (source: string, str: string): string
}

let myFun: SearchFunc = (source: string, str:string) =>  `${source}  ${str}`

let res = myFun('Hello', 'World')
console.log('res', res)

function fun2 (...value) {
  let res = 0
  
  for (let val of value) {
    res += val
  }
  console.log('res', res)
}

fun2(1,3,5,7,9)