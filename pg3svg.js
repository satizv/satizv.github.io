var svg = d3.select("#pg3svg")
      .append("svg")
      .attr("id","pg3svgid")
      .attr("width", 640)
      .attr("height", 500)
      .attr("class", "zindex");

margin = {top: 40, right: 20, bottom: 35, left: 80},
width = 540 - margin.left - margin.right,
height = 400 - margin.top - margin.bottom,


d3.csv("data/sharktotal.csv", function(d, i, columns) {
  console.log(d);
  return d; 
}, function(error, data) {
  if (error) throw error;  
  
  load(data);

}); 

function load(data) {

    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    var h = svg.append("g").attr("transform", "translate(" + margin.left + "," + 0 + ")");
    h.append("g")
    .attr("transform", "translate(145,20)")
    .append ("text")
    .text("Shark Tank - Overview")
    .attr("class", "hgraph");

  var y = d3.scaleBand()
    .rangeRound([0, height])
    .paddingInner(0.05)
    .align(0.1);

  var x = d3.scaleLinear()
    .rangeRound([0,width - 100]);

  var z = d3.scaleOrdinal()
    .range(["#4A8393","#4A8393","#4A8393", "#ACC7D1","#ACC7D1","#ACC7D1","#ACC7D1","#ACC7D1","#ACC7D1","#ACC7D1"]);

  var tooltip = d3.select("#tooltip");

  console.log(data.map(function(d) { return d.Category; }));
  console.log(data.map(function(d) { return d.Closed; }));
  console.log(data.map(function(d) { return +d.Total; }));


  console.log("max");
  console.log(d3.max(data, function(d) { return d.Total; }));
  y.domain(data.map(function(d) { return d.Category; }));
  x.domain([0, d3.max(data, function(d) { return +d.Total; })]).nice();

  console.log(z("Food"));

  var values = data.map(function(d) { return d.Total; })
  console.log(values);  
  console.log(values[0]);

 

  g.append("g")
    .attr("transform", "translate(150,355)")
    .append ("text")
    .text("Number of Deals")
    .attr("class", "axistext");

  g.append("g")
      .attr("class", "axis")
      .call(d3.axisLeft(y).ticks(null, "s"));
  
  g.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

}