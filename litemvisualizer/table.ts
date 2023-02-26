// run tsc in this directory to compile to js before testing


// information for dropdown menu of tables
const tableSelecter = document.getElementById("tables") as HTMLSelectElement
const table = document.getElementById("table") as HTMLTableElement
tableSelecter.addEventListener("change", function () {switchTable(tableSelecter.value)})

// headings and body for specific table
const tableHeader: HTMLTableCellElement = document.getElementById("table-head") as HTMLTableCellElement;
const tableBody: HTMLTableSectionElement = document.getElementById("table-body") as HTMLTableSectionElement;

// type data for table and database info
type tableInfo = {tableName: string, columns: string[], data: string[]}
type dbInfo = {data: tableInfo[]}

// global variable to save tableInfo of loaded data
let datum: tableInfo[];

loadTables()

/**
 * Function to switch the displayed table
 * @param tableName the name of the table to switch to
 */
function switchTable(tableName : string): void {
    // index of table of interest within list of table info
    let index = 0;
    tableBody.innerHTML = ""
    // loop through number of tables to get index for table of interest
    for (let i = 0; i < datum.length; i++) {
        if (datum[i].tableName == tableName) {
            index = i;
            break;
        }
    }
    // variable for storing the information of table to be displayed
    let tableInformation: tableInfo = datum[index]
    // print out the column headers
    let colsHTML: string = ""
    for (let i = 0; i < tableInformation.columns.length; i++) {
        colsHTML += `<td>${tableInformation.columns[i]}</td>`
    }
    tableBody.innerHTML += colsHTML
    // print out data for the table
    let dataHTML: string = ""
    let colNum: number = tableInformation.columns.length
    for (let i = 0; i < tableInformation.data.length; i += colNum) {
        dataHTML += `<tr>`;
        for (let j = i; j < i + colNum; j++) {
            dataHTML += `<td>${tableInformation.data[j]} </td>`
        }
        dataHTML += `</tr>`;
    }
    tableBody.innerHTML += dataHTML
}

/**
 * Function to load in database
 */
function loadTables(): void {
    // get request to loaded data
    fetch("http://localhost:3001/visualize", {
        method: 'GET',
        headers: {
            "Access-Control-Allow-Origin":"*"
        }
    })
        .then((response: Response) => response.json())
        .then((data: dbInfo) => updateTableMenu(data))
        .catch((error: any) => console.error("Error:", error));
}

/**
 * Function to update the list of tables
 * @param data all data from a database
 */
function updateTableMenu(data: dbInfo): void {
    // set global variable to be the information about the database, to be used in table switching
    console.log(data)
    datum = data.data

    if (data == null) {
        return;
    }
    const tableNames: tableInfo[] = data.data
    tableSelecter.innerHTML = ""
    // populate dropdown with table names
    for (let index = 0; index < tableNames.length; index++) {
        tableSelecter.innerHTML +=
            `<option value="${tableNames[index].tableName}">${tableNames[index].tableName}</option>`;
    }
    // display initial table
    switchTable(tableSelecter.value)
}
