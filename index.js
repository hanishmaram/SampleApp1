const sql = require("msnodesqlv8");
const fs = require("fs");

const connectionString =
  "server=.;Database=TxMapData;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";
let query = "";

let jsonData = JSON.parse(fs.readFileSync("Texas_Map.json", "utf-8"));
//console.log(jsonData.objects.geometries);

jsonData.objects.geometries.forEach(element => {
  query = `INSERT INTO dbo.tbl_TxCountyMapData(OBJECTID,GID,CMPTRL_NBR,DIST_NM,CNTY_FIPS,CNTY_NBR,CNTY_NM) VALUES(
      ${element.properties.OBJECTID},${element.properties.GID},${
    element.properties.CMPTRL_NBR
  }
      ,'${element.properties.DIST_NM}','${element.properties.CNTY_FIPS}','${
    element.properties.CNTY_NBR
  }','${element.properties.CNTY_NM}'
  )`;

  sql.query(connectionString, query, (err, rows) => {
    console.log(rows);
  });
});
