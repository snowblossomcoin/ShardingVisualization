import initialize_chart from "./initialize_chart";
import fetch_refine_data from "./fetch_refine_data";
import update_graph from "./update_graph";


export default function visualize(uri, selector) {
    // dom elements to act on
    const dom = initialize_chart(selector);
    // graph meta: scales, axes, that aren't displayed but reused
    const meta = {};
    // sanitized data that's updated each fetch
    const data = {};

    const update_callback = (...v) => update_graph(dom, meta, ...v);
    fetch_refine_data(uri, data, update_callback);
};
