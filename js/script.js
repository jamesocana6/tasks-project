
let URL3 = "https://api.quotable.io/random"

let URL2 = "https://quotes.rest/qod.json?language=en" //CONNECTED! 

let URL = "https://random-interview.herokuapp.com/question/random" //CONNECTED!



//CONSTANTS//
const savedListStr = "savedList";
const savedQuotesStr = "savedQuote";
const savedQuotesStr2 = "savedQuote2";
const savedQuestionsStr = "savedQuestion";
const date = new Date();
let apiText = "";
let apiAuthor = "";
let day = date.getDate();
const monthName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
let month = monthName[date.getMonth()];
let year = date.getFullYear();
let storage = localStorage;
//storage.clear();
let userInput = document.querySelector("input");
let savedList = JSON.parse(storage.getItem("savedList")) || [];
let savedQuotes2 = JSON.parse(storage.getItem("savedQuote2")) || [];
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
        let newTask = `<tr class="${savedListStr}"><td class="list"><p class="${savedListStr}">${userInput.value}<p></td><td><button id="edit">edit</button></td><td><button id="remove">X</button></td></tr>`;
        //console.log(userInput.value)
        $todo.append(newTask);
        savedList.push(userInput.value);
        saveToStorage(savedList, savedListStr);
        userInput.value = "";
    } 
    //console.log("we got the onclick");
});

//Save quote onclick
$apiQuote.on("click", function (quote) {
    if (checkArrayForQuote()) {
        $savedAlert.html("Quote already saved!");
        $savedAlert.fadeIn(1000);
        $savedAlert.fadeOut(3000);
    } else {
        $savedAlert.html("Quote saved!");
        $savedAlert.fadeIn(1000);
        $savedAlert.fadeOut(3000);
        savedQuotes2.push({content: apiText, author: apiAuthor});
        saveToStorage(savedQuotes2, savedQuotesStr2);
    }
    //console.log("clicked the API quote");
});

//remove on click
$("tbody").on("click", "#remove", function (evt) {
    if (this.closest("tr").getAttribute("class") === savedListStr) {
        $(this).closest("tr").remove();
        let allListTags = document.querySelectorAll(`p.${savedListStr}`);
        savedList = [];
        allListTags.forEach(function(quote) {
            savedList.push(quote.innerText);
        });
        saveToStorage(savedList, savedListStr);
    } else if (this.closest("tr").getAttribute("class") === savedQuotesStr2) {
        savedQuotes2.splice(findIndexOfQuote(evt.target.closest("tr").firstElementChild.firstElementChild.innerText),1);
        $(this).closest("tr").remove();
    }
    saveToStorage(savedQuotes2, savedQuotesStr2);
});

//edit on click
$("tbody").on("click", "#edit", function (evt) {
    event.preventDefault();
    console.log(evt.target);
    evt.target.setAttribute("disabled", "true");
    //console.log(evt.target.closest("tr").firstElementChild.innerText)
    let editInput = `<td><input id="enter" type="text" value="${evt.target.closest("tr").firstElementChild.innerText}"></td>`;
    console.log(evt.target.closest("tr").firstElementChild.innerHTML)
    evt.target.closest("tr").firstElementChild.innerHTML = editInput;
    $("tbody").on("keydown", "input#enter", function(evt) {
        if (evt.key === "Enter") {
            event.preventDefault();
            console.log(evt.target.value);
            console.log(evt.target.parentNode.innerHTML);
            evt.target.parentNode.innerHTML = `<p class="${savedListStr}">${evt.target.value}</p>`
            $('button#edit').removeAttr("disabled");
            let allListTags = document.querySelectorAll(`p.${savedListStr}`);
            console.log(allListTags);
            savedList = [];
            allListTags.forEach(function(quote) {
                savedList.push(quote.innerText);
                console.log(quote.innerText)
            });
            console.log(savedList)
            saveToStorage(savedList, savedListStr);
        }
    });
});

//FUNCTIONS//
//populates the list that I want to populate
function populateList(list, listStr) {
    if (list.length > 0) {
        list.forEach(function (item) {
            $("tbody").append(`<tr class="${listStr}"><td><p class="${listStr}">${item}</p></td><td><button id="edit">edit</button></td><td><button id="remove">X</button></td></tr>`)
        });
    }
}

