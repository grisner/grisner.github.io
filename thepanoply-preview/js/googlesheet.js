// Grab the sheet ID from the URL
const SHEET_ID = "10dt27NU05LcEZJcv1qyzAM1yOFAejA7Fx7QS2BzzyYs";

// Build the CSV export URL
const csvUrl = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv`;

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
  console.log("CSV rows:", rows);
  return rows;
}

const loadTable = async () => {
  const rows = await loadSheetAsCsv().catch(console.error);
  console.log({ headerrow: rows[0] });

  const table = document.getElementById("gigs");

  // headers
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

  // rows
  for (let i = 1; i < rows.length; i++) {
    const tableRow = document.createElement("tr");
    let columnHeader = "";

    if (i % 2 === 0) {
      tableRow.setAttribute("class", "secondTr");
    }

    // console.log({ row: rows[i] });
    const columns = [];
    rows[i].forEach((c, j) => {
      let result =
        c[0] === '"'
          ? `${rows[i][j]}${rows[i][j + 1]}`
          : c[c.length - 1] !== '"' && c;
      result = result && result.replaceAll('"', "");
      result && columns.push(result);
    });
    console.log(columns);

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
        // End of place
        columnHeader = `${columnHeader}${column.replace('"', "")}`;
        columnElm.innerText = columnHeader;
        tableRow.appendChild(columnElm);
      } else if (column[0] === '"') {
        columnHeader = column.replace('"', "");
      } else {
        columnElm.innerText = column;
        tableRow.appendChild(columnElm);
      }

      table.appendChild(tableRow);
    }
  }
};

loadTable();
