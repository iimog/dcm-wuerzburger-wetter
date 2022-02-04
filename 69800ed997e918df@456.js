// https://observablehq.com/@analyzer2004/west-coast-weather-from-seattle-to-san-diego@456
import define1 from "./cdd7f4209106fe8b@114.js";
import define2 from "./8d271c22db968ab0@160.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([["seattle.csv",new URL("./files/11f7efb71ddeb1aad3e15436efcd87939b701740e2363a6b8310d2e6aed5bdbf5ae7acb7ffa4c4c10ddd79bd6aee049ca176ce5465da488bfa7d1f8d0411baac",import.meta.url)],["snow.svg",new URL("./files/bce032b385d42267ebff87665ac9456efe05672798798c796bd819d83a5017c786775ca62f3a1ffe481c318f07480baa849995532a901b39f701ea4e42d64c34",import.meta.url)],["clear.svg",new URL("./files/003be897f666d10456de853215048e5cdc4249b1ad17e930ad94c04f15837c7dbf64b7cb354dae7b5b361997d6fd751b382316145879fec8580a8a72c6568611",import.meta.url)],["overcast.svg",new URL("./files/85d039b51be39fbe0074690e555b615b6dbec5e5dafea336b1473be79ea9c5db28114f34deeaee342fca9fe70311b40a11298caa82b109aca44c704db90e18f2",import.meta.url)],["rain.svg",new URL("./files/2ec22ea1f9015a1ff1444b2964e06ab275b06ab13438421c658d3d90d173e34c8bd1e5e2cd6d06953fec68a07c8535c26eb7ea007de4c0ca9cd3e7521e752154",import.meta.url)],["cloudy.svg",new URL("./files/7c41512f80e4da3e46bfcadbf780b1a17dec705d595e8b37373d0a4899cb7259269b31a94b33a92d3fca310b853b1efbdd6f1c7aae32b3b63817477e0665cde3",import.meta.url)],["sandiego.csv",new URL("./files/f493fe47524638bfd8c26b63885d686972010adc51239ca379aa05b279f82ec9e3ee02e22252bcf579fc896bdfbb6a8393c3857ce5521fc2e97956373cb2df1a",import.meta.url)],["sanfrancisco.csv",new URL("./files/10d7c65811d2b6679f4b5427ab1bc495148f85f8660af6796e1c34cd0dcce5a8bec306ce00755648e89eb816992b7f4fd2c35d0eba548be06d8bd6bcb94037b4",import.meta.url)],["losangeles.csv",new URL("./files/741cfa7f2f52663ebcdbaaddc2252c0c34f004b9f8fd28c08ad01ed8d45ecd1aa9528bfaaaac05c6e8cc95ab716174ded857a148079c78a9e229e1081e799da5",import.meta.url)],["portland.csv",new URL("./files/b6e8dc8ca7f5b046bebb227d010c83f98c59f286813558314b4645ab21cb54c2c719bea8bd3c7ff457ffcd2c06749ded7f8818dbfa8772f2c1f19e7d935dc9ca",import.meta.url)]]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], function(md){return(
md`# West Coast weather from Seattle to San Diego

Historical weather data is very intriguing. It packs a lot of information and can be analyzed and visualized from many different perspectives. Take radial visualization as an example: there are 365 records in the year-round dataset, and the cyclical pattern of weather fits the chart perfectly. Trend, spikes, and patterns are very observable, as well as other useful visual elements in just one chart.

The **WeatherWheel** is a compound radial chart that visualizes the most important weather information. It presents the daily temperature trend using the bar and line chart with two marks identifying the hottest and coldest days of the year. The different colors in the background indicate the weather conditions. Precipitation and humidity are in the outer ring; you can also find a mark that points out the rainiest day of the year.

Typically, the center circle is filled with chart legend or just left blank, but it is actually a very suitable place for showing additional information. By default, the center of the wheel shows bubbles that represent the statistics of yearly weather conditions. As the user hovers over the month labels, it displays the monthly statistic instead ***(Click any part of the center to switch between yearly/monthly statistics)***. The center circle also works as a display; it shows daily weather data as the user hovers over any other part of the wheel.

See below or [GitHub](https://github.com/analyzer2004/weatherwheel) for API reference and source code.`
)});
  main.variable(observer("viewof options")).define("viewof options", ["form","html","width","diameter"], function(form,html,width,diameter){return(
form(html`<form>City: <select name="city">
<option value="seattle">Seattle</option>
<option value="portland" selected>Portland</option>
<option value="sanfrancisco">San Francisco</option>
<option value="losangeles">Los Angeles</option>
<option value="sandiego">San Diego</option>
</select>
<!--Diameter:
<input type="range" name="diameter" min="240" max="${width}" value=${diameter}>-->
</form>`)
)});
  main.variable(observer("options")).define("options", ["Generators", "viewof options"], (G, _) => G.input(_));
  main.variable(observer("chart")).define("chart", ["diameter","d3","WeatherWheel","icon","weather","options"], function(diameter,d3,WeatherWheel,icon,weather,options)
{
  //const d = options.diameter;
  const d = diameter;
  const svg = d3.create("svg")
    .attr("viewBox", `${-d / 2} ${-d / 2} ${d} ${d}`)
    .style("width", d)
    .style("height", d);
  
  const wheel = new WeatherWheel(svg)
    .size([d, d])
    .icon(icon)
    .data(weather[options.city])
    .render();

  return svg.node();
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`You can combine these two components together to make a weather dashboard. The WeatherSankey changes its month as you hover around the wheel.`
)});
  main.variable(observer("combined")).define("combined", ["weather","options","d3","width","WeatherWheel","icon","WeatherChart"], function(weather,options,d3,width,WeatherWheel,icon,WeatherChart)
{
  const d = 480;
  
  var t, currentMonth = 0;
  const yd = weather[options.city];  
  
  const svg = d3.create("svg")
    .attr("viewBox", `${-256} ${-d / 2} ${1100} ${d}`)
    .style("width", width)
    .style("height", d);
  
  const wheel = new WeatherWheel(svg)
    .size([d, d])
    .icon(icon)
    .data(yd)
    .onhover((date) => {
      clearTimeout(t);
      t = setTimeout(() => {
        const m = date.getMonth();
        if (m !== currentMonth) {
          drawSankey(m);
          currentMonth = m;
        }
      }, 50);
    })
    .render();
  
  drawSankey(0);
  
  function drawSankey(month) {
    const md = yd.filter(d => new Date(d["Date time"]).getMonth() === month);
    
    svg.select(".wsankey").remove();
    const g = svg.append("g")
      .attr("class", "wsankey")
      .attr("font-size", "9pt")
      .attr("transform", `translate(${d / 2}, ${-d / 2})`);

    const sankey = new WeatherChart(g)
      .size(600, d)
      .icon(icon)
      .sort(1)    
      .tempChartHeight(60)
      .column({
        date: "Date time",
        high: "Maximum Temperature",
        low: "Minimum Temperature",
        condition: "Conditions"
      })
      .render(md);
  }
  
  return svg.node()
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`Or do something like this...`
)});
  main.variable(observer("chart2")).define("chart2", ["d3","WeatherWheel","icon","weather"], function(d3,WeatherWheel,icon,weather)
{    
    const div = d3.create("div").style("height", "500px");
  
    const miniWheel = (code, label, diameter) => {          
      const div = d3.create("div")
        .style("float", "left")
        .style("margin-left", "15px")
        .call(d => d.append("div").style("font-weight", "bold").text(label));
      
      const svg = d3.create("svg")
        .attr("viewBox", `${-diameter / 2} ${-diameter / 2} ${diameter} ${diameter}`)
        .style("width", diameter)
        .style("height", diameter);

      const wheel = new WeatherWheel(svg)
        .size([diameter, diameter])
        .icon(icon)
        .data(weather[code])
        .render();

      div.append(() => svg.node());
      return div.node();
    }
    
    div.append(() => miniWheel("seattle", "Seattle, WA", 455))
    div.append(() => miniWheel("sanfrancisco", "San Francisco, CA", 455))
    return div.node();
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`# API Reference

The WeatherWheel visualizes yearly weather data into a beautiful interactive compound radial chart. It accepts dataset with date, low/high/average temperatures, precipitation, humidity, and condition. The size of all elements is dynamically calculated based on the diameter of the wheel, which ensures those elements won't overlap, even when the wheel gets smaller.

* **WeatherWheel(container)** - Constructs a new WeatherWheel with default settings. The container can be a svg or any g element.
* **size([width, height])** - Sets the wheel's dimensions to specified width and height and returns this chart.
* **months(months)** - Sets the month names to be used when displaying the month ticks and returns this chart. Default is English months.
* **field(field)** - Sets the field names for parsing weather data and returns this chart. 
  * field.**date** - the field name of date
  * field.**low** - the field name of low temperature
  * field.**high** - the field name of high temperature
  * field.**avg** - the field name of average temperature
  * field.**precipitation** - the field name of precipitation
  * field.**humidity** - the field name of humidity
  * field.**condition** the field name of weather condition
* **icon(icon)** - Sets the icon for each weather condition and returns this chart.
  * icon.**clear** - the url of clear icon
  * icon.**cloudy** - the url of cloudy icon
  * icon.**overcast** - the url of overcast icon
  * icon.**rain** - the url of rain icon
  * icon.**snow** - the url of snow icon
* **temperatureUnit(unit)** - Sets the unit of temperature and returns this chart. Default is fahrenfeit.
* **precipitationUnit(unit)** - Sets the unit of precipitation and returns this chart. Default is inch.
* **data(data)** - Sets the yearly weather data and return this chart.
* **render()** - Renders the visualization and returns this chart.
* **onhover(date)** - Occurs when mouse hovers on a day or the month labels.`
)});
  main.variable(observer("WeatherWheel")).define("WeatherWheel", ["d3"], function(d3){return(
class WeatherWheel {
    constructor(container) {
        this._container = container;
        this._g = null;

        this._year = 0;
        this._months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        this._condColors = [
            { id: "Clear", color: "#fff3b0", icon: "" },
            { id: "Partially_cloudy", color: "#e7d8c9", icon: "" },
            { id: "Overcast", color: "#ddd", icon: "" },
            { id: "Rain", color: "#98c1d9", icon: "" },
            { id: "Snow", color: "#c2dfe3", icon: "" }
        ];
        this._colors = {
            low: "#118ab2", // blue
            mid: "#ffd166", // yellow
            high: "#ef476f", // red
            avg: "#006d77", // greenish
            precipitation: "#8ecae6", // blue
            precline: "#0077b6",
            humidity: "#ddd" // gray
        };

        this._width = 640;
        this._height = 640;
        this._half = { width: 0, height: 0 };
        this._radius = {
            inner: 125,
            outer: 0,
            max: 0,
            bubble: 50,
            label: 15
        };
        this._fontSize = {
            info: 10,
            center: 24,
            month: 9,
            mark: 8,
            tick: 8
        };

        this._data = null;
        this._chartData = null;
        this._field = {
            date: "Date time",
            low: "Minimum Temperature",
            high: "Maximum Temperature",
            avg: "Temperature",
            precipitation: "Precipitation",
            humidity: "Relative Humidity",
            condition: "Conditions"
        }

        this._x = null; // date scale
        this._y = null; // temperature scale
        this._b = null; // bubble radius scale
        this._h = null; // humidity scale
        this._hc = null; // humidity color scale
        this._dayRadian = 0; // one-day radian

        this._tempUnit = "°F";
        this._precUnit = "in";
        this._currMonth = 0;
        this._yearStat = true;
        this._highlight = null;
        this._statistics = null;
        this._dailyInfo = null;
        this._texts = {
            icon: null,
            date: null,
            high: null,
            low: null,
            avg: null,
            prec: null,
            humidity: null
        };

        this._onhover = null;

        this._f = true;
        this._uniqueId = new String(Date.now() * Math.random()).replace(".", "");
    }

    size(_) {
        return arguments.length ? (this._width = _[0], this._height = _[1], this) : [this._width, this._height];
    }

    months(_) {
        return arguments.length ? (this._months = _, this) : this._months;
    }

    field(_) {
        return arguments.length ? (this._field = _, this) : this._field;
    }

    icon(_) {
        if (arguments.length) {
            this._condColors[0].icon = _.clear;
            this._condColors[1].icon = _.cloudy;
            this._condColors[2].icon = _.overcast;
            this._condColors[3].icon = _.rain;
            this._condColors[4].icon = _.snow;
            return this;
        }
        else {
            return this._condColors.map(d => d.icon);
        }
    }

    temperatureUnit(_) {
        return arguments.length ? (this._tempUnit = _, this) : this._tempUnit;
    }

    precipitationUnit(_) {
        return arguments.length ? (this._precUnit = _, this) : this._precUnit;
    }

    data(_) {
        return arguments.length ? (this._data = _, this) : this._data;
    }

    onhover(_) {
        return arguments.length ? (this._onhover = _, this) : this._onhover;
    }

    render() {
        this._init();
        this._process();

        this._g = this._container.append("g");
        this._initGradients();        

        this._initDynamicParts();
        this._renderMainWheel();
        this._showStatistics(this._chartData, this._year);
        return this;
    }

    _init() {
        const r = this._radius;
        
        r.max = Math.min(this._width, this._height) / 2;
        r.inner = r.max * 0.28;
        r.bubble = r.max * 0.12;
        r.outer = r.max - r.bubble * 2 - r.label;

        const fs = d3.scaleLinear().domain([4, 1024]).range([0, 28]);
        this._fontSize.info = fs(r.max);
        fs.range([8, 36]);
        this._fontSize.center = fs(r.max);
        fs.range([4, 18]);
        this._fontSize.month = this._fontSize.mark = this._fontSize.tick = fs(r.max);        

        this._dayRadian = 2 * Math.PI / this._data.length + Math.PI;
        this._half = { width: this._width / 2, height: this._height / 2 };
    }

    _process() {
        let getIndex = cond => {
            for (let i = 0; i < this._condColors.length; i++) {
                const c = this._condColors[i];
                if (c.id === cond) return i;
            }
            return -1;
        }

        const lows = [], highs = [], precs = [], humis = [];
        const field = this._field;
        this._chartData = this._data.map(d => {
            const date = new Date(d[field.date]);
            var cond = d[field.condition];
            cond = (cond.startsWith("Rain") ? "Rain" : cond.startsWith("Snow") ? "Snow" : cond).replaceAll(" ", "_");
            const datum = {
                dateStr: d[field.date],
                date: date,
                month: date.getMonth(),
                low: d[field.low],
                high: d[field.high],
                avg: d[field.avg],
                precipitation: d[field.precipitation],
                humidity: d[field.humidity],
                conditionIndex: getIndex(cond),
                condition: cond
            };

            lows.push(datum.low);
            highs.push(datum.high);
            precs.push(datum.precipitation);
            humis.push(datum.humidity);
            return datum;
        });

        this._year = this._chartData[0].date.getFullYear();
        this._initScales(lows, highs, precs, humis);
    }

    _initScales(lows, highs, precs, humis) {
        const d = this._chartData, r = this._radius;

        this._x = d3.scaleTime()
            .domain([d[0].date, d[d.length - 1].date])
            .range([0, 2 * Math.PI - (2 * Math.PI / d.length)]); // whole circle - last day

        this._y = d3.scaleRadial()
            .domain([d3.min(lows), d3.max(highs)]).nice()
            .range([r.inner, r.outer]);

        this._b = d3.scaleLinear()
            .domain(d3.extent(precs))
            .range([0, r.bubble]);

        const hext = d3.extent(humis);
        this._h = d3.scaleLinear()
            .domain(hext)
            .range([r.outer, r.outer + r.bubble * 0.75]);

        this._hc = d3.scaleLinear()
            .domain(hext)
            .range(["#fefefe", "#dedede"]);
    }

    _initGradients() {
        const r = this._radius, c = this._colors;

        this._g.append("linearGradient")
            .attr("id", `line_${this._uniqueId}`)
            .attr("x1", "100%")
            .attr("x2", "100%")
            .attr("y1", r.outer)
            .attr("y2", r.inner)
            .attr("gradientUnits", "userSpaceOnUse")
            .call(g => g.append("stop").attr("stop-color", c.high).attr("offset", 0))
            .call(g => g.append("stop").attr("stop-color", c.mid).attr("offset", 0.5))
            .call(g => g.append("stop").attr("stop-color", c.low).attr("offset", 1));

        this._condColors.forEach(d => this._g.append("linearGradient")
            .attr("id", `grad${d.id}_${this._uniqueId}`)
            .attr("x1", "100%")
            .attr("x2", "100%")
            .attr("y1", r.inner)
            .attr("y2", r.outer)
            .attr("gradientUnits", "userSpaceOnUse")
            .call(g => g.append("stop").attr("stop-color", d.color).attr("stop-opacity", 0).attr("offset", 0))
            .call(g => g.append("stop").attr("stop-color", d.color).attr("stop-opacity", 0.25).attr("offset", 0.33))
            .call(g => g.append("stop").attr("stop-color", d.color).attr("stop-opacity", 0.5).attr("offset", 0.66))
            .call(g => g.append("stop").attr("stop-color", d.color).attr("stop-opacity", 0.0).attr("offset", 1))
        );
    }

    _initDynamicParts() {
        const r = this._radius, half = this._half;

        this._highlight = this._g.append("g")
            .attr("opacity", 0)
            .call(g => g.append("path")
                .attr("class", "highlight")
                .attr("opacity", 0.3)
                .attr("fill", "#999")
                .attr("d", d => this._line(r.inner, r.max - r.label)));

        this._statistics = this._g.append("g")
            .attr("text-anchor", "middle")            
            .attr("transform", `translate(${half.width - r.inner - half.width},${half.height - r.inner - half.height})`)
            .call(g => g.append("circle")
                .attr("fill", "white")
                .attr("opacity", 0)
                .attr("cx", r.inner).attr("cy", r.inner)
                .attr("r", r.inner))
            .call(g => g.append("text")
                .attr("class", "label")
                .attr("font-size", this._fontSize.center)
                .attr("fill", "#aaa")
                .attr("transform", `translate(${r.inner},${r.inner})`)
                .text(this._year))
            .on("click", () => {
                this._yearStat = !this._yearStat;
                if (this._yearStat)
                    this._showStatistics(this._chartData, this._year);
                else
                    this._showStatistics(this._getMonthData(this._currMonth), this._months[this._currMonth]);
            });

        const t = this._texts, c = this._colors;
        this._dailyInfo = this._g.append("g")
            .style("visibility", "hidden")
            .attr("font-size", this._fontSize.info + "pt")
            .call(g => t.icon = g.append("image")
                .attr("width", r.inner / 2)
                .attr("opacity", 0.35)
                .attr("transform", `translate(${-r.inner / 1.3},${-r.inner / 4})`))
            .call(g => g.append("g")                
                .attr("transform", `translate(0,${-r.inner / 4})`)
                .call(g => t.date = g.append("text").attr("fill", "#aaa").text("Date: "))
                .call(g => t.high = g.append("text").attr("y", "1em").attr("fill", c.high).text("High: "))
                .call(g => t.low = g.append("text").attr("y", "2em").attr("fill", c.low).text("Low: "))
                .call(g => t.avg = g.append("text").attr("y", "3em").attr("fill", c.avg).text("Avg: "))
                .call(g => t.prec = g.append("text").attr("y", "4em").attr("fill", c.precipitation).text("Prec.: "))
                .call(g => t.humidity = g.append("text").attr("y", "5em").attr("fill", c.precipitation).text("Humidity: ")));
    }    

    _renderMainWheel() {
        this._renderWheelContent();
        this._renderAxis();
        this._renderMarks();
        this._renderOverlay();
        this._renderMonthLabels();
    }

    _renderWheelContent() {
        const r = this._radius, c = this._colors;
        const vis = this._g.selectAll(".vis").data(this._chartData);

        vis.join("g")
            .attr("class", "vis")
            .attr("transform", d => `rotate(${this._x(d.date) * 180 / Math.PI - 180})`)
            // condition
            .call(g => g.append("path")
                .attr("fill", d => `url(#grad${d.condition}_${this._uniqueId})`)
                .attr("stroke", "none")
                .attr("d", d => this._line(r.inner, r.outer)))
            // temperature
            .call(g => g.append("path")
                .attr("fill", `url(#line_${this._uniqueId})`)
                .attr("stroke", "none")
                .attr("d", d => this._line(this._y(d.low), this._y(d.high))))
            // humidity
            .call(g => g.append("path")
                .attr("fill", d => this._hc(d.humidity))
                .attr("opacity", 0.7)
                .attr("d", d => this._line(r.outer, this._h(d.humidity))));

        // precipitation bubble
        vis.join("circle")
            .attr("fill", c.precipitation)
            .attr("stroke", c.precline)
            .attr("opacity", 0.4)
            .attr("stroke-opacity", 0.7)
            .attr("cy", r.outer + r.bubble)
            .attr("r", d => this._b(d.precipitation))
            .attr("transform", d => `rotate(${this._x(d.date) * 180 / Math.PI - 180})`);

        // average line
        const lineWidth = (r.outer - r.inner) * 1.5 * Math.PI / this._chartData.length;
        this._g.append("path")
            .attr("fill", "none")
            .attr("stroke", "#006d77")
            .attr("stroke-width", lineWidth)
            .attr("stroke-opacity", 0.35)
            .attr("d", d3.lineRadial()
                .curve(d3.curveLinearClosed)
                .angle(d => this._x(d.date))
                .radius(d => this._y(d.avg))(this._chartData));
    }

    _renderAxis() {
        this._g.append("g")
            .attr("text-anchor", "end")
            .call(g => this._circle(g, this._radius.inner))
            .selectAll("g")
            .data(this._y.ticks(5).slice(0, 5))
            .join("g")
            .call(g => this._circle(g, d => this._y(d)))
            .call(g => g.append("text")
                .attr("y", d => -this._y(d))
                .attr("dx", "-0.5em")
                .attr("dy", "0.25em")
                .attr("font-size", this._fontSize.tick + "pt")
                .attr("font-weight", "bold")
                .attr("stroke", "white")
                .attr("stroke-width", 2)
                .attr("fill", "none")
                .text(d => d)
                .clone(true)
                .attr("fill", "#aaa")
                .attr("stroke", "none"));
    }

    _renderMarks() {
        const c = this._colors, r = this._radius;

        let angle = day => {
            day.angle = this._x(day.date) * 180 / Math.PI - 180; // pre-calculated degree
            day.arcStart = this._x(day.date); // rad
            day.arcEnd = day.arcStart + 2 * Math.PI; // rad
            return day;
        }

        let addMark = (id, color, y1, y2, day, innerRadius, dy, label, circle) => {
            this._g.append("g")
                .call(g => g.append("line")
                    .attr("y1", y1)
                    .attr("y2", y2)
                    .attr("stroke", color)
                    .attr("stroke-width", 0.5)
                    .attr("transform", `rotate(${day.angle})`))
                .call(g => {
                    g.append("path")
                        .attr("id", id + "_" + this._uniqueId)
                        .attr("stroke", circle ? color : "none")
                        .attr("stroke-width", 0.5)
                        .attr("stroke-opacity", 0.5)
                        .attr("stroke-dasharray", "1,2,1,2")
                        .attr("fill", "none")
                        .attr("d", this._arc(innerRadius, day.arcStart, day.arcEnd));
                    g.append("text")
                        .attr("fill", color)
                        .attr("font-size", this._fontSize.mark + "pt")
                        .attr("font-weight", "bold")
                        .attr("dx", 2)
                        .attr("dy", dy)
                        .append("textPath")
                        .attr("href", "#" + id + "_" + this._uniqueId)
                        .text(label);
                });
        }

        const
            hottest = angle(this._chartData.reduce((a, b) => a.high > b.high ? a : b)),
            coldest = angle(this._chartData.reduce((a, b) => a.low < b.low ? a : b)),
            rainiest = angle(this._chartData.reduce((a, b) => a.precipitation > b.precipitation ? a : b));

        addMark("hottest", c.high, this._y(hottest.high), this._y(hottest.high) + 10, hottest, this._y(hottest.high), -2, `${hottest.dateStr} - ${hottest.high}${this._tempUnit}`, true);
        addMark("coldest", c.low, this._y(coldest.low) - 10, this._y(coldest.low), coldest, this._y(coldest.low), "1em", `${coldest.dateStr} - ${coldest.low}${this._tempUnit}`, true);
        addMark("rainiest", c.precline, r.max - r.label, r.max - r.label - 10, rainiest, r.max - r.label - 10, 0, `${rainiest.dateStr} - ${rainiest.precipitation}${this._precUnit}`);

    }

    _renderOverlay() {
        const r = this._radius, t = this._texts;

        this._g.selectAll(".visoverlay")
            .data(this._chartData)
            .join("g")
            .attr("class", "visoverlay")
            .attr("transform", d => `rotate(${this._x(d.date) * 180 / Math.PI - 180})`) // rad 2 deg - 180 -> rotate back to 12 o'clock                
            .call(g => g.append("path")
                .attr("fill", "white")
                .attr("opacity", 0)
                .attr("d", this._line(r.inner, r.max - r.label)))
            .on("mouseenter", (e, d) => {
                if (+this._statistics.attr("opacity") === 1) {
                    this._statistics.attr("opacity", 0);
                    this._dailyInfo.style("visibility", "visible");
                }

                t.icon.attr("href", this._condColors[d.conditionIndex].icon);
                t.date.text(d.dateStr);
                t.high.text(`High: ${d.high}${this._tempUnit}`);
                t.low.text(`Low: ${d.low}${this._tempUnit}`);
                t.avg.text(`Avg: ${d.avg}${this._tempUnit}`);
                t.prec.text(`Prec.: ${d.precipitation}${this._precUnit}`);
                t.humidity.text(`Humidity: ${d.humidity}%`);

                const curr = d3.select(e.currentTarget);
                this._highlight.attr("opacity", 1)
                    .transition().duration(500)
                    .ease(d3.easeElastic)
                    .attr("transform", curr.attr("transform"));

                if (this._onhover) this._onhover(d.date);
            })
            .on("mouseleave", (e, d) => {
                this._statistics.attr("opacity", 1);
                this._dailyInfo.style("visibility", "hidden");
                this._highlight.attr("opacity", 0);
            });
    }

    _renderMonthLabels() {
        const r = this._radius;
        this._g.append("g")
            .selectAll("g")
            .data(this._months.map((d, i) => {
                const date = new Date(this._year, i, 1);
                return {
                    month: d,
                    index: i,
                    date: date,
                    rad: this._x(date),
                    angle: this._x(date) * 180 / Math.PI - 180 // pre-calculated degree of the first day of the month
                };
            }))
            .join("g")
            .attr("font-size", this._fontSize.month + "pt")
            .attr("font-weight", "bold")
            .call(g => g.append("line")
                .attr("stroke", "#aaa")
                .attr("stroke-width", 0.5)
                .attr("stroke-dasharray", "1,2,1,2")
                .attr("y1", r.inner)
                .attr("y2", r.max)
                .attr("transform", d => `rotate(${d.angle})`))
            .call(g => g.append("path")                
                .attr("stroke", "#aaa")
                .attr("stroke-width", 0.35)
                .attr("stroke-dasharray", "1,2,1,2")
                .attr("d", d => this._arc(r.max - r.label, d.rad, d.rad + Math.PI * 2 / 12 * 0.3))) // month radian * 0.3 for the month dot-lines
            .call(g => g.append("text")
                .attr("dx", 2.5)                
                .attr("dy", r.label + 17.5) // 2.5: margin-bottom
                .attr("fill", "#999")
                .append("textPath")
                .attr("href", d => "#" + d.month + "_" + this._uniqueId)
                .text(d => d.month))
            .call(g => g.append("path")
                .attr("id", d => d.month + "_" + this._uniqueId)
                .attr("fill", "white")
                .attr("opacity", 0)
                .attr("d", d => this._arc(r.max - r.label - 20, d.rad, d.rad + Math.PI * 2 / 12, r.max + 20))) // an arc covers the whole month for mouseover
            .on("mouseover", (e, d) => {
                this._yearStat = false;
                this._currMonth = d.index;
                this._showStatistics(this._getMonthData(d.index), this._months[d.index]);
                if (this._onhover) this._onhover(new Date(this._year, d.index, 1));
            });
    }

    _showStatistics(data, label) {
        const set = g => {
            g.attr("transform", d => `translate(${d.x},${d.y})`)
                .select("text")
                .attr("fill", d => d3.color(d.data.color).darker(0.75))
                .text(d => d.value);

            const c = g.select("circle");
            var t = !this._f ? c.transition().duration(250) : c;                    
            t.attr("r", d => d.r)
                .attr("fill", d => d.data.color)
                .attr("stroke", d => d3.color(d.data.color).darker(0.75))            

            return g;
        }

        this._statistics.select(".label").text(label);
        this._statistics.selectAll("g")
            .data(this._pack(data).leaves().filter(d => d.data.color !== undefined))
            .join(
                enter => {
                    return enter.append("g")
                        .call(g => g.append("circle")
                            .attr("opacity", 0.65)
                            .attr("stroke-width", 0.5))
                        .call(g => g.append("text")
                            .attr("dy", "0.25em")
                            .attr("font-size", this._fontSize.center))
                },
                update => set(update, true),
                exit => exit.remove())
            .call(g => set(g));

        this._f = false;
    }

    _line(y1, y2) {
        return d3.arc()
            .innerRadius(y1)
            .outerRadius(y2)
            .startAngle(Math.PI)
            .endAngle(this._dayRadian)();
    }

    _arc(radius, start, end, outerRadius) {
        outerRadius = outerRadius || radius;
        return d3.arc()
            .innerRadius(radius)
            .outerRadius(outerRadius)
            .startAngle(start)
            .endAngle(end)();
    }

    _circle(g, r) {
        g.append("circle")
            .attr("fill", "none")
            .attr("stroke", "#aaa")
            .attr("stroke-width", 0.5)
            .attr("stroke-dasharray", "1,2,1,2")
            .attr("r", d => typeof r === "function" ? r(d) : r);
    }

    _pack(data) {
        const counts = [], w = this._radius.inner * 2;
        const grouped = d3.group(data, d => d.conditionIndex);
        grouped.forEach((value, key) => counts.push({
            cond: key,
            count: value.length,
            color: this._condColors[key].color
        }));

        return d3.pack()
            .size([w, w])
            .padding(1)(
                d3.hierarchy({ children: counts })
                    .sum(d => d.count)
            );
    }

    _getMonthData(month) {
        return this._chartData.filter(d => d.month === month);
    }
}
)});
  main.variable(observer()).define(["md"], function(md){return(
md`# Appendix`
)});
  main.variable(observer()).define(["html"], function(html){return(
html`<div style="font-size:10pt; font-style:italic">Icons made by <a href="https://www.flaticon.com/authors/bqlqn" title="bqlqn">bqlqn</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a></div>`
)});
  main.variable(observer("icon")).define("icon", ["FileAttachment"], async function(FileAttachment){return(
{
  clear: await FileAttachment("clear.svg").url(),
  cloudy: await FileAttachment("cloudy.svg").url(),
  overcast: await FileAttachment("overcast.svg").url(),
  rain: await FileAttachment("rain.svg").url(),
  snow: await FileAttachment("snow.svg").url()
}
)});
  main.variable(observer()).define(["md"], function(md){return(
md`Data: Visual Crossing Weather`
)});
  main.variable(observer("weather")).define("weather", ["d3","FileAttachment"], async function(d3,FileAttachment){return(
{
  seattle: d3.csvParse(await FileAttachment("seattle.csv").text(), d3.autoType),
  portland: d3.csvParse(await FileAttachment("portland.csv").text(), d3.autoType),
  sanfrancisco: d3.csvParse(await FileAttachment("sanfrancisco.csv").text(), d3.autoType),
  losangeles: d3.csvParse(await FileAttachment("losangeles.csv").text(), d3.autoType),
  sandiego: d3.csvParse(await FileAttachment("sandiego.csv").text(), d3.autoType)
}
)});
  main.variable(observer("diameter")).define("diameter", ["screen"], function(screen){return(
Math.min(screen.width, screen.height) * 0.8
)});
  main.variable(observer()).define(["html"], function(html){return(
html`<style>
svg text {
  cursor: default;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}</style>`
)});
  const child1 = runtime.module(define1);
  main.import("WeatherChart", child1);
  const child2 = runtime.module(define2);
  main.import("form", child2);
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("d3@6")
)});
  main.variable(observer()).define(["md"], function(md){return(
md`🌐[ericlo.dev](https://ericlo.dev) 🐱[GitHub Repositories](https://github.com/analyzer2004?tab=repositories) 🐦[Twitter](https://twitter.com/analyzer2004)`
)});
  return main;
}
