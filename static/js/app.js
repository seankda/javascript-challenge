/*
=========================================
Part 1: Load data from table to the page
=========================================
*/

// from data.js
var tableData = data;

// confirm that tableData is getting passed
console.log(tableData)

// YOUR CODE HERE!
// Use D3 to select the table
var table = d3.select("table");

// Use d3 to create a bootstrap striped table
// http://getbootstrap.com/docs/3.3/css/#tables-striped
table.attr("class", "table table-striped");

// Use D3 to select the table body
var tbody = d3.select("tbody");

// Create a function to generate data automatically on page load
function genData(tableData) {
    // Iterate through each tableData object
    tableData.forEach((ufo) => {
        // Assign each piece of the array into a row
        var row = tbody.append("tr");
        // Iterate through each key and value
        Object.entries(ufo).forEach(([key, value]) => {
            // Assign each piece of the row a cell
            var cell = row.append("td");
            // Fill cell with value from key:val pair
            cell.text(value);
        });
    });

}

genData(tableData);

/*
=========================================
Part 2: Trigger events by listening
=========================================
*/

// Elements to listen for
// var tbody used in line 23
var submit = d3.select("#filter-btn");
var reset = d3.select("#reset-btn");
var dateInput = d3.select("#datetime");

/*
Allow [ENTER] key to be used for searching (Come back to this later)
submitForEnterKey.addEventListener("keyup", function(event){
    if (event.keyCode === 13){
        event.preventDefault();
        document.getElementById("filter-btn").click();
    }
})
*/

// Reset table function
reset.on("click", function () {
    document.getElementById("datetime").value = "";
    tbody.html("");
    genData(tableData);
})

// Filter button function
submit.on("click", function () {
    // Clear table on click
    tbody.html("");

    // After storing the inputDate value from outside, we can now get the property value
    var inputDate = dateInput.property("value");

    // Create the filter and match the tableData datetime to user's input
    var applyFilter = tableData.filter(tableData => tableData.datetime === inputDate);

    // Create a response variable to see if it returns results
    var response = {
        applyFilter
    }

    // If the response contains more than 0, display
    if (response.applyFilter.length !== 0) {
        genData(applyFilter);
    }

    // If the response contains 0, display error message
    else {
        alert("Please enter a filter value!");
        // Replace the table since there's no input
        genData(tableData);
    }

})