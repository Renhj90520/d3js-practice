var width2 = 300, height2 = 300;
var datapie = [5, 10, 20, 45, 6, 25];

var outerRadius = width2 / 2;
var innerRadius = 0;
var arc = d3
  .arc()
  .innerRadius(innerRadius)
  .outerRadius(outerRadius)
  .padAngle(0.02)
  .cornerRadius(5);

var pie = d3.pie();

var colors = d3.schemeCategory10;
var svgpie = d3
  .select(".pie")
  .append("svg")
  .attr("width", width2)
  .attr("height", height2);

var arcs = svgpie
  .selectAll("g.arc")
  .data(pie(datapie))
  .enter()
  .append("g")
  .attr("class", "arc")
  .attr("transform", `translate(${outerRadius},${outerRadius})`);

arcs.append("path").attr("fill", (d, i) => colors[i]).attr("d", arc);

arcs
  .append("text")
  .attr("transform", d => `translate(${arc.centroid(d)})`)
  .attr("text-anchor", "middle")
  .attr("fill", "white")
  .text(d => d.value);
