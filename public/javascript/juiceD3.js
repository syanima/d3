 d3.json('./juice_orders',function(err, data){

	var drinkNames = data.map(function(juice){
	return juice.drinkName;
	});

	var distinctDrinks = drinkNames.filter(function(item, i, ar){ 
		return ar.indexOf(item) === i; 
	});

	var distinctDrinksData = [];

	distinctDrinks.forEach(function(drink){
		var count = 0;
		drinkNames.forEach(function(drinkName){
			if(drink == drinkName){
				count ++;
			};
		});
		if(drink != 'CTL' && drink != "ctl" && drink != "Fruits" &&
			drink != "banana" && drink != "Apple" && drink != "Register User")
			distinctDrinksData.push({'label':drink,'value':count});
	});

	distinctDrinksData.sort(function(data1,data2){
		return data2.value - data1.value 
	});

	var margin = {top: 10, right:0, bottom: 180, left: 120},
		width = 1500 - margin.left -200,
   	    height = 800
        radius = Math.min(width, height) / 2;

    var color = d3.scale.category20b();   

	var arc = d3.svg.arc()
	    .outerRadius(radius - 100)
	    .innerRadius(radius - 200);

	var pie = d3.layout.pie()
	    .sort(null)
	    .value(function(d) { return d.value; });

	var svg = d3.select("body").append("svg")
	    .attr("width", width)
	    .attr("height", height)
	  	.append("g")
	    .attr("transform", "translate(" + width / 1.4 + "," + height / 2.1 + ")");

	svg.append("text")
		.attr("class", "describe")
		.attr("transform", "translate(-100,0)");

	svg.append("text")
		.attr("class", "totalNumber")
		.attr("transform", "translate(-100,20)");

	var g = svg.selectAll(".arc")
	    .data(pie(distinctDrinksData))
	    .enter().append("g")
	    .attr("class", "arc");

	   g.append("path")
	    .attr("d", arc)
	    .style("fill", function(d) {return color(d.label); });

	   g.append("svg:path")
        .attr("fill", function(d, i) { return color(i); }) 
        .attr("d", arc)
        .on("mouseover",  function(d,i){
	        d3.select('.describe')
	        .text("Juice name : "+d.data.label )

	        d3.select('.totalNumber')
	        .text("Total Number : "+d.data.value)
      	})
        .on("mouseout",function(d,i){
          d3.select('.describe')
          	.text("");
          d3.select('.totalNumber')
	        .text("");
        });
});