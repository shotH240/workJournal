(function (win, doc) {
  function xjFile(opt) {    //opt 将获取xjFile实例时传递过来的所有参数
    let defaultOption = {
      el: doc.body, // 绑定的dom节点,若无绑定,默认为body
      accept: '*',  // 文件格式
      className: 'xj-wrap', // 节点的class
      result: '',  // 处理完成后得到的图片字节码
      beforeUpload: function (e) { console.log(e)}, // 上传前
      onProgress: function (e) { console.log(e)},   // 读取进度
      onLoad: function (e) { console.log(e, this.result)}, // 读取完成
      onError: function (e) { console.log('文件读取错误', e)} // 读取错误
    }

    // 获取Dom
    if (opt.el) {
      opt.el = typeof opt.el === 'Object' ? opt.el : document.querySelector(opt.el)
    }

    // 将实例对象传递过来的参数与xjFile构造函数合并
    this.opt = minix(defaultOption, opt)
    this.value = ''
    this.init()

  }
    xjFile.prototype.init = function () {
      this.render()
      this.watch()
    }

    // 创建文件节点
    xjFile.prototype.render = function () {
      // 创建fragment对象
      let fragment = document.createDocumentFragment()
      let file = document.createElement('input')
      let imgBox = document.createElement('div')

      file.type = 'file'
      file.accept = this.opt.accept || '*'
      file.className = 'xj-file'
      imgBox.className = 'xj-pre-img'

      // 将文件和图片插入fragment
      fragment.appendChild(file)
      fragment.appendChild(imgBox)

      // 给包裹组件设置class
      this.opt.el.className = this.opt.className
      // 将fragment插入该包裹组件
      this.opt.el.appendChild(fragment)
    }

    // 读取文件
    xjFile.prototype.watch = function () {
      let ipt = this.opt.el.querySelector('.xj-file')   // 获取文件框
      let that = this

      // 监听文件框的状态
      ipt.addEventListener('change', (ev) => {
        //  this.files获取input中上传的file对象  是个数组
        let file = ipt.files[0]
        that.value = file
        // 创建读取文件对象
        let fileReader = new FileReader()
        console.log('fileReader', fileReader)

        // 文件开始读取
        fileReader.onloadstart = ev => {
            // 判断文件类型是否为*   并且  是否不为转换为小写后的格式
          if (that.opt.accept !== '*' && that.opt.accept.indexOf(file.type.toLowerCase()) === -1) {
            fileReader.abort()    // 中断读取操作
            that.opt.beforeUpload(file, ev) // 中断操作的错误抛出去
            console.error('文件格式有误')
          }
        }

        // 文件读取完成
        fileReader.onload = ev => {
          let imgBox = this.opt.el.querySelector('.xj-pre-img')
          if (isImage(file.type)) {     // 判断是否为图片类型
            imgBox.innerHTML = ''   // 初始化图片展示区域
            console.log('result', fileReader.result)
            this.opt.result = fileReader.result
            imgBox.style.backgroundImage = `url(${fileReader.result})`  // 将保存在result中的文件设置为图片层的背景图
          } else {
            imgBox.innerHTML = fileReader.result
          }
          imgBox.title = file.name  // 设置图片名称
          this.opt.onLoad(ev)   //图片读取完成
        }
        // 文件读取出错
        fileReader.onerror = ev => {
          this.opt.onError(ev)
        }

        // 文件读取进度
        fileReader.onprogress = ev => {
          this.opt.onProgress(ev)
        }

        isImage(file.type) ? fileReader.readAsDataURL(file) : fileReader.readAsText(file)
      }, false)
    }

    // 对象混合
    function minix (source, target) {
        // 将实例传入过来的对象混入defaultOption中
        for (let key in target) {
          source[key] = target[key]
        }
        return source
      }

    
    // 检测图片类型
    function isImage(type) {
      let reg = /(image\/jpeg|image\/jpg|image\/gif|image\/png)/gi
      return reg.test(type)
    }
    
    // 将方法挂载到Dom上
    win.xjFile = xjFile
  
  
})(window, document)