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

// //add to the list onclick
// $tfoot.on("click", "button", function (e) {
//     if (e.target.type === "submit") {
//         console.log("wking")
//     }
//     event.preventDefault();
//     console.log("wroking")
//     if ($userInput.val()) {
//         let newTask = `<tr class="${savedListStr}"><td class="list"><p class="${savedListStr}">${$userInput.val()}<p></td><td><button id="edit">edit</button></td><td><button id="remove">X</button></td></tr>`;
//         //console.log(userInput.value)
//         $todo.append(newTask);
//         savedList.push($userInput.val());
//         saveToStorage(savedList, savedListStr);
//         $userInput.val("");
//     } 
//     //console.log("we got the onclick");
// });

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
            let listTitle = e.target.parentNode.parentNode.parentNode.parentNode.children[0].firstElementChild.firstElementChild.innerText.replaceAll(" ","-").toLowerCase();
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
    //console.log("clicked the API quote");
});

$("tbody > tr").hover(function(evt) {
    //$(evt.target).closest("tr").css("backgroundColor", "lightgreen");
    //target the edit and remove buttons
    $(evt.target).closest("tr").children().eq(1).children().eq(0).css("display", "table-cell");
    $(evt.target).closest("tr").children().eq(2).children().eq(0).css("display", "table-cell");
},function(evt) {
    //$(evt.target).closest("tr").css("backgroundColor", "");
    //target the edit and remove buttons
    $(evt.target).closest("tr").children().eq(1).children().eq(0).css("display", "none");
    $(evt.target).closest("tr").children().eq(2).children().eq(0).css("display", "none");
});


$('#addList').on("click", function(evt) {
    $("div#test").append(`<table id="todolist">
    <thead>
        <tr>
            <th>
                <h3>To Do</h3>
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