var svgpg4 = d3.select("#pg4svg")
      .append("svg")
      .attr("id","pg4svgid")
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


function runpg4val() {
    d3.csv("data/sharktotal.csv", function(d, i, columns) {
  console.log(d);
  return d; 
  }, function(error, data) {
    if (error) throw error;  
  
    drawpg4valgraph(data);

  });
}

function removegraph()
{
  //alert("inside");
  d3.select("#pg4svgid").selectAll("rect").remove();
  d3.select("#pg4svgid").selectAll("text").remove();
  d3.select("#pg4svgid").selectAll("path").remove();
  d3.select("#pg4svgid").selectAll("g").remove();


}


function pg4drawsidebar(cat,tot,clo,pct,val) {

  console.log(cat);
  console.log(tot);
  console.log(clo);
  console.log(pct);
  console.log(val);
  d3.select("#pg4svgtxtcat")
   .text(cat); 

  d3.select("#pg4svgtxt1")
   .text(tot); 

  d3.select("#pg4svgtxt2")
   .text(clo);

  var tau = 2 * 3.141592653589793;

  var arc1 =  d3.arc()
              .innerRadius(30)
              .outerRadius(50)
              .startAngle(0)
              .endAngle(tau)
              ;
  
  var arc2 =  d3.arc()
              .innerRadius(30)
              .outerRadius(50)
              .startAngle(0)
              .endAngle(pct*tau/100)
              ;
  
  d3.select("#pg4svgarc1")
  .attr("d", arc1);

  d3.select("#pg4svgarc2")
  .attr("d", arc2);
  var formpcnt = d3.format(".0%");
  d3.select("#pg4svgtxt3")
   .text(formpcnt(pct/100));
   var formcrncy = d3.format(",.0f");
    d3.select("#pg4svgtxt4")
   .text("$" + formcrncy(val));


}

