"use strict";
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const fs = require("fs");

let rawdata = fs.readFileSync("database_sample/demo-book.json");

function httpGet(theUrl) {
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            return xmlhttp.responseText;
        }
    };
    xmlhttp.open("GET", theUrl, false);
    xmlhttp.send();
    return xmlhttp.responseText;
}
module.exports = {
    up: (queryInterface, Sequelize) => {
        let data = JSON.parse(rawdata);
        // console.log(data);
        data.map(item => {
            let url =
                "https://www.googleapis.com/books/v1/volumes?q=isbn:" + item.ISBN_API;
            //
            //
            // console.log(httpGet(url));
            var response = httpGet(url);
            var results = JSON.parse(response);
            if (results.totalItems) {
                var book = results.items[0];
                item.category = (book["volumeInfo"]["categories"][0]);
                item.imgPath = (book["volumeInfo"]["imageLinks"]["thumbnail"]);
                item.rate = (book["volumeInfo"]["averageRating"]);
            }
            //   // console.log(book["volumeInfo"]["language"]);
            // }
            // item.language = "en";
            //
            //
            item.year = item.year.slice(item.year.length - 4, item.year.length);
            item.total = 10;
        });
        data.map(item => {
            item.createdAt = Sequelize.literal("NOW()");
            item.updatedAt = Sequelize.literal("NOW()");
            return item;
        });
        return queryInterface.bulkInsert("bookInfos", data, {});
        /*
          Add altering commands here.
          Return a promise to correctly handle asynchronicity.

          Example:
          return queryInterface.bulkInsert('People', [{
            name: 'John Doe',
            isBetaMember: false
          }], {});
        */
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("bookInfos", null, {});
        /*
          Add reverting commands here.
          Return a promise to correctly handle asynchronicity.

          Example:
          return queryInterface.bulkDelete('People', null, {});
        */
    }
};