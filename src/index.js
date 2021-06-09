import './style.css'
import visualize from "./visualize/index"
import sample from "./sample2"

console.log(ENVIRONMENT);
visualize(ENVIRONMENT === "development" ? sample : "/api/recent_json_graph", "#chart");
