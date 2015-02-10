var d3 = require("d3"),
    fs = require("fs"),
    haParse = require("./parse-haproxy");

console.log("Hello browser! 2");

function drawHistorgram (svg, pos, size, values) {

    var xAxis, bar;
    // A formatter for counts.
    var formatCount = d3.format(",.0f");

    var x = d3.scale.linear()
            .domain([0, 2500])
            .range([0, size.x]);

    // Generate a histogram using twenty uniformly-spaced bins.
    var data = d3.layout.histogram()
            .bins(x.ticks(25))
    (values);

    var y = d3.scale.linear()
            .domain([0, d3.max(data, function(d) { return d.y; })])
            .range([size.y, 0]);

    xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");

    bar = svg.selectAll(".bar")
            .data(data)
            .enter().append("g")
            .attr("class", "bar")
            .attr("transform", function(d) { return "translate(" + x(d.x) + "," + y(d.y) + ")"; });

    bar.append("rect")
        .attr("x", 1)
        .attr("width", x(data[0].dx) - 1)
        .attr("height", function(d) { return size.y - y(d.y); });

    bar.append("text")
        .attr("dy", ".75em")
        .attr("y", 6)
        .attr("x", x(data[0].dx) / 2)
        .attr("text-anchor", "middle")
        .text(function(d) { return formatCount(d.y); });

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + size.y + ")")
        .call(xAxis);
}

var file = fs.readFileSync(__dirname + "/logs/haproxy-min2.log")
        .split("\n");

var total = haParse(file)
        .filter(function (e) { return e.hasOwnProperty("Tq"); })
        .map(function (e) {
            if (e.Tq > 8000) {
                console.log(e.Tq, e.path);
            }
            return e.Tq;
        });

var svg = d3.select("body").append("svg")
        .attr("width", 900)
        .attr("height", 600)
        .append("g")
        .attr("transform", "translate(" + 40 + "," + 40 + ")");

drawHistorgram(svg, {x: 50, y: 50}, {x: 800, y: 500}, total);
