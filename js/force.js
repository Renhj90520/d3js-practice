var dataforce = {
  nodes: [
    { name: "Adam" },
    { name: "Bob" },
    { name: "Carrie" },
    { name: "Donovan" },
    { name: "Edward" },
    { name: "Felicity" },
    { name: "George" },
    { name: "Hannah" },
    { name: "Iris" },
    { name: "Jerry" }
  ],
  edges: [
    { source: 0, target: 1 },
    { source: 0, target: 2 },
    { source: 0, target: 3 },
    { source: 0, target: 4 },
    { source: 1, target: 5 },
    { source: 2, target: 5 },
    { source: 2, target: 5 },
    { source: 3, target: 4 },
    { source: 5, target: 8 },
    { source: 5, target: 9 },
    { source: 6, target: 7 },
    { source: 7, target: 8 },
    { source: 8, target: 9 }
  ]
};
var svg = d3
  .select(".force")
  .append("svg")
  .attr("width", widthforce)
  .attr("height", heightforce);

var force = d3
  .forceSimulation()
  .force(
    "charge",
    d3.forceManyBody().strength(-700).distanceMin(100).distanceMax(1000)
  )
  .force(
    "link",
    d3.forceLink().id(function(d) {
      return d.index;
    })
  )
  .force("center", d3.forceCenter(widthforce / 2, heightforce / 2))
  .force("x", d3.forceX(0.001))
  .force("y", d3.forceY(0.001));

function dragstart(d) {
  if (!d3.event.active) force.alphaTarget(0.5).restart();
  d.fx = d.x;
  d.fy = d.y;
}

function drag(d) {
  d.fx = d3.event.x;
  d.fy = d3.event.y;
}

function dragend(d) {
  if (!d3.event.actice) force.alphaTarget(0.5);
  d.fx = null;
  d.dy = null;
}

force.nodes(dataforce.nodes).force("link").links(dataforce.edges);

var link = svg
  .selectAll(".link")
  .data(dataforce.edges)
  .enter()
  .append("line")
  .attr("stroke", "#ccc")
  .attr("class", "link");

var node = svg
  .selectAll(".node")
  .data(dataforce.nodes)
  .enter()
  .append("g")
  .attr("class", "node")
  .call(d3.drag().on("start", dragstart).on("drag", drag).on("end", dragend));

node.append("circle").attr("r", 10);
node
  .append("text")
  .attr("dx", -18)
  .attr("dy", 8)
  .attr("font-size", 12)
  .attr("fill", "red")
  .text(d => d.name);

force.on("tick", function() {
  link
    .attr("x1", d => d.source.x)
    .attr("y1", d => d.source.y)
    .attr("x2", d => d.target.x)
    .attr("y2", d => d.target.y);
  node.attr("transform", d => `translate(${d.x},${d.y})`);
});
