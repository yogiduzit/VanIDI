
//Shapes
var rectangle;
var circle;
var rectPoly;

//flags for different shape modes
var modeRec = true;
var modeCir = false;
var modePoly = false;

//counter for naming windows -- global to all shapes
var counter = 0;

//Square coordinates
var currentNE;
var currentSW;

//holder for selected rectangle
var currentShape;

//flag for ctrl key press
var cntrlIsPressed = false;

//key for control is 17 
$(document).keydown(function (event) {
    if (event.which == "16")
        cntrlIsPressed = true;
});

$(document).keyup(function () {
    if (event.which == "16")
        cntrlIsPressed = false;
});

$('#map').on('click', function() {
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
        if(modeRec){
            rectangle = new google.maps.Rectangle({
                bounds: bounds,
                editable: true,
                map: map,
                draggable: true,
                title: "Window" + counter
            })
            rectangle.addListener('click', function(){
                currentNE = this.getBounds().getNorthEast();
                currentSW = this.getBounds().getSouthWest();
                currentShape = this;
                let object = {};
                object.maxLat = currentNE.lat();
                object.minLat = currentSW.lat();
                object.maxLng = currentNE.lng();
                object.minLng = currentSW.lng();

                window.utils.drawCroppedBikeData(object.minLat, object.maxLat, object.minLng, object.maxLng);
            });
        }
        else if(modeCir){
            circle = new google.maps.Circle({
                editable: true,
                map: map,
                draggable: true,
                center: {lat: latitude, lng: longitude},
                radius: 100,
                title: "Window" + counter
            })
            circle.addListener('click', function(){
                currentNE = this.getBounds().getNorthEast();
                currentSW = this.getBounds().getSouthWest();
                currentShape = this;
                console.log(this.title, currentNE.lat(), currentNE.lng(), currentSW.lat(), currentSW.lng());
            });
        }
        else if(modePoly){
            rectangle = new google.maps.Rectangle({
                bounds: bounds,
                editable: true,
                map: map,
                draggable: true,
                title: "Window" + counter
            })
            rectPoly = createPolygonFromRectangle(rectangle);
            rectPoly.addListener('click', function(e) {
                currentNE = this.getPath();
                console.log(this.title, currentNE.getAt(0).lat());
                currentShape = this;
                //rotatePolygon(rectPoly,10);
            });

        }
        counter++;
        $('#map').keyup(function(e){
            var code = (e.keyCode ? e.keyCode : e.which);
            if(code == 8){
                currentShape.setMap(null);
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
