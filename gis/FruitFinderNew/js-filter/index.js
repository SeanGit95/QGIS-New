

window.onload = function () {
    let options = new Set();
    let layers = [];
    let selected = '';
    let selectEl = document.getElementById('filterByType');
    let selectLegit = document.getElementById('filterByLegit');
    selectLegit.addEventListener('change', function (event) {
        selected = event.target.value;
        if (selected == 'הכל') {
            layers.forEach(l => {
                map.addLayer(l)

            });
            return;
        }
        if (selected == 'לגיטימי') {
            layers.forEach(l => {
                if (l.feature.properties.description.includes('לא לגיטימי') ||
                    l.feature.properties.description.includes('חצי לגיטימי')
                ) {
                    map.removeLayer(l)
                } else {
                    if (!map.hasLayer(l)) {
                        map.addLayer(l)
                    }
                }
            })
            return;
        }
        layers.forEach(l => {
            if (!l.feature.properties.description.includes(selected)) {
                map.removeLayer(l)
            } else {
                if (!map.hasLayer(l)) {
                    map.addLayer(l)
                }
            }
        })
    })
    selectEl.addEventListener('change', function (event) {
        selected = event.target.value;
        if (selected == 'select') {
            layers.forEach(l => {
                map.addLayer(l)

            });
            return;
        }
        layers.forEach(l => {
            if (l.options.pane !== selected) {
                map.removeLayer(l)
            } else {
                if (!map.hasLayer(l)) {
                    map.addLayer(l)
                }
            }
        })
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

    selectEl.appendChild(option)

    options.forEach(function (opt) {
        let option = document.createElement('option');
        options.add(opt)
        option.innerHTML = opt;
        selectEl.appendChild(option)
    })

}