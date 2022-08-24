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

$("div#date").append(`<p id="month">${month}</p>`);
$("div#date").append(`<p id="day">${day}</p>`);
$("div#date").append(`<p id="year">${year}</p>`);
