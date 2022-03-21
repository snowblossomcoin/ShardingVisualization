import './style.css'
import visualize from "./visualize/index"
import sample from "./sample1"

console.log(ENVIRONMENT);

let data_source;
if (ENVIRONMENT === "development") {
    data_source = sample;
} else {
    data_source = "/api/recent_json_graph";
}

visualize(data_source, "#chart");
