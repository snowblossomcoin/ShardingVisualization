import initialize_chart from "./initialize_chart";
import fetch_refine_data from "./fetch_refine_data";
import update_graph from "./update_graph";


export default function visualize(uri, selector) {
    initialize_chart(selector);
    const data = {};
    fetch_refine_data(uri, (...v) => update_graph(selector, ...v));
};
