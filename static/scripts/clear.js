function ClearControl(controlDiv, map) {

    // style for the control border.
    var controlUI = document.createElement('div');
    controlUI.style.backgroundColor = '#fff';
    controlUI.style.border = '2px solid #fff';
    controlUI.style.borderRadius = '3px';
    controlUI.style.boxShadow = '0 1px 1px rgba(0,0,0,.2)';
    controlUI.style.cursor = 'pointer';    
    controlUI.style.marginTop = '.5em';
    controlUI.style.textAlign = 'center';
    controlUI.title = 'Click to remove polygons';
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

    // event listener to remove shapes from map when user clicks 'clear'
    controlUI.addEventListener('click', function() {
        for (var i=0; i < shapes.length; i++){
            shapes[i].overlay.setMap(null);
        }
        shapes = [];
        coordinates = [];

        // resets text area values
        document.getElementById("area").innerHTML = '0 m<sup>2</sup>';
        document.getElementById("nominal").innerHTML = '0 kWp';
    });   
};
