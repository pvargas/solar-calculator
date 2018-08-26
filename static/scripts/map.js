var map;
var geo;

function initMap() {
    geo = google.maps.geometry.spherical;
    console.log(geo);
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 42.3601, lng: -71.0589},
        zoom: 12,
        streetViewControl: false,        
    });
    
    var input = document.getElementById('pac-input');
    var options = {
        componentRestrictions: {country: "us"} // restrict search to the US
    };
    
    var Autocomplete = new google.maps.places.Autocomplete(input, options); 

    /////////////////////////////////////////////
    Autocomplete.bindTo('bounds', map);

    // Set the data fields to return when the user selects a place.
    Autocomplete.setFields(
        ['address_components', 'geometry', 'icon', 'name']);

    var infowindow = new google.maps.InfoWindow();
    var infowindowContent = document.getElementById('infowindow-content');
    infowindow.setContent(infowindowContent);

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

            var coords = place.geometry.location.lat() + ", " +         
                place.geometry.location.lng();
            
            console.log(coords);
        }
        
        // Places informaiton box above marker
        infowindowContent.children['place-icon'].src = place.icon;
        infowindowContent.children['place-name'].textContent = place.name;
        infowindowContent.children['place-address'].textContent = address;        
        infowindow.open(map, marker);
    });
    var drawingShapeOtions = {
        fillColor: '#fdc029',
        fillOpacity: 0.5,
        strokeWeight: 2,
        clickable: false,
        editable: true,
        zIndex: 1
    };
    var drawingManager = new google.maps.drawing.DrawingManager({
        drawingControl: true,
        drawingControlOptions: {
            position: google.maps.ControlPosition.TOP_CENTER,
            drawingModes: ['polygon', 'rectangle']
        },        
        polygonOptions: drawingShapeOtions,
        rectangleOptions: drawingShapeOtions
    });

    drawingManager.setMap(map);
    var centerControlDiv = document.createElement('div');
    var centerControl = new CenterControl(centerControlDiv, map);
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);

    trackShapes(drawingManager);
};


