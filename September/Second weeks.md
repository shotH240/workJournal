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

八、数组方法			
		
		
		