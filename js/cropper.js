var rectangle;
var counter = 0;
var currentNE;
var currentSW;
var cntrlIsPressed = false;

//key for control is 16 
$(document).keydown(function (event) {
    if (event.which == "16")
        cntrlIsPressed = true;
    console.log("keyDown");
});

$(document).keyup(function () {
    if (event.which == "16")
        cntrlIsPressed = false;
    console.log("keyUp");
});

    $('#map').on('click', function(){
        google.maps.event.addListener(map, "click", function (event) { 
        if(cntrlIsPressed){    
            var latitude = event.latLng.lat();
            var longitude = event.latLng.lng();
            console.log(latitude + ', ' + longitude);
            var bounds = {
                north: latitude,
                south: latitude,
                east: longitude,
                west: longitude
            }
            rectangle = new google.maps.Rectangle({
                bounds: bounds,
                editable: true,
                map: map,
                draggable: true,
                title: "Window" + counter
            })
            counter++;
          
            let params = {};

            rectangle.addListener('click', function () {
                currentNE = this.getBounds().getNorthEast();
                currentSW = this.getBounds().getSouthWest();
                console.log(this.title, currentNE.lat(), currentNE.lng(), currentSW.lat(), currentSW.lng());
                params.maxLat = currentNE.lat();
                params.maxLng = currentNE.lng();
                params.minLat = currentSW.lat();
                params.minLng = currentSW.lng();
                console.log(params);
                console.log(utils);
                utils.reload(params);
                console.log(JSONUtils.reloadData);
            });
        };
        cntrlIsPressed = false;
    });
});