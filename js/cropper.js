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

$('#map').on('click', function () {
    google.maps.event.addListener(map, "click", function (event) {
        if (cntrlIsPressed) {
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
            
            var rectPoly = createPolygonFromRectangle(rectangle); //create a polygom from a rectangle

            rectPoly.addListener('click', function(e) {
                rotatePolygon(rectPoly,10);
            });
           
            rectangle.addListener('click', function () {
                currentNE = this.getBounds().getNorthEast();
                currentSW = this.getBounds().getSouthWest();
                console.log(this.title, currentNE.lat(), currentNE.lng(), currentSW.lat(), currentSW.lng());
            });
        };
        cntrlIsPressed = false;
    });
});

var rectPoly = new google.maps.Polygon({
    path: coords
});


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
}

function rotatePoint(point, origin, angle) {
    var angleRad = angle * Math.PI / 180.0;
    return {
        x: Math.cos(angleRad) * (point.x - origin.x) - Math.sin(angleRad) * (point.y - origin.y) + origin.x,
        y: Math.sin(angleRad) * (point.x - origin.x) + Math.cos(angleRad) * (point.y - origin.y) + origin.y
    };
