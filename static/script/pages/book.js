chapter_id=location.href.split('book?').pop();

$.get('/ajax/book',function (d) {
    var windowWidth = $(window).width();
    if(windowWidth<320){
        windowWidth=320;
    }
    var offset = $($('.Swipe-tab').find('a')[0]).offset();
    var index_headre_tab_width = offset.width;
    new Vue({
        el:'#app',
        data:{

        },
        methods:{

        }
    })
},'json');