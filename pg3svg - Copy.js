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

function removegraph()
{
	alert("inside");
	d3.select("#pg3svgid").remove();
}
function load(data)
{
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

	var keys = data.map(function(d) { return d.Category; });

    g.append("g")
    .selectAll("g")
    .data(d3.stack().keys(keys)(data))
    .enter().append("g")
    //  .attr("fill", function(d) { console.log(z(d.key)); console.log(z(d.Category)); return z(d.Category); })
    .selectAll("rect")
    .data(function(d) { return d; })
    .enter().append("rect")
      //.attr("x", function(d) { return x(d.data.season); })
      .attr("fill", "#ACC7D1")
      .attr("x",0)
      .attr("y", function(d) { console.log(d.data.Category); console.log(y(d.data.Category)); return y(d.data.Category); })
      .attr("width", function(d) { console.log(d.data.Total); console.log(x(d.data.Total)); return x(d.data.Total); })
      .attr("height", y.bandwidth())
      .on("mouseover", function(d,i) {
        tooltip.style("opacity", 1)
               .style("left",(d3.event.pageX)+"px")
               .style("top",(d3.event.pageY)+"px")
               .html("Count - " + d.data.Total);
      })
      .on("mouseout", function() { tooltip.style("opacity", 0) });

    g.append("g")
    .selectAll("g")
    .data(d3.stack().keys(keys)(data))
    .enter().append("g")
    //  .attr("fill", function(d) { console.log(z(d.key)); console.log(z(d.Category)); return z(d.Category); })
    .selectAll("rect")
    .data(function(d) { return d; })
    .enter().append("rect")
      //.attr("x", function(d) { return x(d.data.season); })
      .attr("fill", "#4A8393")
      .attr("x",0)
      .attr("y", function(d) { console.log(d.data.Category); console.log(y(d.data.Category)); return y(d.data.Category); })
      .attr("width", function(d) { console.log(d.data.Closed); console.log(x(d.data.Closed)); return x(d.data.Closed); })
      .attr("height", y.bandwidth())
      .on("mouseover", function(d,i) {
        tooltip.style("opacity", 1)
               .style("left",(d3.event.pageX)+"px")
               .style("top",(d3.event.pageY)+"px")
               .html("Count - " + d.data.Closed);
      })
      .on("mouseout", function() { tooltip.style("opacity", 0) });
  


  

    var totClosed = d3.sum(data, function(d) { return d.Closed; });
    console.log(totClosed);

    var totTotal = d3.sum(data, function(d) { return d.Total; });
    console.log(totTotal);

    var formpcnt = d3.format(".0%");  
  
    g.append("g")
    .attr("transform", "translate(450,68)")
    .append ("text")
    .text(totTotal)
    .attr("text-anchor","middle")
    .attr("alignment-baseline","central")
    .attr("class", "hsidebar");

    g.append("g")
    .attr("transform", "translate(450,95)")
    .append ("text")
    .text("Total Offers in")
    .attr("text-anchor","middle")
    .attr("alignment-baseline","central")
    .attr("class", "sidebar");

    g.append("g")
    .attr("transform", "translate(450,115)")
    .append ("text")
    .text("8 seasons.")
    .attr("text-anchor","middle")
    .attr("alignment-baseline","central")
    .attr("class", "sidebar");


    g.append("g")
    .attr("transform", "translate(450,145)")
    .append ("text")
    .text(totClosed)
    .attr("text-anchor","middle")
    .attr("alignment-baseline","central")
    .attr("class", "hsidebar");

    g.append("g")
    .attr("transform", "translate(450,172)")
    .append ("text")
    .text("Deals closed in")
    .attr("text-anchor","middle")
    .attr("alignment-baseline","central")
    .attr("class", "sidebar");

    g.append("g")
    .attr("transform", "translate(450,192)")
    .append ("text")
    .text("8 seasons.")
    .attr("text-anchor","middle")
    .attr("alignment-baseline","central")
    .attr("class", "sidebar");

    g.append("g")
    .attr("transform", "translate(450,280)")
    .append ("text")
    .text(formpcnt(totClosed/totTotal))
    .attr("text-anchor","middle")
    .attr("alignment-baseline","central")
    .attr("class", "hsidebar");


  var arc =  d3.arc()
            .innerRadius(30)
            .outerRadius(50)
            .startAngle(0)
            .endAngle(2 * 3.141592653589793);


    g.append("g")
    .attr("transform", "translate(450,280)")
    .append ("path")
    .attr("d", arc)
    .attr("class", "arc");


  var arc =  d3.arc()
            .innerRadius(30)
            .outerRadius(50)
            .startAngle(0)
            .endAngle(totClosed*2*3.141592653589793/totTotal);

    g.append("g")
    .attr("transform", "translate(450,280)")
    .append ("path")
    .attr("d", arc)
    .attr("class", "darc");

}

