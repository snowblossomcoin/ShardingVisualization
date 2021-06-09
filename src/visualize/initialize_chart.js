import * as d3 from "d3";


export default function initialize_chart(selector) {
    const dom = {};
    dom.container = d3.select(selector)
        .style("overflow", "hidden")
        .style("width", "100%");

    const {clientWidth: w, clientHeight: h} = dom.container.node();

    dom.svg = dom.container.append("svg")
        .style("width", "100%")
        .style("height", "100%");

    dom.title = dom.svg.append("g").attr("class", "title")
        .append("text")
        .text("Blocks by Shard over Time")
        .attr("transform", `translate(${w/2}, 50)`)
        .style("text-anchor", "middle")
        .style("font-size", "125%")
        .style("text-decoration", "yunderline")
        .style("fill", "currentColor");

    dom.block_info = dom.container.append("div").attr("class", "info")
        .style("position", "absolute")
        .style("top", 0)
        .style("text-anchor", "middle")
        .style("padding", "1em")
        .text("<click_node_to_get_data>");

    dom.axis_x = dom.svg.append("g").attr("class", "axis_x")
        .attr("transform", `translate(0, ${h-100})`)
        .call(d3.axisBottom((d3.scaleLinear().domain([0,1]).range([125, w-100]))).ticks(0));
    dom.axis_x_label = dom.axis_x
        .append("text")
        .text("Timestamp")
        .attr("transform", `translate(${w/2}, 50)`)
        .style("text-anchor", "middle")
        .style("fill", "currentColor");

    dom.axis_y = dom.svg.append("g").attr("class", "axis_y")
        .attr("transform", `translate(100, 0)`)
        .style("text-anchor", "middle");
    dom.axis_y_label = dom.axis_y.append("text")
        .text("Shard")
        .attr("transform", `translate(-50, ${h / 2})`)
        .style("text-anchor", "middle")
        .style("fill", "currentColor");

    dom.links = dom.svg.append("g").attr("class", "links");
    dom.gradient_defs = dom.links.append("defs");

    dom.gridlines_x = dom.svg.append("g").attr("class", "gridlines_x");

    dom.nodes = dom.svg.append("g").attr("class", "nodes");

    return dom;
}