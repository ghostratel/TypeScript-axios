import request from '../../../src/index'



document.getElementById('download')!.addEventListener('click', function(){
  request.get('http://img1.sycdn.imooc.com/5d22db6300012cc016000540.jpg', {
    onDownloadProgress: function(e:ProgressEvent) {
      console.log(`下载进度: ${e.loaded / e.total * 100}%`)
    }
  })
})



document.getElementById('upload')!.addEventListener('click', function(){
  let formData = new FormData()
  const files = document.getElementById('file') as HTMLInputElement

  formData.append('file', files.files![0])


  request({
    url: 'http://localhost:9999/upload',
    data: formData,
    method: 'post',
    onUploadProgress: function(e:ProgressEvent) {
      console.log(`上传进度: ${e.loaded / e.total * 100}%`)
    }
  })
})
