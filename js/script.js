

//URL: https://zenquotes.io/api/random
//let URL = "https://zenquotes.io/api/quotes"
//$.ajax("https://zenquotes.io/api/quotes")

let URL2 = "https://quotes.rest/qod.json?language=en" //CONNECTED! 
//https://quotes.rest/quote/random?language=en

let URL = "https://random-interview.herokuapp.com/question/random" //CONNECTED!

//CONSTANTS//


//ELEMENTS//


//ONCLICK EVENTS//


//FUNCTIONS//




// $.ajax(URL).then(function(data) {
//     $('p').text(data.question)
//     console.log(data.question)
//     console.log(URL)
// },function(error) {
//     console.log("error")
// });

$.ajax(URL2).then(function(data) {
    $('p').text(data.contents.quotes[0].quote + " - " + data.contents.quotes[0].author)
    console.log(data.contents)
    console.log(data.contents.quotes[0].quote)
    console.log(URL2)
},function(error) {
    console.log("error")
});