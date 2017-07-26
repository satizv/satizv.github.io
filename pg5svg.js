var svgpg5 = d3.select("#pg5svg")
      .append("svg")
      .attr("id","pg5svgid")
      .attr("width", 800)
      .attr("height", 500)
      .attr("class", "zindex");

margin = {top: 40, right: 20, bottom: 35, left: 150},
width = 700 - margin.left - margin.right,
height = 400 - margin.top - margin.bottom;


d3.csv("data/sharktotal.csv", function(d, i, columns) {
  console.log(d);
  return d; 
}, function(error, data) {
  if (error) throw error;  
  
  load(data);

}); 

function load(data) {



}


function runpg5pcntshark() {
    d3.csv("data/sharkpercent.csv", function(d, i, columns) {
  console.log(d);
  return d; 
  }, function(error, data) {
    if (error) throw error;  
  
    drawpg5shgraph(data);

  });

}

function removegraph()
{
  //alert("inside");
  d3.select("#pg5svgid").selectAll("rect").remove();
  d3.select("#pg5svgid").selectAll("text").remove();
  d3.select("#pg5svgid").selectAll("path").remove();
  d3.select("#pg5svgid").selectAll("g").remove();


}


function drawpg5shgraph(data) {

  removegraph();
  var pg5tooltip = d3.select("#pg5tooltip");
  var y = d3.scaleBand()
    .rangeRound([0, height])
    .paddingInner(0.05)
    .align(0.1);

  var x = d3.scaleLinear()
    .rangeRound([0,width - 100]);

  var z = d3.scaleOrdinal()
    .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c"]);  

  var g = svgpg5.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var keys = data.columns.slice(1);
  
  console.log("Keys" + keys);
  
  y.domain(data.map(function(d) { return d.Category; }));
  
  x.domain([0, 100]).nice();

  z.domain(keys);


  var pg5tooltip = d3.select("#pg5tooltip");

  
  g.append("g")
    .attr("transform", "translate(180,355)")
    .append ("text")
    .text("Percentage")
    .attr("class", "axistext");

  
  g.append("g")
      .attr("class", "axis")
      .call(d3.axisLeft(y).ticks(null, "s"))
      ;
  
  g.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));


  g.append("g")
    .selectAll("g")
    .data(d3.stack().keys(keys)(data))
    .enter().append("g")
    .attr("fill", function(d) {console.log(d.key);console.log(z(d.key)); return z(d.key); })
    .selectAll("rect")
    .data(function(d) { return d; })
    .enter().append("rect")
      //.attr("x", function(d) { return x(d.data.season); })
      .attr("x",function(d) { console.log(d[0]); console.log(x(d[0]));return x(d[0]); })
      .attr("y", function(d) { console.log(d.data.Category); console.log(y(d.data.Category)); return y(d.data.Category); })
      .attr("width", function(d) { return x(d[1]) - x(d[0]); })
      .attr("height", y.bandwidth())
      .attr("class", "bar")

}

