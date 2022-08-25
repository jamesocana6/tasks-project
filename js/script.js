
let URL3 = "https://api.quotable.io/random"

let URL2 = "https://quotes.rest/qod.json?language=en" //CONNECTED! 

let URL = "https://random-interview.herokuapp.com/question/random" //CONNECTED!



//CONSTANTS//
const savedListStr = "savedList";
const savedListStr2 = "savedList2";
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
let $userInput = $("input.user");
let savedList = JSON.parse(storage.getItem("savedList")) || [];
let savedList2 = JSON.parse(storage.getItem("savedList2")) || [];
let savedQuotes = JSON.parse(storage.getItem("savedQuote")) || [];
let savedQuestions = JSON.parse(storage.getItem("savedQuestion")) || [];
let firstList = storage.getItem("clicked") || "false";

//ELEMENTS//
let $tfoot = $("tfoot");
let $todo = $("tbody");
let $apiQuote = $('#apiquote');
let $savedAlert = $("#saved");


//ONCLICK EVENTS//
// //remove on click
// $("tbody").on("click", "#remove", function (evt) {
//     if (this.closest("tr").getAttribute("class") === savedListStr2) {
//         // $(this).closest("tr").remove();
//         // let allListTags = document.querySelectorAll(`p.${savedListStr}`);
//         // savedList = [];
//         // allListTags.forEach(function(quote) {
//         //     savedList.push(quote.innerText);
//         // });
//         savedList2.splice(findIndexOfContent(evt.target.closest("tr").firstElementChild.firstElementChild.innerText, savedList2), 1);
//         $(this).closest("tr").remove();
//         saveToStorage(savedList2, savedListStr2);
//     } else if (this.closest("tr").getAttribute("class") === savedQuotesStr) {
//         savedQuotes.splice(findIndexOfContent(evt.target.closest("tr").firstElementChild.firstElementChild.innerText, savedQuotes), 1);
//         $(this).closest("tr").remove();
//     }
//     saveToStorage(savedQuotes, savedQuotesStr);
// });
//remove on click
$("div#test").on("click", function (evt) {
    if (evt.target.id === "remove") {
        console.log(evt.target.closest("tr"));
        let tableTime = evt.target.closest("table").classList[0]
        let itemToBeRemoved = evt.target.closest("tr").firstElementChild.firstElementChild.innerText;
        if (evt.target.closest("tr").getAttribute("class") === savedListStr2) {
            // $(evt.target).closest("tr").remove();
            // let allListTags = document.querySelectorAll(`p.${savedListStr}`);
            // savedList = [];
            // allListTags.forEach(function(quote) {
            //     savedList.push(quote.innerText);
            // });
            // savedList2.splice(findIndexOfContent(evt.target.closest("tr").firstElementChild.firstElementChild.innerText, savedList2), 1);
            if (checkListForTime(savedList2, tableTime)) {
                let indexOfContent = savedList2[findIndexOfTime(tableTime, savedList2)].content.indexOf(itemToBeRemoved);
                savedList2[findIndexOfTime(tableTime, savedList2)].content.splice(indexOfContent, 1);
                $(evt.target).closest("tr").remove();
            }
        } else if (evt.target.closest("tr").getAttribute("class") === savedQuotesStr) {
            savedQuotes.splice(findIndexOfContent(evt.target.closest("tr").firstElementChild.firstElementChild.innerText, savedQuotes), 1);
            $(evt.target).closest("tr").remove();
        }
        saveToStorage(savedQuotes, savedQuotesStr);
    }
});

//change the theme onclick radio button
$("input[type=radio]").on("click", function (evt) {
    switch (evt.target.value) {
        case "theme1":
            storage.setItem("theme", 1);
            theme1();
            break;
        case "theme2":
            storage.setItem("theme", 2);
            theme2();
            break;
        case "theme3":
            storage.setItem("theme", 3);
            theme3();
            break;
        case "theme4":
            storage.setItem("theme", 4);
            theme4();
            break;
        default:
            break;
    }
});

