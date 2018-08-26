// This script sets up the map and its controls


var map;

// array to keep track of coordinates
var coordinates = [];
// array to keep track of drawn shapes
var shapes = [];

function initMap() {
    
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 42.3601, lng: -71.0589},
        zoom: 12,
        streetViewControl: false,        
    });
    
    var input = document.getElementById('pac-input');
    var options = {
        // restrict search to the US
        componentRestrictions: {country: "us"}
    };
    
    var Autocomplete = new google.maps.places.Autocomplete(input, options); 
    Autocomplete.bindTo('bounds', map);

    // Set the data fields to return when the user selects a place.
    Autocomplete.setFields(
        ['address_components', 'geometry', 'icon', 'name']);

    var infowindow = new google.maps.InfoWindow();
    var infowindowContent = document.getElementById('infowindow-content');
    infowindow.setContent(infowindowContent);

    // mark search result
    var marker = new google.maps.Marker({
        map: map,
        anchorPoint: new google.maps.Point(0, -29)
    });

    Autocomplete.addListener('place_changed', function() {
        infowindow.close();
        marker.setVisible(false);
        var place = Autocomplete.getPlace();
        if (!place.geometry) {
            // User entered the name of a Place that was not suggested and
            // pressed the Enter key, or the Place Details request failed.
            window.alert("Couldn't find '" + place.name + "'");
            return;
        }

        // If the place has a geometry, then present it on map.
        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(15);
        }
        marker.setPosition(place.geometry.location);
        marker.setVisible(true);

        // get address from location
        var address = '';
        if (place.address_components) {
            address = [
            (place.address_components[0] && place.address_components[0].short_name || ''),
            (place.address_components[1] && place.address_components[1].short_name || ''),
            (place.address_components[2] && place.address_components[2].short_name || '')
            ].join(' ');
        }
        
        // Places informaiton box above marker
        infowindowContent.children['place-icon'].src = place.icon;
        infowindowContent.children['place-name'].textContent = place.name;
        infowindowContent.children['place-address'].textContent = address;        
        infowindow.open(map, marker);
    });


    // setup drawing controls and options
    var drawingManager = new google.maps.drawing.DrawingManager({
        drawingControl: true,
        drawingControlOptions: {
            position: google.maps.ControlPosition.TOP_CENTER,
            drawingModes: ['polygon']
        },        
        polygonOptions:  {
            fillColor: '#fdc029',
            fillOpacity: 0.5,
            strokeWeight: 2,
            clickable: false,
            editable: false,
            zIndex: 1
        },
    });

    // add shape overlays to array (so they can be deleted if need be)
    google.maps.event.addListener(drawingManager, 'overlaycomplete', function(e) {
        shapes.push(e);
    });

    // event listener adds polygons' coordinates to array
    google.maps.event.addListener(drawingManager, 'polygoncomplete', function (polygon) {
        coordinates.push(polygon.getPath().getArray());
    });

    // place clear button on map
    drawingManager.setMap(map);
    var clearDiv = document.createElement('div');
    var clear = new ClearControl(clearDiv, map);
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(clearDiv);    
};


