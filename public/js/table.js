$(document).ready(function(){
 
  window.utils.downloadBikeAccidentClusters().then( (res) =>{
    //define data
    window.table = new Tabulator("#dataTable", {
      height: "250px",
      width: "100%",
      layout: "fitColumns",
      columns:[
        {title:"Latitude", field:"lat"},
        {title:"Longitude", field:"lng"},
        {title:"Date", field:"date"},
        {title:"Type", field:"type"},
        {title:"Injury", field:"injury"},
      ]
    });
    window.table.setData(res);
  });
      //trigger download of data.csv file
      $("#download-csv").click(function() {
        window.table.download("csv", "data.csv");
      });
      //trigger download of data.json file
      $("#download-json").click(function() {
        window.table.download("json", "data.json");
      });
      //trigger download of data.xlsx file
      $("#download-xlsx").click(function() {
        window.table.download("xlsx", "data.xlsx", { sheetName: "My Data" });
      });
});



