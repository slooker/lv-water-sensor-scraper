var request = require('request');
var cheerio = require('cheerio');


var stationDataUrl = 'http://gustfront.ccrfcd.org/station/station2.asp'

request(stationDataUrl, function(error, response, html) {
  if (!error) {
    var $ = cheerio.load(html);
    var finalData = [];
    var $allRows = $('table tr').filter(function() {
      return !$(this).hasClass('StationIDHeader');
    }), allOdds = $allRows.map(function(index, element) {
      if (index % 2 === 0) {
        return {name: $(element).find('td').eq(1).text()};
      };
    }).get(), allEvens = $allRows.map(function(index, element) {
      if (index % 2 === 1) {
        return {location: $(element).find('td').eq(2).text()};
      };
    }).get(), finalData = [];

    finalData = allOdds.map(function(currentObject, index) {
      var otherObject = allEvens[index];

      for (var prop in otherObject) {
        if (otherObject.hasOwnProperty(prop)) {
          currentObject[prop] = otherObject[prop];
        }
      }

      return currentObject;
    });
  }
  console.log(finalData);
});

