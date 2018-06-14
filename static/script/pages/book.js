var chapter_id=location.href.split('book?').pop();
var idd = '112233' ;
var serv = require('/service/test.js');
serv.content(idd);
    // new Vue({
    //     el:'#app',
    //     mounted :{
    //         serv.content(idd).then(function (response) {
    //             console.log(response.data);
    //     })
    //     },
    //     data:{
    //
    //     },
    //     methods:{
    //
    //     }
    // })
