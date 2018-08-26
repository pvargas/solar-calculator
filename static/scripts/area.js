document.getElementById("calculate").onclick = function () { 
    var area = 0;

    console.log('function called');

    if (shapes.length > 0){
        for (let i=0; i < shapes.length; i++){
            console.log(shapes[i]);
            area += geo.computeArea(shapes[i].getPaths());
        }
    }        
    console.log('area='+area);
};