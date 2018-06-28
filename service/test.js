// exports default{
//     async getChapterContent(ctx) {
//         var book-chapterContent = 'http://chapter2.zhuishushenqi.com/chapter';
//         const chapterContent = await axios.get(book-chapterContent + `/${ctx.params.link}`);
//         ctx.body = chapterContent.data;
//     }
// }
var axios = require('axios');
var ss = async function (ctx) {
            var bookchapterContent = 'http://chapter2.zhuishushenqi.com/chapter/http://vip.zhuishushenqi.com/chapter/56f8da0a176d03ac1983f6f6?cv=15271418534681';
            const chapterContent = await axios.get(bookchapterContent);
            console.log(chapterContent);
}
ss('123')