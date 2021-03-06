var chapter_id=location.href.split('book/').pop();
let Util = (function () {
    let prefix = 'shelf_';
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
$.get('/ajax/book',{
    id : chapter_id
    },
    function (d) {
    if (d.advertRead == true) {
        let hasThisBook = JSON.parse(Util.StorageGetter('bookIdList'));
        let flag,//flag为true时表示书架里没有这本书，可以添加
            color;
        if (hasThisBook!==null) {
            if (hasThisBook.indexOf(chapter_id) != -1) {
                flag = false;
                color = 'colorChange';
            } else {
                flag = true;
                color = '';
            }
        }else{
            flag = true;
            color = '';
        }
        var windowWidth = $(window).width();
        if (windowWidth < 320) {
            windowWidth = 320;
        }
        var data_book = d;
        new Vue({
            el: '#app',
            data: {
                screen_width: windowWidth,
                items: data_book,
                vip:window.mainTarget,
                show: true,
                flag_shelf: flag,
                controlColor: color,
                source : [],
                source_show:false
            },
            methods: {
                storeShelf: function () {
                    var bookIdList = 'bookIdList',
                        bookList = 'bookList';
                    if (flag && !(Util.StorageGetter(bookIdList) === null)) {
                        var arr1 = JSON.parse(Util.StorageGetter(bookIdList));
                        var arr2 = JSON.parse(Util.StorageGetter(bookList));
                        arr1.push(chapter_id);
                        arr2.push(d);
                        Util.StorageSetter(bookIdList, JSON.stringify(arr1));
                        Util.StorageSetter(bookList, JSON.stringify(arr2));
                        this.flag_shelf = false;
                        flag = false;
                        this.controlColor = 'colorChange';
                    } else if (flag) {
                        var arr1 = [],
                            arr2 = [];
                        arr1.push(chapter_id);
                        arr2.push(d);
                        Util.StorageSetter(bookIdList, JSON.stringify(arr1));
                        Util.StorageSetter(bookList, JSON.stringify(arr2));
                        this.flag_shelf = false;
                        flag = false;
                        this.controlColor = 'colorChange';
                    }
                    else if (!flag) {
                        let arr1 = JSON.parse(Util.StorageGetter(bookIdList));
                        let arr2 = JSON.parse(Util.StorageGetter(bookList));
                        let count = arr1.indexOf(chapter_id);
                        arr1.splice(count, 1);
                        arr2.splice(count, 1);
                        Util.StorageSetter(bookIdList, JSON.stringify(arr1));
                        Util.StorageSetter(bookList, JSON.stringify(arr2));
                        flag = true;
                        this.flag_shelf = true;
                        this.controlColor = '';
                    }
                },
                changeSource1 : function () {
                    let _this = this;
                    $.get('/ajax/source',{
                        view : 'summary',
                        book : chapter_id
                    },function(d){
                        _this.source = d;
                        if(_this.source.length == 0){
                            _this.source_show = false;
                        }else{
                            _this.source_show = true;
                        }
                    },'json')
                },
                changeSource : function () {
                    let _this = this;
                    $.get('/ajax/source',{
                        view : 'summary',
                        book : chapter_id
                    },function(d){
                        window.location.href = '/reader_test/' + d[0]._id;
                    },'json')
                }
            },
            mouted: {

            }
        })
    }
},'json');


