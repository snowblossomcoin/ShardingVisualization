import * as d3 from "d3";


const pad = 100;


export default function update_chart(dom, meta, data, depth=false) {
    console.log("update_chart");
    const {clientWidth: w, clientHeight: h} = dom.container.node();

    meta.transform = meta.transform || d3.zoomTransform(dom.svg);

    dom.title.attr("transform", `translate(${w/2}, ${pad/2})`);

    // scale_x
    const x = meta.x = meta.transform.rescaleX(
        d3.scaleLinear().domain([data.min_timestamp, data.max_timestamp]).range([pad*1.25, w-pad])
    );

    // scale_y
    const y = meta.y = meta.transform.rescaleY(
        d3.scaleLinear().domain([0, data.max_shard]).range([h-pad*1.25, pad])
    );

    // axis_x
    dom.axis_x.attr("transform", `translate(0, ${h-pad})`);
    meta.axis_x = d3.axisBottom(x);
    dom.axis_x.call(meta.axis_x);

    // axis_y
    dom.axis_y_label.attr("transform", `translate(${-pad/2}, ${h/2})`);
    meta.axis_y = d3.axisLeft(y).ticks().tickFormat(d => Math.floor(d) === d ? d : "");
    dom.axis_y.call(meta.axis_y);


    const color_index = i => d3.interpolateRainbow(1/data.max_shard * i);

    // gridlines_x
    dom.gridlines_x.selectAll("line").data(Object.values(data.nodes)).enter().append("line")
        .style("stroke", d => color_index(d.shard))
        .style("stroke-opacity", 0.25)
        .style("stroke-dasharray", "1");

    dom.gridlines_x.selectAll("line")
        .attr("x1", d => x(d.timestamp).toFixed(1))
        .attr("y1", d => y(d.shard).toFixed(1))
        .attr("x2", d => x(d.timestamp).toFixed(1))
        .attr("y2", h-pad);


    const gradient_name = l => `${l.source.slice(-4)}${l.target.slice(-4)}`;

    // gradients
    dom.gradient_defs.selectAll("linearGradient").data(Object.values(data.links)).enter().append("linearGradient")
        .attr("id", d => gradient_name(d))
        .attr("gradientUnits", "userSpaceOnUse")
        .call(selection => {
            selection.append("stop").attr("stop-color", d => color_index(data.nodes[d.source].shard)).attr("offset", 0);
            selection.append("stop").attr("stop-color", d => color_index(data.nodes[d.target].shard)).attr("offset", 0);
        });

    dom.gradient_defs.selectAll("linearGradient")
        .attr("x1", d => x(data.nodes[d.source].timestamp).toFixed(1))
        .attr("y1", d => y(data.nodes[d.source].shard).toFixed(1))
        .attr("x2", d => x(data.nodes[d.target].timestamp).toFixed(1))
        .attr("y2", d => y(data.nodes[d.target].shard).toFixed(1));


    // links
    dom.links.selectAll("line").data(Object.values(data.links)).enter().append("line")
        .style("stroke-width", 2)
        .style("stroke-opacity", 0.5)
        .style("stroke", d => `url(#${gradient_name(d)})`)
        .on("mouseover", (event, link_data) => {
            // link_dom
            d3.select(event.target)
                .style("stroke", "white")
                .style("stroke-opacity", 1);
        })
        .on("mouseout", (event, link_data) => {
            // link_dom
            d3.select(event.target)
                .style("stroke", d => `url(#${gradient_name(d)})`)
                .style("stroke-opacity", 0.5);
        });

    dom.links.selectAll("line")
        .attr("x1", d => x(data.nodes[d.source].timestamp).toFixed(1))
        .attr("y1", d => y(data.nodes[d.source].shard).toFixed(1))
        .attr("x2", d => x(data.nodes[d.target].timestamp).toFixed(1))
        .attr("y2", d => y(data.nodes[d.target].shard).toFixed(1));


    // nodes
    dom.nodes.selectAll("circle").data(Object.values(data.nodes)).enter().append("circle")
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

    dom.nodes.selectAll("circle")
        .attr("cx", d => x(d.timestamp).toFixed(1))
        .attr("cy", d => y(d.shard).toFixed(1))
        .attr("r", d => meta.transform.k/2+4);


    if (!depth) {
        window.addEventListener("resize", event => update_chart(dom, meta, data, true));
        const handle_zoom = ({transform}) => {meta.transform = transform; update_chart(dom, meta, data, true)};
        dom.svg.call(d3.zoom().extent([[0,0], [w, h]]).scaleExtent([0.25, 100]).on("zoom", handle_zoom));
    }
}