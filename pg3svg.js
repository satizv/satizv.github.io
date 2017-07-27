var svg = d3.select("#pg3svg")
      .append("svg")
      .attr("id","pg3svgid")
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

document.getElementById("pg3mark1").onmouseover = function () {
  console.log("insidepg3mark1"); 
  d3.csv("data/sharktotal.csv", function(d, i, columns) {
  console.log(d);
  return d; 
  }, function(error, data) {
  if (error) throw error;  
  
  load(data);

  }); 

};
document.getElementById("pg3mark2").onmouseover = function () {  
  console.log("insidepg3mark2"); 
  d3.csv("data/sharktotal.csv", function(d, i, columns) {
  console.log(d);
  return d; 
  }, function(error, data) {
  if (error) throw error;  
  
  loadpcnt(data);

  }); 

};

function load(data) {

  removegraph();

  g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")"); 
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

  
  var symbolGenerator = d3.symbol()
  .type(d3.symbolStar)
  .size(80);

  var pathData = symbolGenerator();

  g.append("g")
    .attr("transform", "translate("+ (x(values[0])+50) + "," + ((y("Food") + y("Fashion"))/2) + ")")
    .append("path")
    .attr("d",pathData)
    .attr("fill","red");

  g.append("g")
    .attr("transform", "translate("+ (x(values[1])+50) + "," + ((y("Fashion") + y("Lifestyle"))/2) + ")")
    .append("path")
    .attr("d",pathData)
    .attr("fill","red");

  g.append("g")
    .attr("transform", "translate("+ (x(values[2])+50) + "," + ((y("Lifestyle") + y("Education"))/2) + ")")
    .append("path")
    .attr("d",pathData)
    .attr("fill","red");

  g.append("g")
    .attr("transform", "translate(180,355)")
    .append ("text")
    .text("Number of Deals")
    .attr("class", "axistext");

  
  g.append("g")
      .attr("class", "axis")
      .call(d3.axisLeft(y).ticks(null, "s"))
      ;
  
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
      .attr("class", "bar")
      .on('mouseover', function() { console.log('mouseover'); })
      .on('mouseout', function() { console.log('mouseout'); })
      .on("mouseover", function(d,i) {
        pg3tooltip.style("opacity", 1)
               .style("left",(d3.event.pageX)+"px")
               .style("top",(d3.event.pageY)+"px")
               .html("Presented - " + d.data.Total);
      })
      .on("mouseout", function() { pg3tooltip.style("opacity", 0) })
      .on("click", function (d) {pg3drawsidebar(d.data.Category,d.data.Total,d.data.Closed,d.data.PcntClosed,d.data.Valuation);})
      ;


  g.append("g")
    .selectAll("g")
    .data(d3.stack().keys(keys)(data))
    .enter().append("g")
    //  .attr("fill", function(d) { console.log(z(d.key)); console.log(z(d.Category)); return z(d.Category); })
    .selectAll("rect")
    .data(function(d) { return d; })
    .enter().append("rect")
    .attr("class", "bar")
      //.attr("x", function(d) { return x(d.data.season); })
      .attr("fill", "#4A8393")
      .attr("x",0)
      .attr("y", function(d) { console.log(d.data.Category); console.log(y(d.data.Category)); return y(d.data.Category); })
      .attr("width", function(d) { console.log(d.data.Closed); console.log(x(d.data.Closed)); return x(d.data.Closed); })
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
      .on("click", function (d) {pg3drawsidebar(d.data.Category,d.data.Total,d.data.Closed,d.data.PcntClosed,d.data.Valuation);})
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
    .attr("id","pg3svgtxtcat");    

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
    .text(format(+totTotal))
    .attr("text-anchor","middle")
    .attr("alignment-baseline","central")
    .attr("class", "hsidebar")
    .attr("id","pg3svgtxt1");
    

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
    .attr("id","pg3svgtxt2")
    .text(format(+totClosed))
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
    .text(formcrncy(+totVal/10))
    .attr("id","pg3svgtxt4")
    .attr("text-anchor","middle")
    .attr("alignment-baseline","central")
    .attr("class", "hsidebar");






  g.append("g")
    .attr("transform", "translate(600,280)")
    .append ("text")
    .text(formpcnt(+totClosed/+totTotal))
    .attr("text-anchor","middle")
    .attr("alignment-baseline","central")
    .attr("id","pg3svgtxt3")
    .attr("class", "hsidebar")
    ;

  var tau = 2 * 3.141592653589793;
  var arc =  d3.arc()
            .innerRadius(30)
            .outerRadius(50)
            .startAngle(0)
            .endAngle(tau)
            ;
  


  g.append("g")
    .attr("transform", "translate(600,280)")
    .append ("path")
    .attr("d", arc)
    .attr("id","pg3svgarc1")
    .attr("class", "arc");

    var arc =  d3.arc()
            .innerRadius(30)
            .outerRadius(50)
            .startAngle(0)
            .endAngle((+totClosed * tau)/+totTotal)
            ;

  g.append("g")
    .attr("transform", "translate(600,280)")
    .append ("path")
    .attr("d", arc)
    .attr("id","pg3svgarc2")
    .attr("class", "darc");



}

