var chapter_id=location.href.split('catelog/').pop();
$.get('/ajax/catelog',{
    id:chapter_id
},function (d) {
    var windowWidth = $(window).width();
    if(windowWidth<320){
        windowWidth=320;
    };
    new Vue({
        el:'#app',
        data:{
            title:d.chapters,
            highlight:'Swipe-tab__on',
            screen_width:windowWidth
        },
        methods:{

        }
    })
},'json');