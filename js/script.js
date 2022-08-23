
let URL3 = "https://api.quotable.io/random"

let URL2 = "https://quotes.rest/qod.json?language=en" //CONNECTED! 

let URL = "https://random-interview.herokuapp.com/question/random" //CONNECTED!

//CONSTANTS//
const savedListStr = "savedList";
const savedQuotesStr = "savedQuote";
const savedQuestionsStr = "savedQuestion";
let storage = localStorage;
let userInput = document.querySelector("input");
let savedList = JSON.parse(storage.getItem("savedList")) || [];
let savedQuotes = JSON.parse(storage.getItem("savedQuote")) || [];
let savedQuestions = JSON.parse(storage.getItem("savedQuestion")) || [];

//ELEMENTS//
let $tfoot = $("tfoot");
let $todo = $("tbody");
let $apiQuote = $('#apiquote');
let $savedAlert = $("#saved");

//ONCLICK EVENTS//
//add to the list onclick
$tfoot.on("click", "button", function (data) {
    event.preventDefault();
    if (userInput.value) {
        let newTask = `<tr list="todo" order="${savedList.length}"><td class="list">${userInput.value}</td><td><button id="edit">edit</button></td><td><button id="remove">X</button></td></tr>`;
        console.log(userInput.value)
        $todo.append(newTask);
        savedList.push(newTask);
        saveToStorage(savedList, savedListStr);
        userInput.value = "";
    } else {
        return;
    }
    console.log("we got the onclick");
});

//Save quote onclick
$apiQuote.on("click", function (quote) {
    if (savedQuotes.includes(quote.target.innerText)) {
        $savedAlert.html("Quote already saved!");
        $savedAlert.fadeIn(1000);
        $savedAlert.fadeOut(3000);
        //console.log("this quote is here already")
    } else {
        let storeQuote = `<tr list="quote" order="${savedQuotes.length}"><td>${quote.target.innerText}</td><td><button id="remove">X</button></td></tr>`;
        savedQuotes.push(storeQuote);
        console.log(quote.target)
        //console.log(quote.target.innerText);
        saveToStorage(savedQuotes, savedQuotesStr);
        $savedAlert.html("Quote saved!");
        $savedAlert.fadeIn(1000);
        $savedAlert.fadeOut(3000);

    }
    //console.log("clicked the API quote");
});

//remove on click
$("tbody").on("click", "#remove", function (evt) {
    if (this.closest("tr").getAttribute("list") === "todo") {
        savedList.splice(this.getAttribute("order"), 1);
        saveToStorage(savedList, savedListStr);
        $(this)
            .closest("tr")
            .fadeOut(1000, function () {
                $(this).remove();
            });
    } else if (this.closest("tr").getAttribute("list") === "quote") {
        savedQuotes.splice(this.getAttribute("order"), 1);
        saveToStorage(savedQuotes, savedQuotesStr);
        $(this)
            .closest("tr")
            .fadeOut(1000, function () {
                $(this).remove();
            });
    }
});

//edit on click
$("tbody").on("click", "#edit", function (evt) {
    //console.log(evt.target.closest("tr").firstElementChild.innerText)

});

//FUNCTIONS//
//populates the list that I want to populate
function populateList(list) {
    if (list.length > 0) {
        list.forEach(function (item) {
            $("tbody").append(item);
        });
    }
}

//saves the array into the internal storage
function saveToStorage(array, arrayStr) {
    storage.setItem(arrayStr, JSON.stringify(array));
}
//storage.clear();




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

////////////////////
//FEATURES TO ADD//
////////////////////

//Remove the branding so it only shows when the quote comes from they said so


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
