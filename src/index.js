import './style.css'
import render from './visualize.js'
import sample from "./sample"


console.log(ENVIRONMENT);
render(ENVIRONMENT === "development" ? sample : "/api/recent_json_graph");
