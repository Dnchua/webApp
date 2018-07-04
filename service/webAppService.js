var fs = require('fs');
var axios = require('axios');
exports.get_test_data = function () {
    var content = fs.readFileSync('./mock/test.json','utf-8');
    return content;
}
exports.get_chapter_data = function () {
    var content = fs.readFileSync('./mock/chapter.json','utf-8');
    return content;
}
exports.get_chapter_content_data = function (id) {
    if(!id){
        id="1";
    }
    var content = fs.readFileSync('./mock/reader/data/data' + id + '.json','utf-8');
    return content;
}
exports.get_book_data = function (id) {
    if(!id){
        id="18218";
    }
    var content = fs.readFileSync('./mock/book/' + id + '.json','utf-8');
    return content;
}
exports.get_index_data = function () {
    var content = fs.readFileSync('./mock/newHome.json','utf-8');
    return content;
}
exports.get_catelog_data = function () {
    var content = fs.readFileSync('./mock/book/catelog.json','utf-8');
    return content;
}
exports.get_classify_data = function () {
    var content = fs.readFileSync('./mock/book/classify.json','utf-8');
    return content;
}
exports.get_rank_data = function () {
    var content = fs.readFileSync('./mock/rank.json','utf-8');
    return content;
}

exports.get_search_data = function (keyword) {
    return function (cb) {
        var http = require('http');
        var qs   = require('querystring');
        var data = {
            query : keyword
        };
        var content = qs.stringify(data);
        var http_request = {
            hostname : 'api.zhuishushenqi.com',
            port: 80,
            path : '/book/fuzzy-search?' + content,
            method:'GET'
        };
        req_obj = http.request(http_request,function (_res) {
            var body = '';
            _res.setEncoding('utf-8');
            _res.on('data',function (chunk) {
                body += chunk;
            });
            _res.on('end',function () {
                cb(null,body);
            });
        });
        req_obj.end();
    }
}
exports.get_catelog_data_online = function (id) {
    return function (cb) {
        var http = require('http');
        var qs   = require('querystring');
        var data = {
            id : id
        };
        var content = qs.stringify(data);
        var http_request = {
            hostname : 'api.zhuishushenqi.com',
            port: 80,
            path : '/atoc/'+id+'?view=chapters',
            method:'GET'
        };
        req_obj = http.request(http_request,function (_res) {
            var body = '';
            _res.setEncoding('utf-8');
            _res.on('data',function (chunk) {
                body += chunk;
            });
            _res.on('end',function () {
                cb(null,body);
            });
        });
        req_obj.end();
    }
}
exports.get_book_data_online = function (id) {
    return function (cb) {
        var http = require('http');
        var qs   = require('querystring');
        var data = {
            id : id
        };
        var content = qs.stringify(data);
        var http_request = {
            hostname : 'api.zhuishushenqi.com',
            port: 80,
            path : '/book/'+id,
            method:'GET'
        };
        req_obj = http.request(http_request,function (_res) {
            var body = '';
            _res.setEncoding('utf-8');
            _res.on('data',function (chunk) {
                body += chunk;
            });
            _res.on('end',function () {
                cb(null,body);
            });
        });
        req_obj.end();
    }
}

exports.get_xjb_online = function (id,start,count,click) {
    return function (cb) {
        var http = require('http');
        var qs   = require('querystring');
        var data = {
            start : start,
            count : count,
            click : click
        };
        var content = qs.stringify(data);
        var http_request = {
            hostname : 'dushu.xiaomi.com',
            port: 80,
            path : '/store/v0/fiction/category/'+id +'?'+ content,
            method:'GET'
        };
        req_obj = http.request(http_request,function (_res) {
            var body = '';
            _res.setEncoding('utf-8');
            _res.on('data',function (chunk) {
                body += chunk;
            });
            _res.on('end',function () {
                cb(null,body);
            });
        });
        req_obj.end();
    }
}
exports.get_chapterContent_online =function (id,cv) {
    return function (cb) {
        var http = require('http');
        var qs   = require('querystring');
        var data = {
            cv : cv
        };
        var content = qs.stringify(data);
        var mainUrl = 'http://vip.zhuishushenqi.com/chapter/'+id+'?'+content;
        var urls = encodeURIComponent(mainUrl);
        var http_request = {
            hostname : 'chapter2.zhuishushenqi.com',
            port: 80,
            path : '/chapter/' + urls,
            method:'GET'
        };
        var req_obj = http.request(http_request,function (_res) {
            var body = '';
            _res.setEncoding('utf-8');
            _res.on('data',function (chunk) {
                body += chunk;
            });
            _res.on('end',function () {
                cb(null,body);
            });
        });
        req_obj.end();
    }
}
exports.get_source_data =function (view,id) {
    return function (cb) {
        var http = require('http');
        var qs   = require('querystring');
        var data = {
            view : view,
            book : id
        };
        var content = qs.stringify(data);
        var http_request = {
            hostname : 'api.zhuishushenqi.com',
            port: 80,
            path : '/atoc?' + content,
            method:'GET'
        };
        var req_obj = http.request(http_request,function (_res) {
            var body = '';
            _res.setEncoding('utf-8');
            _res.on('data',function (chunk) {
                body += chunk;
            });
            _res.on('end',function () {
                cb(null,body);
            });
        });
        req_obj.end();
    }
}