function populateQuote(list, listStr) {
    if (list.length > 0) {
        list.forEach(function (item) {
            $("tbody").append(`<tr class="${listStr}"><td><p class="${listStr}">${item.content}</p></td><td><p>${item.author}</p></td><td><button id="remove">X</button></td></tr>`);
        });
    }
}

//saves the array into the internal storage
function saveToStorage(array, arrayStr) {
    storage.setItem(arrayStr, JSON.stringify(array));
}

//iterating through the array with .includes or .some resulted in false all the time. so i had to make a new function
function checkArrayForQuote() {
    let i = 0;
    for (let quote of savedQuotes2) {
        if (quote.content.includes(apiText)) {
            i++;
        }
    }
    if (i > 0) {return true};
}

function findIndexOfQuote(text) {
    let i = 0;
    for (let quote of savedQuotes2) {
        if (quote.content === text) {
            return i;
        } else {
            i++;
        }
    }
    return undefined;
}

function theme1() {
    $("nav").attr("class", "theme1");
    $("table").attr("class", "theme1");
    if (dark.isActive) {
        $("div#date").attr("class", "theme1 dark");
        $("tbody").attr("class", "theme1 dark");
    } else {
        $("div#date").attr("class", "theme1");
        $("tbody").attr("class", "theme1");    
    }
}

function theme2() {
    $("nav").attr("class", "theme2");
    $("table").attr("class", "theme2");
    if (dark.isActive) {
        $("div#date").attr("class", "theme2 dark");
        $("tbody").attr("class", "theme2 dark");
    } else {
        $("div#date").attr("class", "theme2");
        $("tbody").attr("class", "theme2");    
    }
}

function theme3() {
    $("nav").attr("class", "theme3");
    $("table").attr("class", "theme3");
    if (dark.isActive) {
        $("div#date").attr("class", "theme3 dark");
        $("tbody").attr("class", "theme3 dark");
    } else {
        $("div#date").attr("class", "theme3");
        $("tbody").attr("class", "theme3");    
    }
}

//Dark theme object
const dark = {
    isActive: false,
    toggleDark: function() {
        if (this.isActive) {
            $("body").attr("class", "");
            document.querySelector("tbody").classList.remove("dark");
            document.querySelector("div#date").classList.remove("dark");
            this.isActive = false;
        } else {
            $("body").attr("class", "dark");
            document.querySelector("tbody").classList.add("dark");
            document.querySelector("div#date").classList.add("dark");
            this.isActive = true;
        }
    },
}

function setUpQuote() {
    let idx = Math.floor(Math.random() * 10) + 1;
    console.log(idx)
    if (1 <= idx && idx < 7) {
        $.ajax(URL3).then(function (data) {
            $apiQuote.text(data.content + " - " + data.author)
            apiText = data.content;
            apiAuthor = data.author;
            console.log(data)
            console.log(data.content)
            console.log(URL3)
            $('span').css("display", "none");
        }, function (error) {
            console.log("error")
        });
    } else if (7 <= idx && idx < 10) {
        $.ajax(URL).then(function(data) {
        $apiQuote.text(data.question)
        console.log(data.question)
        apiText = data.question;
        console.log(URL)    
        $('span').css("display", "none");
        },function(error) {
            console.log("error")
        });
    } else {
        $.ajax(URL2).then(function(data) {
            $apiQuote.text(data.contents.quotes[0].quote + " - " + data.contents.quotes[0].author)
            console.log(data.contents)
            console.log(data.contents.quotes[0].quote)
            console.log(URL2)
            apiText = data.contents.quotes[0].quote;
            apiAuthor = data.contents.quotes[0].author;
            $('span').css("display", "");
        },function(error) {
            console.log("error")
        });
    }
}

theme2();
dark.toggleDark();

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

// $.ajax(URL3).then(function (data) {
//     $apiQuote.text(data.content + " - " + data.author)
//     console.log(data)
//     console.log(data.content)
//     console.log(URL3)
// }, function (error) {
//     console.log("error")
// });

////////////////////
//FEATURES TO ADD//
////////////////////


// Add a modal to add tasks, include date due, date added?, priority lvl
// work on css
// add a calendar
// add notes
// add indented tasks to show whats part of what
// save values as an array in an array to include date, date added, prioity lvl
// add a star that spins when you click save quote
// hover feature to hide the edit and x on list and quotes
// ability to make more than one todo list
// look into modals
// one quote a day?

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
