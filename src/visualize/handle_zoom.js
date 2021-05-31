import * as d3 from "d3";


export default function handle_zoom(dom, meta, data, transform) {
    console.log("handle_zoom");
    const nx = transform.rescaleX(meta.x);
    const ny = transform.rescaleY(meta.y);
    const {clientWidth: w, clientHeight: h} = dom.container.node();

    // gradients
    dom.gradient_defs.selectAll("linearGradient")
        .attr("x1", d => nx(data.nodes[d.source].timestamp))
        .attr("y1", d => ny(data.nodes[d.source].shard))
        .attr("x2", d => nx(data.nodes[d.target].timestamp))
        .attr("y2", d => ny(data.nodes[d.target].shard));

    // links
    dom.links.selectAll("line")
        .attr("x1", d => nx(data.nodes[d.source].timestamp))
        .attr("y1", d => ny(data.nodes[d.source].shard))
        .attr("x2", d => nx(data.nodes[d.target].timestamp))
        .attr("y2", d => ny(data.nodes[d.target].shard));

    // nodes
    dom.nodes.selectAll("circle")
        .attr("cx", d => nx(d.timestamp))
        .attr("cy", d => ny(d.shard))
        .attr("r", transform.k / 2 + 4);

    // gridlines
    dom.gridlines_x.selectAll("line")
        .attr("x1", d => nx(d.timestamp))
        .attr("y1", d => ny(d.shard))
        .attr("x2", d => nx(d.timestamp))
        .attr("y2", h - 100);

    meta.axis_x.scale(nx);
    dom.axis_x
        .call(meta.axis_x)
        .attr("transform", `translate(0, ${h-100})`);

    meta.axis_y.scale(ny);
    dom.axis_y
        .call(meta.axis_y)
        .attr("transform", `translate(100, 0)`);
}
