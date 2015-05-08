var request = require('request');
var cheerio = require('cheerio');


var url = 'http://www.imdb.com/title/tt1229340/';

request(url, function(error, response, html) {
  if (!error) {
    var $ = cheerio.load(html);
    var title, release, rating;

    // We'll use the unique header class as a starting point.
    $('.header').filter(function() {
      // Let's store the data we filter into a variable so we can easily see what's going on.
      var data = $(this);

      // In examining the DOM we notice that the title rests within the first child element of the header tag. 
      // Utilizing jQuery we can easily navigate and get the text by writing the following code:
      title = data.children().first().text();
      release = data.children().last().children().text();

      $('.star-box-giga-star').filter(function(){
        var data = $(this);

        // The .star-box-giga-star class was exactly where we wanted it to be.
        // To get the rating, we can simply just get the .text(), no need to traverse the DOM any further
        rating = data.text();
      });

    });

    console.log("title: "+title+", Release: "+release+", rating: "+rating);
  }
});
