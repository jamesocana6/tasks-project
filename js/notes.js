renderPlaceholer();

//CONSTANTS//
let notes = [];

//ELEMENTS//


//ONCLICK EVENTS//
$("div.addNote").on("click", function(evt) {
    if (firstNote === "false") {
        firstNote = "true";
        storage.setItem("clickedNote", "true");
        renderPlaceholer();
    }
    if (evt.target.id === "newNoteBtn") {
        console.log("hello")
        let newNote = `<table>
        <thead id="tableTitle"><tr id="tableTitle"><th id="tableTitle">test</th><th>
        <button id="remove">X</button>
    </th></tr></thead>
        <tbody><td><p>lorem</p></td></tbody>
        </table>`;
        $("div#test").append(newNote);
    }
});

//FUNCTIONS//
function renderPlaceholer() {
    if (firstNote === "false") {
        $("div#test").append("<p id='placeholder'>Click the circle plus to make your first list!</p>");
    } else {
        if (document.querySelector("p#placeholder")) {
            document.querySelector("p#placeholder").remove();
        }
    }
}