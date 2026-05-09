// url of the google sheet
const csvUrl = `https://docs.google.com/spreadsheets/d/10dt27NU05LcEZJcv1qyzAM1yOFAejA7Fx7QS2BzzyYs/export?format=csv`;

// Checking if there is a current pagination count
let firstRowOfPage = 1;
let rows = [];

const paginationLength = 10;
let noSplit = true;

function paginateNext() {
  firstRowOfPage += paginationLength;
  if (firstRowOfPage + paginationLength > rows.length) document.getElementById("paginateButton").style.visibility = "hidden";
  populateRows();
}

function comparator(a, b) {
  // Compare by date in CSV array of arrays for sorting
  if (a[2] > b[2]) return -1;
  if (a[2] < b[2]) return 1;
  return 0;
}

function splitCSV(row) {
  const result = [];
  let current = "";
  let inQuotes = false;

  for (let char of row) {
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === "," && !inQuotes) {
      result.push(current);
      current = "";
    } else {
      current += char;
    }
  }
  result.push(current);
  return result;
}

// Simple CSV parser (splits on newlines and commas)
// For more robust parsing, use PapaParse or a similar library
async function loadSheetAsCsv() {
  const res = await fetch(csvUrl);
  if (!res.ok) throw new Error("Network response was not ok");
  const csvText = await res.text();

  let rows = csvText
    .trim()
    .split("\n")
    .map(splitCSV);

  header = rows[0];
  rows = rows
    .slice(1)
    .sort(comparator);
  rows.unshift(header);

  return rows;
}

function createTableRow(row) {
  const tableRow = document.createElement("tr");
  let columnHeader = "";

  const columns = [];
  row.forEach((c, j) => {
    let result =
      c[0] === '"'
        ? `${row[j]}${row[j + 1]}`
        : c[c.length - 1] !== '"' && c;
    result = result && result.replaceAll('"', "");
    result && columns.push(result);
  });

  for (let j = 0; j < columns.length; j++) {
    const columnElement = document.createElement("td");
    const column = columns[j];

    if (column[column.length - 1] === '"') {
      columnHeader = `${columnHeader}${column.replace('"', "")}`;
      columnElement.innerText = columnHeader;
      tableRow.appendChild(columnElement);
    } else if (column[0] === '"') {
      columnHeader = column.replace('"', "");
    } else {
      columnElement.innerText = column;
      tableRow.appendChild(columnElement);
    }
  }

  return tableRow;
}

function populateUpcomingRow(tableRow, i) {
  const table = document.getElementById("upcoming-gigs");
  if (i % 2 === 0) {
    tableRow.setAttribute("class", "secondTr");
  }
  table.insertBefore(tableRow, table.firstChild);
}

function hideSplit() {
  const splitElements = document.getElementsByClassName("split");
  for (let j = 0; j < splitElements.length; j++) {
    splitElements.item(j).style.display = 'none';
  }
}

function populateRows() {
  const table = document.getElementById("done-gigs");
  let currentDate = new Date();
  let currentDateISO = currentDate.toISOString();

  for (
    let i = firstRowOfPage;
    i < firstRowOfPage + paginationLength && i < rows.length;
    i++
  ) {
    const tableRow = createTableRow(rows[i]);

    if (i === 1) {
      populateUpcomingRow(tableRow, i);
    }

    if (rows[i][2] >= currentDateISO) {
      populateUpcomingRow(tableRow, i);
      noSplit = false;
      continue;
    }

    if (i % 2 === 0) {
      tableRow.setAttribute("class", "secondTr");
    }

    table.appendChild(tableRow);
  }

  if (noSplit) hideSplit();
}

const loadTable = async () => {
  rows = await loadSheetAsCsv().catch(console.error);
  document.getElementById("paginateButton").style.visibility = "visible";
  populateRows();
};

loadTable();
