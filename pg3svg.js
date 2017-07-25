var svg = d3.select("#pg3svg")
      .append("svg")
      .attr("id","pg3svgid")
      .attr("width", 740)
      .attr("height", 500)
      .attr("class", "zindex");

margin = {top: 40, right: 20, bottom: 35, left: 120},
width = 640 - margin.left - margin.right,
height = 400 - margin.top - margin.bottom,


d3.csv("data/sharktotal.csv", function(d, i, columns) {
  console.log(d);
  return d; 
}, function(error, data) {
  if (error) throw error;  
  
  load(data);

}); 


function load(data) {

    var g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var y = d3.scaleBand()
    .rangeRound([0, height])
    .paddingInner(0.05)
    .align(0.1);

  var x = d3.scaleLinear()
    .rangeRound([0,width - 100]);

  var z = d3.scaleOrdinal()
    .range(["#4A8393","#4A8393","#4A8393", "#ACC7D1","#ACC7D1","#ACC7D1","#ACC7D1","#ACC7D1","#ACC7D1","#ACC7D1"]);

  var pg3tooltip = d3.select("#pg3tooltip");

}

function runpg3()
{

  d3.csv("data/sharktotal.csv", function(d, i, columns) {
  console.log(d);
  return d; 
  }, function(error, data) {
    if (error) throw error;  
  
    drawpg3graph(data);

  });

}

function removegraph()
{
  alert("inside");
  d3.select("#pg3svgid").remove();
}

