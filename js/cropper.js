var rectangle;

function showNewRect(event) {
    var ne = rectangle.getBounds().getNorthEast();
    var sw = rectangle.getBounds().getSouthWest();

    var contentString = '<b>Rectangle co-ords.</b><br>BOIIIIIIIIII<br>' +
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
                draggable: true
            })
            rectangle.addListener('bounds_changed', showNewRect);
        });
    }
}

