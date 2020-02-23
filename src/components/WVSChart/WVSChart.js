import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import classes from './WVSChart.module.scss';
import { getWVSDataInWaveFormat, getWaveKeyByNum } from '../../data/data_functions.js';
import colorMap from '../WVSChart/Colormap.js';


const WVSChart = ({ sliderValue, dropDownValues }) => {

    // refs
    const anchor = useRef();
    const hasMounted = useRef(false);

    // margin, width and height
    const container_width = 2400;
    const container_height = 1000;
    const margin = { top: 60, right: 130, bottom: 100, left: 200 };
    const svg_width = container_width - margin.left - margin.right;
    const svg_height = container_height - margin.top - margin.bottom;

    //PREMADE SCALES
    const topScale = d3.scaleLinear().range([0, svg_width]);
    const rightScale = d3.scaleLinear().range([svg_height, 0]);
    const topAxis = d3.axisTop().scale(topScale).ticks(0);
    const rightAxis = d3.axisRight().scale(rightScale).ticks(0);

    // PREDEF. VARS.
    let data = useRef(getWVSDataInWaveFormat());

    // SCALES
    const xScale = d3.scaleLinear();
    const yScale = d3.scaleLinear();
    const rScale = d3.scaleSqrt().domain([0, 100]).range([1, 55]);

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

    useEffect(() => {

        drawContainers(hasMounted);
        drawToolTip(anchor, hasMounted);
        drawBackgroundText();
        drawAxes(anchor, hasMounted);
        drawBubbles();

        hasMounted.current = true;

        // return () => { d3.select(anchor.current).select('*').remove() }

    }, [sliderValue, dropDownValues, drawContainers, drawAxes, data, svg_height, svg_width, drawBubbles]); // useEffect

    return <React.Fragment><div id={"WVSChartContainer"} className={classes.WVSChartContainer} ref={anchor}></div></React.Fragment>;

    /** FUNCTION DEFINITIONS */
    // eslint-disable-next-line react-hooks/exhaustive-deps
    function drawContainers(hasMounted) {
        let bubbleChartContainer = d3.select(anchor.current);
        let canvas = bubbleChartContainer.select("#bubble_chart");
        let chart = canvas.select(".chart");

        if (!hasMounted.current) {
            bubbleChartContainer = d3.select(anchor.current).style("width", '100%')
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
    };

    function drawToolTip(anchor, hasMounted) {

        const chart = d3.select(anchor.current);

        if (!hasMounted.current) {
            var tooltip = chart
                .append("div")
                .attr("id", "toolTip")
                .style("position", "absolute")
                .style("font", "Arial")
                .style("z-index", "10")
                .attr("font-size", "15vh")
                .text("YEEHAW")
                .style("visibility", "hidden")
        }
    }

    function showToolTip(text) {

        const chart = d3.select(anchor.current);

        chart
            .select("#toolTip")
            .append("text")
            .attr("x", d3.mouse(this)[0] + margin.width)
            .attr("y", d3.mouse(this)[1] + margin.height)

    }

    function hideToolTip() {

        const chart = d3.select(anchor.current);

        chart
            .select("#toolTip")
            .style("visibility", "hidden");

    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    function drawAxes(anchor, hasMounted) {

        // Define X & Y axis
        var yAxis = d3.axisLeft().scale(yScale).tickValues(y_ticks);
        var xAxis = d3.axisBottom().scale(xScale).tickValues(x_ticks);

        const chart = d3.select(anchor.current).select(".chart");

        if (!hasMounted.current) {
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
                        .tickFormat(""));
        }

        // change the font size of the X axis and Y axis ticks
        chart.selectAll('.axis').selectAll('.tick').selectAll('text').attr('font-size', function (d) {
            return '50px';
        });

    }

    function drawBackgroundText() {

        const text = "Wave " + getWaveNumFromSliderValue(sliderValue);
        d3.select(anchor.current).select("#backgroundText").remove();
        d3.select(anchor.current).select(".chart")
            .append("text")
            .attr("id", "backgroundText")
            .text(text)
            .attr("font-size", "300px")
            .attr("font-weight", "bold")
            .style("fill", "#E0E0E0")
            .attr("x", 0.95 / 10 * svg_width)
            .attr("y", -85)
            .attr("transform", "scale(5)")
            .attr("transform", "translate(0," + svg_height + ")")
            .lower();


        const year = getYearTextFromSliderValue(sliderValue);
        d3.select(anchor.current).select("#backgroundText2").remove();
        d3.select(anchor.current).select(".chart")
            .append("text")
            .attr("id", "backgroundText2")
            .text(year)
            .attr("font-size", "100px")
            .attr("font-weight", "bold")
            .style("fill", "#E0E0E0")
            .attr("x", 1 / 10 * svg_width)
            .attr("y", -6)
            .attr("transform", "scale(5)")
            .attr("transform", "translate(0," + 510 + ")")
            .lower();
    }



    // eslint-disable-next-line react-hooks/exhaustive-deps
    function drawBubbles() {
        const chart = d3.select(anchor.current).select(".chart");

        let bubblesContainer = chart.select('.bubbles');
        if (!hasMounted.current) bubblesContainer = chart.append('g').classed('bubbles', true);
        let bubbles = bubblesContainer.selectAll("circle").data(data.current, (d) => { return d.countryKey; });

        // bubbles enter
        bubbles.enter()
            .append("circle")
            .attr("id", (d) => d.countryKey)
            .attr("cx", (d) => getCircleXPos(d))
            .attr("cy", (d) => getCircleYPos(d))
            .style("fill", (d) => { return colorMap(d.continent) })
            .style("opacity", 0.55)
            .on('mouseover', function (d) {
                d3.select(this).style("opacity", 0.8);
            })
            .on('mouseout', function (d) {
                d3.select(this).style("opacity", 0.55);
            })
            .style('stroke', 'black')
            .style('stroke-width', (d) => { getCircleStrokeWidth(d) })
            .attr('r', (d) => getCircleSize(d))
            .append("svg:title").text(function (d) { return d.countryKey; });

        // bubbles update
        bubbles
            .transition()
            .delay((_, i) => { return 5 * i })
            .duration(500)
            .ease(d3.easeQuad)
            .style("fill", (d) => { return colorMap(d.continent) })
            .attr("cx", (d) => getCircleXPos(d))
            .attr("cy", (d) => getCircleYPos(d))
            .attr("r", (d) => getCircleSize(d))
            .style('stroke', (d) => getCircleBorderColor(d))
            .style('stroke-width', (d) => { getCircleStrokeWidth(d) })

        // bubbles exit
        bubbles.exit().remove();
    }


    // eslint-disable-next-line react-hooks/exhaustive-deps
    function getCircleData(d, qstIndex, sliderValue) {
        const waveObj = d.data[`wave_${getWaveNumFromSliderValue(sliderValue) - 1}`];

        // if wave_X data is defined...
        if (waveObj !== null && waveObj !== undefined) {
            //check that question property is not undefined
            const measure = waveObj[qstIndex - 1];
            if (measure !== null && measure !== undefined) {

                return measure;
            }
        }
        return -5;
    }

    function getCircleXPos(d) {
        const data = getCircleData(d, dropDownValues[0], sliderValue);
        return xScale(data);
    }

    function getCircleYPos(d) {
        const data = getCircleData(d, dropDownValues[1], sliderValue);
        return yScale(data);
    }

    function getCircleSize(d) {
        const data = getCircleData(d, dropDownValues[2], sliderValue);
        if (data === -5) {
            return rScale(10);
        }
        return rScale(data);
    }

    function getCircleBorderColor(d) {
        const data = getCircleData(d, dropDownValues[2], sliderValue);
        if (data === -5) {
            return 'red';
        }
        return 'black';
    }

    function getCircleStrokeWidth(d) {
        const data = getCircleData(d, dropDownValues[2], sliderValue);
        if (data === -5) {
            return '50%';
        }
        return 3;
    }

    function getRandomColor() {
        return '#' + Math.floor(Math.random() * 16777215).toString(16);
    }

    function getWaveNumFromSliderValue(sliderValue) {
        if (0 <= sliderValue && sliderValue <= 25) return 1;
        if (25 < sliderValue && sliderValue <= 50) return 2;
        if (50 < sliderValue && sliderValue <= 75) return 3;
        if (75 < sliderValue) return 4;
    }

    function getYearTextFromSliderValue(sliderValue) {
        const waveNum = getWaveNumFromSliderValue(sliderValue);

        if (waveNum === 1) return "1981-1984"
        if (waveNum === 2) return "1990-1994"
        if (waveNum === 3) return "1995-1998"
        if (waveNum === 4) return "1999-2004"

    }
}

export default WVSChart;


 // filters the list of nulls
        // // for each wave key in element
        // for (let i = 1; i < 4; i++) {
        //     const waveAnswers = d.data[`wave_${i}`];

        //     if (waveAnswers !== null && waveAnswers !== undefined) {

        //         // for each question in dropdownValues
        //         for (let j = 0; j < dropDownValues.length - 1; j++) {

        //             const qstProp = waveAnswers[dropDownValues[j]];

        //             if (qstProp === null || qstProp === undefined) {
        //                 return false;
        //             }
        //         }

        //     }
        //     else { return false }
        // }
        // return true;