function drawpg4valgraph(data) {
  removegraph();
  var pg4tooltip = d3.select("#pg4tooltip");
  var y = d3.scaleBand()
    .rangeRound([0, height])
    .paddingInner(0.05)
    .align(0.1);

  var x = d3.scaleLinear()
    .rangeRound([0,width - 100]);


  var g = svgpg4.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  y.domain(data.map(function(d) { return d.Category; }));
  
  x.domain([0, d3.max(data, function(d) { return +d.Valuation; })]).nice();
  
  var y = d3.scaleBand()
    .rangeRound([0, height])
    .paddingInner(0.05)
    .align(0.1);

  var x = d3.scaleLinear()
    .rangeRound([0,width - 100]);

  var z = d3.scaleOrdinal()
    .range(["#4A8393","#4A8393","#4A8393", "#ACC7D1","#ACC7D1","#ACC7D1","#ACC7D1","#ACC7D1","#ACC7D1","#ACC7D1"]);

  var pg4tooltip = d3.select("#pg4tooltip");

  console.log(data.map(function(d) { return d.Category; }));
  console.log(data.map(function(d) { return d.Closed; }));
  console.log(data.map(function(d) { return +d.Total; }));


  console.log("max");
  console.log(d3.max(data, function(d) { return +d.Valuation; }));
  y.domain(data.map(function(d) { return d.Category; }));
  x.domain([0, d3.max(data, function(d) { return +d.Valuation; })]).nice();

  console.log(z("Food"));

  var values = data.map(function(d) { return d.Total; });
  var valuesClosed = data.map(function(d) { return d.Closed; })
  console.log(values);  
  console.log(values[0]);


  g.append("g")
    .attr("transform", "translate(180,355)")
    .append ("text")
    .text("Avg Valuation ($)")
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
      .attr("fill", "#4A8393")
      .attr("x",0)
      .attr("y", function(d) { console.log(d.data.Category); console.log(y(d.data.Category)); return y(d.data.Category); })
      .attr("width", 0)
      .attr("height", y.bandwidth())
      .attr("class", "bar")
      .on('mouseover', function() { console.log('mouseover'); })
      .on('mouseout', function() { console.log('mouseout'); })
      .on("mouseover", function(d,i) {
        pg4tooltip.style("opacity", 1)
               .style("left",(d3.event.pageX)+"px")
               .style("top",(d3.event.pageY)+"px")
               .html("Valuation - $" + d.data.Valuation);
      })
      .on("mouseout", function() { pg4tooltip.style("opacity", 0) })
      .on("click", function (d) {pg4drawsidebar(d.data.Category,d.data.Total,d.data.Closed,d.data.PcntClosed,d.data.Valuation);})
      .transition()
      .delay(function(d,i) {return (i*1000+2000)})
      .attr("width", function(d) { console.log(d.data.Valuation); console.log(x(d.data.Valuation)); return x(d.data.Valuation); })
      ;


  var totClosed = d3.sum(data, function(d) { return d.Closed; });
  console.log(totClosed);

  var totTotal = d3.sum(data, function(d) { return d.Total; });
 //   var totTotal = [770,1000];
  console.log(totTotal);

  var totVal = d3.sum(data, function(d) { return d.Valuation; });
  console.log("Val" + totVal);
  
  var formpcnt = d3.format(".0%");   
 
  var easement = d3.easeCubic;
  var format = d3.format(",d");

  var formcrncy = d3.format(",.0f");
  g.append("g")
    .attr("transform", "translate(600,15)")
    .append ("text")
    .text("Category")
    .attr("text-anchor","middle")
    .attr("alignment-baseline","central")
    .attr("class", "sidebar");

  g.append("g")
    .attr("transform", "translate(600,35)")
    .append ("text")
    .text("All")
    .attr("text-anchor","middle")
    .attr("alignment-baseline","central")
    .attr("class", "hsidebar")
    .attr("id","pg4svgtxtcat");    

    g.append("g")
    .attr("transform", "translate(600,65)")
    .append ("text")
    .text("Deals Presented")
    .attr("text-anchor","middle")
    .attr("alignment-baseline","central")
    .attr("class", "sidebar");

  g.append("g")
    .attr("transform", "translate(600,85)")
    .append ("text")
    .attr("text-anchor","middle")
    .attr("alignment-baseline","central")
    .attr("class", "hsidebar")
    .attr("id","pg4svgtxt1");

  g.append("g")
    .attr("transform", "translate(600,110)")
    .append ("text")
    .text("Deals closed")
    .attr("text-anchor","middle")
    .attr("alignment-baseline","central")
    .attr("class", "sidebar");

  g.append("g")
    .attr("transform", "translate(600,130)")
    .append ("text")
    .attr("id","pg4svgtxt2")
    .attr("text-anchor","middle")
    .attr("alignment-baseline","central")
    .attr("class", "hsidebar");

  g.append("g")
    .attr("transform", "translate(600,160)")
    .append ("text")
    .text("Avg. Valuation")
    .attr("text-anchor","middle")
    .attr("alignment-baseline","central")
    .attr("class", "sidebar");

  g.append("g")
    .attr("transform", "translate(600,180)")
    .append ("text")
    .text("0")
    .attr("id","pg4svgtxt4")
    .attr("text-anchor","middle")
    .attr("alignment-baseline","central")
    .attr("class", "hsidebar")
    .transition()
    .delay(2000)
    .duration(9500)
    .tween("text", function() {
            var that = d3.select(this);
            var a = +totVal/10;
            var x = d3.interpolateNumber(0,a);
            return function(t) { that.text("$" + formcrncy(x(t))); };
          });

  g.append("g")
    .attr("transform", "translate(600,280)")
    .append ("text")
    .text("0")
    .attr("text-anchor","middle")
    .attr("alignment-baseline","central")
    .attr("id","pg4svgtxt3")
    .attr("class", "hsidebar")
    .transition()
    .delay(2000)
    .duration(9500)
    .tween("text", function() {
            var that = d3.select(this);
            var a = +totClosed/+totTotal;
            var x = d3.interpolateNumber(0,a);
            return function(t) { that.text(formpcnt(x(t))); };
          });


  values.forEach(function(d,i) {
    var del = i*1000+1000;
    d3.select("#pg4svgtxt1")
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
    var del = i*1000+2000;
    d3.select("#pg4svgtxt2")
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
    .attr("transform", "translate(600,280)")
    .append ("path")
    .datum({endAngle: 0})
    .attr("d", arc)
    .attr("id","pg4svgarc1")
    .attr("class", "arc");

  values.forEach(function(d,i) {
    var del = i*1000+1000;
    d3.select("#pg4svgarc1")
    .transition()
    .delay(del)
    .duration(250)
    .attrTween("d", arcTween((d/totTotal)*tau))
  });



  g.append("g")
    .attr("transform", "translate(600,280)")
    .append ("path")
    .datum({endAngle: 0})
    .attr("d", arc)
    .attr("id","pg4svgarc2")
    .attr("class", "darc");

  valuesClosed.forEach(function(d,i) {
    var del = i*1000+2000;
    d3.select("#pg4svgarc2")
    .transition()
    .delay(del)
    .duration(250)
    .attrTween("d", arcTween1((d/totTotal)*tau))
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

}