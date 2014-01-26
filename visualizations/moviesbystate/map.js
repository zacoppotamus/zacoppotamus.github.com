/* TO DO: Add color legend and 9 instead of 4 thumbnails*/

var width = window.innerWidth, height = window.innerHeight-30;

var container = d3.select("#svg").append("div")
	.attr("id", "container");
var thumbnails = d3.select("#container").append("div")
	.attr("class", "row1");
var thumbnails2 = d3.select("#container").append("div")
	.attr("class", "row2");

var svg = d3.select("#svg")
	.append("svg")
	.attr("width", width)
	.attr("height", height);
var projection = d3.geo.albersUsa()
	.scale([1200])
	.translate([450, height/2]);
var path = d3.geo.path()
	.projection(projection);


d3.csv("/visualizations/moviesbystate/data/moviesbystate.csv", function(data)
{
	addLegend();
	// Define color scale
	colors = colorbrewer.RdYlBu[9];

	// Define color scale for 3 diverging states
	// (NY, WA, CA)
	color3 = d3.scale.linear()
		.domain([173, 748])
		.range(colorbrewer.OrRd[3]);

	var color = d3.scale.linear()
		.domain(d3.range(0, 1, 1.0 / (colors.length - 1)))
		.range(colorbrewer.Blues[9]);

	// dynamic bit...
	var c = d3.scale.linear()
		.domain([0, 172])
		.range([1,0]);

	d3.json("/visualizations/moviesbystate/data/us-states.json", function(json)
	{

		for (var i=0; i<data.length; i++)
		{
			// Get state name
			var dataState = data[i].state;

			// Get value
			var dataValue = +data[i].value;

			for (var j=0; j<json.features.length; j++)
			{
				var jsonState = json.features[j].properties.name;

				if(dataState == jsonState)
				{
					json.features[j].properties.value = dataValue;
					break;
				}
			}
		}

		svg.selectAll("path")
			.data(json.features)
			.enter()
			.append("path")
			.attr("d", path)
			.style("fill", function(d)
			{
				return colorState(d.properties.value);
			})
			.style("stroke", "black")
			.style("stroke-width", "0.5px")
			.on("mouseover", function(d)
			{
				// add tooltip (among others)
				container.transition().duration(200).style("opacity", .9);
				container
					.style("left", width - width/3 + "px")
					.style("top", "5%")
					.style("bottom", "5%");
				addPictures(usstates[d.properties.name], d.properties.value);
				console.log(d.properties.name, usstates[d.properties.name], d.properties.value);
				d3.select(this)
					.style("fill", "orange");
				svg.append("g")
					.append("text")
					.attr("x", 30)
					.attr("y", 30)
					.attr("dy", ".75em")
					.attr("class", "state")
					.text(d.properties.name + ": " + d.properties.value);
			})
			.on("mouseout", function(d)
			{
				container.transition().duration(0).style("opacity", 0);
				thumbnails.selectAll("img").remove();
				thumbnails2.selectAll("img").remove();
				d3.select(this)
					.style("fill", colorState(d.properties.value));
				svg.selectAll("g").remove();
			});
	})

	function colorState(value)
	{
		if (value >= 174) { return color3(value); }
		if (value) { return color(c(value)); }
		else { return "#000035"; }
	}

	// This visualization uses two color scales:
	// OrRd and Blues = 12 colors
	function addLegend()
	{
		var legend = svg.append("svg")
			.attr("id", "legend")
			.attr("height", 50)
			.attr("width", 400)
			.attr("x", 490)
			.attr("y", 25);

		for (var i=0; i<12; i++)
		{
			if (i<9)
			{
				legend.append("rect")
					.attr("id", "key")
					.attr("x", i*400/12)
					.attr("y", 0)
					.style("fill", colorbrewer.Blues[9][8-i])
					.attr("width", 400/12)
					.attr("height", 50);
			}
			else
			{
				legend.append("rect")
				.attr("id", "key")
				.attr("x", i*400/12)
				.attr("y", 0)
				.style("fill", colorbrewer.OrRd[3][i-9])
				.attr("width", 400/12)
				.attr("height", 50);
			}
		}
	}

	// Append pictures to tooltip
	function addPictures(stateAbbr, number)
	{
		var imageArray=[];
		if (number > 4) number = 4;
		for (var i=0; i<number; i++)
		{
			tooltipImage = new Image();
			tooltipImage.src = "/visualizations/moviesbystate/img/" + stateAbbr + i + ".png";
			if (i<2)
			{
				thumbnails.append("img").transition().duration(200).style("opacity", .95)
					.attr("src", tooltipImage.src)
					// if (stateAbbr == "ND") return;
			}
			else
			{
				thumbnails2.append("img").transition().duration(200).style("opacity", .95)
					.attr("src", tooltipImage.src);
			}
		}
	}


});