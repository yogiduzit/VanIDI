var rectangle;
var counter = 0;
var currentNE;
var currentSW;
var cntrlIsPressed = false;

//key for control is 17 
$(document).keydown(function (event) {
    if (event.which == "17")
        cntrlIsPressed = true;
    console.log("keyDown");
});

$(document).keyup(function () {
    if (event.which == "17")
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
<<<<<<< HEAD
                      
=======
          
           
>>>>>>> 6d2526300fd38e4ae113d838feb564f768e4fdac
            rectangle.addListener('click', function () {
                currentNE = this.getBounds().getNorthEast();
                currentSW = this.getBounds().getSouthWest();
                console.log(this.title, currentNE.lat(), currentNE.lng(), currentSW.lat(), currentSW.lng());
            });
        };
        cntrlIsPressed = false;
    });
<<<<<<< HEAD
});


=======
});
>>>>>>> 6d2526300fd38e4ae113d838feb564f768e4fdac
