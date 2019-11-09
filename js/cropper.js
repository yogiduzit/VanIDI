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
            var rectangle = new google.maps.Rectangle({
                bounds: bounds,
                editable: true,
                map: map,
                draggable: true
            })
        });
    }
}
