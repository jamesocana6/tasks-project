
let URL3 = "https://api.quotable.io/random"

let URL2 = "https://quotes.rest/qod.json?language=en" //CONNECTED! 

let URL = "https://random-interview.herokuapp.com/question/random" //CONNECTED!



//CONSTANTS//
const savedListStr = "savedList";
const savedQuotesStr = "savedQuote";
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
let savedDark = storage.getItem("darkMode") || "false";
let savedTheme = storage.getItem("theme") || 0;
let userInput = document.querySelector("input#user");
let savedList = JSON.parse(storage.getItem("savedList")) || [];
let savedQuotes = JSON.parse(storage.getItem("savedQuote")) || [];
let savedQuestions = JSON.parse(storage.getItem("savedQuestion")) || [];


//ELEMENTS//
let $tfoot = $("tfoot");
let $todo = $("tbody");
let $apiQuote = $('#apiquote');
let $savedAlert = $("#saved");


//ONCLICK EVENTS//
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
    } else if (this.closest("tr").getAttribute("class") === savedQuotesStr) {
        savedQuotes.splice(findIndexOfQuote(evt.target.closest("tr").firstElementChild.firstElementChild.innerText),1);
        $(this).closest("tr").remove();
    }
    saveToStorage(savedQuotes, savedQuotesStr);
});

//change the theme onclick radio button
$("input[type=radio]").on("click", function(evt) {
    switch (evt.target.value) {
        case "theme1":
            theme1();
            storage.setItem("theme", 1);
            break;
        case "theme2":
            theme2();
            storage.setItem("theme", 2);
            break;
        case "theme3":
            theme3();
            storage.setItem("theme", 3);
            break;
        default:
            break;
    }
});

//toggle dark mode onclick
$("input[type=checkbox]").on("click", function(evt) {
    switch (evt.target.checked) {
        case true:
            dark.toggleDark();
            break;
        case false:
            dark.toggleDark();
            break;
        default:
            break;
    }
    storage.setItem("darkMode", evt.target.checked);
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

//populates quotes and sorts them by author firstname alphabetical
function populateQuote(list, listStr) {
    let sortedList = list.sort(function(a, b) {
        let sorter = a.author.charCodeAt(0) - b.author.charCodeAt(0);
        console.log(sorter); 
        let i = 0;
        if (sorter === 0) {
            i++;
            sorter = a.author.charCodeAt(i) - b.author.charCodeAt(i);
            console.log(sorter)
        }
        return sorter;
    });
    console.log(list);
    console.log(sortedList);
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
    for (let quote of savedQuotes) {
        if (quote.content.includes(apiText)) {
            i++;
        }
    }
    if (i > 0) {return true};
}

function findIndexOfQuote(text) {
    let i = 0;
    for (let quote of savedQuotes) {
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

function setUpTheme() {
    if (savedDark === "true") {
        dark.toggleDark();
        $("input[type='checkbox']").attr("checked", "true");
    }
    switch (savedTheme) {
        case "1":
            theme1();
            $("input[value='theme1']").attr("checked", "true");
            break;
        case "2":
            theme2();
            $("input[value='theme2']").attr("checked", "true");
            break;
        case "3":
            theme3();
            $("input[value='theme3']").attr("checked", "true");
            break;
        default:
            break;
    }
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

setUpTheme();

//theme2();
//dark.toggleDark();

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
