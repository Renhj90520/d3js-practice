
var canvas = document.querySelector("canvas"),
  context = canvas.getContext("2d"),
  widthforce = canvas.width,
  heightforce = canvas.height;
var simulation = d3
  .forceSimulation()
  .force("link", d3.forceLink().id(d => d.id))
  .force("charge", d3.forceManyBody())
  .force("center", d3.forceCenter(widthforce / 2, heightforce / 2));

d3.json("./data/force.json", (err, data) => {
  if (err) throw err;

  simulation.nodes(data.nodes).on("tick", ticked);
  simulation.force("link").links(data.links);

  d3
    .select(canvas)
    .call(
      d3
        .drag()
        .container(canvas)
        .subject(dragsubject)
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended)
    );

  function ticked() {
    context.clearRect(0, 0, widthforce, heightforce);

    context.beginPath();
    data.links.forEach(drawLink);
    context.strokeStyle = "#aaa";
    context.stroke();

    context.beginPath();
    data.nodes.forEach(drawNode);
    context.fill();
    context.strokeStyle = "#fff";
    context.stroke();
  }
  function dragsubject() {
    return simulation.find(d3.event.x, d3.event.y);
  }
});
function dragstarted() {
  if (!d3.event.active) simulation.alphaTarget(0.3).restart();
  d3.event.subject.fx = d3.event.subject.x;
  d3.event.subject.fy = d3.event.subject.y;
}

function dragged() {
  d3.event.subject.fx = d3.event.x;
  d3.event.subject.fy = d3.event.y;
}

function dragended() {
  if (!d3.event.active) simulation.alphaTarget(0);
  d3.event.subject.fx = null;
  d3.event.subject.fy = null;
}

function drawLink(d) {
  context.moveTo(d.source.x, d.source.y);
  context.lineTo(d.target.x, d.target.y);
}

function drawNode(d) {
  context.moveTo(d.x, d.y);
  context.arc(d.x, d.y, 3, 0, 2 * Math.PI);
}
