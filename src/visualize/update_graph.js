import * as d3 from "d3";


export default function update_graph(selector, data) {
    const container = d3.select(selector);
    const {clientWidth: w, clientHeight: h} = container.node();

    // scales
    const x = data.x = d3.scaleLinear()
        .domain([data.min_timestamp, data.max_timestamp])
        .range([100, w-100]);
    const y = data.y = d3.scaleLinear()
        .domain([0, data.max_shard])
        .range([h-100, 100]);

    // axes
    container.select("g.axis_x").call(d3.axisBottom(x));
    container.select("g.axis_y").call(d3.axisLeft(y).ticks(d3.tickIncrement(1, data.max_shard, 1)));

    // gradients
    const gradient_name = l => `${l.source.slice(-4)}${l.target.slice(-4)}`;
    const color_index = i => d3.interpolateRainbow(1/data.max_shard * i);
    container.select("g.links > defs").selectAll("linearGradient")
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
    const link_doms = container.select("g.links").selectAll("line")
        .data(Object.values(data.links)).enter()
        .append("line")
        .attr("x1", d => x(data.nodes[d.source].timestamp))
        .attr("y1", d => y(data.nodes[d.source].shard))
        .attr("x2", d => x(data.nodes[d.target].timestamp))
        .attr("y2", d => y(data.nodes[d.target].shard))
        .style("stroke-width", 2)
        .style("stroke-opacity", 0.5)
        .style("stroke", d => `url(#${gradient_name(d)})`);

    // nodes
    container.select("g.nodes").selectAll("circle")
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

            link_doms.filter(l => l.source === node_data.hash)
                .style("stroke", "white")
                .style("stroke-opacity", 1);
        })
        .on("mouseout", (event, node_data) => {
            d3.select(event.target)
                .style("fill", "white")
                .style("stroke", "white");

            link_doms.filter(l => l.source === node_data.hash)
                .style("stroke", l => `url(#${gradient_name(l)})`)
                .style("stroke-opacity", 0.5);
        })
        .on("click", (event, node_data) => {
            container.select("div.info").text(JSON.stringify(node_data));
        });
}
