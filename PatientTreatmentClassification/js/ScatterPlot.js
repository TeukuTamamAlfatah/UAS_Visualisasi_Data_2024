// Ukuran plot dan margin
var margin = { top: 20, right: 20, bottom: 50, left: 50 },
    width = 800 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// Membuat SVG container
var svg = d3.select("#visualization")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Memuat data dari file CSV atau JSON
d3.csv("data/Patient Treatment Classification.csv").then(function(data) {
    // Konversi string ke angka jika perlu
    data.forEach(function(d) {
        d.HAEMATOCRIT = +d.HAEMATOCRIT;
        d.ERYTHROCYTE = +d.ERYTHROCYTE;
    });

    // Skala x untuk kadar hematokrit
    var xScale = d3.scaleLinear()
        .domain(d3.extent(data, function(d) { return d.HAEMATOCRIT; }))
        .range([0, width]);

    // Skala y untuk jumlah eritrosit
    var yScale = d3.scaleLinear()
        .domain(d3.extent(data, function(d) { return d.ERYTHROCYTE; }))
        .range([height, 0]);

    // Membuat sumbu x
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale));

    // Membuat sumbu y
    svg.append("g")
        .call(d3.axisLeft(yScale));

    // Menambahkan titik-titik pada scatter plot
    svg.selectAll("circle")
        .data(data)
        .enter().append("circle")
        .attr("cx", function(d) { return xScale(d.HAEMATOCRIT); })
        .attr("cy", function(d) { return yScale(d.ERYTHROCYTE); })
        .attr("r", 5) // Ukuran titik
        .style("fill", "steelblue");

    // Menambahkan label sumbu x
    svg.append("text")
        .attr("transform", "translate(" + (width / 2) + " ," + (height + margin.top + 20) + ")")
        .style("text-anchor", "middle")
        .text("Kadar Hematokrit");

    // Menambahkan label sumbu y
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Jumlah Eritrosit");
});
