import { JSONUtils } from "./JSONUtils.js";
// require npm installation
// npm install tabulator-tables --save
var Tabulator = require("tabulator-tables");

// define table data
// DUMMY DATASET
var tabledata = [
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

// define table (auto columns)
var table = new Tabulator("dataTable", {
  data: tabledata,
  autoColumns: true
});
