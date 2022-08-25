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


$("div#date").append(`<p id="month">${month}</p>`);
$("div#date").append(`<p id="day">${day}</p>`);
$("div#date").append(`<p id="year">${year}</p>`);