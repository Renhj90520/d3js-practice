var margin = { top: 10, right: 20, bottom: 30, left: 30 };
var width = 400 - margin.left - margin.right;
var height = 565 - margin.top - margin.bottom;

var svgscatterplot = d3
  .select(".scatterplot")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

d3.json("./data/scatterplot.json", (err, data) => {
  var yScale = d3
    .scaleLinear()
    .domain(d3.extent(data, d => d.expectancy))
    .range([height, 0])
    .nice();

  var yAxis = d3.axisLeft(yScale);
  svgscatterplot.call(yAxis);

  var xScale = d3
    .scaleLinear()
    .domain(d3.extent(data, d => d.cost))
    .range([0, width])
    .nice();

  var xAxis = d3.axisBottom(xScale).ticks(5);

  svgscatterplot.append("g").attr("transform", `translate(0,${height})`).call(xAxis);

  var rScale = d3
    .scaleSqrt()
    .domain([0, d3.max(data, d => d.population)])
    .range([0, 40]);

  var circles = svgscatterplot
    .selectAll(".ball")
    .data(data)
    .enter()
    .append("g")
    .attr("class", "ball")
    .attr("transform", d => {
      return `translate(${xScale(d.cost)},${yScale(d.expectancy)})`;
    });
  circles
    .append("circle")
    .attr("r", d => rScale(d.population))
    .attr("cx", 0)
    .attr("cy", 0)
    .style("fill-opacity", 0.5)
    .style("fill", "steelblue");

  circles
    .append("text")
    .style("text-anchor", "middle")
    .style("fill", "red")
    .attr("y", 4)
    .text(d => d.code);
});
