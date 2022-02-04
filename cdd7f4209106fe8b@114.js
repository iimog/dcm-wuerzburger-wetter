// https://observablehq.com/@analyzer2004/sunny-day-rainy-day-in-seattle@114
import define1 from "./69800ed997e918df@456.js";
import define2 from "./8d271c22db968ab0@160.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([["clear.svg",new URL("./files/003be897f666d10456de853215048e5cdc4249b1ad17e930ad94c04f15837c7dbf64b7cb354dae7b5b361997d6fd751b382316145879fec8580a8a72c6568611",import.meta.url)],["cloudy.svg",new URL("./files/7c41512f80e4da3e46bfcadbf780b1a17dec705d595e8b37373d0a4899cb7259269b31a94b33a92d3fca310b853b1efbdd6f1c7aae32b3b63817477e0665cde3",import.meta.url)],["rain.svg",new URL("./files/2ec22ea1f9015a1ff1444b2964e06ab275b06ab13438421c658d3d90d173e34c8bd1e5e2cd6d06953fec68a07c8535c26eb7ea007de4c0ca9cd3e7521e752154",import.meta.url)],["snow.svg",new URL("./files/bce032b385d42267ebff87665ac9456efe05672798798c796bd819d83a5017c786775ca62f3a1ffe481c318f07480baa849995532a901b39f701ea4e42d64c34",import.meta.url)],["overcast.svg",new URL("./files/85d039b51be39fbe0074690e555b615b6dbec5e5dafea336b1473be79ea9c5db28114f34deeaee342fca9fe70311b40a11298caa82b109aca44c704db90e18f2",import.meta.url)],["seattle_19.csv",new URL("./files/eef3ac59b1e9fc1c04686f6b6c6a9eee483e65922275b8a8bf387177367de29ccd47df2d6c88cafd5a380fd0bc1f854193611c0898a851172517c0f092f4c253",import.meta.url)]]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], function(md){return(
md`# Sunny day, rainy day in Seattle

Using Sankey diagram to visualize historical weather data gives you a different aspect of statistics. Weather conditions are on the top, and the dates of the month are on the bottom. Each color represents a different weather condtion, it highlighs the corresponding dates as you hover over the conditions. The whole picture is simple yet very effective on showing how the conditions are distributed.

The line chart on the bottom represents the trend of daily temperatures. As you hover across the chart, a reference line will follow along with high/low temperatures appearing on the side.

Additionally, I encapsulated the whole visualization into the **WeatherChart** class to make it highly reusable, **see below or [Github](https://github.com/analyzer2004/weathersankey) for the API Reference and source code**.

<div style="font-size:10pt; font-style:italic">Icons made by <a href="https://www.flaticon.com/authors/bqlqn" title="bqlqn">bqlqn</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a></div>`
)});
  main.variable(observer("viewof options")).define("viewof options", ["form","html"], function(form,html){return(
form(html`<form>Month: <select name="month">
  <option value="1">January</option>
  <option value="2">February</option>
  <option value="3">March</option>
  <option value="4">April</option>
  <option value="5">May</option>
  <option value="6">June</option>
  <option value="7">July</option>
  <option value="8">August</option>
  <option value="9">September</option>
  <option value="10">October</option>
  <option value="11">November</option>
  <option value="12">December</option>
</select><span>&nbsp;&nbsp;&nbsp;</span>
Sort: 
<input name="sort" id="none" type="radio" value="0" group="s"><label for="none">None</label>
<input name="sort" id="ctor" type="radio" value="1" group="s" checked><label for="ctor">Clear to Rain</label>
<input name="sort" id="rtoc" type="radio" value="2" group="s"><label for="rtoc">Rain to Clear</label>
</form>`)
)});
  main.variable(observer("options")).define("options", ["Generators", "viewof options"], (G, _) => G.input(_));
  main.variable(observer("chart")).define("chart", ["d3","WeatherChart","weatherIcons","options","data"], function(d3,WeatherChart,weatherIcons,options,data)
{
  const w = 1024, h = 650;
  const svg = d3.create("svg")    
    .attr("cursor", "default")
    .attr("viewBox", [0, 0, w, h]);  
  
  new WeatherChart(svg)
    .size(w, h)
    .icon(weatherIcons)
    .sort(+options.sort)
    .render(data);
  
  return svg.node();
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`It can combine with the [WeatherWheel](https://observablehq.com/@analyzer2004/west-coast-weather-from-seattle-to-san-diego) to make a weather dashboard. The WeatherSankey changes its month as you hover around the wheel.`
)});
  main.variable(observer()).define(["combined"], function(combined){return(
combined
)});
  main.variable(observer()).define(["md"], function(md){return(
md`# API Reference
* **WeatherChart(parent)** - Constructs a new weather chart generator with the default settings. The **parent** can be a SVG or any g.
* **size(width, height, xr, offset)** - Sets this chart's dimensions to specified width and height and returns this chart. The offset is the x of the parent element, default is 0. The xr is the specified width to Notebook's width ratio (it is only for Observable Notebook and is not needed outside of Observable).
* **icon(icon)** - Sets the icon for each weather condition and returns this chart.
  * icon.**clear** - the url of clear icon
  * icon.**cloudy** - the url of cloudy icon
  * icon.**overcast** - the url of overcast icon
  * icon.**rain** - the url of rain icon
  * icon.**snow** - the url of snow icon
* **column(column)** - Sets the column names for parsing weather csv data and returns this chart.
  * column.**date** - the column name of date
  * column.**high** - the column name of the high daily temperature
  * column.**low** - the column name of the low daily temperature
  * column.**condition** - the column name of the daily weather condition
* **sort(sort)** - Sets the sort order of the weather conditions and returns this chart.
  * **0** - none (default)
  * **1** - clear to rain
  * **2** - rain to clear
* **unit(unit)** - Sets the unit of displayed temperature (default: °F) and returns this chart.
* **tempChartHeight(height)** - Sets the height of the temperature line chart and returns this chart. Default is 100.
* **render(data)** - Renders the visualization using specified **MONTHLY** weather data (with columns date, high, low temperatures and condition) and returns this chart.`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### Source Code`
)});
  main.variable(observer("WeatherChart")).define("WeatherChart", ["d3"], function(d3){return(
class WeatherChart {
    constructor(parent) {
        this._parent = parent;
        this._width = 1024;
        this._height = 768;
        this._leftMargin = 20;

        this._margin = {
            sankeyTop: 60,
            sankeyBottom: 25,
            temp: 15
        };
        this._iconSize = 50;

        this._tempHeight = 100;        

        this._nodes = null;
        this._links = null;
        this._data = null;
        this._sort = 0; // 0: none, 1: clear to rain, 2: rain to clear
        this._unit = "°F";

        this._highColor = "#ef476f";
        this._lowColor = "#457b9d";
        this._conditions = null;

        this._column = {
            date: "date",
            high: "high",
            low: "low",
            condition: "condition"
        };
    }

    size(width, height) {
        this._width = width;
        this._height = height;
        return this;
    }

    icon(icon) {
        this._conditions = [
            { id: "Clear", index: 0, color: "#fff3b0", icon: icon.clear },
            { id: "Partially cloudy", index: 1, color: "#e7d8c9", icon: icon.cloudy },
            { id: "Overcast", color: "#ddd", index: 2, icon: icon.overcast },
            { id: "Rain", color: "#98c1d9", index: 3, icon: icon.rain },
            { id: "Snow", color: "#c2dfe3", index: 4, icon: icon.snow }
        ];
        return this;
    }

    column(column) {
        this._column = column;
        return this;
    }

    sort(sort) {
        this._sort = sort;
        return this;
    }

    unit(unit) {
        this._unit = unit;
        return this;
    }
  
    tempChartHeight(height) {
      this._tempHeight = height;
      return this;
    }

    render(data) {
        this._init();        
        this._process(data);
        this._drawSankey();
        this._drawTempChart();
        return this;
    }
  
    _init() {
      this._margin.sankeyTop = this._height / 650 * 60;
      this._iconSize = this._width / 1024 * 50;
    }

    _process(data) {
        const converted = data.map(d => {
            const date = d[this._column.date];
            var cond = d[this._column.condition];
            cond = (cond.startsWith("Rain") ? "Rain" : cond.startsWith("Snow") ? "Snow" : cond)            
            return {
                date: date,
                day: new Date(date).getDate(),
                high: d[this._column.high],
                low: d[this._column.low],
                condition: cond,
                color: this._lookup(cond).color,
                value: 1
            };
        });

        const ls = converted.map(d => ({ source: d.condition, target: d.date, value: 1 }));
        const conds = Array.from(new Set(converted.map(d => this._lookup(d.condition))));
        if (this._sort === 1) // clear to rain
            conds.sort((a, b) => a.index - b.index);
        else if (this._sort === 2) // rain to clear
            conds.sort((a, b) => b.index - a.index);
        const ns = conds.concat(converted.map(d => ({ id: d.date, color: d.color })));

        const { nodes, links } = this._sankey(ns, ls);
        this._nodes = nodes;
        this._links = links;
        this._data = converted;

        return this;
    }

    _drawTempChart() {
        var that = this;

        const x = d3.scalePoint()
            .domain(this._data.map(d => d.date))
            .range([this._leftMargin, this._width]);

        const y = d3.scaleLinear()
            .domain(d3.extent(this._data.flatMap(d => [d.high, d.low])).reverse())
            .range([0, this._tempHeight]);

        const top = this._height - this._tempHeight - this._margin.temp;
        const g = this._parent.append("g")
            .attr("opacity", 0.7)
            .attr("transform", `translate(0,${top})`)
            .call(g => g.append("rect")
                .attr("width", this._width).attr("height", this._tempHeight)
                .attr("opacity", 1).attr("fill", "white"))
            .datum(this._data)
            .call(g => drawLine(g, this._highColor, d => d.high))
            .call(g => drawLine(g, this._lowColor, d => d.low));

        const axis = g.append("g")
            .call(g => g.attr("transform", "translate(20, 0)")
                .call(d3.axisLeft(y).tickValues(y.domain()))
                .select(".domain").remove()
            );

        this._drawTempIndicator(g);

        function drawLine(g, color, f) {
            g.append("path")
                .attr("fill", "none")
                .attr("stroke", color)
                .attr("stroke-width", 1.5)
                .attr("d", d => d3.line()
                    .x(d => x(d.date))
                    .y(d => y(f(d)))(d));
        }
    }

    _drawTempIndicator(g) {
        var that = this;

        const line = g.append("g")
            .attr("opacity", 0)
            .attr("font-size", "9pt")
            .attr("font-weight", "bold");

        line.append("line")
            .attr("stroke", "#999")
            .attr("x1", 0).attr("y1", 0)
            .attr("x2", 0).attr("y2", this._tempHeight);

        const high = line.append("text")
            .attr("fill", this._highColor)
            .attr("dy", "-1em")
            .attr("transform", `translate(5,${this._tempHeight})`);

        const low = line.append("text")
            .attr("fill", this._lowColor)
            .attr("transform", `translate(5,${this._tempHeight})`);

        g.on("mouseenter", () => line.attr("opacity", 1))
            .on("mousemove", (e, d) => moveTempLine(e, d))
            .on("mouseleave", () => {
                line.attr("opacity", 0);
                dates.attr("fill", "#999").attr("font-weight", "normal");
            });

        const days = this._nodes.filter(d => d.depth === 1);
        const dates = this._parent.selectAll(".date");
        function moveTempLine(e, d) {
            const
                converted = that._convertCoordinate(e, g),
                pos = converted.x;

            if (pos >= that._leftMargin) {
                const left = days[0].y0, right = days[days.length - 1].y1;
                const index = d3.bisect(
                    d3.range(left, right, days[1].y0 - days[0].y0),
                    pos - that._leftMargin
                );

                const weather = that._data[index - 1];
                high.text(`High: ${weather.high}${that._unit}`);
                low.text(`Low: ${weather.low}${that._unit}`);

                const hb = high.node().getBBox(),
                    lb = low.node().getBBox();
                const w = hb.width > lb.width ? hb.width : lb.width;
                const tx = pos + w > right ? -w : 5;
                high.attr("transform", `translate(${tx},${that._tempHeight})`);
                low.attr("transform", `translate(${tx},${that._tempHeight})`);

                line.attr("transform", `translate(${pos},0)`);
                dates
                    .attr("fill", (d, i) => i === index - 1 ? "black" : "#999")
                    .attr("font-weight", (d, i) => i === index - 1 ? "bold" : "normal");
            }
        }
        return line;
    }

    _drawSankey() {
        var that = this;      
        
        const g = this._parent.append("g")
            .attr("transform", `translate(${this._leftMargin},${this._margin.sankeyTop})`);

        const nodes = g.append("g")
            .selectAll("g")
            .data(this._nodes)
            .join("g")
            .attr("opacity", 1)
            .attr("fill", d => d.color)
            .attr("transform", d => `translate(${d.y0},${d.x0})`)
            .call(g => g.append("rect").attr("width", d => d.y1 - d.y0).attr("height", d => d.x1 - d.x0))
            .on("mouseover", (e, d) => highlight(e, d))
            .on("mouseout", (e, d) => restore(e, d, true));

        this._addCondition(nodes);
        this._addDate(nodes);

        const links = g.append("g")
            .attr("fill", "none")
            .selectAll("g")
            .data(this._links)
            .join("g")
            .append("path")
            .attr("stroke-opacity", 0.5)
            .attr("d", this._sankeyLinkVertical())
            .attr("stroke", d => d.source.color)
            .attr("stroke-width", d => Math.max(1, d.width));

        function highlight(e, d, restore) {
            links.filter(l => l.source !== d && l.target !== d)
                .transition().duration(500)
                .attr("stroke-opacity", restore ? 0.5 : 0.2);
            nodes.transition().duration(500)
                .attr("opacity", n => restore || linkedNodes(d).some(ln => n === ln) ? 1 : 0.2);
        }

        function restore(e, d) {
            highlight(e, d, true);
        }

        function linkedNodes(n) {
            return Array.from(new Set(that._links
                .flatMap(d => d.source === n || d.target === n ? [d.source, d.target] : null)
                .filter(d => d !== null)
            ));
        }
    }

    _addCondition(nodes) {        
        nodes.filter(d => d.depth === 0)
            .call(g => g.append("image")
                .attr("width", this._iconSize)
                .attr("height", this._iconSize)
                .attr("opacity", 0.4)
                .attr("href", d => this._lookup(d.id).icon)
                .attr("transform", `translate(5,-${this._margin.sankeyTop})`))
            .call(g => g.append("line")
                .attr("stroke", "#999")
                .attr("stroke-width", 0.5)
                .attr("stroke-dasharray", "3,3")
                .attr("x1", 1).attr("x2", 1)
                .attr("y1", 0).attr("y2", -this._margin.sankeyTop))
            .call(g => g.append("text")
                .attr("class", "days")
                .attr("fill", d => d3.color(d.color).darker(0.3))
                .attr("text-anchor", "end")
                .attr("transform", d => `translate(${d.y1 - d.y0}, -2)`)
                .text(d => d.value));
    }

    _addDate(nodes) {
        nodes.filter(d => d.depth === 1)
            .append("text")
            .attr("class", "date")
            .attr("fill", "#999")
            .attr("text-anchor", "middle")
            .attr("transform", d => `translate(${(d.y1 - d.y0) / 2},${this._margin.sankeyBottom})`)
            .text(d => (new Date(d.id)).getDate());
    }

    _sankey(nodes, links) {        
        const sankeyHeight = this._height - this._tempHeight - this._margin.sankeyTop - this._margin.sankeyBottom - this._margin.temp;
        return d3.sankey()
            .nodeId(d => d.id)
            .nodeWidth(10)
            .nodePadding(10)
            .nodeSort(null)
            .size([sankeyHeight, this._width - this._leftMargin])({            
                nodes: nodes.map(d => Object.assign({}, d)),
                links: links.map(d => Object.assign({}, d))
            });
    }

    _getNodeColor(d) {
        if (d.depth === 0)
            return this._lookup(d.id).color;
        else if (d.depth === 1) {
            const day = this._data.find(_ => _.date === d.id);
            if (day) return this._lookup(day.condition).color;
        }
    }

    _lookup(condId) {
        return this._conditions.find(d => d.id === condId);
    }

    _sankeyLinkVertical() {
        return d3.linkVertical()
            .source(verticalSource)
            .target(verticalTarget);

        function verticalSource(d) {
            return [d.y0, d.source.x1];
        }

        function verticalTarget(d) {
            return [d.y1, d.target.x0];
        }
    }

    // Utilities
    //
    _getSVG() {
        let curr = this._parent.node();
        while (curr && curr.tagName !== "svg")
            curr = curr.parentElement;
        return curr;
    }

    _convertCoordinate(e, g) {
        const svg = this._getSVG();
        if (svg) {
            // convert to SVG coordinates
            const p = svg.createSVGPoint()
            p.x = e.clientX;
            p.y = e.clientY;
            return p.matrixTransform(g.node().getScreenCTM().inverse());
        }
        else {
            throw "Unable to find SVG element";
        }
    }
}
)});
  main.variable(observer("weatherIcons")).define("weatherIcons", ["FileAttachment"], async function(FileAttachment){return(
{
  clear: await FileAttachment("clear.svg").url(),
  cloudy: await FileAttachment("cloudy.svg").url(),
  overcast: await FileAttachment("overcast.svg").url(),
  rain: await FileAttachment("rain.svg").url(),
  snow: await FileAttachment("snow.svg").url()
}
)});
  main.variable(observer()).define(["md"], function(md){return(
md`# Data

Any historical weather data with columns date, low, high and condition.`
)});
  main.variable(observer("data")).define("data", ["d3","FileAttachment","options"], async function(d3,FileAttachment,options){return(
d3.csvParse(await FileAttachment("seattle_19.csv").text(), d3.autoType)
  .filter(d => new Date(d["date"]).getMonth() + 1 === +options.month)
)});
  main.variable(observer()).define(["html"], function(html){return(
html`<style>
.days {   
  font-family: Tahoma;
  font-size: 20pt;
  font-weight: bold
}

.date {
  font-size: 11pt
}
</style>`
)});
  const child1 = runtime.module(define1);
  main.import("combined", child1);
  const child2 = runtime.module(define2);
  main.import("form", child2);
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("d3@6", "d3-sankey@0.12")
)});
  main.variable(observer()).define(["md"], function(md){return(
md`🌐[ericlo.dev](https://ericlo.dev) 🐱[GitHub Repositories](https://github.com/analyzer2004?tab=repositories) 🐦[Twitter](https://twitter.com/analyzer2004)`
)});
  return main;
}
