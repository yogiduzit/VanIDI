//requires google maps
function addLinesToMap(data){

    for(p in data){
      let myLatLng = {};
      myLatLng.lat = parseFloat(data[p].lat);
      myLatLng.lng = parseFloat(data[p].lng);
      let offSetLatLng = getOffsetLocation(myLatLng.lat,myLatLng.lng, data[p].dir,300);
      console.log(offSetLatLng);

      let myPathCoordinates = {};
      myPathCoordinates =[
          myLatLng,
          offSetLatLng
      ];
      let path = new google.maps.DirectionService({
          path: myPathCoordinates,
          map: map,
          title: p
      });
  
    }
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