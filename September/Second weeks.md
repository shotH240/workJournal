一、vue获取{__ob__: observer}对象里面的值

		通过JSON.parse(JSON.stringify(obj.id)) 来获取
		
二、this.$set()和Vue.set的用法


三、数组方法 filter

	用法：
		 let arr = [
					{ value: 'one', flag:true}, { value: 'two', flag:true},
					{ value: 'three', flag:false}, { value: 'four', flag:true},
					{ value: 'five', flag:false}
				]
				let res = arr.filter(i=>{
					console.log(i)
					return i.flag === true
				})
				console.log('res', res)		//  value:one   value:two  value:four
			
	Tip:
		filter方法创建一个新数组,新数组的元素是通过检查指定数组中符合条件的所有元素
		filter方法对空数组无效
		filter方法不会改变原数组
		
四、数组方法 Array.of

	用法：
		let result = Array.of(1,2,3)    // [1,2,3]
            result = Array.of(arr)  // [arr]
            result = Array.of(res)  // [res]
            result = Array.of(arr,res)  //[[arr],[res]]
            console.log('result', result)
	
	Tip:
		1 Array的参数
			和[Array()以及new Array()]的区别  --Array创建的数组在没有参数、一个参数、多个参数时返回的结果都不一样
			--	Array()	无参数时,返回的是个空数组	let arr3 = Array();	//[]
			--	Array(3) 一个参数时,若参数为数字,则返回的是个长度为3的数组;	//[empty × 3]  
			--  Array(1,2) 多个参数时,则参数则会作为数组的元素;  //  [1,2]
		2 empty和null
			--  当你尝试在页面输出一个变量时,javascript会自动调用toString()方法
			(1) empty
				-- 当给数组设置 length 时，如果大于数组本身长度，新元素则会以 empty 填充
					arr3 = Array(3);
					console.log('一个参数的Array：', arr3) //  [empty × 3]
				-- 循环有empty的数组时,empty的下标会被渲染成undefined
			
			(2) 因为javascript的机制,页面上的变量都会被调用toString方法,如果想让empty呈现为null,可通过JSON.stringify方法	

五、页面跳转样式错位但是刷新又好了的情况

		解决方案：
			在首页的style中加上scoped
			
六、为网站提供导航功能的菜单	Element-ui：  NavMenu	关键字：Submenu	

七、数组方法 find和findIndex
		1.find	用于找出第一个符合条件的数组成员(从下标0开始一直找到最后一个元素),
				他和findIndex一样,第一个参数接受一个回调函数,
				第二个参数接收的是一个对象,用以改变回调函数的this指向
				
				第一个参数回调函数同样接收三个参数：
					value：根据return结果,得到的是第一个满足条件的数组成员以及不满足条件的其他数组成员(当前值)
					index：根据return结果,得到的是第一个满足条件的数组成员的下标以及不满足条件的其他数组成员的下标
					arrs:  原数组
			
			实例：	
				let person = [{id: 1, name: 'Tom'},{id:2, name: 'Jerry'},{id:3, name: 'Demo'}]

				let res = person.find((value,index,arrs) => {
					console.log(value)
					return value.id > 1
				})	
				console.log('res', res)		//  res {id: 2, name: "Jerry"}
		
		2.findIndex		
			--	findIndex和find功能及用法几乎是一致的,
			    不同的是find返回的是数组成员,findIndex返回的是对应的数组成员下标
				
			--  如果所有成员都不满足,findIndex返回的是 -1 
				而find返回的是undefined

八、数组方法 copyWithin

		作用：在当前数组内部,将制定位置的成员复制到其他位置(会覆盖原先成员),并返回当前数组
		
		用法：
			 let arr = [1,2,3,4,5]

			// arr.copyWithin(0,3) // 4,5,3,4,5

			// arr.copyWithin(0,3,4)  // 4,2,3,4,5

			arr.copyWithin(2,-2,-1) //1,2,4,4,5

			console.log(arr)
			
		Tip:
			1.copyWithin会修改原数组
			2.copyWithin接收三个参数
				(1)target(必需)：从该位置开始替换数据,可为负数。(如果为负数,则为倒数)
				(2)start(可选)： 从该位置开始读取数据,默认为0,可为负数。(负数则从末尾开始计算)
				(3)end(可选)：	 到该位置前停止读取数据,默认值为数组长度,可为负数。(负数则从末尾开始计算)
		
		
九、数组方法 includes

		作用：该方法返回一个布尔值,表示某个数组是否包含指定的值

		用法：
			let arr = [3,4,5,6,12,NaN]

			console.log(arr.includes(2))    // false
			console.log(arr.includes(NaN))  // true
			console.log(arr.includes(4,3))  // false
			
		Tip：
			params：
				(1)该参数对应的是要搜索的内容
				(2)该参数对应的是搜索的起始位置,默认为0,
				   当值为负数时,则表示倒数的位置,如果此时它大于数组长度,则会重置到0开始
				   
				   
十、数组方法 entries、keys、values
		
		作用：三个方法都用于遍历数组,返回的是一个遍历器对象,可以用for..of循环进行遍历
		
		区别：entries是对键值对的遍历,
			  keys是对键的遍历,
			  values是对值的遍历。
			  

		用法：
			 let arr = ['a','b','c']
			 let arr1 = arr.entries();       // [0,'a'][1,'b'][2,'c']
			 let arr2 = arr.keys();          // [0,1,2]
			 let arr3 = arr.values();        // [a,b,c]
			 for (let item of arr3) {
               console.log(item) 
			 }		

十一、数组方法 fill
		
		作用：fill方法给定一个值,用以填充数组,如果数组填充时存在已有的元素,会被全部抹去
		
		Tip：
			1.params：
				(1)fill第一个参数为必填项,表示要填充的数据
				(2)fill第二个参数为可选项,用于指定填充的起始位置(不包含该下标,并且通过该方法设置的下标是从1开始)
				(3)fill第三个参数为可选项,用于指定填充的结束位置(包含该下标)
				
			2.
				(1)fill更多时是作用于空数组的填充
				(2)fill方法会改变原数组
				(3)如果填充的类型为对象,那么被赋值的就是同一个内存地址的对象,并不是深拷贝
				
		用法：
			    let arr = ['a','b','c','d']

				arr.fill('D',2,3)   //["a", "b", "D", "d"]

				console.log('fill：', arr)

十二、数组方法 flat
		
		作用：用于将嵌套的数组拉取出来,变成一维数组
		
		Tip：
			1.  flat接收一个number类型的数字为参数(不写则默认为0),1代表拉取一层,2代表拉取两层,以此类推
			2.	也可以直接使用Infinity作为关键字,不管有多少层,都要转变为一维数组
			3.	该方法返回的是一个新数组,不会改变原数组
				
		用法：
			let arr = ['a','b',['c','d']]

			let res = arr.flat()    // ["a", "b", "c", "d"]

			let arr2 = ['a',['b',['c','d']],'e']

			res = arr2.flat(2)      //["a", "b", "c", "d", "e"]

			let arr3 = ['a',['b',['c',['d',['f']]]]]

			res = arr3.flat(Infinity)   //["a", "b", "c", "d", "f"]

			console.log('新数组', res)		

		
		