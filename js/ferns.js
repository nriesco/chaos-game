(function() {
  var VIZ = {};
  var width = 3;
  var height = 3;
  var factor = 5;
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

  function getCoords(x, y) {
    var p = random(1, 1000);
    return p <= 701 ? {
        c: 0,
        horizontalCoordinate: 0.81 * x + 0.07 * y + 0.12,
        verticalCoordinate: -0.04 * x + 0.84 * y + 0.195
      } :
      p <= 851 ? {
        c: 1,
        horizontalCoordinate: 0.18 * x - 0.25 * y + 0.12,
        verticalCoordinate: 0.27 * x + 0.23 * y + 0.02
      } :
      p <= 980 ? {
        c: 2,
        horizontalCoordinate: 0.19 * x + 0.275 * y + 0.16,
        verticalCoordinate: 0.238 * x - 0.14 * y + 0.12
      } : {
        c: 3,
        horizontalCoordinate: 0.0235 * x + 0.087 * y + 0.11,
        verticalCoordinate: 0.045 * x + 0.1666 * y
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
      color: tempPoint.c,
      horizontalCoordinate: basePoint.horizontalCoordinate + (width / factor),
      verticalCoordinate: basePoint.verticalCoordinate + (height / (factor * 2))
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
