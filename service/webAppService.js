var fs = require('fs');
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
    var content = fs.readFileSync('./mock/home.json','utf-8');
    return content;
}
exports.get_catelog_data = function () {
    var content = fs.readFileSync('./mock/book/catelog.json','utf-8');
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
            keyword : keyword
        };
        var content = qs.stringify(data);
        var http_request = {
            hostname : 'novel.juhe.im',
            port: 80,
            path : '/search?' + content,
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
exports.get_search_data_online = function (key,start,end) {
    return function (cb) {
        var http = require('http');
        var qs   = require('querystring');
        var data = {
            key : key,
            start:start,
            end :end
        };
        var content = qs.stringify(data);
        var http_request = {
            protocol : 'https',
            hostname : 'www.apiopen.top',
            port: 80,
            path : './novelInfoApi?name=' + content,
            method:'GET'
        }
        debugger;
        req_obj = http.request(http_request,function (_res) {
            var callback_content = '';
            var _this = this;
            var content = '';
            _res.setEncoding('utf8');
            _res.on('data',function (chunk) {
                content += chunk;
            });
            _res.on('end',function () {
                cb(null,content);
            })
        });

        req_obj.on('error',function () {

        });
        req_obj.end();
    }
}