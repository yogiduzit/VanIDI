var rectangle;
var rectPoly;
var coords;

function showNewRect(event) {
    var ne = rectangle.getBounds().getNorthEast();
    var sw = rectangle.getBounds().getSouthWest();

    var contentString = '<b>Rectangle co-ords.</b><br>' +
        'north-east:' + ne.lat() + ', ' + ne.lng() + '<br>' +
        'south-west: ' + sw.lat() + ', ' + sw.lng();

    // Set the info window's content and position.
    infoWindow.setContent(contentString);
    infoWindow.setPosition(ne);

    infoWindow.open(map);
  }

function isCtrlDown(event){
    if(event.ctrlKey){
        google.maps.event.addListener(map, "click", function (event) {
            var latitude = event.latLng.lat();
            var longitude = event.latLng.lng();
            console.log( latitude + ', ' + longitude );
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
                geodistic: true
            })

            rectangle.addListener('bounds_changed', showNewRect); 
            
            google.maps.event.addListener(drawingManager, "overlaycomplete", function (event) {
                var polygon = event.overlay;
                google.maps.event.addListener(polygon, 'click', function (e) {
                    autoRotatePolygon(polygon, 5);
                });
            });
        });
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
    }
    
    function rotatePoint(point, origin, angle) {
        var angleRad = angle * Math.PI / 180.0;
        return {
            x: Math.cos(angleRad) * (point.x - origin.x) - Math.sin(angleRad) * (point.y - origin.y) + origin.x,
            y: Math.sin(angleRad) * (point.x - origin.x) + Math.cos(angleRad) * (point.y - origin.y) + origin.y
        };
    }
}

