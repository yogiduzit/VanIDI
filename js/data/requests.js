import { BASE_URL, APIKEY } from '/js/data/url.js';

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
    const res = await fetch(`${BASE_URL}//?dataset=copy-of-city-of-vancouver&apikey=${APIKEY}`);
    const data = await res.json();

    return data;
  },
  getAccidentCoords(accidentData) {
    const coords = [];
    let counter = 0
    for (let record of accidentData.records) {
      console.log(record.fields.geopoint);
      coords[counter] = {};
      coords[counter].lat = record.fields.geopoint[0];
      coords[counter].lng = record.fields.geopoint[1];
      counter++;
    }
    console.log(coords);
    return coords;
  }
}
