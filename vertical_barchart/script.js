var data;
var d3;

d3.csv("vaccines.csv", function(dataset) {
    data = dataset;
    buildIt();
});

function buildIt() {
    var gap = 15
    var w = 600;
    var h = 400;
    var padding = 10;
    var barWidth = 1.12;

    var svg = d3.select("body")
        .append("svg")
        .attr("width", w)
        .attr("height", h);

    var xScale = d3.scaleLinear()
        .domain([0, data.length])
        .range([-gap, w]);

    var xAxis = d3.axisBottom()
        .scale(xScale)
        .ticks(0);

    var yScale = d3.scaleLinear()
        .domain([0, 30])
        .range([h, 0]);

    var yAxis = d3.axisLeft()
        .scale(yScale)
        .ticks(10)
        .tickFormat(function(d) {
            return d + "%"
        });

    var group = svg.selectAll('g')
        .data(data)
        .enter()
        .append('g');

    var bars = group
        .append("rect")
        .attr("x", function(d, i) {
            return i * xScale(barWidth) + padding / 2;
        })
        .attr("y", function(d) {
            return yScale(d.DataValueAlt)
        })
        .attr("width", xScale(barWidth) - padding)
        .attr("height", function(d) {
            return h - yScale(d.DataValueAlt)
        })
        .attr("fill", function(d) {
            return setBarColors(d);
        });


    group.on("mouseover", function(d) {
            d3.select(this)
                .select('rect')
                .transition().duration(200)
                .attr("fill", "#8B4513");
            d3.select(this)
                .selectAll('text.ctgry')
                .transition().duration(200)
                .attr('fill', '#fff');
        })
        .append("title")
        .text(function(d) {
            return d.StratificationCategory1;
        });


    group.on("mouseout", function(d, i) {
        d3.select(this)
            .select('rect')
            .transition().duration(200)
            .attr("fill", function(d) {
                return setBarColors(d);
            });
        d3.select(this)
            .selectAll('text.ctgry')
            .transition().duration(200)
            .attr('fill', '#4c4534');
    })

    var percentLabels = group
        .append("text")
        .text(function(d) {
            return d.DataValueAlt + '%';
        })
        .attr("text-anchor", "middle")
        .attr("x", function(d, i) {
            return i * xScale(barWidth) + xScale(barWidth) / 2;
        })
        .attr("y", function(d) {
            return yScale(d.DataValueAlt) + 35;
        })
        .attr("font-family", "sans-serif")
        .attr("font-size", "15px")
        .attr("fill", "white")
        .attr("font-weight", "bold");

    var ctgryLabels = group
        .append("text")
        .text(function(d) {
            return d.Stratification1;
        })
        .attr("text-anchor", "middle")
        .attr("x", function(d, i) {
            return i * xScale(barWidth) + xScale(barWidth) / 2;
        })
        .attr("class", "ctgry")
        .attr("y", h - 20)
        .attr("font-family", "sans-serif")
        .attr("font-size", "13px")
        .attr("fill", "#4c4534")
        .attr("font-weight", "bold");

    svg.append("g")
        .attr("transform", "translate(0," + h + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + -gap + ", 0)")
        .call(yAxis);

    function setBarColors(d) {
        var colorName = ''
        if (d.StratificationCategory1 === "Kategiri_1") colorName = "#4CB5F5"
        else if (d.StratificationCategory1 === "Kategiri_2") colorName = "#34675C"
        else if (d.StratificationCategory1 === "Kategiri_3") colorName = "#B3C100"
        else colorName = "#cd9898";
        return colorName;
    }

    // Fungsi untuk membuat legenda
function buatLegenda() {
    var legendContainer = d3.select("body").append("div").attr("id", "legend-container").style("position", "absolute").style("top", "50px").style("right", "10px");

    var legendData = [
        { label: 'Kategori 1(Usia 1-25)', color: '#4CB5F5' },
        { label: 'Kategori 2(Usia 26-50)', color: '#34675C' },
        { label: 'Kategori 3(Usia 51-95)', color: '#B3C100' }
    ]; // Ganti dengan kategori sesuai dengan data Anda

    var legend = legendContainer.append("svg")
        .attr("width", 50)
        .attr("height", 100)
        .style("position", "sticky")
        .style("top", "0")
        .style("left", "0");

    var legendItems = legend.selectAll(".legend-item")
        .data(legendData)
        .enter()
        .append("g")
        .attr("class", "legend-item")
        .attr("transform", function(d, i) { return "translate(0," + (i * 20) + ")"; });

    legendItems.append("rect")
        .attr("x", 0)
        .attr("width", 15)
        .attr("height", 15)
        .style("fill", function(d) { return d.color; });

    legendItems.append("text")
        .attr("x", 20)
        .attr("y", 8)
        .attr("dy", ".35em")
        .style("text-anchor", "start")
        .text(function(d) { return d.label; });
}

    buatLegenda();
}
