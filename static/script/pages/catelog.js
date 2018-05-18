$.get('/ajax/catelog',function (d) {
    var windowWidth = $(window).width();
    if(windowWidth<320){
        windowWidth=320;
    }
    new Vue({
        el:'#app',
        data:{
            title:d.item.toc,
            highlight:'Swipe-tab__on',
            screen_width:windowWidth
        }
    })
},'json');