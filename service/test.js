
var id = '56f8da09176d03ac1983f6cd';
var Chapters = [];
var getFictionInfoPromise = new Promise(function(resolve, reject) {
    $.get("/ajax/catelog", {
        id : id
    },function(data) {
        console.log(data.result);
        if (data.result == 0) {
            Title = data.book;
            // $('#nav_title').html('返回书架');
            var ChaptersData = data.chapters;
            var chapter_data = data.chapters;
            for (let i = 0; i < data.chapters.length; i++) {
                Chapters.push({
                    "chapter_id" : data.chapters[i].order,
                    "title" : data.chapters[i].title,
                    'link' : data.chapters[i].link
                })
            }
            resolve(Chapters);
        } else {
            reject(data);
        }
    }, 'json');
});
getFictionInfoPromise.then(function (value) {
    console.log(value)
})