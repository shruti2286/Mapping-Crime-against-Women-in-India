// setting up arrays to store stops for displaying the data
var hexCodes = ['#C0392B', '#EC7063', '#F9E79F', '#2ECC71', '#138D75'];

var grade18Stops = ['Very High', 'High', 'Medium', 'Low', 'Very Low'];

var grade17Stops = ['Very High', 'High', 'Medium', 'Low', 'Very Low'];

var grade16Stops = ['Very High', 'High', 'Medium', 'Low', 'Very Low'];

// Code for building legends for the Twitter buttons
for (var i = 0; i < 5; i++) {
  $('.grade18-legend').append(`
    <div>
      <div class="legend-color-box" style="background-color:${hexCodes[i]};"></div>
      <span> ${grade18Stops[i]} </span>
    </div>
  `)

  $('.grade17-legend').append(`
    <div>
      <div class="legend-color-box" style="background-color:${hexCodes[i]};"></div>
      <span> ${grade17Stops[i]} </span>
    </div>
  `)

  $('.grade16-legend').append(`
    <div>
      <div class="legend-color-box" style="background-color:${hexCodes[i]};"></div>
      <span> ${grade16Stops[i]} </span>
    </div>
  `)
}
