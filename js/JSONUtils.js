const JSONUtils = {
  
  // distance is in metres (1000 is a km)
  // dir is the direction (west,east,north,south)
  // long is east (increases) or west (decreases more)
  // lat is north (increases) or south (decreases)
  getOffsetLocation(lat, long, dir, distance) {

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
  },

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
  },

  convertDeg2Rad(deg) {
    return deg * (Math.PI/180); 
  }
}