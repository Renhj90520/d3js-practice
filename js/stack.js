var marginStack = { top: 30, right: 30, bottom: 30, left: 60 };
var datastack = [
  {
    month: new Date(2015, 0, 1),
    apples: 3840,
    bananas: 1920,
    cherries: 960,
    dates: 400
  },
  {
    month: new Date(2015, 1, 1),
    apples: 1600,
    bananas: 1440,
    cherries: 960,
    dates: 400
  },
  {
    month: new Date(2015, 2, 1),
    apples: 640,
    bananas: 960,
    cherries: 640,
    dates: 400
  },
  {
    month: new Date(2015, 3, 1),
    apples: 320,
    bananas: 480,
    cherries: 640,
    dates: 400
  }
];

var widthstack = 560 - marginStack.left - marginStack.right;
var heightstack = 360 - marginStack.top - marginStack.bottom;
var keys = ["apples", "bananas", "cherries", "dates"];
var stack = d3.stack().keys(keys);
var series = stack(datastack);
var xScaleStack = d3
  .scaleBand()
  .domain(d3.range(series[0].length))
  .range([0, widthstack])
  .padding(0.1);
var yScaleStack = d3
  .scaleLinear()
  .domain([
    0,
    d3.max(series, darr => {
      var max = d3.max(darr, d => {
        return d[1];
      });
      return max;
    })
  ])
  .range([0, heightstack])
  .nice();

var xAxisStack = d3.axisTop(xScaleStack);
var yAxisStack = d3.axisLeft(yScaleStack);

var svg = d3
  .select(".stack")
  .append("svg")
  .attr("width", widthstack + marginStack.left + marginStack.right)
  .attr("height", heightstack + marginStack.top + marginStack.bottom);
var chartStack = svg
  .append("g")
  .attr("transform", `translate(${marginStack.left},${marginStack.top})`);
chartStack.append("g").attr("class", "y axis").call(yAxisStack);
chartStack.append("g").attr("class", "x axis").call(xAxisStack);
var groups = chartStack
  .selectAll("g.group")
  .data(series)
  .enter()
  .append("g")
  .attr("class", "group")
  .attr("fill", (d, i) => colors[i]);
var rects = groups
  .selectAll("rect")
  .data(d => {
    console.log(JSON.stringify(d));
    return d;
  })
  .enter()
  .append("rect")
  .attr("x", (d, i) => xScaleStack(i))
  .attr("width", xScaleStack.bandwidth())
  .attr("y", d => yScaleStack(d[0]))
  .attr("height", d => yScaleStack(d[1] - d[0]));

var legend = chartStack
  .append("g")
  .attr("class", "legend")
  .selectAll("g.legend")
  .data(keys)
  .enter()
  .append("g")
  .attr("transform", (d, i) => `translate(0,${heightstack - 100 + i * 20})`);

legend
  .append("rect")
  .attr("x", widthstack - 19)
  .attr("width", 19)
  .attr("height", 19)
  .attr("fill", (d, i) => colors[i]);

legend
  .append("text")
  .attr("x", widthstack - 24)
  .attr("y", 9.5)
  .attr("dy", ".32em")
  .attr("text-anchor", "end")
  .text(function(d) {
    return d;
  });
