import { BASE_URL, APIKEY, BASE_URL_VANCOUVER, APIKEY_VANCOUVER} from '/js/data/url.js';

export const Bike =  {
  async getBikeData() {
    let res = await fetch(`${BASE_URL}/?dataset=bike-data-2015jan-2019jul&rows=2000&apikey=${APIKEY}`);
    let data = await res.json();

    return data;
  },
  async getBikeVolumeCounterLocations() {

    let res = await fetch(`${BASE_URL}/?dataset=bike-volume-counter-locations&rows=2000&apikey=${APIKEY}`);
    let data = await res.json();

    return data;
  },
  getAverageBikeData(bikeData) {
    let avgCounts = {};

    bikeData.records.forEach(element => {
      for(let e in element.fields) {
        if(e == "date") continue;

        const value = element.fields[e];
        if (avgCounts[e]){
          avgCounts[e].total += (typeof value == "string") ? parseInt(value) : (value);
          avgCounts[e].count++;

        } else {
          avgCounts[e] = {};
          avgCounts[e].total = (typeof value == "string") ? parseInt(element.fields[e]) : (element.fields[e]);
          avgCounts[e].count = 1;
        }
      }
    });

    for(let c in avgCounts){
      avgCounts[c].average = avgCounts[c].total / avgCounts[c].count;
    }

    return avgCounts;
  },
  getAverageBikeVolumes(bikeData, volumeData) {
    let bikeVolumeData = {};

      volumeData.records.forEach(element => {
        //Edit the text names
        let text = element.fields["counters"];
        
        text = text.
                replace('_', ' ').replace('&', '').
                replace(/\s{2,}/g,' ').split(' ').
                filter(word => word !== '-').map(word => word.toLowerCase()).join('_');

        //Add our data to the location objects
        bikeVolumeData[text] = {};
        bikeVolumeData[text].lat = element.fields["latitude"];
        bikeVolumeData[text].lng = element.fields["longitude"];

        switch(true){
          case text.includes('westb'):
            bikeVolumeData[text].dir = 'west';
            break;
          case text.includes('eastb'):
            bikeVolumeData[text].dir = 'east';
            break;
          case text.includes('northb'):
            bikeVolumeData[text].dir = 'north';
            break;
          case text.includes('southb'):
            bikeVolumeData[text].dir = 'south';
            break;
          default:
            bikeVolumeData[text].dir = null;
        }
        
        if (bikeData[text]) {
          // Get the data from bikeVolume and bikeData and combine into one.
          bikeVolumeData[text] = {...bikeVolumeData[text], ...bikeData[text]};
        }
        

      });    
      return bikeVolumeData;
  },
  async getAccidents() {
    const res = await fetch(`${BASE_URL}//?dataset=copy-of-city-of-vancouver&apikey=${APIKEY}&rows=2000`);
    const data = await res.json();

    return data;
  },
  getAccidentCoords(accidentData) {
    const coords = [];
    let counter = 0
    for (let record of accidentData.records) {
      coords[counter] = {};
      coords[counter].lat = record.fields.geopoint[0];
      coords[counter].lng = record.fields.geopoint[1];
      counter++;
    }
    return coords;
  }
}
export const Projects ={

  // distance is in metres (1000 is a km)
  // dir is the direction (west,east,north,south)
  // long is east (increases) or west (decreases more)
  // lat is north (increases) or south (decreases)
  async getCurrentRoadClosureLocations(params){

    let maxLat = 180;
    let maxLng = 180;
    let minLat = -180;
    let minLng = -180;

    if(params !== undefined){
      maxLat = params.maxLat;
      maxLng = params.maxLng;
      minLat = params.minLat;
      minLng = params.minLng;
      // maxLat = 49.28930634203633;
      // maxLng = -123.12517973696282;
      // minLat = 49.28619923209591;
      // minLng = -123.13281866823723;
    }
    
    let res = await fetch(`${BASE_URL_VANCOUVER}/?dataset=road-ahead-current-road-closures&rows=10&facet=comp_date=${APIKEY_VANCOUVER}`);
    let data = await res.json();
    let dataArray = [];
    var count = 0;
    data.records.forEach((data) =>{
      //for each name create a new array of coordinates
      //create a new object to store the key value pair (name, array)
      let object = {};
      let coords = [];
      object.name = data.fields.location;
      data.fields.geom.coordinates.forEach((geom) =>{
        //flatten the data
        //for each element in the new array, add to the coordinate array
        let arr = geom.flat();
        for(let i = 0; i < arr.length; i+=2){
          if(minLat <= arr[i+1] && arr[i+1] <= maxLat && minLng <= arr[i] && arr[i] <= maxLng){
            let object = {};
            object.lat = arr[i+1];
            object.lng = arr[i];
            coords.push(object);
          }
        }
        //set the coords value to the finished array
        object.coords = coords;
      });
      //add the object to the array
      dataArray.push(object);
    });
    return dataArray;
  },

  drawCurrentRoadClosureLocations(currentProjects){
    let data = currentProjects;
    let flightPaths = [];
    data.forEach( (d) =>{

      let coords = d.coords;
      let flightPath = new google.maps.Polyline({
        path: coords,
        strokeColor: '#DC143C',
        strokeOpacity: 0.5,
        strokeWeight: 5,
        });
      
      flightPath.setMap(map);
      flightPaths.push(flightPath);
    });
    return flightPaths;
  },
  async getUpcomingProjects() {
    const res = await fetch(`${BASE_URL_VANCOUVER}/?dataset=road-ahead-upcoming-projects&rows=1000&facet=comp_date&apikey=${APIKEY_VANCOUVER}`);
    const data = await res.json();

    return data;
  },
  getProjectCoords(projects) {
    const coordsArrays = [];
    projects.records.forEach((record) => {
      let geom = this._parseGeoms(record.fields.geom);
      coordsArrays.push(geom);
      
    });
    return coordsArrays;
  },
  _parseGeoms(geom) {
    const geomArray = [];
    if (geom.type === "GeometryCollection") {
      for (let geometry of geom.geometries) {
        geomArray.push(this._parseGeom(geometry));
      }
    } else {
      geomArray.push(this._parseGeom(geom));
    }
    return geomArray;
  },
  _parseGeom(geometry) {
    switch(geometry.type) {
      case "LineString":
        return geometry.coordinates.map((coord) => {
          return new google.maps.LatLng(coord[0], coord[1]);
        });

      default:
          return geometry.coordinates.map((coupleCoord) => {
            return coupleCoord.map(coord => {
              return new google.maps.LatLng(coord[0], coord[1]);
            });
          }).flat(Infinity);
    }
  }
}

