

window.onload = function () {
    let options = new Set();
    let layers = [];
    let selectedType = '';
    let selectedLegit = '';
    
    let selectEl = document.getElementById('filterByType');
    let selectLegit = document.getElementById('filterByLegit');



    function drwaLayers() {
        layers.forEach(l => {
            map.removeLayer(l);
        });
      
        let finalLayer = layers.filter(l => {
            let result = true;
            let resultLegit = true;
           
            if (selectedType == 'select') {
                result = true;
            } else if (l.options.pane !== selectedType) {
                result = false;
            }

            if (selectedLegit == 'לגיטימי') {
                if (l.feature.properties.description.includes('לא לגיטימי') ||
                    l.feature.properties.description.includes('חצי לגיטימי')
                ) {
                    resultLegit = false
                }
            }
            if (selectedLegit !== 'הכל' && !l.feature.properties.description.includes(selectedLegit)) {
                resultLegit = false;
            } 

            return result && resultLegit;
        })
        console.log('finalLayer',finalLayer.length);
        finalLayer.forEach((l,i) => {
            map.addLayer(l);
        });
    }
    selectLegit.addEventListener('change', function (event) {
        selectedLegit = event.target.value;
        drwaLayers();

    })
    selectEl.addEventListener('change', function (event) {
        selectedType = event.target.value;
        drwaLayers();

    })

    map.eachLayer(function (layer) {
        if (layer instanceof L.CircleMarker) {
            //do something
            layers.push(layer)
            options.add(layer.options.pane)


        }
    });
   
    let option = document.createElement('option');
    option.innerHTML = 'select';
    selectEl.appendChild(option)


    options.forEach(function (opt) {
        let option = document.createElement('option');
        options.add(opt)
        option.innerHTML = opt;
        selectEl.appendChild(option)
    })

}