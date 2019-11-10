var rectangle;
var counter = 0;
var currentNE;
var currentSW;
var rectPoly;
var currentRectangle;

var cntrlIsPressed = false;

// function showNewRect(event) {
//   }

$(document).keydown(function(event){
    if(event.which=="17")
        cntrlIsPressed = true;
});

$(document).keyup(function(){
    if(event.which=="17")
        cntrlIsPressed = false;
});

$().keydown(function(){
    if(event.which=="8")
        cntrlIsPressed = false;
});


    $('#map').on('click', function(){
        google.maps.event.addListener(map, "click", function (event) { 
        if(cntrlIsPressed){    
            var latitude = event.latLng.lat();
            var longitude = event.latLng.lng();
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

            //rectPoly = createPolygonFromRectangle(rectangle);
            // rectPoly.addListener('click', function(e) {
            //     currentNE = this.getPath();
            //     //infoWindow.setPosition(this.getCenter());
            //     console.log(this.title, currentNE.getAt(0).lat());
            //     //rotatePolygon(rectPoly,10);
            // });

            rectangle.addListener('click', function(){
                currentNE = this.getBounds().getNorthEast();
                currentSW = this.getBounds().getSouthWest();
                currentRectangle = this;
                console.log(this.title, currentNE.lat(), currentNE.lng(), currentSW.lat(), currentSW.lng());
            });
            $('#map').keyup(function(e){
                var code = (e.keyCode ? e.keyCode : e.which);

                if(code == 8){
                    currentRectangle.setMap(null);
                }
            })
        };
        cntrlIsPressed = false;
    });
    });

    function createPolygonFromRectangle(rectangle) {
        var map = rectangle.getMap();
      
        var coords = [
          { lat: rectangle.getBounds().getNorthEast().lat(), lng: rectangle.getBounds().getNorthEast().lng() },
          { lat: rectangle.getBounds().getNorthEast().lat(), lng: rectangle.getBounds().getSouthWest().lng() },
          { lat: rectangle.getBounds().getSouthWest().lat(), lng: rectangle.getBounds().getSouthWest().lng() },
          { lat: rectangle.getBounds().getSouthWest().lat(), lng: rectangle.getBounds().getNorthEast().lng() }
        ];

        var rectPoly = new google.maps.Polygon({
            path: coords,
            editable: true,
            draggable: true
        });
        var properties = ["strokeColor","strokeOpacity","strokeWeight","fillOpacity","fillColor"];
    //inherit rectangle properties 
    var options = {};
    properties.forEach(function(property) {
        if (rectangle.hasOwnProperty(property)) {
            options[property] = rectangle[property];
        }
    });
    rectPoly.setOptions(options);

    rectangle.setMap(null);
    rectPoly.setMap(map);
    return rectPoly;
}
function rotatePolygon(polygon,angle) {
    var map = polygon.getMap();

    var prj = map.getProjection();
    var origin = prj.fromLatLngToPoint(polygon.getPath().getAt(0)); //rotate around first point

    var coords = polygon.getPath().getArray().map(function(latLng){

       var point = prj.fromLatLngToPoint(latLng);
       var rotatedLatLng =  prj.fromPointToLatLng(rotatePoint(point,origin,angle));
       return {lat: rotatedLatLng.lat(), lng: rotatedLatLng.lng()};
    });
    polygon.setPath(coords);

    //rectangle.setBounds(coords);
}

function rotateRectangle(polygon, angle){
    var map = rectangle.getMap();
    var prj = map.getProjection();
    var origin = prj.fromLatLngToPoint(rectangle.getBounds().getNorthEast()); //rotate around first point
    var coords = rectangle.getBounds().getArray().map(function(latLng){
        var point = prj.fromLatLngToPoint(latLng);
        var rotatedLatLng =  prj.fromPointToLatLng(rotatePoint(point,origin,angle));
        return {lat: rotatedLatLng.lat(), lng: rotatedLatLng.lng()};
     });
     rectangle.setBounds(coords);
}

function rotatePoint(point, origin, angle) {
    var angleRad = angle * Math.PI / 180.0;
    return {
        x: Math.cos(angleRad) * (point.x - origin.x) - Math.sin(angleRad) * (point.y - origin.y) + origin.x,
        y: Math.sin(angleRad) * (point.x - origin.x) + Math.cos(angleRad) * (point.y - origin.y) + origin.y
    };
}

