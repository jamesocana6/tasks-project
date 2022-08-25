populateList(savedList, savedListStr);
setUpQuote();

//ON CLICK EVENTS//
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

//EVENT DELEGATION BECAUSE EVENTS DONT DYNAMICALLY ADD TO NEW ELEMNTS 
//add task on click
$("div#test").on("click", function (e) {
    event.preventDefault();
    if (e.target.id === "addTaskBtn") {
        let $userInput = $(e.target.parentNode.parentNode.firstElementChild.firstElementChild);
        if ($userInput.val()) {
            let $tbody = $(e.target.parentNode.parentNode.parentNode.parentNode.children[1]);
            let newTask = `<tr class="${savedListStr}"><td class="list"><p class="${savedListStr}">${$userInput.val()}<p></td><td><button id="edit">edit</button></td><td><button id="remove">X</button></td></tr>`;
            //Get the h3 element in thead and use it as title
            let listTitle = e.target.parentNode.parentNode.parentNode.parentNode.children[0].firstElementChild.firstElementChild.innerText;
            $tbody.append(newTask);
            $userInput.val("");
            savedList2.push({title: listTitle, content: newTask});
            saveToStorage(savedList2, savedListStr2);
        }
    }
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
        savedQuotes.push({content: apiText, author: apiAuthor});
        saveToStorage(savedQuotes, savedQuotesStr);
    }
});

$('#addList').on("click", function(evt) {
    let timeNow = new Date();
    let time = timeNow.getHours().toString() + timeNow.getMinutes().toString() + timeNow.getSeconds().toString();
    console.log(month+day+year+time)
    $("div#test").append(`<table id="todolist" class="${month+day+year+time}">
    <thead id="tableTitle">
        <tr id="tableTitle">
            <th id="tableTitle">
                <h3 id="tableTitle">Click To Edit Title</h3>
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
    savedList2.push({title: "Click To Edit Title", content: "", timestamp: (month+day+year+time)})
});

//edit title on click
$("div#test").on("click", function (evt) {
    event.preventDefault();
    if (evt.target.id === "tableTitle") {
        let editInput = `<th><input id="enter" type="text" value="${evt.target.closest("tr").firstElementChild.innerText}"></th>`;
        let tableTime = evt.target.closest("table").classList[0]
        evt.target.closest("tr").firstElementChild.innerHTML = editInput;
        $("thead").on("keydown", function(evt) {
            if (evt.key === "Enter") {
                event.preventDefault();
                if (checkListForTime(savedList2, tableTime)) {
                    savedList2[findIndexOfTime(tableTime, savedList2)].title = evt.target.value;
                }
                evt.target.parentNode.innerHTML = `<h3 id="tableTitle">${evt.target.value}</h3>`;
            }
        });
    } 
});


$("div#date").append(`<p id="month">${month}</p>`);
$("div#date").append(`<p id="day">${day}</p>`);
$("div#date").append(`<p id="year">${year}</p>`);

// DOES NOT WORK
// $("addList").on("click", function() {
// $("div#test").append("<button class='help'>hello</button>")
// console.log($buttonhelp)
// $buttonhelp = $("button.help")
// console.log($buttonhelp)
// });
// let $buttonhelp = $("button.help")
// $buttonhelp.on("click", function() {
//     console.log("hello")
// })