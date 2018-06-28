var windowWidth = $(window).width();
if(windowWidth<320){
    windowWidth=320;
}
new Vue({
    el : "#app_search",
    data:{
        search:[],
        condition:true,
        empty:true,
        screen_width:windowWidth
    },
    methods :{
        doSearch:function (e) {
            var keyword = $('#search-val').val();
            var _this = this;
            $.get('/ajax/search',{
                keyword:keyword
            },function (d) {
                    _this.search = d.books;
                    if(_this.search.length == 0){
                        _this.empty = false;
                    }else{
                        _this.empty = true;
                    }
            },'json')
        }
    }
})