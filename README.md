# Sharding Visualization

The goal of this project is to visualize a braided chain of blocks over time, and their relationships.


## Features

* Pan & Zoom
* Window/Div Resizing
* Scrolling Axes
* Mouseover for highlight
* Click for info

## Let me know if you want

* Automatic Updates on Interval

## Running

### Development

1. Install node / npm
2. clone project
3. npm install .
4. run dev server with `npm run serve`
5. build to dist/

    * `npm run build` - uses api endpoint
    * `npm run build-sample` - uses sample file


### Docker

1. `docker build . --tag sharding-visualization`
2. `docker run -p 9000:9000 sharding-visualization`
3. http://localhost:9000/
