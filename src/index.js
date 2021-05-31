import './style.css'
import visualize from "./visualize/index"
import sample from "./sample"


console.log(ENVIRONMENT);
visualize(ENVIRONMENT === "development" ? sample : "/api/recent_json_graph", "#chart");
