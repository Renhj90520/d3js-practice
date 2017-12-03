var chartdata = [
  40,
  60,
  80,
  100,
  70,
  120,
  100,
  60,
  70,
  150,
  120,
  140,
  140,
  120,
  150,
  70,
  60,
  100,
  120,
  70,
  100,
  80,
  60,
  40
];

var width = 720;
var height = 200;

var yScale = d3.scaleLinear().domain([0, d3.max(chartdata)]).range([0, height]);
var xScale = d3
  .scaleBand()
  .domain(d3.range(0, chartdata.length))
  .padding(0.1)
  .range([0, width]);

var svg = d3
  .select(".barchart")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .style("background", "#dff08d");

var bar = svg.selectAll("rect").data(chartdata);

// Enter
bar
  .enter()
  .append("rect")
  .attr("fill", "#3c763d")
  .attr("stroke", "#d6e9c6")
  .attr("stroke-width", 5)
  .attr("width", xScale.bandwidth())
  .attr("height", function(d) {
    return yScale(d);
  })
  .attr("x", function(d, i) {
    return xScale(i);
  })
  .attr("y", function(d) {
    return height - yScale(d);
  })
  .on("mouseover", function(d) {
    d3.select(this).style("fill", "red");
  })
  .on("mouseout", function(d) {
    d3.select(this).style("fill", "#3c763d");
  });
