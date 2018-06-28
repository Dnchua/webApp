$.get('/ajax/classify',function (d) {
    var windowWidth = $(window).width();
    if(windowWidth<320){
        windowWidth=320;
    }
    new Vue({
        el:'#app',
        data:{
            screen_width:windowWidth,
            male_book : d.male,
            female_book : d.female
        },
        methods:{


        }
    })
},'json');