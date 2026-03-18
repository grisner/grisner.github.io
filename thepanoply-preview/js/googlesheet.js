// url of the google sheet
const csvUrl = `https://docs.google.com/spreadsheets/d/10dt27NU05LcEZJcv1qyzAM1yOFAejA7Fx7QS2BzzyYs/export?format=csv`;

// Checking if there is a current pagination count
// let gigPage = Number.parseInt(window.sessionStorage.getItem("gigPage") ?? 1);
let gigPage = 1;
let rows = [];

const paginationLength = 10;

function paginateNext() {
  console.log("pagination");
  gigPage += paginationLength;
  // window.sessionStorage.setItem("gigPage", gigPage);
  populateRows();
}

// Simple CSV parser (splits on newlines and commas)
// For more robust parsing, use PapaParse or a similar library
async function loadSheetAsCsv() {
  const res = await fetch(csvUrl);
  if (!res.ok) throw new Error("Network response was not ok");
  const csvText = await res.text();

  const rows = csvText
    .trim()
    .split("\n")
    .map((row) => row.split(","));
  // `rows[0]` now holds the header, `rows[1...]` the data
  return rows;
}

function populateRows() {
  const table = document.getElementById("gigs");
  console.log({ gigPage, paginationLength, length: rows.length });

  // data rows
  for (
    let i = gigPage;
    i < gigPage + paginationLength && i < rows.length;
    i++
  ) {
    const tableRow = document.createElement("tr");
    let columnHeader = "";

    console.log(`Row ${i} of ${gigPage + paginationLength}`);

    if (i % 2 === 0) {
      tableRow.setAttribute("class", "secondTr");
    }

    const columns = [];
    rows[i].forEach((c, j) => {
      let result =
        c[0] === '"'
          ? `${rows[i][j]}${rows[i][j + 1]}`
          : c[c.length - 1] !== '"' && c;
      result = result && result.replaceAll('"', "");
      result && columns.push(result);
    });

    for (let j = 0; j < columns.length; j++) {
      // Create column values
      const columnElm = document.createElement("td");
      if (j === 0) {
        columnElm.setAttribute("class", "firstColumn");
      } else if (j === columns.length - 1) {
        columnElm.setAttribute("class", "lastColumn");
      } else {
        columnElm.setAttribute("class", "middleColumns");
      }

      const column = columns[j];

      if (column[column.length - 1] === '"') {
        columnHeader = `${columnHeader}${column.replace('"', "")}`;
        columnElm.innerText = columnHeader;
        tableRow.appendChild(columnElm);
      } else if (column[0] === '"') {
        columnHeader = column.replace('"', "");
      } else {
        columnElm.innerText = column;
        tableRow.appendChild(columnElm);
      }

      console.log("appending row", tableRow);

      table.appendChild(tableRow);
    }

    console.log("rows populated");
  }
}

const loadTable = async () => {
  rows = await loadSheetAsCsv().catch(console.error);

  console.log("showing button");
  document.getElementById("paginateButton").style.visibility = "visible";

  console.log("creating table");
  const table = document.getElementById("gigs");

  // headers
  console.log("creating columns");
  const headerRow = document.createElement("tr");
  rows[0].map((column, idx) => {
    const headerColumn = document.createElement("th");
    if (idx === 0) {
      headerColumn.setAttribute("class", "firstColumn");
    } else if (idx === rows[0].length - 1) {
      headerColumn.setAttribute("class", "lastColumn");
    } else {
      headerColumn.setAttribute("class", "middleColumns");
    }

    headerColumn.innerText = column;
    headerRow.appendChild(headerColumn);
  });
  table.appendChild(headerRow);

  populateRows();
};

loadTable();
