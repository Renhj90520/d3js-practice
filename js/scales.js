var linearScale = d3.scaleLinear().domain([0, 100]).range([0, 600]);
console.log("linear scale");
console.log(linearScale(50));

var timeScale = d3
  .scaleTime()
  .domain([new Date(2016, 10, 1), new Date()])
  .range([0, 100]);
console.log("time scale");
console.log(timeScale(new Date(2017, 3, 30)));

var quantizeScale = d3
  .scaleQuantize()
  .domain([0, 100])
  .range(["red", "white", "green"]);
console.log("quantize scale");
console.log(quantizeScale(22));
console.log(quantizeScale(49));
console.log(quantizeScale(50));
console.log(quantizeScale(88));

var ordinalScale = d3
  .scaleOrdinal()
  .domain(["poor", "good", "greate"])
  .range(["red", "white", "green"]);

console.log("ordinal scale");
console.log(ordinalScale("good"));
console.log(ordinalScale("poor"));
console.log(ordinalScale("greate"));

var sqrtScale = d3.scaleSqrt().domain([0, 100]).range([0, 25]);

console.log("sqrt scale");
console.log(sqrtScale(0));
console.log(sqrtScale(36));
console.log(sqrtScale(50));
console.log(sqrtScale(81));
console.log(sqrtScale(100));
