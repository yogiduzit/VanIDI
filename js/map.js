$(document).ready(function(){
    var map;
    function initMap() {
    let myLatLng = {lat: 49.261433, lng: -123.104965};
    let myLatLngB = getOffsetLocation(49.261433, -123.104965, 'north', 1000);
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 49.2827, lng: -123.1207 },
        zoom: 15,

        styles:
        [
            {
            "featureType": "administrative",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                "color": "#444444"
                }
            ]
            },
            {
            "featureType": "landscape",
            "elementType": "all",
            "stylers": [
                {
                "color": "#f2f2f2"
                }
            ]
            },
            {
            "featureType": "landscape",
            "elementType": "labels.text",
            "stylers": [
                {
                "visibility": "on"
                },
                {
                "hue": "#ff0000"
                }
            ]
            },
            {
            "featureType": "poi",
            "elementType": "all",
            "stylers": [
                {
                "visibility": "off"
                }
            ]
            },
            {
            "featureType": "road",
            "elementType": "all",
            "stylers": [
                {
                "saturation": -100
                },
                {
                "lightness": 45
                }
            ]
            },
            {
            "featureType": "road.highway",
            "elementType": "all",
            "stylers": [
                {
                "visibility": "simplified"
                }
            ]
            },
            {
            "featureType": "road.arterial",
            "elementType": "labels.icon",
            "stylers": [
                {
                "visibility": "off"
                }
            ]
            },
            {
            "featureType": "transit",
            "elementType": "all",
            "stylers": [
                {
                "visibility": "off"
                }
            ]
            },
            {
            "featureType": "water",
            "elementType": "all",
            "stylers": [
                {
                "color": "#10ade4"
                },
                {
                "visibility": "on"
                }
            ]
            }
        ]
    });
    let marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: 'point a'
        
    });
    let marker2 = new google.maps.Marker({
        position: myLatLngB,
        map: map,
        title: 'point b'
        
    });

    }

});
