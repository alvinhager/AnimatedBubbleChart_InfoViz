import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import classes from './BubbleChart.module.scss';
// import useTimer from '../hooks/useTimer.js';

import { getWVSDataInWaveFormat } from '../../data/data_functions.js';
import { getGapminderDatasetByIndex, getMinMaxForGapminderDataset, getWholeDataset, getMaxValueForGapminderDatasetByIndex, getMaxValueForGapminderDataset, getTicks, getMinValueForGapminderDataset, getTicksFor } from '../../data/gapminder/gapminder_data_functions.js';


const BubbleChart = ({ value = 0, dataset, dropDownValues }) => {

    const getxAxisQuestion = () => {
        return dropDownValues[0];
    }

    const getyAxisQuestion = () => {
        return dropDownValues[2];
    }

    const getbubbleSizeQuestion = () => {
        return dropDownValues[3];
    }

    const getYearFromValue = () => {
        //1990 to 2010
        return 1990 + Math.round((value / 100) * (20));
    };

    const divRef = useRef();

    var container_width = 2400;
    var container_height = 1000;
    var margin = { top: 50, right: 130, bottom: 80, left: 200 };

    const svg_width = container_width - margin.left - margin.right;
    const svg_height = container_height - margin.top - margin.bottom;

    const rScale = d3.scaleSqrt().domain([0, 5e8]).range([3, 30]);

    const initial_circle_opacity = 1;
    const hidden_circle_opacity = .2;
    const initial_text_opacity = 0;

    const hasMounted = useRef(false);

    let data;

    const xScale = d3.scaleLinear();
    const yScale = d3.scaleLinear();

    const topScale = d3.scaleLinear().range([0, svg_width]);
    const rightScale = d3.scaleLinear().range([svg_height, 0]);

    var topAxis = d3.axisTop().scale(topScale).ticks(0);
    var rightAxis = d3.axisRight().scale(rightScale).ticks(0);

    // create x and y axis that will be rendered initially
    var xAxis = d3.axisBottom().scale(xScale);
    var yAxis = d3.axisLeft().scale(yScale);

    const yearGapminder = Math.round(1990 + value / 100 * (2014 - 1990));

    // variables:
    let y_min = 0;
    let y_max = 100;

    let x_min = 0
    let x_max = 100;

    let x_ticks;
    let x_domain;

    let y_ticks;
    let y_domain;

    let datasetY;
    let datasetX;

    useEffect(() => {

        // draw canvas and chart container
        let bubbleChartContainer = d3.select(divRef.current);
        let canvas = bubbleChartContainer.select("#bubble_chart");
        let chart = canvas.select(".chart");

        if (!hasMounted.current) {
            bubbleChartContainer = d3.select(divRef.current).style("width", '100%')
                .style("height", '100%')
            canvas = bubbleChartContainer.append("svg")
                .attr("overflow", "visible")
                .attr("id", "bubble_chart")
                .attr("viewBox", "0 0 " + (svg_width + margin.left + margin.right) + " " + (svg_height + margin.top + margin.bottom))
                .attr("preserveAspectRatio", "xMinYMin meet")
            chart = canvas.append("g")
                .attr("class", "chart")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

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
        }

        // GAPMINDER
        if (dataset === "Gapminder") {

            // datasetX = getGapminderDatasetByIndex(dropDownValues[0]);
            data = getWholeDataset();


            const mx = getMinMaxForGapminderDataset(1);
            x_max = mx[0];
            x_min = mx[1];

            datasetY = getGapminderDatasetByIndex(dropDownValues[1]);
            y_max = getMaxValueForGapminderDataset(datasetY);
            y_min = getMinValueForGapminderDataset(datasetY);

            x_ticks = getTicks(x_min, x_max, 10);
            x_domain = x_ticks.reverse();

            y_ticks = getTicks(y_min, y_max, 10);
            y_domain = y_ticks;

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
                .range([svg_height,
                    svg_height * 9 / 10,
                    svg_height * 8 / 10,
                    svg_height * 7 / 10,
                    svg_height * 6 / 10,
                    svg_height * 5 / 10,
                    svg_height * 4 / 10,
                    svg_height * 3 / 10,
                    svg_height * 2 / 10,
                    svg_height * 1 / 10], 0);

            // Define Y axis
            var yAxis = d3.axisLeft()
                .scale(yScale)
                .tickValues(y_ticks);

            // Update the domain of the x scale
            var xAxis = d3.axisBottom()
                .scale(xScale)
                .tickValues(x_ticks);

            chart.select("#x-axis").remove();
            chart.select("#y-axis").remove();

            chart.append("g")
                .attr("class", "axis")
                .attr("id", "x-axis")
                .attr("transform", "translate(0," + (svg_height) + ")");

            chart.append("g")
                .attr("class", "axis")
                .attr("id", "y-axis");

            chart.select("#x-axis").call(xAxis);
            chart.select("#y-axis").call(yAxis);

            // add the X gridlines
            chart.selectAll(".grid").remove();


            chart.append("g")
                .attr("class", "grid")
                .attr("id", "vertical grid lines")
                .style("stroke-dasharray", "5 5")
                .attr("transform", "translate(0," + svg_height + ")")
                .call(
                    d3.axisBottom(xScale).tickValues(x_ticks)
                        .tickSize(-svg_height)
                        .tickFormat("")
                );

            // add the Y gridlines
            chart.append("g")
                .attr("class", "grid")
                .attr("id", "horizontal grid lines")
                .style("stroke-dasharray", "5 5")
                .style("font-size", "11px")
                .call(
                    d3.axisLeft(yScale).tickValues(y_ticks)
                        .tickSize(-svg_width)
                        .tickFormat(""))

            // change the font size of the X axis and Y axis ticks
            chart.selectAll('.axis').selectAll('.tick').selectAll('text').attr('font-size', function (d) {
                return '4vh';
            });

        }

        // WVS
        else {
            data = getWVSDataInWaveFormat();

            let x_ticks = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
            let x_domain = x_ticks;

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
                .range([svg_height,
                    svg_height * 9 / 10,
                    svg_height * 8 / 10,
                    svg_height * 7 / 10,
                    svg_height * 6 / 10,
                    svg_height * 5 / 10,
                    svg_height * 4 / 10,
                    svg_height * 3 / 10,
                    svg_height * 2 / 10,
                    svg_height * 1 / 10], 0);

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

            // change the font size of the X axis and Y axis ticks
            chart.selectAll('.axis').selectAll('.tick').selectAll('text').attr('font-size', function (d) {
                return '4vh';
            });

        }



        console.log(data);

        function getDataIdentifier(d) {

            if (dataset === "Gapminder") {
                return d.countryKeys[0];
            }

            else {
                return d.countryKey;
            }
        };

        function suicideXposition(d, value) {
            //console.log(d.school_men[getYearFromValue(value)] + " " + d.countryKeys[0]);
            return (d.suicide_total[getYearFromValue(value)]) / 100 * svg_width;
        }

        console.log("Here");

        let bubblesContainer = chart.select('.bubbles');
        if (!hasMounted.current) bubblesContainer = chart.append('g').classed('bubbles', true);

        let bubbles = bubblesContainer.selectAll("circle").data(data, (d) => { console.log(d); return getDataIdentifier(d); });


        // bubbles enter
        // bubbles.enter()
        //     .append("circle")
        //     .attr("id", function (d) { return "circle_" + d.countryKeys[0] })
        //     .attr("cx", function (d) { return suicideXposition(d, value); })
        //     .attr("cy", function (d) { return svg_height })
        //     .style("fill", function (d) {
        //         return 'blue';
        //     })
        //     .style("pointer-events", "all")
        //     .style("stroke", "black")
        //     .style("stroke-width", 3)
        //     .style("opacity", function (d) {

        //         return 0.5;
        //     })
        //     .attr("r", function (d, i) {
        //         return 20;
        //     })

        // // bubbles update
        // bubbles
        //     .transition()
        //     .delay((d, i) => { return i * 10 })
        //     .duration(500)
        //     .ease(d3.easeQuad)
        //     .attr("cx", function (d) { return suicideXposition(d, value); })
        //     .attr("cy", function (d) { return svg_height; })
        //     .attr("r", function (d, i) {
        //         return 20;
        //     })
        //     .style("opacity", function (d) {

        //         return 0.5;
        //     });

        // // bubbles exit
        // bubbles.exit().remove();

        hasMounted.current = true;

    }, [value, dataset, dropDownValues]); // useEffect

    return <React.Fragment><div id={"bubbleChartContainer"} className={classes.bubbleChartContainer} ref={divRef}></div></React.Fragment>;
}



