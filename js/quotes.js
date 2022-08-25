populateQuote(savedQuotes, savedQuotesStr);

$("tbody > tr").hover(function(evt) {
    // $(evt.target).closest("tr").css("backgroundColor", "lightgreen");
    //target the edit and remove buttons
    //$(evt.target).closest("tr").children().eq(1).children().eq(0).css("display", "table-cell");
    $(evt.target).closest("tr").children().eq(2).children().eq(0).css("display", "table-cell");
},function(evt) {
    // $(evt.target).closest("tr").css("backgroundColor", "");
    //target the edit and remove buttons
    //$(evt.target).closest("tr").children().eq(1).children().eq(0).css("display", "none");
    $(evt.target).closest("tr").children().eq(2).children().eq(0).css("display", "none");
});