function drawpg3graph(data)
{

     var pg3tooltip = d3.select("#pg3tooltip");
   var y = d3.scaleBand()
    .rangeRound([0, height])
    .paddingInner(0.05)
    .align(0.1);

  var x = d3.scaleLinear()
    .rangeRound([0,width - 100]);


  var g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  y.domain(data.map(function(d) { return d.Category; }));
  
  x.domain([0, d3.max(data, function(d) { return +d.Total; })]).nice();
  
  var y = d3.scaleBand()
    .rangeRound([0, height])
    .paddingInner(0.05)
    .align(0.1);

  var x = d3.scaleLinear()
    .rangeRound([0,width - 100]);

  var z = d3.scaleOrdinal()
    .range(["#4A8393","#4A8393","#4A8393", "#ACC7D1","#ACC7D1","#ACC7D1","#ACC7D1","#ACC7D1","#ACC7D1","#ACC7D1"]);

  var pg3tooltip = d3.select("#pg3tooltip");

  console.log(data.map(function(d) { return d.Category; }));
  console.log(data.map(function(d) { return d.Closed; }));
  console.log(data.map(function(d) { return +d.Total; }));


  console.log("max");
  console.log(d3.max(data, function(d) { return +d.Total; }));
  y.domain(data.map(function(d) { return d.Category; }));
  x.domain([0, d3.max(data, function(d) { return +d.Total; })]).nice();

  console.log(z("Food"));

  var values = data.map(function(d) { return d.Total; });
  var valuesClosed = data.map(function(d) { return d.Closed; })
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
      .attr("width", 0)
      .attr("height", y.bandwidth())
      .on('mouseover', function() { console.log('mouseover'); })
      .on('mouseout', function() { console.log('mouseout'); })
      .on("mouseover", function(d,i) {
        pg3tooltip.style("opacity", 1)
               .style("left",(d3.event.pageX)+"px")
               .style("top",(d3.event.pageY)+"px")
               .html("Presented - " + d.data.Total);
      })
      .on("mouseout", function() { pg3tooltip.style("opacity", 0) })
      .on("click", pg3drawsidebar(d);)
      .transition()
      .delay(function(d,i) {return (i*2000+2000)})
      .attr("width", function(d) { console.log(d.data.Total); console.log(x(d.data.Total)); return x(d.data.Total); })
      ;


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
      .attr("width", 0)
      .attr("height", y.bandwidth())
      .on('mouseover', function() { console.log('mouseover'); })
      .on('mouseout', function() { console.log('mouseout'); })
      .on("mouseover", function(d,i) {
        pg3tooltip.style("opacity", 1)
               .style("left",(d3.event.pageX)+"px")
               .style("top",(d3.event.pageY)+"px")
               .html("Closed - " + d.data.Closed);
      })
      .on("mouseout", function() { pg3tooltip.style("opacity", 0) })
      .on("click", pg3drawsidebar(d);)
      .transition()
      .delay(function(d,i) {return (i*2000+3000)})
      .attr("width", function(d) { console.log(d.data.Closed); console.log(x(d.data.Closed)); return x(d.data.Closed); })
      ;


    var totClosed = d3.sum(data, function(d) { return d.Closed; });
    console.log(totClosed);

    var totTotal = d3.sum(data, function(d) { return d.Total; });
 //   var totTotal = [770,1000];
    console.log(totTotal);

    var formpcnt = d3.format("s");  

    var easement = d3.easeCubic;
    var format = d3.format(",d");

    g.append("g")
    .attr("transform", "translate(550,68)")
    .append ("text")
    .attr("text-anchor","middle")
    .attr("alignment-baseline","central")
    .attr("class", "hsidebar")
    .attr("id","pg3svgtxt1");

    g.append("g")
    .attr("transform", "translate(550,95)")
    .append ("text")
    .text("Total Presented")
    .attr("text-anchor","middle")
    .attr("alignment-baseline","central")
    .attr("class", "sidebar");

    g.append("g")
    .attr("transform", "translate(550,115)")
    .append ("text")
    .text("in 8 seasons.")
    .attr("text-anchor","middle")
    .attr("alignment-baseline","central")
    .attr("class", "sidebar");

    g.append("g")
    .attr("transform", "translate(550,145)")
    .append ("text")
    .attr("id","pg3svgtxt2")
    .attr("text-anchor","middle")
    .attr("alignment-baseline","central")
    .attr("class", "hsidebar");

    g.append("g")
    .attr("transform", "translate(550,172)")
    .append ("text")
    .text("Deals closed in")
    .attr("text-anchor","middle")
    .attr("alignment-baseline","central")
    .attr("class", "sidebar");

    g.append("g")
    .attr("transform", "translate(550,192)")
    .append ("text")
    .text("8 seasons.")
    .attr("text-anchor","middle")
    .attr("alignment-baseline","central")
    .attr("class", "sidebar");

    values.forEach(function(d,i) {
    var del = i*2000+2000;
    d3.select("#pg3svgtxt1")
    .transition()
    .delay(del)
    .duration(250)
    .tween("text", function() {
            var that = d3.select(this);
            var a = +d;
            var x = d3.interpolateNumber(that.text(),(a + +that.text()));
            return function(t) { that.text(format(x(t))); };
          });
});

    valuesClosed.forEach(function(d,i) {
    var del = i*2000+3000;
    d3.select("#pg3svgtxt2")
    .transition()
    .delay(del)
    .duration(250)
    .tween("text", function() {
            var that = d3.select(this);
            var a = +d;
            var x = d3.interpolateNumber(that.text(),(a + +that.text()));
            return function(t) { that.text(format(x(t))); };
          });
});

  var arc =  d3.arc()
            .innerRadius(30)
            .outerRadius(50)
            .startAngle(0)
//            .endAngle(2)
            ;
  
  var tau = 2 * 3.141592653589793;

    g.append("g")
    .attr("transform", "translate(550,280)")
    .append ("path")
    .datum({endAngle: 0})
    .attr("d", arc)
    .attr("id","pg3svgarc1")
    .attr("class", "arc");

    values.forEach(function(d,i) {
    var del = i*2000+2000;
    d3.select("#pg3svgarc1")
    .transition()
    .delay(del)
    .duration(250)
    .attrTween("d", arcTween((d/totTotal)*tau))
  });

function arcTween (newAngle) {
  return function(d) {
    console.log(newAngle);
    console.log(d.endAngle);
    var interpolate = d3.interpolate(+d.endAngle, +d.endAngle + +newAngle);
    return function(t) {
      d.endAngle = interpolate(t);
      console.log(d.endAngle);
      return arc(d);
      };
  };
}

    g.append("g")
    .attr("transform", "translate(550,280)")
    .append ("path")
    .datum({endAngle: 0})
    .attr("d", arc)
    .attr("id","pg3svgarc2")
    .attr("class", "darc");

    valuesClosed.forEach(function(d,i) {
    var del = i*2000+3000;
    d3.select("#pg3svgarc2")
    .transition()
    .delay(del)
    .duration(250)
    .attrTween("d", arcTween1((d/totTotal)*tau))
  });

function arcTween1 (newAngle) {
  return function(d) {
    console.log(newAngle);
    console.log(d.endAngle);
    var interpolate = d3.interpolate(+d.endAngle, +d.endAngle + +newAngle);
    return function(t) {
      d.endAngle = interpolate(t);
      console.log(d.endAngle);
      return arc(d);
      };
  };
}

var pg3drawsidebar(d) {
  console.log(d);
  console.log(d.Category);
  console.log(d.Total);
  console.log(d.Closed);
}

} 