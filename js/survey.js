var surmargin = { top: 60, right: 80, bottom: 80, left: 80 };
var surwidth = 800 - surmargin.left - surmargin.right;
var surheight = 450 - surmargin.top - surmargin.bottom;

var svg = d3
  .select(".survey")
  .append("svg")
  .attr("id", "chart")
  .attr("width", surwidth + surmargin.left + surmargin.right)
  .attr("height", surheight + surmargin.top + surmargin.bottom);

var surchart = svg
  .append("g")
  .attr("transform", `translate(${surmargin.left},${surmargin.top})`);

d3.json("./data/survey.json", (err, data) => {
  var xScale = d3
    .scaleLinear()
    .domain(d3.extent(data, d => d.age))
    .range([0, surwidth])
    .nice();

  var yScale = d3.scaleLinear().domain([1, 5]).range([surheight, 0]);

  var xAxis = d3.axisBottom(xScale);
  var yAxis = d3.axisLeft(yScale).ticks(5).tickSize(20);

  var yGridlines = d3
    .axisLeft(yScale)
    .ticks(10)
    .tickSize(-surwidth)
    .tickFormat("");
  var xGridlines = d3.axisBottom(xScale).tickSize(-surheight).tickFormat("");

  var responseScale = d3
    .scaleSqrt()
    .domain([0, d3.max(data, d => d.responses)])
    .range([0, 16]);

  function plot(params) {
    this.append("g").attr("class", "y gridline").call(yGridlines);
    this.append("g")
      .attr("class", "x gridline")
      .attr("transform", `translate(0,${surheight})`)
      .call(xGridlines);
    this.append("g")
      .attr("class", "x axis")
      .attr("transform", `translate(0,${surheight})`)
      .call(xAxis);

    this.select(".x.axis")
      .append("text")
      .attr("fill", "red")
      .attr("font-size", 12)
      .attr("transform", `translate(${surwidth / 2},40)`)
      .text("Customer Age");

    this.append("g").attr("class", "y axis").call(yAxis);
    this.select(".y.axis")
      .append("text")
      .attr("transform", `translate(-56,${surheight / 2}) rotate(-90)`)
      .attr("fill", "red")
      .attr("text-anchor", "middle")
      .attr("font-size", 12)
      .text("Rating (1=Low, 5=High)");
    var donuts = d3
      .keys(params.data[0])
      .filter(d => d !== "age" && d !== "responses");

    this.append("g")
      .append("text")
      .attr("class", "chart-header")
      .attr("fill", "red")
      .attr("text-anchor", "middle")
      .attr("transform", `translate(${surwidth / 2},-10)`);

    //enter for g
    this.selectAll(".donut")
      .data(donuts)
      .enter()
      .append("g")
      .attr("class", d => d)
      .classed("donut", true);

    //update for g style of g element will be inherited by its children element
    this.selectAll(".donut")
      .style("fill", (d, i) => d3.schemeCategory10[i])
      .style("fill-opacity", 0.5)
      .on("mouseover", function(d, i) {
        d3.select(this).style("fill-opacity", 1);
      })
      .on("mouseout", function(d, i) {
        d3.select(this).style("fill-opacity", 0.5);
      });
    donuts.forEach(donut => {
      var g = this.selectAll("g." + donut);
      var arr = params.data.map(d => {
        return {
          key: donut,
          value: d[donut],
          age: d.age,
          responses: d.responses
        };
      });

      //enter
      g
        .selectAll(".response")
        .data(arr)
        .enter()
        .append("circle")
        .classed("response", true)
        .on("mouseover", function(d) {
          d3.select(".chart-header").text(`${d.key} Donut:${d.value}`);
        })
        .on("mouseout", function(d) {
          d3.select(".chart-header").text("");
        });

      //update
      g
        .selectAll(".response")
        .attr("r", d => responseScale(d.responses))
        .attr("cx", d => xScale(d.age))
        .attr("cy", d => yScale(d.value));

      //exit
      g.selectAll(".response").data(arr).exit().remove();
    });
  }

  plot.call(surchart, { data: data });
});
