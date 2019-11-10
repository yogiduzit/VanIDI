<<<<<<< HEAD
$(document).ready(function(){

  window.utils.downloadBikeAccidentClusters().then( (res) =>{
    //define data
    var table = new Tabulator("#dataTable", {
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
    table.setData(res);
  });
=======
      //define data
      var tableData = [
        {
          id: 1,
          name: "Oli Bob",
          location: "United Kingdom",
          gender: "male",
          rating: 1,
          col: "red",
          dob: "14/04/1984"
        },
        {
          id: 2,
          name: "Mary May",
          location: "Germany",
          gender: "female",
          rating: 2,
          col: "blue",
          dob: "14/05/1982"
        },
        {
          id: 3,
          name: "Christine Lobowski",
          location: "France",
          gender: "female",
          rating: 0,
          col: "green",
          dob: "22/05/1982"
        },
        {
          id: 4,
          name: "Brendon Philips",
          location: "USA",
          gender: "male",
          rating: 1,
          col: "orange",
          dob: "01/08/1980"
        },
        {
          id: 5,
          name: "Margret Marmajuke",
          location: "Canada",
          gender: "female",
          rating: 5,
          col: "yellow",
          dob: "31/01/1999"
        },
        {
          id: 6,
          name: "Frank Harbours",
          location: "Russia",
          gender: "male",
          rating: 4,
          col: "red",
          dob: "12/05/1966"
        },
        {
          id: 7,
          name: "Jamie Newhart",
          location: "India",
          gender: "male",
          rating: 3,
          col: "green",
          dob: "14/05/1985"
        },
        {
          id: 8,
          name: "Gemma Jane",
          location: "China",
          gender: "female",
          rating: 0,
          col: "red",
          dob: "22/05/1982"
        },
        {
          id: 9,
          name: "Emily Sykes",
          location: "South Korea",
          gender: "female",
          rating: 1,
          col: "maroon",
          dob: "11/11/1970"
        },
        {
          id: 10,
          name: "James Newman",
          location: "Japan",
          gender: "male",
          rating: 5,
          col: "red",
          dob: "22/03/1998"
        }
      ];
      //define table
      var table = new Tabulator("#dataTable", {
        height: "250px",
        width: "100%",
        layout: "fitColumns",
        data: tableData,
        autoColumns: true,
      });
      $("#exportBtn").click(function() {
        var name = $('#fileName').val();
        var ext = $('#file-type-btn').text();
        ext.trim();
        console.log(ext);
        table.download(ext, name + "." + ext);
      });
>>>>>>> c17e59dc6a2130c0e4b67ee239b1d52ce6843725
      //trigger download of data.csv file
      $("#download-csv").click(function() {
        table.download("csv", "data.csv");
      });
      //trigger download of data.json file
      $("#download-json").click(function() {
        table.download("json", "data.json");
      });
      //trigger download of data.xlsx file
      $("#download-xlsx").click(function() {
        table.download("xlsx", "data.xlsx", { sheetName: "My Data" });
      });
});
