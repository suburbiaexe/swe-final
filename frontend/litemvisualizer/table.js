"use strict";
// run tsc in this directory to compile to js before testing
// information for dropdown menu of tables
const tableSelecter = document.getElementById("tables");
const table = document.getElementById("table");
tableSelecter.addEventListener("change", function () { switchTable(tableSelecter.value); });
// headings and body for specific table
const tableHeader = document.getElementById("table-head");
const tableBody = document.getElementById("table-body");
// global variable to save tableInfo of loaded data
let datum;
loadTables();
/**
 * Function to switch the displayed table
 * @param tableName the name of the table to switch to
 */
function switchTable(tableName) {
    // index of table of interest within list of table info
    let index = 0;
    tableBody.innerHTML = "";
    // loop through number of tables to get index for table of interest
    for (let i = 0; i < datum.length; i++) {
        if (datum[i].tableName == tableName) {
            index = i;
            break;
        }
    }
    // variable for storing the information of table to be displayed
    let tableInformation = datum[index];
    // print out the column headers
    let colsHTML = "";
    for (let i = 0; i < tableInformation.columns.length; i++) {
        colsHTML += `<td>${tableInformation.columns[i]}</td>`;
    }
    tableBody.innerHTML += colsHTML;
    // print out data for the table
    let dataHTML = "";
    let colNum = tableInformation.columns.length;
    for (let i = 0; i < tableInformation.data.length; i += colNum) {
        dataHTML += `<tr>`;
        for (let j = i; j < i + colNum; j++) {
            dataHTML += `<td>${tableInformation.data[j]} </td>`;
        }
        dataHTML += `</tr>`;
    }
    tableBody.innerHTML += dataHTML;
}
/**
 * Function to load in database
 */
function loadTables() {
    // get request to loaded data
    fetch("http://localhost:3001/visualize", {
        method: 'GET',
        headers: {
            "Access-Control-Allow-Origin": "*"
        }
    })
        .then((response) => response.json())
        .then((data) => updateTableMenu(data))
        .catch((error) => console.error("Error:", error));
}
/**
 * Function to update the list of tables
 * @param data all data from a database
 */
function updateTableMenu(data) {
    // set global variable to be the information about the database, to be used in table switching
    console.log(data);
    datum = data.data;
    if (data == null) {
        return;
    }
    const tableNames = data.data;
    tableSelecter.innerHTML = "";
    // populate dropdown with table names
    for (let index = 0; index < tableNames.length; index++) {
        tableSelecter.innerHTML +=
            `<option value="${tableNames[index].tableName}">${tableNames[index].tableName}</option>`;
    }
    // display initial table
    switchTable(tableSelecter.value);
}
