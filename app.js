var koa         = require('koa');
var controller  = require('koa-route');
var app         = koa();
var views       = require('co-views');
var render      = views('./view',{
    map : {html : 'ejs'}
});
var koa_static  = require('koa-static-server');
var service     = require('./service/webAppService.js');
var querystring = require('querystring');
var http        = require('http');
var url         = require('url');
var axios = require('axios');
app.use(koa_static({
    rootDir : './static/',
    rootPath: '/static/',
    maxage : 0
}))



app.use(controller.get('/ejs_test',function *() {
    this.set('Cache-Control','no-cache');
    this.body = yield render('test',{title : 'title_test'});
}));

app.use(controller.get('/',function *() {
    this.set('Cache-Control','no-cache');
    this.body = yield render('index',{title : '书城首页'});
}));
app.use(controller.get('/catelog/:id',function *() {
    this.set('Cache-Control','no-cache');
    this.body = yield render('catelog',{title : '目录'});
}));
app.use(controller.get('/search',function *() {
    this.set('Cache-Control','no-cache');
    this.body = yield render('search',{title : '搜索界面'});
}));
app.use(controller.get('/female',function *() {
    this.set('Cache-Control','no-cache');
    this.body = yield render('female',{title : '女生频道'});
}));
app.use(controller.get('/male',function *() {
    this.set('Cache-Control','no-cache');
    this.body = yield render('male',{title : '男生频道'});
}));
app.use(controller.get('/classify',function *() {
    this.set('Cache-Control','no-cache');
    this.body = yield render('classify',{title : '分类'});
}));
app.use(controller.get('/free',function *() {
    this.set('Cache-Control','no-cache');
    this.body = yield render('free',{title : '限时免费'});
}));
app.use(controller.get('/rank',function *() {
    this.set('Cache-Control','no-cache');
    this.body = yield render('rank',{title : '排行'});
}));
app.use(controller.get('/reader/:id',function *() {
    this.set('Cache-Control','no-cache');
    this.body = yield render('reader',{title : '本体'});
}));
app.use(controller.get('/book/:bookId',function *() {
    this.set('Cache-Control','no-cache');
    var params = querystring.parse(this.req._parsedUrl.query);
    var bookId = params.id;
    this.body = yield render('book',{title:'书籍详情',bookId:bookId});
}));
//获取模拟数据得方法
app.use(controller.get('/api_test',function *() {
    this.set('Cache-Control','no-cache');
    this.body = service.get_test_data();
}));

app.use(controller.get('/ajax/index',function *() {
    this.set('Cache-Control','no-cache');
    this.body = service.get_index_data();
}));
//真实请求线上数据
app.use(controller.get('/ajax/search',function *() {
    this.set('Cache-Control','no-cache');
    this.set('Access-Control-Allow-Origin','*');
    var querystring = require('querystring');
    var params      = querystring.parse(this.req._parsedUrl.query);
    var keyword       = params.keyword;
    this.body = yield service.get_search_data(keyword);
}));
app.use(controller.get('/ajax/rank',function *() {
    this.set('Cache-Control','no-cache');
    this.body = service.get_rank_data();
}));
app.use(controller.get('/ajax/classify',function *() {
    this.set('Cache-Control','no-cache');
    this.body = service.get_classify_data();
}));
app.use(controller.get('/ajax/chapter',function *() {
    this.set('Cache-Control','no-cache');
    this.body = service.get_chapter_data();
}));
app.use(controller.get('/ajax/catelog',function *() {
    this.set('Cache-Control','no-cache');
    var querystring = require('querystring');
    var params      = querystring.parse(this.req._parsedUrl.query);
    var id       = params.id;
    this.body = yield service.get_catelog_data_online(id);
}));
app.use(controller.get('/ajax/book',function *() {
    this.set('Cache-Control','no-cache');
    var querystring = require('querystring');
    var params      = querystring.parse(this.req._parsedUrl.query);
    var id       = params.id;
    this.body =yield service.get_book_data_online(id);
}));



app.use(controller.get('/ajax/test',function *() {
    this.set('Cache-Control','no-cache');
    var querystring = require('querystring');
    var params      = querystring.parse(this.req._parsedUrl.query);
    var id          = params.id;
    var start       = params.start;
    var count       = params.count;
    var click       = params.click;
    this.body =yield service.get_xjb_online(id,start,count,click);
}));




app.use(controller.get('/ajax/chapter/data',function *() {
    this.set('Cache-Control','no-cache');
    var querystring = require('querystring');
    var params      = querystring.parse(this.req._parsedUrl.query);
    var id       = params.id;
    if(!id){
        id = "";
    }
    this.body = service.get_chapter_content_data(id);
}));
app.use(controller.get('/ajax/chapterContent',function *() {
    this.set('Cache-Control','no-cache');
    var querystring = require('querystring');
    var params      = querystring.parse(this.req._parsedUrl.query);
    var id       = params.id;
    var cv       = params.cv;
    this.body =yield service.get_chapterContent_online(id,cv);
}));


app.listen(3001);
console.log('Koa server is started!');