import * as d3 from "d3";
import handle_zoom from "./handle_zoom";


export default function handle_resizeWindow(dom, meta, data) {
    console.log("handle_resizeWindow");
    const {clientWidth: w, clientHeight: h} = dom.container.node();
    dom.svg.attr("viewBox", `0 0 ${w} ${h}`);

    dom.axis_x
        .call(meta.axis_x)
        .attr("transform", `translate(0, ${h-100})`);

    dom.axis_y
        .call(meta.axis_y)
        .attr("transform", `translate(100, 0)`);

    const handle_zoom_callback = ({transform}) => handle_zoom(dom, meta, data, transform);
    dom.svg.call(d3.zoom().extent([[0,0], [w, h]]).scaleExtent([0.25, 100]).on("zoom", handle_zoom_callback));
}
