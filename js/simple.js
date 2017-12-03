var data = [30, 86, 168, 281, 303, 365];
var band = ["A", "B", "C", "D", "E", "F"];

var w = 400;
var h = 300;
var offset = 10;
// var barW = (w - (data.length - 1) * offset) / data.length;
var y = d3.scaleLinear().domain([d3.max(data), 0]).range([0, 300]);
var yAxis = d3.axisLeft(y);
var x = d3.scaleBand().domain(band).rangeRound([0, w]).padding(0.1);
var xAxis = d3.axisBottom(x);
var chart = d3
  .select(".chart")
  .append("svg")
  .attr("width", w + 30)
  .attr("height", h + 60);

var bar = chart
  .selectAll("g")
  .data(data)
  .enter()
  .append("g")
  .attr("transform", function(d, i) {
    return (
      "translate(" +
      (i * (x.padding() * x.bandwidth() + x.bandwidth()) + 30) +
      ",0)"
    );
  });
chart.append("g").attr("transform", "translate(30," + h + ")").call(xAxis);
chart.append("g").attr("transform", "translate(30,0)").call(yAxis);

var rect = bar
  .append("rect")
  .attr("y", y)
  .attr("class", "bar")
  .attr("width", x.bandwidth())
  .attr("fill", "steelblue")
  .attr("height", function(d) {
    return h - y(d);
  });
  
bar.append("text").attr("y", h - 10).attr("dx", ".75em").text(function(d) {
  return d;
});
