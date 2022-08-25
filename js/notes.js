//CONSTANTS//
let notes = [];

//ELEMENTS//


//ONCLICK EVENTS//
$("table.notes").on("click", "button", function() {
    let newNote = `<table>
    <thead><th>test</th></thead>
    <tbody><td><p>lorem</p></td></tbody>
    </table>`
    $("tbody.notes").append(newNote);
});

//FUNCTIONS//
