var margin = { top: 10, right: 10, bottom: 30, left: 30 };
var width = 400 - margin.left - margin.right;
var hegiht = 565 - margin.top - margin.bottom;

var svgarea = d3
  .select(".area")
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

  svgarea
    .append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(xScale).ticks(5));

  var yScale = d3
    .scaleLinear()
    .domain([
      d3.min(data, co => d3.min(co.values, d => d.close)),
      d3.max(data, co => d3.max(co.values, d => d.close))
    ])
    .range([height, 0]);

  svgarea.append("g").call(d3.axisLeft(yScale));

  var area = d3
    .area()
    .x(d => xScale(d.date))
    .y0(yScale(yScale.domain()[0]))
    .y1(d => yScale(d.close))
    .curve(d3.curveCatmullRom.alpha(0.5));

  svgarea
    .selectAll(".area")
    .data(data)
    .enter()
    .append("path")
    .attr("class", "area")
    .attr("d", d => area(d.values))
    .style("stroke", (d, i) => ["#ff9900", "#3369e8"][i])
    .style("stroke-width", 2)
    .style("fill", (d, i) => ["#ff9900", "#3369e8"][i])
    .style("fill-opacity", 0.5);
});
