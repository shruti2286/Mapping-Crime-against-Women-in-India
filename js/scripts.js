mapboxgl.accessToken = 'pk.eyJ1Ijoic2hydXRpMjE1IiwiYSI6ImNrNzR3dndkYjBpYTEzaHBvZG1jc3ZhOWcifQ.YQB_T3pJhhgrxJRcvWxWRQ';

// instantiate the map
var map = new mapboxgl.Map({
  container: 'mapContainer',
  style: 'mapbox://styles/mapbox/light-v10',
  center: [79.171153,22.912037],
  zoom: 4.25,
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
      'fill-opacity': 0.3,
    }
  }, 'waterway-label')

  // add an empty data source, which highlights the tract that a user clicks on
  //map.addSource('highlight-feature', {
  //  type: 'geojson',
  //  data: {
  //    type: 'FeatureCollection',
  //    features: []
  //  }
  //})

  // add a layer for the highlighted tract boundary
  //map.addLayer({
  //  id: 'highlight-line',
  //  type: 'line',
  //  source: 'highlight-feature',
  //  paint: {
  //    'line-width': 3,
  //    'line-color': 'red',
  //  }
  //});

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
      `<div id="popup" class="popup" style="z-index: 10; color:${StateLookup(grade).color};">` +
      '<b> Name of  State: </b>' + st_nm +" </br>" +
      '<b> Risk Level: </b>' + grade + " </br>" +
      '<b> State Population: </b>' + Pop2011 + " </br>" +
      '<b> Population Density: </b>' + popden + " (" + '</div>'
    )
    .addTo(map);

    // set this tract's polygon feature as the data for the highlight source
    map.getSource('crime-data').setData(grade.geometry);
  } else {
    map.getCanvas().style.cursor = 'default'; // make the cursor default

    // reset the highlight source to an empty featurecollection
    map.getSource('crime-data').setData({
      type: 'FeatureCollection',
      features: []
    });
  }
});
});

//on button click, load map and legend for "2018 Statistics"
$('#button18').on('click', function() {
  $('.legend').hide(); // hide all legend divs
  $('.2018-legend').show(); // only show the legend for the corresponding data

  // set visual properties according the data source corresponding to the button
  //map.setPaintProperty('grade-fill', 'fill-opacity', 5);
  map.setPaintProperty('grade-fill', 'fill-color', {
    type: 'categorical',
    property: "grade18",
    stops: [
      [grade18Stops[0], hexCodes[0]],
      [grade18Stops[1], hexCodes[1]],
      [grade18Stops[2], hexCodes[2]],
      [grade18Stops[3], hexCodes[3]],
      [grade18Stops[4], hexCodes[4]],
    ]
  });

  //map.setPaintProperty('highlight-line', 'line-opacity', 1.5);
  map.setPaintProperty('highlight-line', 'line-color', "red");

});

//on button click, load map and legend for "Local Tweets"
$('#button17').on('click', function() {
  $('.legend').hide();
  $('.2017-legend').show();

  //map.setPaintProperty('grade-fill', 'fill-opacity', 0.7);
  map.setPaintProperty('grade-fill', 'fill-color', {
    type: 'categorical',
    property: "grade17",
    stops: [
      [grade17Stops[0], hexCodes[0]],
      [grade17Stops[1], hexCodes[1]],
      [grade17Stops[2], hexCodes[2]],
      [grade17Stops[3], hexCodes[3]],
      [grade17Stops[4], hexCodes[4]],
    ]
  });
  //map.setPaintProperty('highlight-line', 'line-opacity', 0.8);
  map.setPaintProperty('highlight-line', 'line-color', "red");
});

//on button click, load map and legend for "Visitor Tweets"
$('#button16').on('click', function() {
  $('.legend').hide();
  $('.2016-legend').show();

  //map.setPaintProperty('grade-fill', 'fill-opacity', 0.7);
  map.setPaintProperty('grade-fill', 'fill-color', {
    type: 'categorical',
    property: "grade16",
    stops: [
      [grade16Stops[0], hexCodes[0]],
      [grade16Stops[1], hexCodes[1]],
      [grade16Stops[2], hexCodes[2]],
      [grade16Stops[3], hexCodes[3]],
      [grade16Stops[4], hexCodes[4]],
    ]
  });
  //map.setPaintProperty('highlight-line', 'line-opacity', 0.8);
  map.setPaintProperty('highlight-line', 'line-color', "red");
});
