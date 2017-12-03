var alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

var alpha = d3
  .select(".alpha")
  .append("svg")
  .attr("width", "100%")
  .attr("height", 200);
var g = alpha.append("g").attr("transform", "translate(0,100)");4
function update(data) {
  var t = d3.transition().duration(750);
  //data join
  //join new data with old elements.
  //by adding key function the map between the element and the data will never change; update should recompute the position for each element+. if not enter will add to the end, the exit will remove from the end.
  var text = g.selectAll("text").data(data, function(d) {
    return d;
  });

  //Exit
  //remove old elements as needed
  text
    .exit()
    .attr("class", "exit")
    .transition(t)
    .attr("y", 60)
    .style("fill-opacity", 1e-6)
    .remove();

  //update
  //update old elements as needed
  text
    .attr("class", "update")
    .attr("y", 0)
    .style("fill-opacity", 1)
    .transition(t)
    .attr("x", function(d, i) {
      return i * 32;
    });

  //enter
  //create new elements as needed
  //enter + update
  //after merging the entered elements with the update selection
  //apply operations to both
  text
    .enter()
    .append("text")
    .attr("class", "enter")
    .attr("x", function(d, i) {
      return i * 32;
    })
    .attr("y", -60)
    .attr("dy", ".35em")
    .style("fill-opacity", 1e-6)
    .text(function(d) {
      return d;
    })
    .transition(t)
    .attr("y", 0)
    .style("fill-opacity", 1);
}

update(alphabet);

d3.interval(function() {
  var newdata = d3
    .shuffle(alphabet)
    .slice(0, Math.floor(Math.random() * 26))
    .sort();
  update(newdata);
}, 3000);
