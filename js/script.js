
let URL3 = "https://api.quotable.io/random"

let URL2 = "https://quotes.rest/qod.json?language=en" //CONNECTED! 

let URL = "https://random-interview.herokuapp.com/question/random" //CONNECTED!

//CONSTANTS//
let userInput = document.querySelector("input");

//ELEMENTS//
let $form = $("form")
let $list = $("#list")
let $apiQuote = $('#apiquote')

//ONCLICK EVENTS//
$("form").on("click", "button", function(data) {   
    event.preventDefault();
    let newTask = document.createElement("p");
    newTask.innerHTML = userInput.value;
    console.log(userInput.value)
    $list.append(newTask);
    userInput.value = "";
    console.log("we got the onclick");
});

$apiQuote.on("click", function() {
    $("#saved").html("hello");
    console.log("clicked the API quote");
});

//FUNCTIONS//



////////////////////////////////////////
//APIs for quotes are connected//
////////////////////////////////////////
// $.ajax(URL).then(function(data) {
//     $apiQuote.text(data.question)
//     console.log(data.question)
//     console.log(URL)
// },function(error) {
//     console.log("error")
// });

// $.ajax(URL2).then(function(data) {
//     $apiQuote.text(data.contents.quotes[0].quote + " - " + data.contents.quotes[0].author)
//     console.log(data.contents)
//     console.log(data.contents.quotes[0].quote)
//     console.log(URL2)
// },function(error) {
//     console.log("error")
// });

$.ajax(URL3).then(function (data) {
    $apiQuote.text(data.content + " - " + data.author)
    console.log(data)
    console.log(data.content)
    console.log(URL3)
}, function (error) {
    console.log("error")
});



/////////////////////////////////////
///FIGURE OUT HOW TO GET AROUND CORS OR FIND NEW API?
/////////////////////////////////////

// const api_url ="https://zenquotes.io/api/quotes/";

// async function getapi(url)
// {
//   const response = await fetch(url);
//   var data = await response.json();
//   console.log(data);
// }

// getapi(api_url);

// let headers = new Headers();

//   headers.append('Content-Type', 'application/json');
//   headers.append('Accept', 'application/json');

// let xhr = new XMLHttpRequest();
// xhr.open('POST', 'https://zenquotes.io/api/random/');
// xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
// xhr.setRequestHeader('Content-type','application/json');

//URL: https://zenquotes.io/api/random
// let URL3 = "https://zenquotes.io/api/random/"
//$.ajax("https://zenquotes.io/api/quotes")
