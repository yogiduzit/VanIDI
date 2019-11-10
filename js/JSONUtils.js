import {Bike, Projects, Traffic} from "/js/data/requests.js";
export class JSONUtils{
  constructor(map){
    this.bikeHeatMapOn = false;
    this.currentRoadClosureLocationsOn = false;
    this.bikeAccidentMarkersOn = false;
    this.layers = {};
    this.map = map;
    
  }
//must have heatmaps
  toggleBikeHeatMaps(on){
    let bikeVolumeData = null;
    if(on == true && !this.bikeHeatMapOn){
      Bike.getBikeData().then((bikeData) => {
        Bike.getBikeVolumeCounterLocations().then(volumeData => {
          bikeVolumeData = Bike.getAverageBikeVolumes(bikeData, volumeData);
          this.addBikeHeatLayer(bikeVolumeData);
          this.bikeHeatMapOn = true;
        });
      });
    } else {
      this.layers.bike.setMap(null);
      this.bikeHeatMapOn = false;
    }

  }

  toggleCurrentRoadClosureLocations(on){
    let currentRoadClosureData = null;
    if(on == true && !this.currentRoadClosureLocationsOn){
      Projects.getCurrentRoadClosureLocations().then((data) => {
        let paths = Projects.drawCurrentRoadClosureLocations(data);
        this.layers.currentRoadClosures = paths;
        this.currentRoadClosureLocationsOn = true;
      });
    }else{
      this.layers.currentRoadClosures.forEach( (path) =>{
        path.setMap(null);
      });
      this.layers.currentRoadClosures = null;
      this.currentRoadClosureLocationsOn = false;
  }
  }
  //requires google maps
  addBikeHeatLayer(data){
      let heatMapData = [];
      for(let p in data){
        let myLatLng = {};
        myLatLng.lat = parseFloat(data[p].lat);
        myLatLng.lng = parseFloat(data[p].lng);
        heatMapData.push({location: new google.maps.LatLng(myLatLng.lat, myLatLng.lng), weight: (data[p].average/100)});
      }
      let heatmap = new google.maps.visualization.HeatmapLayer({
          data: heatMapData,
          opacity: 0.5,
          radius: 50,
      });
      this.layers.bike = heatmap;
      heatmap.setMap(map);
  }


  // distance is in metres (1000 is a km)
  // dir is the direction (west,east,north,south)
  // long is east (increases) or west (decreases more)
  // lat is north (increases) or south (decreases)
  getOffsetLocation(lat, long, dir, distance){
      let res = {};
      const EARTH = 6378.137;
      const M = (1 / ((Math.PI / 180) * EARTH)) / 1000;  //1 meter in degree
      cos = Math.cos;
      let newLat = lat;
      let newLong = long;


      switch(dir){
        case 'west':
          newLong += ( distance * M )/ (cos(newLat * (Math.PI / 180)));
          break;
        case 'east':
          newLong -= (distance*M) / cos(newLat * (Math.PI / 180));
          break;
        case 'north':
          newLat += distance * M;
          break;
        default:
          newLat -= distance * M;
      }

      res.lat = newLat;
      res.lng = newLong;

      return res;
  }

  // returns the distance from one point on a map to another. 
  getDistanceFrom(coord1,coord2) {

    let R = 6371; // Radius of the earth in km
    let dLat = deg2rad(coord2.lat-coord1.lat);  // deg2rad below
    let dLon = deg2rad(coord2.lng-coord1.lng); 
    let a = Math.sin(dLat/2) * Math.sin(dLat/2) + 
            Math.cos(deg2rad(coord1.lat)) * Math.cos(deg2rad(coord2.lat)) * 
            Math.sin(dLon/2) * Math.sin(dLon/2); 

    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    let d = R * c; // Distance in km
    return d;
  }

  convertDeg2Rad(deg) {
    return deg * (Math.PI/180); 
  }


  showSteps(directionResult) {
    // For each step, place a marker, and add the text to the marker's
    // info window. Also attach the marker to an array so we
    // can keep track of it and remove it when calculating new
    // routes.

    let markerArray = [];
    let myRoute = directionResult.routes[0].legs[0];
  
    for (var i = 0; i < myRoute.steps.length; i++) {
        let marker = new google.maps.Polyline({
          position: myRoute.steps[i].start_point,
          map: map
        });
        attachInstructionText(marker, myRoute.steps[i].instructions);
        markerArray[i] = marker;
      }
    }

  attachInstructionText(marker, text) {
    google.maps.event.addListener(marker, 'click', function() {
      stepDisplay.setContent(text);
      stepDisplay.open(map, marker);
    });
  }

  reloadData(params){
    console.log(params);
    if(this.bikeHeatMapOn == true) {
      console.log('turned off');
      this.toggleBikeHeatMaps(false,null);
    }// turn the bike heat map off if on.
    if(this.currentRoadClosureLocationsOn == true) {
      this.toggleCurrentRoadClosureLocations(false);
    } 
    
    // turn the current road collisions map if on.
    //49.28930634203633 -123.12517973696282 49.28619923209591 -123.13281866823723
    //robson jervis
  }
  
  async addBikeAccidentClusters() {
    const coords = Bike.getAccidentCoords(await Bike.getAccidents());
    if (this.bikeAccidentMarkersOn) {
      const markers = coords.map((coord) => new google.maps.Marker({position: coord}));
      const markerCluster = new MarkerClusterer(this.map, markers,
        {
          imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
        }
      );
    }
  }
  async drawUpcomingProjects() {
    const paths = Projects.getProjectCoords(await Projects.getUpcomingProjects());
    paths.forEach(path => {
      const flightPath = new google.maps.Polyline({
        path: path,
        geodesic: true,
        strokeColor: '#FFFF00',
        strokeOpacity: 1.0,
        strokeWeight: 2
      });
      flightPath.setMap(this.map);
    });
  }

  async downloadBikeAccidentClusters(){
    const data = Bike.getAccidentCoords(await Bike.getAccidents());
    console.log(data);
  }

  async getCroppedEntries(latMin, latMax, lngMin, lngMax) {
    let cropData = [];

    let bikeData = Bike.getAccidentCoords(await Bike.getAccidents());
    bikeData.forEach((coord) => {
      if (coord.lat && coord.lng) {
        if (coord.lat >= latMin && coord.lat <= latMax && coord.lng >= lngMin && coord.lng <= lngMax) {
          cropData.push(coord);
        }
      }
    });
    return cropData;
  }
}