//toggle dark mode onclick
$("input[type=checkbox]").on("click", function (evt) {
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

function populateLists(list, listStr) {
    if (list.length > 0) {
        list.forEach(function (item) {
            $("div#test").append(`<table id="todolist" class="${item.timestamp}">
    <thead id="tableTitle">
        <tr id="tableTitle">
            <th id="tableTitle">
                <h3 id="tableTitle">${item.title}</h3>
            </th>
        </tr>
    </thead>
    <tbody>
    </tbody>
    <tfoot>
        <tr>
            <td>
                <input class="user" type="text" placeholder="Enter a task">
            </td>
            <td>
                <button id="addTaskBtn" type="submit">Add Task</button>
            </td>
        </tr>
    </tfoot>
</table>`);
            if (item.content.length > 0) {
                item.content.forEach(function(text) {
                    $(`table.${item.timestamp} > tbody`).append(`<tr class="${listStr}"><td><p class="${listStr}">${text.trim()}</p></td><td><button id="edit">edit</button></td><td><button id="remove">X</button></td></tr>`)
                });
            }
        });
    }
}

//populates quotes and sorts them by author firstname alphabetical
function populateQuote(list, listStr) {
    let sortedList = list.sort(function (a, b) {
        let sorter = a.author.charCodeAt(0) - b.author.charCodeAt(0);
        let i = 0;
        if (sorter === 0) {
            i++;
            sorter = a.author.charCodeAt(i) - b.author.charCodeAt(i);
        }
        return sorter;
    });
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
    if (i > 0) { return true };
}

function checkListForTime(list, listIDTime) {
    let i = 0;
    for (let quote of list) {
        if (quote.timestamp.includes(listIDTime)) {
            i++;
        }
    }
    if (i > 0) { return true };
}

function findIndexOfContent(text, objectArray) {
    let i = 0;
    for (let quote of objectArray) {
        if (quote.content === text) {
            return i;
        } else {
            i++;
        }
    }
    return undefined;
}

function findIndexOfContentList(text, objectArray) {
    let i = 0;
    for (let quote of objectArray) {
        if (quote.content.includes(text.trim())) {
            return i;
        } else {
            i++;
        }
    }
    return undefined;
}

function findIndexOfTime(text, objectArray) {
    let i = 0;
    for (let quote of objectArray) {
        if (quote.timestamp === text) {
            return i;
        } else {
            i++;
        }
    }
    return undefined;
}

function theme1() {
    $("nav").attr("theme", "1");
    $("table").attr("theme", "1");
    if (dark.isActive) {
        $("div#date").attr("theme", "1 dark");
        $("tbody").attr("theme", "1 dark");
    } else {
        $("div#date").attr("theme", "1");
        $("tbody").attr("theme", "1");
    }
}

function theme2() {
    $("nav").attr("theme", "2");
    $("table").attr("theme", "2");
    if (dark.isActive) {
        $("div#date").attr("theme", "2 dark");
        $("tbody").attr("theme", "2 dark");
    } else {
        $("div#date").attr("theme", "2");
        $("tbody").attr("theme", "2");
    }
}

function theme3() {
    $("nav").attr("theme", "3");
    $("table").attr("theme", "3");
    if (dark.isActive) {
        $("div#date").attr("theme", "3 dark");
        $("tbody").attr("theme", "3 dark");
    } else {
        $("div#date").attr("theme", "3");
        $("tbody").attr("theme", "3");
    }
}

function theme4() {
    $("nav").attr("theme", "4");
    $("table").attr("theme", "4");
    if (dark.isActive) {
        $("div#date").attr("theme", "4 dark");
        $("tbody").attr("theme", "4 dark");
    } else {
        $("div#date").attr("theme", "4");
        $("tbody").attr("theme", "4");
    }
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
        case "4":
            theme4();
            $("input[value='theme4']").attr("checked", "true");
            break;
        default:
            break;
    }
}

function renderTheme() {
    savedTheme = storage.getItem("theme");
    savedDark = storage.getItem("darkMode");
    if (savedDark === "true") {
        $("body").attr("theme", "dark");
            if(document.querySelector("tbody")) {
                document.querySelector("tbody").setAttribute("theme", "dark");
                document.querySelector("div#date").setAttribute("theme", "dark");
        }
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
        case "4":
            theme4();
            $("input[value='theme4']").attr("checked", "true");
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
        $.ajax(URL).then(function (data) {
            $apiQuote.text(data.question)
            console.log(data.question)
            apiText = data.question;
            console.log(URL)
            $('span').css("display", "none");
        }, function (error) {
            console.log("error")
        });
    } else {
        $.ajax(URL2).then(function (data) {
            $apiQuote.text(data.contents.quotes[0].quote + " - " + data.contents.quotes[0].author)
            console.log(data.contents)
            console.log(data.contents.quotes[0].quote)
            console.log(URL2)
            apiText = data.contents.quotes[0].quote;
            apiAuthor = data.contents.quotes[0].author;
            $('span').css("display", "");
        }, function (error) {
            console.log("error")
        });
    }
}


//OBJECTS//
//Dark theme object
const dark = {
    isActive: false,
    toggleDark: function () {
        if (this.isActive) {
            $("body").attr("theme", "");
            if(document.querySelector("tbody")) {
                document.querySelector("tbody").removeAttribute("dark");
                document.querySelector("div#date").removeAttribute("dark");
            }
            this.isActive = false;
        } else {
            $("body").attr("theme", "dark");
            if(document.querySelector("tbody")) {
                document.querySelector("tbody").setAttribute("theme", "dark");
                document.querySelector("div#date").setAttribute("theme", "dark");
            }
            this.isActive = true;
        }
    },
}

$("div#date").append(`<p id="month">${month}</p>`);
$("div#date").append(`<p id="day">${day}</p>`);
$("div#date").append(`<p id="year">${year}</p>`);


setUpTheme();
renderTheme();

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
