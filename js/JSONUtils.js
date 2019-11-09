//requires google maps
function addLinesToMap(data){
    let heatMapData = [];

    for(p in data){
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

    heatmap.setMap(map);
}

// distance is in metres (1000 is a km)
// dir is the direction (west,east,north,south)
// long is east (increases) or west (decreases more)
// lat is north (increases) or south (decreases)
function getOffsetLocation(lat, long, dir, distance){

    let res = {};
    const EARTH = 6378.137;
    const M = (1 / ((Math.PI / 180) * EARTH)) / 1000;  //1 meter in degree
    cos = Math.cos;
    let newLat = lat;
    let newLong = long;
  
    switch(dir){
      case 'west':
        newLong += (distance*M)/(cos(newLat * (Math.PI / 180)));
        break;
      case 'east':
        newLong -= (distance*M)/cos(newLat * (Math.PI / 180));
        break;
      case 'north':
        newLat += distance*M;
        break;
      default:
        newLat -= distance*M;
    }
  
    res.lat = newLat;
    res.lng = newLong;
    return res;
  }


  function showSteps(directionResult) {
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

  function attachInstructionText(marker, text) {
    google.maps.event.addListener(marker, 'click', function() {
      stepDisplay.setContent(text);
      stepDisplay.open(map, marker);
    });
  }