renderPlaceholer();
populateLists(savedList2, savedListStr2);
renderTheme();
setUpQuote();

//ON CLICK EVENTS//
//edit on click
$("div#test").on("click", function (evt) {
    event.preventDefault();
    if (evt.target.id === "edit") {
        evt.target.setAttribute("disabled", "true");
        let editThis = evt.target.closest("tr").firstElementChild.innerText;
        let editInput = `<td><input id="enter" type="text" value="${evt.target.closest("tr").firstElementChild.innerText}"></td>`;
        let tableTime = evt.target.closest("table").classList[0];
        evt.target.closest("tr").firstElementChild.innerHTML = editInput;
        $("tbody").on("keydown", function(evt) {
            if (evt.key === "Enter") {
                event.preventDefault();
                if (checkListForTime(savedList2, tableTime)) {
                    let indexOfContent = savedList2[findIndexOfTime(tableTime, savedList2)].content.indexOf(editThis);
                    savedList2[findIndexOfTime(tableTime, savedList2)].content[indexOfContent] = evt.target.value.trim();
                }
                evt.target.parentNode.innerHTML = `<p class="${savedListStr}">${evt.target.value.trim()}</p>`
                $('button#edit').removeAttr("disabled");
                saveToStorage(savedList2, savedListStr2);
            }
        });
    } 
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
            $tbody.append(newTask);
            let tableTime = e.target.closest("table").classList[0]
            if (checkListForTime(savedList2, tableTime)) {
                savedList2[findIndexOfTime(tableTime, savedList2)].content.push($userInput.val().trim());
            } else {
                savedList2.push({title: "To Do", content: [$userInput.val().trim()], timestamp: "0000"})
            }
            $userInput.val("");
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
    if (firstList === "false") {
        firstList = "true";
        storage.setItem("clicked", "true");
        renderPlaceholer();
    }
    let timeNow = new Date();
    let time = timeNow.getHours().toString() + timeNow.getMinutes().toString() + timeNow.getSeconds().toString();
    console.log(month+day+year+time)
    $("div#test").append(`<table id="todolist" class="${month+day+year+time}">
    <thead id="tableTitle">
        <tr id="tableTitle">
            <th id="tableTitle">
                <h3 id="tableTitle">Click To Edit Title</h3>
            </th>
            <th>
                <button id="remove">X</button>
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
    savedList2.push({title: "Click To Edit Title", content: [], timestamp: (month+day+year+time)})
    renderTheme();
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
                } else {
                    savedList2.push({title: evt.target.value.trim(), content: "", timestamp: "0000"});
                }
                evt.target.parentNode.innerHTML = `<h3 id="tableTitle">${evt.target.value.trim()}</h3>`;
            }
        });
    } 
});

function renderPlaceholer() {
    if (firstList === "false") {
        $("div#test").append("<p id='placeholder'>Click the circle plus to make your first list!</p>");
    } else {
        if (document.querySelector("p#placeholder")) {
            document.querySelector("p#placeholder").remove();
        }
    }
}

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