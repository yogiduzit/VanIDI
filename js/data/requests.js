import { BASE_URL, APIKEY } from '/data/url.js';

export const Bike =  {
  async getBikeData() {
    let res = await fetch(`${BASE_URL}/?dataset=bike-data-2015jan-2019jul&apikey=${APIKEY}`);
    let data = await res.json();

    return data;
  },
  async getBikeVolumeCounterLocations() {
    let res = await fetch(`${BASE_URL}/?dataset=bike-volume-counter-locations&rows=1000&apikey=${APIKEY}`);
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
  }
}

const bikeData = Bike.getBikeData().then(data => {
  console.log(data);
  console.log(Bike.getAverageBikeData(data));
});