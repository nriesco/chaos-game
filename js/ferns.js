(function() {
  // config variables
  const width = 3;
  const height = 3;
  const factor = 5;

  var VIZ = {};
  var basePoint = {
    horizontalCoordinate: 0,
    verticalCoordinate: 0
  };
  var colors = ['#006600', '#663333', '#CC0033', '#330099'];
  var svg = d3.select("#svg-container")
    .append("svg")
    .attr("id", "thesvg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", "0 0 " + width + " " + height)
    .append("g");

  VIZ.times = 10000;
  VIZ.count = 0;

  function getCoords(horizontalCoordinate, verticalCoordinate) {
    var p = random(1, 1000);
    return p <= 701 ? {
        color: 0,
        horizontalCoordinate: 0.81 * horizontalCoordinate + 0.07 * verticalCoordinate + 0.12,
        verticalCoordinate: -0.04 * horizontalCoordinate + 0.84 * verticalCoordinate + 0.195
      } :
      p <= 851 ? {
        color: 1,
        horizontalCoordinate: 0.18 * horizontalCoordinate - 0.25 * verticalCoordinate + 0.12,
        verticalCoordinate: 0.27 * horizontalCoordinate + 0.23 * verticalCoordinate + 0.02
      } :
      p <= 980 ? {
        color: 2,
        horizontalCoordinate: 0.19 * horizontalCoordinate + 0.275 * verticalCoordinate + 0.16,
        verticalCoordinate: 0.238 * horizontalCoordinate - 0.14 * verticalCoordinate + 0.12
      } : {
        color: 3,
        horizontalCoordinate: 0.0235 * horizontalCoordinate + 0.087 * verticalCoordinate + 0.11,
        verticalCoordinate: 0.045 * horizontalCoordinate + 0.1666 * verticalCoordinate
      };
  }

  function random(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
  }

  function renderPoint(data, flag) {
    svg.append("circle")
      .attr("class", "fractalPoint")
      .style("fill", flag ? colors[0] : colors[data.color])
      .style("opacity", 0.6)
      .attr("cx", data.horizontalCoordinate)
      .attr("cy", data.verticalCoordinate)
      .attr("r", 0.002);
  }

  VIZ.addPoint = function(colors) {
    var tempPoint = getCoords(basePoint.horizontalCoordinate, basePoint.verticalCoordinate);
    basePoint = tempPoint;
    renderPoint({
      color: tempPoint.color,
      horizontalCoordinate: basePoint.horizontalCoordinate + (width / factor),
      verticalCoordinate: basePoint.verticalCoordinate
    }, colors);
  };

  VIZ.onResize = function() {
    var aspect = (height / width);
    var chart = $("#thesvg");
    var targetWidth = chart.parent().width();
    chart.attr("width", targetWidth);
    chart.attr("height", (targetWidth / aspect));
  };

  window.VIZ = VIZ;

}());