function loadpcnt(data) {

  removegraph();
  var pg3tooltip = d3.select("#pg3tooltip");
  var y = d3.scaleBand()
    .rangeRound([0, height])
    .paddingInner(0.05)
    .align(0.1);

  var x = d3.scaleLinear()
    .rangeRound([0,width - 100]);


  var g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  y.domain(data.map(function(d) { return d.Category; }));
  
  x.domain([0, d3.max(data, function(d) { return +d.PcntTotal; })]).nice();
  
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
  console.log(d3.max(data, function(d) { return +d.PcntTotal; }));
  y.domain(data.map(function(d) { return d.Category; }));
  x.domain([0, d3.max(data, function(d) { return +d.PcntTotal; })]).nice();

  console.log(z("Food"));

  var values = data.map(function(d) { return d.Total; });
  var valuesClosed = data.map(function(d) { return d.Closed; });
  var valuespcnt = data.map(function(d) { return d.PcntTotal; });
  console.log(values);  
  console.log(values[0]);

   var symbolGenerator = d3.symbol()
  .type(d3.symbolStar)
  .size(80);

  

  var pathData = symbolGenerator();

  g.append("g")
    .attr("transform", "translate("+ (x(valuespcnt[2])+10) + "," + ((y("Lifestyle") + y("Education"))/2) + ")")
    .append("path")
    .attr("d",pathData)
    .attr("fill","red");

       var symbolGenerator = d3.symbol()
      .type(d3.symbolStar)
      .size(80);

    var pathData1 = symbolGenerator();

     g.append("g")
    .attr("transform", "translate("+ (x(valuespcnt[4])+10) + "," + ((y("Tech") + y("Fitness"))/2) + ")")
    .append("path")
    .attr("d",pathData1)
    .attr("fill","red"); 



    console.log("Path" + x(valuesClosed[4]) + " Fitness" + y("Fitness") + "Tech" + y("Tech") );


  g.append("g")
    .attr("transform", "translate(180,355)")
    .append ("text")
    .text("Percentage")
    .attr("class", "axistext");

  g.append("g")
      .attr("class", "axis")
      .call(d3.axisLeft(y).ticks(null, "s"));
  
  g.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  var keys = data.map(function(d) { return d.Category; });

/*
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
      .attr("class", "bar")
      .on('mouseover', function() { console.log('mouseover'); })
      .on('mouseout', function() { console.log('mouseout'); })
      .on("mouseover", function(d,i) {
        pg3tooltip.style("opacity", 1)
               .style("left",(d3.event.pageX)+"px")
               .style("top",(d3.event.pageY)+"px")
               .html("Presented - " + d.data.PcntTotal + "%");
      })
      .on("mouseout", function() { pg3tooltip.style("opacity", 0) })
      .on("click", function (d) {pg3drawsidebar(d.data.Category,d.data.Total,d.data.Closed,d.data.PcntClosed);})
      .transition()
      .delay(function(d,i) {return (i*1000+1000)})
      .attr("width", function(d) { console.log(d.data.PcntTotal); console.log(x(d.data.PcntTotal)); return x(d.data.PcntTotal); })
      ;

*/

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
      .attr("width", function(d) { console.log(d.data.PcntClosed); console.log(x(d.data.PcntClosed)); return x(d.data.PcntClosed); })
      .attr("height", y.bandwidth())
      .attr("class", "bar")
      .on('mouseover', function() { console.log('mouseover'); })
      .on('mouseout', function() { console.log('mouseout'); })
      .on("mouseover", function(d,i) {
        pg3tooltip.style("opacity", 1)
               .style("left",(d3.event.pageX)+"px")
               .style("top",(d3.event.pageY)+"px")
               .html("Closed - " + d.data.PcntClosed + "%");
      })
      .on("mouseout", function() { pg3tooltip.style("opacity", 0) })
      .on("click", function (d) {pg3drawsidebar(d.data.Category,d.data.Total,d.data.Closed,d.data.PcntClosed,d.data.Valuation);})
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
    .attr("id","pg3svgtxtcat");    

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
    .text(format(+totTotal))
    .attr("text-anchor","middle")
    .attr("alignment-baseline","central")
    .attr("class", "hsidebar")
    .attr("id","pg3svgtxt1");
    

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
    .attr("id","pg3svgtxt2")
    .text(format(+totClosed))
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
    .text(formcrncy(+totVal/10))
    .attr("id","pg3svgtxt4")
    .attr("text-anchor","middle")
    .attr("alignment-baseline","central")
    .attr("class", "hsidebar");






  g.append("g")
    .attr("transform", "translate(600,280)")
    .append ("text")
    .text(formpcnt(+totClosed/+totTotal))
    .attr("text-anchor","middle")
    .attr("alignment-baseline","central")
    .attr("id","pg3svgtxt3")
    .attr("class", "hsidebar")
    ;

  var tau = 2 * 3.141592653589793;
  var arc =  d3.arc()
            .innerRadius(30)
            .outerRadius(50)
            .startAngle(0)
            .endAngle(tau)
            ;
  


  g.append("g")
    .attr("transform", "translate(600,280)")
    .append ("path")
    .attr("d", arc)
    .attr("id","pg3svgarc1")
    .attr("class", "arc");

    var arc =  d3.arc()
            .innerRadius(30)
            .outerRadius(50)
            .startAngle(0)
            .endAngle((+totClosed * tau)/+totTotal)
            ;

  g.append("g")
    .attr("transform", "translate(600,280)")
    .append ("path")
    .attr("d", arc)
    .attr("id","pg3svgarc2")
    .attr("class", "darc");



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

function runpgpcnt3()
{

  d3.csv("data/sharktotal.csv", function(d, i, columns) {
  console.log(d);
  return d; 
  }, function(error, data) {
    if (error) throw error;  
  
    drawpg3pcntgraph(data);

  });

}

function runpgval3() {
    d3.csv("data/sharktotal.csv", function(d, i, columns) {
  console.log(d);
  return d; 
  }, function(error, data) {
    if (error) throw error;  
  
    drawpg3valgraph(data);

  });
}

function runpgshark3() {
    d3.csv("data/sharkcount.csv", function(d, i, columns) {
  console.log(d);
  return d; 
  }, function(error, data) {
    if (error) throw error;  
  
    drawpg3shgraph(data);

  });

}

function removegraph()
{
  //alert("inside");
  d3.selectAll("rect").remove();
  d3.selectAll("text").remove();
  d3.selectAll("path").remove();
  d3.selectAll("g").remove();


}

/*
function drawpg3shgraph(data) {

  removegraph();
  var pg3tooltip = d3.select("#pg3tooltip");
  var y = d3.scaleBand()
    .rangeRound([0, height])
    .paddingInner(0.05)
    .align(0.1);

  var x = d3.scaleLinear()
    .rangeRound([0,width - 100]);

  var z = d3.scaleOrdinal()
    .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c"]);  

  var g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var keys = data.columns.slice(1);
  
  console.log("Keys" + keys);
  
  y.domain(data.map(function(d) { return d.Category; }));
  
  x.domain([0, 100]).nice();

  z.domain(keys);


  var pg3tooltip = d3.select("#pg3tooltip");

  
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
*/

function drawpg3shgraph(data) {

  removegraph();
  var pg3tooltip = d3.select("#pg3tooltip");
  var y = d3.scaleBand()
    .rangeRound([0, height])
    .paddingInner(0.05)
    .align(0.1);

  var x1 = d3.scaleLinear()
    .rangeRound([0,90]);

  var x2 = d3.scaleLinear()
    .rangeRound([100,190]);

  var x3 = d3.scaleLinear()
    .rangeRound([200,290]);

  var x4 = d3.scaleLinear()
    .rangeRound([300,390]);

  var x5 = d3.scaleLinear()
    .rangeRound([400,490]);

  var x6 = d3.scaleLinear()
    .rangeRound([500,590]);


  var z = d3.scaleOrdinal()
    .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c"]);  

  var g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var keys = data.columns.slice(1);
  
  console.log("Keys" + keys);
  
  y.domain(data.map(function(d) { return d.Category; }));
  
  x1.domain([0, 30]).nice();
  x2.domain([0, 30]).nice();
  x3.domain([0, 30]).nice();
  x4.domain([0, 30]).nice();
  x5.domain([0, 30]).nice();
  x6.domain([0, 30]).nice();
  

  z.domain(keys);


  var pg3tooltip = d3.select("#pg3tooltip");

    g.append("g")
      .attr("class", "axis")
      .call(d3.axisLeft(y).ticks(null, "s"))
      ;

      g.append("g")
    .attr("class", "axis")
    //.attr("transform", "translate(0," + height + ")")
    .call(d3.axisTop(x1).tickValues([0, 10, 20]));
  
        g.append("g")
    .attr("class", "axis")
    //.attr("transform", "translate(81," + height + ")")
    .call(d3.axisTop(x2).tickValues([0, 10, 20]));
        g.append("g")
    .attr("class", "axis")
    //.attr("transform", "translate(161," + height + ")")
    .call(d3.axisTop(x3).tickValues([0, 10, 20]));

        g.append("g")
    .attr("class", "axis")
    //.attr("transform", "translate(241," + height + ")")
    .call(d3.axisTop(x4).tickValues([0, 10, 20]));

          g.append("g")
    .attr("class", "axis")
    //.attr("transform", "translate(321," + height + ")")
    .call(d3.axisTop(x5).tickValues([0, 10, 20]));

              g.append("g")
    .attr("class", "axis")
    //.attr("transform", "translate(401," + height + ")")
    .call(d3.axisTop(x6).tickValues([0, 10, 20]));

    console.log(x1(30));
    console.log(x2(30));
    console.log(x3(30));
    console.log(x4(30));
    console.log(x5(30));
    console.log(x6(30));

    var lineGenerator = d3.line().x([100,120]).y([200,220]);
   



g.append("g").append("line")
    .attr("x1", 100)
    .attr("y1", 0)
    .attr("x2", 100) 
    .attr("y2", +height)
    .style("stroke","black");

g.append("g").append("line")
    .attr("x1", 200)
    .attr("y1", 0)
    .attr("x2", 200) 
    .attr("y2", +height)
    .style("stroke","black");
g.append("g").append("line")
    .attr("x1", 300)
    .attr("y1", 0)
    .attr("x2", 300) 
    .attr("y2", +height)
    .style("stroke","black");
g.append("g").append("line")
    .attr("x1", 400)
    .attr("y1", 0)
    .attr("x2", 400) 
    .attr("y2", +height)
    .style("stroke","black");
g.append("g").append("line")
    .attr("x1", 500)
    .attr("y1", 0)
    .attr("x2", 500) 
    .attr("y2", +height)
    .style("stroke","black");
}



function drawpg3graph(data)
{

  removegraph();
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
    .attr("transform", "translate(180,355)")
    .append ("text")
    .text("Number of Deals")
    .attr("class", "axistext");

  
  g.append("g")
      .attr("class", "axis")
      .call(d3.axisLeft(y).ticks(null, "s"))
      ;
  
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
      .attr("class", "bar")
      .on('mouseover', function() { console.log('mouseover'); })
      .on('mouseout', function() { console.log('mouseout'); })
      .on("mouseover", function(d,i) {
        pg3tooltip.style("opacity", 1)
               .style("left",(d3.event.pageX)+"px")
               .style("top",(d3.event.pageY)+"px")
               .html("Presented - " + d.data.Total);
      })
      .on("mouseout", function() { pg3tooltip.style("opacity", 0) })
      .on("click", function (d) {pg3drawsidebar(d.data.Category,d.data.Total,d.data.Closed,d.data.PcntClosed,d.data.Valuation);})
      .transition()
      .delay(function(d,i) {return (i*1000+1000)})
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
    .attr("class", "bar")
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
      .on("click", function (d) {pg3drawsidebar(d.data.Category,d.data.Total,d.data.Closed,d.data.PcntClosed,d.data.Valuation);})
      .transition()
      .delay(function(d,i) {return (i*1000+2000)})
      .attr("width", function(d) { console.log(d.data.Closed); console.log(x(d.data.Closed)); return x(d.data.Closed); })
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
    .attr("id","pg3svgtxtcat");    

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
    .attr("id","pg3svgtxt1");

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
    .attr("id","pg3svgtxt2")
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
    .attr("id","pg3svgtxt4")
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
    .attr("id","pg3svgtxt3")
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
    var del = i*1000+2000;
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
    .attr("transform", "translate(600,280)")
    .append ("path")
    .datum({endAngle: 0})
    .attr("d", arc)
    .attr("id","pg3svgarc1")
    .attr("class", "arc");

  values.forEach(function(d,i) {
    var del = i*1000+1000;
    d3.select("#pg3svgarc1")
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
    .attr("id","pg3svgarc2")
    .attr("class", "darc");

  valuesClosed.forEach(function(d,i) {
    var del = i*1000+2000;
    d3.select("#pg3svgarc2")
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

function drawpg3pcntgraph(data)
{
  removegraph();
  var pg3tooltip = d3.select("#pg3tooltip");
  var y = d3.scaleBand()
    .rangeRound([0, height])
    .paddingInner(0.05)
    .align(0.1);

  var x = d3.scaleLinear()
    .rangeRound([0,width - 100]);


  var g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  y.domain(data.map(function(d) { return d.Category; }));
  
  x.domain([0, d3.max(data, function(d) { return +d.PcntTotal; })]).nice();
  
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
  console.log(d3.max(data, function(d) { return +d.PcntTotal; }));
  y.domain(data.map(function(d) { return d.Category; }));
  x.domain([0, d3.max(data, function(d) { return +d.PcntTotal; })]).nice();

  console.log(z("Food"));

  var values = data.map(function(d) { return d.Total; });
  var valuesClosed = data.map(function(d) { return d.Closed; })
  console.log(values);  
  console.log(values[0]);


  g.append("g")
    .attr("transform", "translate(180,355)")
    .append ("text")
    .text("Percentage")
    .attr("class", "axistext");

  g.append("g")
      .attr("class", "axis")
      .call(d3.axisLeft(y).ticks(null, "s"));
  
  g.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  var keys = data.map(function(d) { return d.Category; });

/*
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
      .attr("class", "bar")
      .on('mouseover', function() { console.log('mouseover'); })
      .on('mouseout', function() { console.log('mouseout'); })
      .on("mouseover", function(d,i) {
        pg3tooltip.style("opacity", 1)
               .style("left",(d3.event.pageX)+"px")
               .style("top",(d3.event.pageY)+"px")
               .html("Presented - " + d.data.PcntTotal + "%");
      })
      .on("mouseout", function() { pg3tooltip.style("opacity", 0) })
      .on("click", function (d) {pg3drawsidebar(d.data.Category,d.data.Total,d.data.Closed,d.data.PcntClosed);})
      .transition()
      .delay(function(d,i) {return (i*1000+1000)})
      .attr("width", function(d) { console.log(d.data.PcntTotal); console.log(x(d.data.PcntTotal)); return x(d.data.PcntTotal); })
      ;

*/

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
        pg3tooltip.style("opacity", 1)
               .style("left",(d3.event.pageX)+"px")
               .style("top",(d3.event.pageY)+"px")
               .html("Closed - " + d.data.PcntClosed + "%");
      })
      .on("mouseout", function() { pg3tooltip.style("opacity", 0) })
      .on("click", function (d) {pg3drawsidebar(d.data.Category,d.data.Total,d.data.Closed,d.data.PcntClosed,d.data.Valuation);})
      .transition()
      .delay(function(d,i) {return (i*1000+2000)})
      .attr("width", function(d) { console.log(d.data.PcntClosed); console.log(x(d.data.PcntClosed)); return x(d.data.PcntClosed); })
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
    .attr("id","pg3svgtxtcat");    

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
    .attr("id","pg3svgtxt1");

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
    .attr("id","pg3svgtxt2")
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
    .attr("id","pg3svgtxt4")
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
    .attr("id","pg3svgtxt3")
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
    var del = i*1000+2000;
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
    .attr("transform", "translate(600,280)")
    .append ("path")
    .datum({endAngle: 0})
    .attr("d", arc)
    .attr("id","pg3svgarc1")
    .attr("class", "arc");

  values.forEach(function(d,i) {
    var del = i*1000+1000;
    d3.select("#pg3svgarc1")
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
    .attr("id","pg3svgarc2")
    .attr("class", "darc");

  valuesClosed.forEach(function(d,i) {
    var del = i*1000+2000;
    d3.select("#pg3svgarc2")
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



function pg3drawsidebar(cat,tot,clo,pct,val) {

  console.log(cat);
  console.log(tot);
  console.log(clo);
  console.log(pct);
  console.log(val);
  d3.select("#pg3svgtxtcat")
   .text(cat); 

  d3.select("#pg3svgtxt1")
   .text(tot); 

  d3.select("#pg3svgtxt2")
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
  
  d3.select("#pg3svgarc1")
  .attr("d", arc1);

  d3.select("#pg3svgarc2")
  .attr("d", arc2);
  var formpcnt = d3.format(".0%");
  d3.select("#pg3svgtxt3")
   .text(formpcnt(pct/100));
   var formcrncy = d3.format(",.0f");
    d3.select("#pg3svgtxt4")
   .text("$" + formcrncy(val));


}

function drawpg3valgraph(data) {
  removegraph();
  var pg3tooltip = d3.select("#pg3tooltip");
  var y = d3.scaleBand()
    .rangeRound([0, height])
    .paddingInner(0.05)
    .align(0.1);

  var x = d3.scaleLinear()
    .rangeRound([0,width - 100]);


  var g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

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

  var pg3tooltip = d3.select("#pg3tooltip");

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
        pg3tooltip.style("opacity", 1)
               .style("left",(d3.event.pageX)+"px")
               .style("top",(d3.event.pageY)+"px")
               .html("Valuation - $" + d.data.Valuation);
      })
      .on("mouseout", function() { pg3tooltip.style("opacity", 0) })
      .on("click", function (d) {pg3drawsidebar(d.data.Category,d.data.Total,d.data.Closed,d.data.PcntClosed,d.data.Valuation);})
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
    .attr("id","pg3svgtxtcat");    

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
    .attr("id","pg3svgtxt1");

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
    .attr("id","pg3svgtxt2")
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
    .attr("id","pg3svgtxt4")
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
    .attr("id","pg3svgtxt3")
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
    var del = i*1000+2000;
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
    .attr("transform", "translate(600,280)")
    .append ("path")
    .datum({endAngle: 0})
    .attr("d", arc)
    .attr("id","pg3svgarc1")
    .attr("class", "arc");

  values.forEach(function(d,i) {
    var del = i*1000+1000;
    d3.select("#pg3svgarc1")
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
    .attr("id","pg3svgarc2")
    .attr("class", "darc");

  valuesClosed.forEach(function(d,i) {
    var del = i*1000+2000;
    d3.select("#pg3svgarc2")
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