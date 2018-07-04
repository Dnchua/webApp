var chapter_id=location.href.split('catelog/').pop();
let Util = (function () {
    let prefix = 'ficiton_reader_';
    let StorageGetter = function(key) {
        return localStorage.getItem(prefix + key);
    };
    let StorageSetter = function(key, val) {
        return localStorage.setItem(prefix + key, val);
    };
    return {
        StorageGetter : StorageGetter,
        StorageSetter : StorageSetter
    }
})();
$.get('/ajax/catelog',{
    id:chapter_id
},function (d) {
    let arr=[];
    arr.push(d);
    Util.StorageSetter('chapterList',JSON.stringify(arr));
    var windowWidth = $(window).width();
    if(windowWidth<320){
        windowWidth=320;
    };
    new Vue({
        el:'#app',
        data:{
            title:d.chapters,
            highlight:'Swipe-tab__on',
            screen_width:windowWidth,
            backReader:chapter_id
        },
        methods:{
            addChapters : function (data) {
                let cv = data.currentTarget.attributes[1].nodeValue;
                Util.StorageSetter(chapter_id+'last_chapter',cv);
            }
        }
    })
},'json');