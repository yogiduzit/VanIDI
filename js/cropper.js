var rectangle;
var counter = 0;
var currentNE;
var currentSW;

var cntrlIsPressed = false;

// function showNewRect(event) {
//   }

$(document).keydown(function(event){
    if(event.which=="17")
        cntrlIsPressed = true;
        console.log("keyDown");
});

$(document).keyup(function(){
    if(event.which=="17")
        cntrlIsPressed = false;
        console.log("keyUp");
});


    $('#map').on('click', function(){
        google.maps.event.addListener(map, "click", function (event) { 
        if(cntrlIsPressed){    
            var latitude = event.latLng.lat();
            var longitude = event.latLng.lng();
            //console.log( latitude + ', ' + longitude );
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

            var infoWindow = new google.maps.InfoWindow({
                content: this.title
              });

              rectangle.addListener('click', function(){
                currentNE = this.getBounds().getNorthEast();
                currentSW = this.getBounds().getSouthWest();
                //infoWindow.setPosition(this.getCenter());
                infoWindow.open(map);
                console.log(this.title, currentNE.lat(), currentNE.lng(), currentSW.lat(), currentSW.lng());
            });
            
            // google.maps.event.addListener(rectangle, "click", function(e) {

                
            // });
        };
        cntrlIsPressed = false;
    });
    });

