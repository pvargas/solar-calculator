function CenterControl(controlDiv, map) {
    var chicago = {lat: 41.85, lng: -87.65};

    // style for the control border.
    var controlUI = document.createElement('div');
    controlUI.style.backgroundColor = '#fff';
    controlUI.style.border = '2px solid #fff';
    controlUI.style.borderRadius = '3px';
    controlUI.style.boxShadow = '0 1px 1px rgba(0,0,0,.2)';
    controlUI.style.cursor = 'pointer';    
    controlUI.style.marginTop = '.5em';
    controlUI.style.textAlign = 'center';
    controlUI.title = 'Click to clear drawings';
    controlDiv.appendChild(controlUI);

    // style for the control interior.
    var controlText = document.createElement('div');
    controlText.style.color = 'rgb(25,25,25)';
    controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
    controlText.style.fontSize = '1.4em';
    controlText.style.paddingLeft = '5px';
    controlText.style.paddingRight = '5px';
    controlText.innerHTML = 'Clear Shapes';
    controlUI.appendChild(controlText);

    // event listener to empty shapes array
    controlUI.addEventListener('click', function() {
        for (var i=0; i < shapes.length; i++){
            shapes[i].overlay.setMap(null);
        }
        shapes = [];
        console.log(shapes.length);
    });   
};
var shapes = [];

// function to keep track of all shapes drawn
function trackShapes(drawingManager){
    
    google.maps.event.addListener(drawingManager, 'overlaycomplete', function(e) {
        shapes.push(e);
        console.log(shapes.length);
        if (e.type != google.maps.drawing.OverlayType.MARKER) {
            // Switch back to non-drawing mode after drawing a shape.            

            // Add an event listener that selects the new shapes
            var newShape = e.overlay;
            newShape.type = e.type;            

            // drawingManager.setDrawingMode(null);
        };
    });
};

