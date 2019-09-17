
一、

	淘宝镜像源：
	npm install --global electron --registry=https://registry.npm.taobao.org	安装

	npm config list	测试

-----------------------------------------


二、
	npm install 报错node-pre-gyp ERR!

		解决方案：
				npm install --python=python2.7(如果没安装python2.7,则优先进行这一步)
				
				npm install --global --production windows-build-tools
				
				npm install -g node-gyp
				
-----------------------------------------			

三、			
	il8n转换写法：
				
		js中：this.$t('calendar.days')
		html标签中:  {{$t('calendar.monday')}} 
		在标签属性中：:label="$t('calendar.weeklyRepeat')"
		
			 <Option :label="$t('calendar.weeklyRepeat')" :value="1" ></Option>
				<Option :label="$t('calendar.weeklyRepeat')" :value="2" ></Option>
				<Option :label="$t('calendar.weeklyRepeat')" :value="3" ></Option>
			
-----------------------------------------

Driver.js


四、Object的hasOwnproperty方法
	
	Object的hasOwnProperty()方法返回一个布尔值，判断对象是否包含特定的自身（非继承）属性。(判断该对象中是否拥有该属性)
	data.hasOwnProperty('enProperty')   =>  判断data对象中是否存在  enProperty属性
	
	

五、标签中调用utils	

		{{$toggleLang(menu)}}
		
		
六、GitHub Desktop(git开发工具)