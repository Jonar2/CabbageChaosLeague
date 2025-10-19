// =========================
// Sierra's Big Mist Roster Loader
// =========================

// Google Sheet info
const sheetID = "1QFPaDePq3zBzMt-2ziXsryi5UGdQVAROHWSKUYYO4nM";
const sheetName = "FinalV2";
const sheetRange = "B3:F27"; // Columns: Position | Player | Team | Bye | Headshot ID

// Construct the Google Sheets API URL
const url = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(sheetName)}&range=${sheetRange}`;

async function loadRoster() {
  const container = document.getElementById("sheet-data");
  container.innerHTML = "Loading roster…";

  try {
    const response = await fetch(url);
    const text = await response.text();

    // Clean up the weird JSON structure Google returns
    const json = JSON.parse(text.substring(47).slice(0, -2));
    const rows = json.table.rows;

    let html = `<table>
  <thead>
    <tr>
      <th>Position</th>
      <th>Name</th>
      <th>Team</th>
      <th>Bye</th>
    </tr>
  </thead>
  <tbody>
`;
    rows.forEach(row => {
      const pos = row.c[0]?.v || "";
      const name = row.c[1]?.v || "";
      const team = row.c[2]?.v || "";
      const bye = row.c[3]?.v || "";
      const headshotID = row.c[4]?.v || "";

      let imgSrc = "";
      if (pos === "DST") {
        // Defense/team logo
        imgSrc = `https://cdn.ssref.net/req/202508291/tlogo/pfr/${team.toLowerCase()}.png`;
      } else {
        // Player headshot
        imgSrc = `https://www.pro-football-reference.com/req/20230307/images/headshots/${headshotID}.jpg`;
      }

      html += `
        <tr>
          <td>${pos}</td>
          <td><img class="player" src="${imgSrc}" alt="${name}"> ${name}</td>
          <td>${team}</td>
          <td>${bye}</td>
        </tr>
      `;
    });
    html += `</tbody></table>`;

    container.innerHTML = html;
  } catch (error) {
    console.error("Error loading Google Sheet data:", error);
    container.innerHTML = "Error loading roster data.";
  }
}

// Run when page loads
document.addEventListener("DOMContentLoaded", loadRoster);
