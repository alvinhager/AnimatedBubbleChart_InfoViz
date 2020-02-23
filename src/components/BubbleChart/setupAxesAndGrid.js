import * as d3 from 'd3';

export default function setupAxes(svg_width, svg_height, margin, divRef, classes) {

    const bubbleChartContainer = d3.select(divRef.current);
    const bubble_chart = bubbleChartContainer.append("svg")
        .attr("id", "bubble_chart")
        .attr("viewBox", "0 0 " + (svg_width + margin.left + margin.right) + " " + (svg_height + margin.top + margin.bottom))
        .attr("preserveAspectRatio", "xMinYMin meet");
    const chart = bubble_chart.append("g")
        .attr("class", "chart")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    chart.append("circle").attr("cx", '50%').attr("cy", '50%').attr('r', '20%');

    const xScale = d3.scaleLinear();
    const yScale = d3.scaleLinear();

    const topScale = d3.scaleLinear().range([0, svg_width]);
    const rightScale = d3.scaleLinear().range([svg_height, 0]);

    var topAxis = d3.axisTop().scale(topScale).ticks(0);
    var rightAxis = d3.axisRight().scale(rightScale).ticks(0);

    // create x and y axis that will be rendered initially
    var xAxis = d3.axisBottom()
        .scale(xScale);
    var yAxis = d3.axisLeft()
        .scale(yScale);

    // age
    const y_min = 0;
    const y_max = 100;
    // GDP
    const x_min = 0
    const x_max = 100;

    // Call axes
    chart.append("g")
        .attr("class", "axis")
        .attr("id", "y-axis");

    chart.append("g")
        .attr("class", "axis")
        .attr("id", "x-axis")
        .attr("transform", "translate(0," + (svg_height) + ")");

    chart.append("g")
        .attr("class", "axis")
        .call(topAxis);

    chart.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + (svg_width) + ",0)")
        .call(rightAxis);

    const x_ticks = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
    const x_domain = x_ticks;

    const y_ticks = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
    const y_domain = y_ticks;

    xScale.domain(x_domain)
        .range([0, svg_width * 1 / 10,
            svg_width * 2 / 10,
            svg_width * 3 / 10,
            svg_width * 4 / 10,
            svg_width * 5 / 10,
            svg_width * 6 / 10,
            svg_width * 7 / 10,
            svg_width * 8 / 10,
            svg_width * 9 / 10,
            svg_width]);

    yScale.domain(y_domain)
        .range([0, svg_height * 1 / 10,
            svg_height * 2 / 10,
            svg_height * 3 / 10,
            svg_height * 4 / 10,
            svg_height * 5 / 10,
            svg_height * 6 / 10,
            svg_height * 7 / 10,
            svg_height * 8 / 10,
            svg_height * 9 / 10,
            svg_height]);

    // Define Y axis
    var yAxis = d3.axisLeft()
        .scale(yScale)
        .tickValues(y_ticks);

    // Update the domain of the x scale
    var xAxis = d3.axisBottom()
        .scale(xScale)
        .tickValues(x_ticks);

    chart.select("#x-axis").call(xAxis);
    chart.select("#y-axis").call(yAxis);

    // add the X gridlines
    chart.append("g")
        .attr("class", "grid")
        .style("stroke-dasharray", "5 5")
        .attr("transform", "translate(0," + svg_height + ")")
        .call(
            d3.axisBottom(xScale).tickValues(x_ticks)
                .tickSize(-svg_height)
                .tickFormat("")
        );
    // add the Y gridlines
    chart.append("g")
        .attr("class", classes.grid)
        .style("stroke-dasharray", "5 5")
        .call(
            d3.axisLeft(yScale).tickValues(y_ticks)
                .tickSize(-svg_width)
                .tickFormat(""));

};


