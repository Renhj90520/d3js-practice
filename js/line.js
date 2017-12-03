var margin = { top: 10, right: 20, bottom: 30, left: 30 };
var width = 400 - margin.left - margin.right;
var height = 565 - margin.top - margin.bottom;

var svgline = d3
  .select(".line")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

d3.json("./data/line.json", (err, data) => {
  var parseTime = d3.timeParse("%Y/%m/%d");

  data.forEach(company => {
    company.values.forEach(d => {
      d.date = parseTime(d.date);
      d.close = +d.close;
    });
  });

  var xScale = d3
    .scaleTime()
    .domain([
      d3.min(data, co => d3.min(co.values, d => d.date)),
      d3.max(data, co => d3.max(co.values, d => d.date))
    ])
    .range([0, width]);

  var yScale = d3
    .scaleLinear()
    .domain([
      d3.min(data, co => d3.min(co.values, d => d.close)),
      d3.max(data, co => d3.max(co.values, d => d.close))
    ])
    .range([height, 0])
    .nice();

  var gridLines = d3.axisLeft(yScale).tickSize(-width, 0, 0).tickFormat("");
  svgline.append("g").call(gridLines).classed("gridline", true);
  svgline.append("g").call(d3.axisLeft(yScale)).classed("axis y", true);
  svgline
    .append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(xScale).ticks(5))
    .selectAll("text")
    .style("text-anchor", "end")
    .attr("dx", -8)
    .attr("dy", 0)
    .attr("transform", "translate(0,0) rotate(-45)");

  var line = d3
    .line()
    .x(d => xScale(d.date))
    .y(d => yScale(d.close))
    .curve(d3.curveCatmullRom.alpha(0.5));
  svgline
    .selectAll(".line")
    .data(data)
    .enter()
    .append("path")
    .attr("class", "line")
    .attr("d", d => line(d.values))
    .style("stroke", (d, i) => ["#ff9900", "#3369e8"][i])
    .style("stroke-width", 2)
    .style("fill", "none");
});
