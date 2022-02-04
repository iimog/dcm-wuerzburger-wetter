// https://observablehq.com/@iimog/wie-wars-wurzburger-wetter@208
import define1 from "./cdd7f4209106fe8b@114.js";
import define2 from "./eb159cd244d1afa5@195.js";
import define3 from "./9f000c726c470dcf@113.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# Wie war's Würzburger Wetter

Data Crunch Magic am 3. Februar 2022`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`Der Langzeittrend der Temperatur wird erst sichtbar wenn man über ein längeren Zeitraum mittelt. Aber vorsicht! Die y-Achse ist unterschiedlich skaliert.`
)});
  main.variable(observer("viewof fenster")).define("viewof fenster", ["Inputs"], function(Inputs){return(
Inputs.radio([1, 30, 365, 3650], {label: "Mittel über x Tage", value: 30})
)});
  main.variable(observer("fenster")).define("fenster", ["Generators", "viewof fenster"], (G, _) => G.input(_));
  main.variable(observer()).define(["Plot","dailyCombined","fenster"], function(Plot,dailyCombined,fenster){return(
Plot.plot({
  marks: [
    Plot.line(dailyCombined, Plot.windowY({x: "Zeit", y: "Temperatur", k: fenster}))
  ]
})
)});
  main.variable(observer("viewof hot")).define("viewof hot", ["Inputs"], function(Inputs){return(
Inputs.toggle({label: "Heiß?", value: false})
)});
  main.variable(observer("hot")).define("hot", ["Generators", "viewof hot"], (G, _) => G.input(_));
  main.variable(observer("viewof topN")).define("viewof topN", ["Inputs"], function(Inputs){return(
Inputs.range([1, 50], {label: "Top n?", value: 10, step: 1})
)});
  main.variable(observer("topN")).define("topN", ["Generators", "viewof topN"], (G, _) => G.input(_));
  main.variable(observer()).define(["Plot","hot","extremeTage","topN"], function(Plot,hot,extremeTage,topN){return(
Plot.plot({
  marginLeft: 90, 
  color: {scheme: hot ? "reds" : "purples"},
  marks: [
    Plot.barX(extremeTage, {
      y: "Datum",
      fill: hot ? "Temperatur Max" : "Temperatur Min", 
      x: hot ? "Temperatur Max" : "Temperatur Min", 
      sort: {y: "x", reverse: hot, limit: topN}
    })
  ]
})
)});
  main.variable(observer("extremeTage")).define("extremeTage", ["T","dc","hot"], function(T,dc,hot){return(
T.tidy(
  dc,
  T.arrange(hot ? "Temperatur Max" : "Temperatur Min"),
  hot ? T.sliceTail(100) : T.sliceHead(100)
)
)});
  main.variable(observer("dc")).define("dc", ["T","dailyCombined"], function(T,dailyCombined){return(
T.tidy(
  dailyCombined,
  T.filter(x => x.Datum !== "2022/02/03")
)
)});
  main.variable(observer()).define(["dailyCombined"], function(dailyCombined){return(
dailyCombined
)});
  main.variable(observer("monatsDaten")).define("monatsDaten", ["T","dailyCombined","jahr"], function(T,dailyCombined,jahr){return(
T.tidy(
  dailyCombined,
  T.filter(
    x => x.Zeit.getFullYear() === jahr && x.Zeit.getMonth() === 11
  )
)
)});
  main.variable(observer("viewof jahr")).define("viewof jahr", ["Inputs"], function(Inputs){return(
Inputs.range([2000, 2021], {label: "Jahr", value: 2021, step: 1})
)});
  main.variable(observer("jahr")).define("jahr", ["Generators", "viewof jahr"], (G, _) => G.input(_));
  main.variable(observer("chart")).define("chart", ["d3","WeatherChart","weatherIcons","monatsDaten"], function(d3,WeatherChart,weatherIcons,monatsDaten)
{
  const w = 1024, h = 650;
  const svg = d3.create("svg")    
    .attr("cursor", "default")
    .attr("viewBox", [0, 0, w, h]);  
  
  new WeatherChart(svg)
    .size(w, h)
    .icon(weatherIcons)
    .column({
      low: "Temperatur Min",
      high: "Temperatur Max",
      date: "Datum",
      condition: "Kategorie"
    })
    .unit("°C")
    //.sort(+options.sort)
    .render(monatsDaten);
  
  return svg.node();
}
);
  main.variable(observer("monat")).define("monat", ["T","dailyCombined","mon"], function(T,dailyCombined,mon){return(
T.tidy(
  dailyCombined,
  T.filter(
    x => x.Zeit.getFullYear()>1945 && x.Zeit.getMonth() === mon
  ),
  T.mutate({jahr: x=>x.Zeit.getFullYear()}),
  T.groupBy("jahr", [T.summarize({jahr: T.first("jahr"), sonne: x=>(T.sum("Sonnenscheindauer")(x)/60)})]),
  //T.mutate({sonne: x=>x.sonne/60
)
)});
  main.variable(observer("viewof mon")).define("viewof mon", ["Inputs"], function(Inputs){return(
Inputs.range([0, 11], {label: "Monat-1", step: 1, value: 0})
)});
  main.variable(observer("mon")).define("mon", ["Generators", "viewof mon"], (G, _) => G.input(_));
  main.variable(observer()).define(["mon","md"], function(mon,md){return(
md`Es geht um den Monat **${"Jan Feb März April Mai Juni Juli Aug Sep Okt Nov Dez".split(" ")[mon]}**`
)});
  main.variable(observer()).define(["Plot","monat"], function(Plot,monat){return(
Plot.plot({
  x: {tickRotation: 45},
  y: {domain: [0,320]},
  marks: [
    Plot.barY(monat, {x: "jahr", y: "sonne"}),
    Plot.text(monat, {x: "jahr", y: "sonne", text: x=>"🌞", fontSize: 20})
  ]
})
)});
  const child1 = runtime.module(define1);
  main.import("WeatherChart", child1);
  main.import("weatherIcons", child1);
  const child2 = runtime.module(define2);
  main.import("T", child2);
  const child3 = runtime.module(define3);
  main.import("dailyCombined", child3);
  return main;
}
