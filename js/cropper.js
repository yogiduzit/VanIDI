var rectangle;
var counter = 0;
var currentNE;
var currentSW;

<<<<<<< HEAD
function isCtrlDown(event) {
    if (event.ctrlKey) {
        google.maps.event.addListener(map, "click", function (event) {
=======
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
>>>>>>> e6d9c6bb9cb3a06b026ebc619737d983fb13ba3d
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

            rectangle.addListener('click', function () {
                currentNE = this.getBounds().getNorthEast();
                currentSW = this.getBounds().getSouthWest();
                console.log(this.title, currentNE.lat(), currentNE.lng(), currentSW.lat(), currentSW.lng());
            });

<<<<<<< HEAD
            var rectPoly = createPolygonFromRectangle(rectangle); //create a polygom from a rectangle

            rectPoly.addListener('click', function (e) {
                rotatePolygon(rectPoly, 10);
            });

        });
    }
=======
                
            // });
        };
        cntrlIsPressed = false;
    });
    });
>>>>>>> e6d9c6bb9cb3a06b026ebc619737d983fb13ba3d

    function createPolygonFromRectangle(rectangle) {
        var map = rectangle.getMap();

        var coords = [
            { lat: rectangle.getBounds().getNorthEast().lat(), lng: rectangle.getBounds().getNorthEast().lng() },
            { lat: rectangle.getBounds().getNorthEast().lat(), lng: rectangle.getBounds().getSouthWest().lng() },
            { lat: rectangle.getBounds().getSouthWest().lat(), lng: rectangle.getBounds().getSouthWest().lng() },
            { lat: rectangle.getBounds().getSouthWest().lat(), lng: rectangle.getBounds().getNorthEast().lng() }
        ];

        // Construct the polygon.
        var rectPoly = new google.maps.Polygon({
            path: coords
        });
        var properties = ["strokeColor", "strokeOpacity", "strokeWeight", "fillOpacity", "fillColor"];
        //inherit rectangle properties 
        var options = {};
        properties.forEach(function (property) {
            if (rectangle.hasOwnProperty(property)) {
                options[property] = rectangle[property];
            }
        });
        rectPoly.setOptions(options);

        rectangle.setMap(null);
        rectPoly.setMap(map);
        return rectPoly;
    }


    function rotatePolygon(polygon, angle) {
        var map = polygon.getMap();
        var prj = map.getProjection();
        var origin = prj.fromLatLngToPoint(polygon.getPath().getAt(0)); //rotate around first point

        var coords = polygon.getPath().getArray().map(function (latLng) {
            var point = prj.fromLatLngToPoint(latLng);
            var rotatedLatLng = prj.fromPointToLatLng(rotatePoint(point, origin, angle));
            return { lat: rotatedLatLng.lat(), lng: rotatedLatLng.lng() };
        });
        polygon.setPath(coords);
    }

    function rotatePoint(point, origin, angle) {
        var angleRad = angle * Math.PI / 180.0;
        return {
            x: Math.cos(angleRad) * (point.x - origin.x) - Math.sin(angleRad) * (point.y - origin.y) + origin.x,
            y: Math.sin(angleRad) * (point.x - origin.x) + Math.cos(angleRad) * (point.y - origin.y) + origin.y
        };
    }
}
