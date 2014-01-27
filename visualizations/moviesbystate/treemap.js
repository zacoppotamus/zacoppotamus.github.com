var margin = {top: 40, right: 10, bottom: 10, left: 10},
	width = 1200 - margin.left - margin.right,
	height = 600 - margin.top - margin.bottom;

var color = d3.scale.category20c();


var canvas = d3.select("body").append("svg")
    .style("position", "relative")
    .attr("width", (width + margin.left + margin.right))
    .attr("height", (height + margin.top + margin.bottom))
    .style("x", margin.left)
    .style("y", margin.top);

d3.json("/visualizations/moviesbystate/data/moviesbystate.json", function(data) {
	var treemap = d3.layout.treemap()
		.size([width, height])
		.nodes(data);
	var cells = canvas.selectAll(".cell")
		.data(treemap)
		.enter()
		.append("g")
		.attr("class", "cell")

	cells.append("rect")
		.attr("x", function(d) {return d.x; })
		.attr("y", function(d) {return d.y; })
		.attr("width", function(d) {return d.dx; })
		.attr("height", function(d) {return d.dy; })
		.attr("fill", function(d) {return d.children? null: color(d.state); })
		.attr("stroke", "#000");

	cells.append("text")
		.attr("x", function(d) { return d.x + 5;})
		.attr("y", function(d) { return d.y + d.dy / 2; })
		.text(function(d) { return d.children ? null : usstates[d.state]; });
})