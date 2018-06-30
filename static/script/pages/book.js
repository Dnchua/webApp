var chapter_id=location.href.split('book/').pop();
$.get('/ajax/book',{
    id : chapter_id
    },
    function (d) {
        var windowWidth = $(window).width();
        if(windowWidth<320){
            windowWidth=320;
        }
        var data_book = d;
        new Vue({
            el:'#app',
            data :{
                screen_width:windowWidth,
                items : data_book,
                show : true
            },
            methods:{

            }
        })
},'json')


