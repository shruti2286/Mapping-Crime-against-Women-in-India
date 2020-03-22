// setting up arrays to store stops for displaying the data
var hexCodes = ['#440154', '#443a83', '#31688e', '#20908d', '#35b779'];

var grade18Stops = ['VH - Very High','H - High', 'M - Medium', 'L - Low', 'VL - Very Low'];

var grade17Stops = ['VH - Very High','H - High', 'M - Medium', 'L - Low', 'VL - Very Low'];

var grade16Stops = ['VH - Very High','H - High', 'M - Medium', 'L - Low', 'VL - Very Low'];

// Code for building legends for the Twitter buttons
for (var i=0; i<7; i++) {
  $('.grade18-legend').append(`
    <div>
      <div class="legend-color-box" style="background-color:${hexCodes[i]};"></div>
      <span> ${grade18Stops[i]} - ${grade18Stops[i+1]-1} </span>
    </div>
  `)

  $('.grade17-legend').append(`
    <div>
      <div class="legend-color-box" style="background-color:${hexCodes[i]};"></div>
      <span> ${grade17Stops[i]}% - ${grade17Stops[i+1]-1}% </span>
    </div>
  `)

  $('.grade16-legend').append(`
    <div>
      <div class="legend-color-box" style="background-color:${hexCodes[i]};"></div>
      <span> ${grade16Stops[i]}% - ${grade16Stops[i+1]-1}% </span>
    </div>
  `)
}

// Code for building legends for the Twitter buttons
for (var i=0; i<7; i++) {
  $('.grade18-legend').append(`
    <div>
      <div class="legend-color-box" style="background-color:${hexCodes[i]};"></div>
      <span> ${grade18Stops[i]} - ${grade18Stops[i+1]-1} tweets </span>
    </div>
  `)

  $('.grade17-legend').append(`
    <div>
      <div class="legend-color-box" style="background-color:${hexCodes[i]};"></div>
      <span> ${grade17Stops[i]}% - ${grade17Stops[i+1]-1}% </span>
    </div>
  `)

  $('.grade16-legend').append(`
    <div>
      <div class="legend-color-box" style="background-color:${hexCodes[i]};"></div>
      <span> ${grade16Stops[i]}% - ${grade16Stops[i+1]-1}% </span>
    </div>
  `)
}
