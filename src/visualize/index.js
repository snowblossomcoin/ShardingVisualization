import initialize_chart from "./initialize_chart";
import fetch_refine_data from "./fetch_refine_data";
import update_chart from "./update_chart";


export default function visualize(uri, selector) {
    const dom = initialize_chart(selector);
    const meta = {};
    const data = {};

    const go = () => fetch_refine_data(uri, data, data => update_chart(dom, meta, data));
    go();
    // let interval = window.setInterval(go, 5000);
};
