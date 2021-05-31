import * as d3 from "d3";


export default function fetch_refine_data(uri, data, callback) {
    console.log("fetch_refine_data");
    !data.nodes ? data.nodes = {} : null;
    !data.links ? data.links = {} : null;

    data.min_timestamp = Infinity;
    data.max_timestamp = 0;
    data.max_shard = 0;

    d3.json(uri).then(raw_data => {
        console.log("    successfully collected json");

        // nodes
        raw_data.nodes.forEach(d => {
            d.timestamp /= 1000;
            data.nodes[d.hash] = d;
        });

        // links
        raw_data.links.forEach(d => {
            const name = `${d.source.slice(-4)}${d.target.slice(-4)}`;
            data.links[name] = d;
        });

        Object.values(data.nodes).forEach(n => {
            if (n.timestamp < data.min_timestamp) {
                data.min_timestamp = n.timestamp;
            }
            if (n.timestamp > data.max_timestamp) {
                data.max_timestamp = n.timestamp;
            }
            if (n.shard > data.max_shard) {
                data.max_shard = n.shard;
            }
        });

        if (callback) {
            console.log("        calling callback");
            callback(data);
        }
    });
}