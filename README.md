# Sharding Visualization

The goal of this project is to visualize a braided chain of blocks over time, and their relationships.


## Features

* Pan & Zoom
* Scrolling Axes
* Mouseover for highlight
* Click for info
* Window/Div  Resizing


## Running

### Development

1. Install node
2. clone project
3. npm install .
4. run dev server with `npm run serve`
5. build to dist/ with `npm run build`


### Docker

1. `docker build . --tag sharding-visualization`
2. `docker run -p 9000:9000 sharding-visualization`
3. http://localhost:9000/
