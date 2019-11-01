/**
 * typescript的类型分两种  原始数据类型和对象类型
 * 原始数据类型：boolean,number,string,undefined,null,Symbol
 */

let flag: boolean = true    // 布尔

console.log(flag)

let num: number = 1     // 数值

console.log(num)

let str: string = 'Hello' //字符串

console.log(str)

/**
 * 空值 void
 * 表示没有任何返回值的函数
 * 注：定义变量时为其定义void是无效的,因为他只能被赋值为undefined和null
 */

 function sayHello(): void {
   console.log('Hello World')
 }

 sayHello()

 let und: undefined = undefined // undefined
 let none: null = null // null

 // undefined和null类型的数据可以赋值给number类型的变量,但是void就不行
 let n: number = undefined
 n = null
 console.log(n)


 /**
  * 任意值 any
  * 
  * (1) 任意值表示允许赋值为任意类型
  * (2) 普通类型声明了后,赋值过程中改变类型是不被允许的
  * (3) 变量在声明的时候,未指定其类型,并且没有赋值,那么他会被识别为任意值类型
  */

  let anyThing: any = 'Hello'

  console.log(anyThing)

/**
 * 类型推论
 * (1) 当一个变量在创建后赋值,则会被typeScript自动推测出一个类型,
 *    如果对该变量再进行其他类型的赋值,将会报错。
 * (2) 如果一个变量在创建后没有赋值,则会被推断为any类型
 */

 let type = true    // 已被声明成布尔型
//  type = 1    //报错


/**
 * 联合类型
 * (1) 联合类型表示取值可以为多种类型中的一种
 * (2) 联合类型的变量在被赋值的时候，会根据类型推论的规则推断出一个类型,当访问该变量的方法时,除非这几个类型都具备,否则报错
 */
let myFavoriteNumber: string | number = 20
myFavoriteNumber = 'str'
console.log(myFavoriteNumber)

