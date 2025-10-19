async function fetchSierraRoster() {
  const sheetID = "1QFPaDePq3zBzMt-2ziXsryi5UGdQVAROHWSKUYYO4nM";
  const sheetName = "Final"; // URL-encoded tab name
  const range = "C4:C27"; // adjust to match Sierra's rows
  const url = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?range=${range}&tqx=out:json`;

  try {
    const response = await fetch(url);
    const text = await response.text();
    const json = JSON.parse(text.substring(47, text.length - 2));

    // Extract values from the single-column range
    const rows = json.table.rows.map(r => r.c[0]?.v ?? "");

    // Render as a table (or list)
    const container = document.getElementById("sheet-data");
    let html = "<table border='1' cellpadding='5'><tr><th>Player</th></tr>";
    rows.forEach(player => {
      html += `<tr><td>${player}</td></tr>`;
    });
    html += "</table>";

    container.innerHTML = html;

  } catch (err) {
    console.error("Error fetching roster:", err);
  }
}

fetchSierraRoster();
