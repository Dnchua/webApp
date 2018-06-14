var idd = '53115e30173bfacb4904897e';

const axios =require('axios');
const ajax = function (id) {
    return new Promise (function (resolve,reject) {
        let promise;
        let url = 'http://novel.juhe.im/book-info/53115e30173bfacb4904897e';
        promise = axios.get(url);
        promise.then(function (value) {
            resolve(value.data)
        }).catch(function (error) {
            console.log('caught',error)
        })
    })
}
content = function (id) {
    return ajax(id);
};
async function test() {
    const v1 = await ajax();
    console.log(v1);
}
test()
