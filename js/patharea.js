var margin1 = {
  top: 58,
  right: 40,
  bottom: 100,
  left: 80
};
var width1 = 800 - margin1.left - margin1.right;
var height1 = 450 - margin1.top - margin1.bottom;

var pathareasvg = d3
  .select(".patharea")
  .append("svg")
  .attr("width", width1 + margin1.left + margin1.right)
  .attr("height", height1 + margin1.top + margin1.bottom);
var chart = pathareasvg
  .append("g")
  .attr("transform", `translate(${margin1.left},${margin1.top})`);

var parseTime = d3.timeParse("%Y/%m/%d");

d3.json("./data/dates.json", (err, data) => {
  var yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, d => d.value)])
    .range([height1, 0]);
  var xScale = d3
    .scaleTime()
    .domain(d3.extent(data, d => parseTime(d.date)))
    .range([0, width1])
    .nice();
  var xAxis = d3
    .axisBottom(xScale)
    .ticks(d3.timeDay.every(7))
    .tickFormat(d3.timeFormat("%m/%d"));
  var yAxis = d3.axisLeft(yScale).ticks(5);

  var line = d3
    .line()
    .x(d => xScale(parseTime(d.date)))
    .y(d => yScale(d.value));

  var area = d3
    .area()
    .x(d => xScale(parseTime(d.date)))
    .y0(height1)
    .y1(d => yScale(d.value));
  function plot(params) {
    // XAxis
    this.append("g")
      .classed("x axis", true)
      .attr("transform", `translate(0,${height1})`)
      .call(params.axis.x);
    // YAxis
    this.append("g")
      .classed("y axis", true)
      .attr("transform", `translate(0,0)`)
      .call(params.axis.y);

    //enter
    this.selectAll(".trendline")
      .data([params.data])
      .enter()
      .append("path")
      .classed("trendline", true);
    this.selectAll(".trendarea")
      .data([params.data])
      .enter()
      .append("path")
      .classed("trendarea", true);
    this.selectAll(".point")
      .data(params.data)
      .enter()
      .append("circle")
      .classed("point", true)
      .attr("r", 2);

    //update
    this.selectAll(".trendline").attr("d", d => line(d));
    this.selectAll(".trendarea").attr("d", d => area(d));
    this.selectAll(".point")
      .attr("cx", d => xScale(parseTime(d.date)))
      .attr("cy", d => yScale(d.value));

    //exit
    this.selectAll(".trendline").data([params.data]).exit().remove();
    this.selectAll(".trendarea").data([params.data]).exit().remove();
    this.selectAll(".point").data(params.data).exit().remove();
  }
  plot.call(chart, {
    data: data,
    axis: {
      x: xAxis,
      y: yAxis
    }
  });
});
