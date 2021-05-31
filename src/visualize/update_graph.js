import * as d3 from "d3";
import handle_resizeWindow from "./handle_resizeWindow";


export default function update_graph(dom, meta, data) {
    console.log("update_graph");
    const {clientWidth: w, clientHeight: h} = dom.container.node();

    // scales
    const x = meta.x = d3.scaleLinear()
        .domain([data.min_timestamp, data.max_timestamp])
        .range([100, w-100]);

    const y = meta.y = d3.scaleLinear()
        .domain([0, data.max_shard])
        .range([h-100, 100]);

    // axis_x
    meta.axis_x = d3.axisBottom(x);
    dom.axis_x = dom.container.select("g.axis_x").call(meta.axis_x);

    // axis_y
    // meta.axis_y = d3.axisLeft(y).ticks(d3.tickStep(1, data.max_shard, data.max_shard)).tickFormat(d3.format("d"));
    meta.axis_y = d3.axisLeft(y).tickValues(d3.range(0, data.max_shard + 1));
    // meta.axis_y = d3.axisLeft(y).ticks(d3.tickIncrement(1, data.max_shard, data.max_shard)).tickFormat(d3.format('d'));
    dom.axis_y = dom.container.select("g.axis_y").call(meta.axis_y);


    const color_index = i => d3.interpolateRainbow(1/data.max_shard * i);
    // gridlines_x
    dom.gridlines_x.selectAll("line")
        .data(Object.values(data.nodes)).enter()
        .append("line")
        .attr("x1", d => x(d.timestamp))
        .attr("y1", d => y(d.shard))
        .attr("x2", d => x(d.timestamp))
        .attr("y2", h - 100)
        .style("stroke", d => color_index(d.shard))
        .style("stroke-opacity", 0.25)
        .style("stroke-dasharray", "1");

    // gradients
    const gradient_name = l => `${l.source.slice(-4)}${l.target.slice(-4)}`;
    dom.gradient_defs.selectAll("linearGradient")
        .data(Object.values(data.links)).enter()
        .append("linearGradient")
        .attr("id", d => gradient_name(d))
        .attr("x1", d => x(data.nodes[d.source].timestamp))
        .attr("y1", d => y(data.nodes[d.source].shard))
        .attr("x2", d => x(data.nodes[d.target].timestamp))
        .attr("y2", d => y(data.nodes[d.target].shard))
        .attr("gradientUnits", "userSpaceOnUse")
        .call(selection => {
            selection.append("stop").attr("stop-color", d => color_index(data.nodes[d.source].shard)).attr("offset", 0);
            selection.append("stop").attr("stop-color", d => color_index(data.nodes[d.target].shard)).attr("offset", 0);
        });

    // links
    dom.links.selectAll("line")
        .data(Object.values(data.links)).enter()
        .append("line")
        .attr("x1", d => x(data.nodes[d.source].timestamp))
        .attr("y1", d => y(data.nodes[d.source].shard))
        .attr("x2", d => x(data.nodes[d.target].timestamp))
        .attr("y2", d => y(data.nodes[d.target].shard))
        .style("stroke-width", 2)
        .style("stroke-opacity", 0.5)
        .style("stroke", d => `url(#${gradient_name(d)})`)
        .on("mouseover", (event, link_data) => {
            // link_doms
            d3.select(event.target)
                .style("stroke", "white")
                .style("stroke-opacity", 1);
        })
        .on("mouseout", (event, link_data) => {
            const link_dom = d3.select(event.target);
            if (!link_dom.attr("clicked")) {
                link_dom
                    .style("stroke", d => `url(#${gradient_name(d)})`)
                    .style("stroke-opacity", 0.5);
            }
        });

    // nodes
    dom.nodes.selectAll("circle")
        .data(Object.values(data.nodes)).enter()
        .append("circle")
        .attr("cx", d => x(d.timestamp))
        .attr("cy", d => y(d.shard))
        .attr("r", 4)
        .style("fill", "white")
        .style("stroke", "#ffffffaf")
        .on("mouseover", (event, node_data) => {
            // node_dom
            d3.select(event.target)
                .style("fill", "white")
                .style("stroke", "black");

            dom.links.selectAll("line").filter(l => l.source === node_data.hash)
                .style("stroke", "white")
                .style("stroke-opacity", 1);
        })
        .on("mouseout", (event, node_data) => {
            // node_dom
            d3.select(event.target)
                .style("fill", "white")
                .style("stroke", "white");

            dom.links.selectAll("line").filter(l => l.source === node_data.hash)
                .style("stroke", l => `url(#${gradient_name(l)})`)
                .style("stroke-opacity", 0.5);
        })
        .on("click", (event, node_data) => {
            // node_dom
            d3.select(event.target)
                .style("fill", "white")
                .style("stroke", "black");

            dom.links.selectAll("line").filter(l => l.source === node_data.hash)
                .style("stroke", "white")
                .style("stroke-opacity", 1);

            dom.container.select("div.info").text(JSON.stringify(node_data));
        });

    handle_resizeWindow(dom, meta, data);
    window.addEventListener("resize", event => handle_resizeWindow(dom, meta, data));
}
