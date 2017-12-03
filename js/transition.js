var svg = d3
  .select(".transition")
  .append("svg")
  .attr("width", 100)
  .attr("height", 100);

var circle = svg
  .append("circle")
  .attr("r", 40)
  .attr("cx", 50)
  .attr("cy", 50)
  .attr("fill", "none")
  .attr("stroke-width", 2)
  .attr("stroke", "darkgrey")
  .on("mouseover", function() {
    d3.select(this).attr("fill", "lightgrey");
  })
  .on("mousedown", animate);

function animate() {
  d3
    .select(this)
    .transition()
    .delay(0)
    .duration(2000)
    .attr("r", 10)
    .on("end", animateNext);
}

function animateNext() {
  d3.select(this).transition().duration(2000).attr("r", 40);
}
