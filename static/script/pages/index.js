$.get('/ajax/index',function (d) {
    var windowWidth = $(window).width();
    if(windowWidth<320){
        windowWidth=320;
    }
    var offset = $($('.Swipe-tab').find('a')[0]).offset();
    var index_headre_tab_width = offset.width;
    new Vue({
        el:'#app',
        data:{
            screen_width:windowWidth,
            double_window_width:windowWidth*2,
            index_headre_tab_width:index_headre_tab_width,
            top:d.items[0].data.data,
            hot:d.items[1].data.data,
            recommend:d.items[2].data.data,
            female:d.items[3].data.data,
            male:d.items[4].data.data,
            free:d.items[5].data.data,
            topic:d.items[6].data.data,
            duration:0,
            position:0,
            header_position:0,
            header_duration:0,
            tab_1_class:'Swipe-tab__on',
            tab_2_class:'',
            tab_male_class : 'tab__on',
            tab_female_class : '',
            tab_flag :0
        },
        methods:{
            tabChange : function(pos){
                    this.duration = 0.5;
                    this.header_duration = 0.5;
                    if(pos == 0){
                        this.position = 0;
                        this.header_position = 0;
                        this.tab_1_class = "Swipe-tab_on";
                        this.tab_2_class = "";
                    }else{
                        this.position = (-windowWidth);
                        this.header_position = index_headre_tab_width;
                        this.tab_2_class = "Swipe-tab_on";
                        this.tab_1_class = "";
                    }
            },
            tab_NV : function (tab_flag) {
                    if(tab_flag==0){
                        this.tab_male_class = 'tab__on';
                        this.tab_female_class = '';
                    }
                    else{
                        this.tab_male_class = '';
                        this.tab_female_class = 'tab__on';
                    }
            }

        }
    })
},'json');