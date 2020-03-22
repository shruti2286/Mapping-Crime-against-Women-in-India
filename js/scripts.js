mapboxgl.accessToken = 'pk.eyJ1Ijoic2hydXRpMjE1IiwiYSI6ImNrNzR3dndkYjBpYTEzaHBvZG1jc3ZhOWcifQ.YQB_T3pJhhgrxJRcvWxWRQ';

// instantiate the map
var map = new mapboxgl.Map({
  container: 'mapContainer',
  style: 'mapbox://styles/mapbox/light-v10',
  center: [79.171153,22.912037],
  zoom: 4,
});

// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());

// Load map and initialize layers
// Layers are initially hidden, and will change visual properties depending
// on what data source is selected for the map through the various buttons
map.on('style.load', function() {
  $('.legend').hide();
  $('.load-legend').show();

  // use map.getStyle() in the console to inspect the basemap layers
  map.setPaintProperty('water', 'fill-color', '#a4bee8')

  // sets up the geojson as a source in the map
  map.addSource('crime-data', {
    type: 'geojson',
    data: './data/crimedata.geojson',
  });

  // initalize fill layer
  map.addLayer({
    id: 'grade-fill',
    type: 'fill',
    source: 'crime-data',
    paint: {
      'fill-opacity': 0,
    }
  }, 'waterway-label')

  // add census tract lines layer
  map.addLayer({
    id: 'rank-fill',
    type: 'fill',
    source: 'crime-data',
    paint: {
      'line-color': 'red',
      'line-opacity': {
        stops: [[12, 0], [14.8, 1]], // zoom-dependent opacity, the lines will fade in between zoom level 14 and 14.8
      }
    }
  }, 'waterway-label');

  // add an empty data source, which highlights the tract that a user clicks on
  map.addSource('highlight-feature', {
    type: 'geojson',
    data: {
      type: 'FeatureCollection',
      features: []
    }
  })

  // add a layer for the highlighted tract boundary
  map.addLayer({
    id: 'highlight-line',
    type: 'line',
    source: 'highlight-feature',
    paint: {
      'line-width': 3,
      'line-opacity': 0,
      'line-color': 'red',
    }
  });

  // when the user clicks on the census tract map, do...
  map.on('click', function (e) {

    // selects the census tract features under the mouse
    var features = map.queryRenderedFeatures(e.point, {
      layers: ['grade-fill'],
    });

    // get the first feature from the array of returned features.
    var grade = features[0]

    if (grade) {  // if there's a tract under the mouse, do...
    map.getCanvas().style.cursor = 'pointer';  // make the cursor a pointer

    // lookup the corresponding description for the typology
    var grade = grade.properties["grade18"];
    var statename = grade.properties["st_nm"];

    //add popup to display typology of selected tract and detailed data
    new mapboxgl.Popup()
    .setLngLat(e.lngLat)
    .setHTML(
      `<div id="popup" class="popup" style="z-index: 10; color:${StateLookup(Rank18).color};">` +
      '<b> Rank18: </b>' + Rank18 +" </br>" +
      '<b> st_nm: </b>' + statename  + " </br>" +
      '<b> Total # of Tweets: </b>' + numeral(grade.properties["grade18"]) + " </br>" +
      '<b> # of Local Tweets: </b>' + numeral(grade.properties["grade17"]) + " (" +
      grade.properties["pct_local"] + "%)" + " </br>" +
      '<b> # of Visitor Tweets: </b>' + numeral(grade.properties["grade16"]) + " (" +
      grade.properties["pct_visitor"] + "%)" + " </br>" + '</div>'
    )
    .addTo(map);

    // set this tract's polygon feature as the data for the highlight source
    map.getSource('highlight-feature').setData(grade.geometry);
  } else {
    map.getCanvas().style.cursor = 'default'; // make the cursor default

    // reset the highlight source to an empty featurecollection
    map.getSource('highlight-feature').setData({
      type: 'FeatureCollection',
      features: []
    });
  }
});
});

//on button click, load map and legend for "2018 Statistics"
$('#buttonAll').on('click', function() {
  $('.legend').hide(); // hide all legend divs
  $('.2018-legend').show(); // only show the legend for the corresponding data

  // set visual properties according the data source corresponding to the button
  map.setPaintProperty('grade-fill', 'fill-opacity', 0.7);
  map.setPaintProperty('grade-fill', 'fill-color', {
    type: 'categorical',
    property: "grade18",
    stops: [
      [grade18Stops['Very High'], hexCodes[0]],
      [grade18Stops['High'], hexCodes[1]],
      [grade18Stops['Medium'], hexCodes[2]],
      [grade18Stops['Low'], hexCodes[3]],
      [grade18Stops['Very Low'], hexCodes[4]],
    ]
  });
  map.setPaintProperty('highlight-line', 'line-opacity', 0.8);
  map.setPaintProperty('highlight-line', 'line-color', "red");

});

//on button click, load map and legend for "Local Tweets"
$('#buttonLocal').on('click', function() {
  $('.legend').hide();
  $('.2017-legend').show();

  map.setPaintProperty('grade-fill', 'fill-opacity', 0.7);
  map.setPaintProperty('grade-fill', 'fill-color', {
    type: 'categorical',
    property: "grade17",
    stops: [
      [grade17Stops['Very High'], hexCodes[0]],
      [grade17Stops['High'], hexCodes[1]],
      [grade17Stops['Medium'], hexCodes[2]],
      [grade17Stops['Low'], hexCodes[3]],
      [grade17Stops['Very Low'], hexCodes[4]]
    ]
  });
  map.setPaintProperty('highlight-line', 'line-opacity', 0.8);
  map.setPaintProperty('highlight-line', 'line-color', "red");
});

//on button click, load map and legend for "Visitor Tweets"
$('#buttonVisitor').on('click', function() {
  $('.legend').hide();
  $('.2016-legend').show();

  map.setPaintProperty('grade-fill', 'fill-opacity', 0.7);
  map.setPaintProperty('grade-fill', 'fill-color', {
    type: 'categorical',
    property: "grade16",
    stops: [
      [grade16Stops['Very High'], hexCodes[0]],
      [grade16Stops['High'], hexCodes[1]],
      [grade16Stops['Medium'], hexCodes[2]],
      [grade16Stops['Low'], hexCodes[3]],
      [grade16Stops['Very Low'], hexCodes[4]]
    ]
  });
  map.setPaintProperty('highlight-line', 'line-opacity', 0.8);
  map.setPaintProperty('highlight-line', 'line-color', "red");
});
