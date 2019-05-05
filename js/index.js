$(function () {


  banner()
  inTab()


});
var banner = function () {
  var getData = function (callback) {
    if (window.data) {
      callback && callback(window.data)
    } else (
      $.ajax({
        type: 'get',
        url: 'js/data.json',
        dataType: 'json',
        data: '',
        success: function (data) {
          window.data = data
          callback && callback(window.data)
        }
      })
    )
  }
  var render = function () {
    getData(function (data) {
      var isMobile = $(window).width() < 768 ? true : false
      //console.log(isMobile)
      var pointHtml = template('pointTemplate', { list: data })
      //console.log(pointHtml)
      var imageHtml = template('imageTemplate', { list: data, isMobile: isMobile })
      //console.log(imageHtml)
      //把字符渲染在页面当中
      $('.carousel-indicators').html(pointHtml)
      $('.carousel-inner').html(imageHtml)
    })
  }
//renser()
  //测试功能
  $(window).on('resize', function () {
    render()
    //通过js主动触发某个事件
  }).trigger('resize')

  //手势滑动
  var startX=0
  var distanceX=0
  var isMove=false
  $('.wjs_banner').on('touchstart',function(e){
    startX=e.originalEvent.touches[0].clientX
  }).on('touchmove',function(e){
    var moveX=e.originalEvent.touches[0].clientX
    distanceX=moveX-startX
    isMove=true
  }).on('touchend',function(e){
    if(isMove && Math.abs(distanceX)>50){
      if(distanceX<0){
        //console.log('next')
        $('.carousel').carousel('next')
      }else{
        //console.log('prev')
        $('.carousel').carousel('prev')
      }
    }
    startX=0
    distanceX=0
    isMove=false
  })
}

var inTab=function(){
  //解决换行问题
  var $navTabs=$('.wjs_product .nav-tabs')
  var width=0
  $navTabs.find('li').each(function(i,item){
    var $currLi=$(this)  //$(item)
    var liWidth=$currLi.outerWidth(true)
    width+=liWidth
  })
  //console.log(width)
  $navTabs.width(width)
  new IScroll($('.nav-tabs-parent')[0],{
    scrollX:true,
    scrollY:false,
    click:true

  })
}