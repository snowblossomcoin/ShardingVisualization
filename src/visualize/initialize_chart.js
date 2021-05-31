import * as d3 from "d3";


export default function initialize_chart(selector) {
    console.log("initialize_chart");
    const container = d3.select(selector)
        .style("overflow", "hidden")
        .style("width", "100%");
    const {clientWidth: w, clientHeight: h} = container.node();

    const svg = container.append("svg")
        .style("width", "100%")
        .style("height", "100%");

    // title
    svg.append("g").attr("class", "title")
        .append("text")
        .text("Blocks by Shard over Time")
        .attr("transform", `translate(${w/2}, 50)`)
        .style("text-anchor", "middle")
        .style("font-size", "125%")
        .style("text-decoration", "underline")
        .style("fill", "currentColor");

    // block_info
    container.append("div").attr("class", "info")
        .style("position", "absolute")
        .style("top", 0)
        .style("text-anchor", "middle")
        .style("padding", "1em")
        .text("<click_node_to_get_data>");

    // axis_x
    svg.append("g").attr("class", "axis_x")
        .attr("transform", `translate(0, ${h-100})`)
        .call(d3.axisBottom((d3.scaleLinear().domain([0, 1]).range([100, w-100]))).ticks(0))
        .append("text")
        .text("Timestamp")
        .attr("transform", `translate(${w/2}, 50)`)
        .style("text-anchor", "middle")
        .style("fill", "currentColor");

    // axis_y
    svg.append("g").attr("class", "axis_y")
        .attr("transform", `translate(100, 0)`)
        .call(d3.axisLeft(d3.scaleLinear().domain([0, 1]).range([100, h-100])).ticks(0))
        .append("text")
        .text("Shard")
        .attr("transform", `translate(-50, ${h / 2})`)
        .style("text-anchor", "middle")
        .style("fill", "currentColor");

    // links
    const group_links_dom = svg.append("g").attr("class", "links");
    group_links_dom.append("defs");

    // gridlines_x
    svg.append("g").attr("class", "gridlines_x");

    // nodes
    svg.append("g").attr("class", "nodes");
}
