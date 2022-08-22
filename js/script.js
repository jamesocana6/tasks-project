

//URL: https://zenquotes.io/api/random
//let URL = "https://zenquotes.io/api/quotes"
//$.ajax("https://zenquotes.io/api/quotes")

let URL = "https://random-interview.herokuapp.com/question/random"

//CONSTANTS//


//ELEMENTS//


//ONCLICK EVENTS//


//FUNCTIONS//




$.ajax(URL).then(function(data) {
    $('p').text(data.question)
    console.log(data.question)
    console.log(URL)
},function(error) {
    console.log("error")
});