export default BubbleChart;



// var texts = bubblesContainer.selectAll("text").data(["hey", "there", "how"], function (d) { return d; });

//         // // text enter
//         // texts.enter()
//         //     .append("text")
//         //     .attr("id", function (d) { return "text_" + d })
//         //     .text(function (d) { return d })
//         //     .attr("text-anchor", "start")
//         //     .attr("visibility", function (d) {
//         //         return "visible";
//         //     })
//         //     .attr("font-size", "20px")
//         //     .attr("x", function (d) { return xScale(50); })
//         //     .attr("y", function (d) { return yScale(0); });

//         // // texts update
//         // texts.transition()
//         //     .duration(500)
//         //     .attr("x", function (d) { return xScale(30) })
//         //     .attr("y", function (d) { return yScale(30); })
//         //     .attr("visibility", function (d) {
//         //         return "visible";
//         //     });

//         // // texts remove
//         // texts.exit().remove();





// let bubblesContainer = chart.select('.bubbles').remove();

// if (!hasMounted.current) bubblesContainer = chart.append('g').classed('bubbles', true);


// const bubbles = bubblesContainer.selectAll("circle").data(mixedDataset, function (d) { if (d.countryKeys[0] !== undefined && d.countryKeys[0] !== null) return d.countryKeys[0] });

