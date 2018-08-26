document.getElementById("calculate").onclick = function () { 
    var area = 0;

    if (shapes.length > 0){
        // calculates area (value is in m^2) of each polygon and adds them together
        for (let i=0; i < shapes.length; i++){
            area += google.maps.geometry.spherical.computeArea(coordinates[i]);
        }
    }        

    // rounds area to 2 decimal places
    roundedArea = (Math.round(area * 100) / 100);

    // places area and nominal power values inside html page
    document.getElementById("area").innerHTML = roundedArea+' m<sup>2</sup>';
    document.getElementById("nominal").innerHTML = nominalPower(roundedArea) + ' kWp';
};

function nominalPower(area) {
    np = area / 10;
    return (Math.round(np * 100) / 100);
}