// bubbles enter
// bubbles.enter()
//     .append("circle")
//     .attr("id", function (d) { return "circle_" + d.countryKeys[0]; })
//     .attr("cx", function (d) { return xScale(0); })
//     .attr("cy", function (d) { return yScale(50); })
//     .style("fill", function (d) {
//         return 'red';
//     })
//     .style("pointer-events", "all")
//     .style("stroke", "black")
//     .style("stroke-width", 3)
//     .attr("r", function (d, i) {
//         return 10;
//     })


// function handleData(d) {

//     const year = getYearFromValue();

//     console.log("hello");

//     // const yearData = d.suicide_total[`${year}`];

//     // console.log("hello");

//     // if (yearData !== undefined && yearData !== null) {
//     //     if (yearData !== null) return xScale(yearData);

//     // };

//     console.log(value);

//     return xScale(0);
// };


// function handleData2(d) {


//     // const yearData = d.data[`${year}`];

//     // if (yearData !== undefined && yearData !== null) {
//     //     if (yearData[1] !== null) return yScale(yearData[1]);

//     // };

//     return yScale(0);
// };


// // bubbles update
// bubbles
//     .transition()
//     //.delay((d) => { return 0 })
//     .duration(500)
//     .ease(d3.easeQuad)
//     .attr("cx", function (d) { return 100 })
//     .attr("cy", function (d) { return 200; })
//     .attr("r", function (d, i) {
//         return 10;
//     })
//     .style("opacity", function (d) {

//         return 0.5;
//     });

// // bubbles exit
// bubbles.exit().remove();



//grid lines


// if (!hasMounted.current) {
            //     // add the X gridlines
            //     chart.append("g")
            //         .attr("class", "grid")
            //         .style("stroke-dasharray", "5 5")
            //         .attr("transform", "translate(0," + svg_height + ")")
            //         .call(
            //             d3.axisBottom(xScale).tickValues(x_ticks)
            //                 .tickSize(-svg_height)
            //                 .tickFormat("")
            //         );

            //     // add the Y gridlines
            //     chart.append("g")
            //         .attr("class", "grid")
            //         .style("stroke-dasharray", "5 5")
            //         .style("font-size", "11px")
            //         .call(
            //             d3.axisLeft(yScale).tickValues(y_ticks)
            //                 .tickSize(-svg_width)
            //                 .tickFormat(""))
            // }