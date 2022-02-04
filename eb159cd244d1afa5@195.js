// https://observablehq.com/@pbeshai/tidyjs@195
export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# tidyjs

Easy way to import tidy functions in Observable.
`
)});
  main.variable(observer("T")).define("T", ["require"], function(require){return(
require("@tidyjs/tidy@2.4.4/dist/umd/tidy.min.js")
)});
  main.variable(observer("tidy")).define("tidy", ["T"], function(T){return(
T.tidy
)});
  main.variable(observer("addItems")).define("addItems", ["T"], function(T){return(
T.addItems
)});
  main.variable(observer("addRows")).define("addRows", ["T"], function(T){return(
T.addRows
)});
  main.variable(observer("arrange")).define("arrange", ["T"], function(T){return(
T.arrange
)});
  main.variable(observer("sort")).define("sort", ["T"], function(T){return(
T.sort
)});
  main.variable(observer("complete")).define("complete", ["T"], function(T){return(
T.complete
)});
  main.variable(observer("count")).define("count", ["T"], function(T){return(
T.count
)});
  main.variable(observer("debug")).define("debug", ["T"], function(T){return(
T.debug
)});
  main.variable(observer("distinct")).define("distinct", ["T"], function(T){return(
T.distinct
)});
  main.variable(observer("expand")).define("expand", ["T"], function(T){return(
T.expand
)});
  main.variable(observer("fill")).define("fill", ["T"], function(T){return(
T.fill
)});
  main.variable(observer("filter")).define("filter", ["T"], function(T){return(
T.filter
)});
  main.variable(observer("fullJoin")).define("fullJoin", ["T"], function(T){return(
T.fullJoin
)});
  main.variable(observer("groupBy")).define("groupBy", ["T"], function(T){return(
T.groupBy
)});
  main.variable(observer("innerJoin")).define("innerJoin", ["T"], function(T){return(
T.innerJoin
)});
  main.variable(observer("leftJoin")).define("leftJoin", ["T"], function(T){return(
T.leftJoin
)});
  main.variable(observer("map")).define("map", ["T"], function(T){return(
T.map
)});
  main.variable(observer("desc")).define("desc", ["T"], function(T){return(
T.desc
)});
  main.variable(observer("asc")).define("asc", ["T"], function(T){return(
T.asc
)});
  main.variable(observer("mutate")).define("mutate", ["T"], function(T){return(
T.mutate
)});
  main.variable(observer("mutateWithSummary")).define("mutateWithSummary", ["T"], function(T){return(
T.mutateWithSummary
)});
  main.variable(observer("rename")).define("rename", ["T"], function(T){return(
T.rename
)});
  main.variable(observer("replaceNully")).define("replaceNully", ["T"], function(T){return(
T.replaceNully
)});
  main.variable(observer("select")).define("select", ["T"], function(T){return(
T.select
)});
  main.variable(observer("pick")).define("pick", ["T"], function(T){return(
T.pick
)});
  main.variable(observer("slice")).define("slice", ["T"], function(T){return(
T.slice
)});
  main.variable(observer("sliceHead")).define("sliceHead", ["T"], function(T){return(
T.sliceHead
)});
  main.variable(observer("sliceTail")).define("sliceTail", ["T"], function(T){return(
T.sliceTail
)});
  main.variable(observer("sliceMin")).define("sliceMin", ["T"], function(T){return(
T.sliceMin
)});
  main.variable(observer("sliceMax")).define("sliceMax", ["T"], function(T){return(
T.sliceMax
)});
  main.variable(observer("sliceSample")).define("sliceSample", ["T"], function(T){return(
T.sliceSample
)});
  main.variable(observer("summarize")).define("summarize", ["T"], function(T){return(
T.summarize
)});
  main.variable(observer("summarizeAll")).define("summarizeAll", ["T"], function(T){return(
T.summarizeAll
)});
  main.variable(observer("summarizeAt")).define("summarizeAt", ["T"], function(T){return(
T.summarizeAt
)});
  main.variable(observer("summarizeIf")).define("summarizeIf", ["T"], function(T){return(
T.summarizeIf
)});
  main.variable(observer("tally")).define("tally", ["T"], function(T){return(
T.tally
)});
  main.variable(observer("total")).define("total", ["T"], function(T){return(
T.total
)});
  main.variable(observer("totalAll")).define("totalAll", ["T"], function(T){return(
T.totalAll
)});
  main.variable(observer("totalAt")).define("totalAt", ["T"], function(T){return(
T.totalAt
)});
  main.variable(observer("totalIf")).define("totalIf", ["T"], function(T){return(
T.totalIf
)});
  main.variable(observer("transmute")).define("transmute", ["T"], function(T){return(
T.transmute
)});
  main.variable(observer("when")).define("when", ["T"], function(T){return(
T.when
)});
  main.variable(observer("deviation")).define("deviation", ["T"], function(T){return(
T.deviation
)});
  main.variable(observer("first")).define("first", ["T"], function(T){return(
T.first
)});
  main.variable(observer("last")).define("last", ["T"], function(T){return(
T.last
)});
  main.variable(observer("max")).define("max", ["T"], function(T){return(
T.max
)});
  main.variable(observer("mean")).define("mean", ["T"], function(T){return(
T.mean
)});
  main.variable(observer("meanRate")).define("meanRate", ["T"], function(T){return(
T.meanRate
)});
  main.variable(observer("median")).define("median", ["T"], function(T){return(
T.median
)});
  main.variable(observer("min")).define("min", ["T"], function(T){return(
T.min
)});
  main.variable(observer("n")).define("n", ["T"], function(T){return(
T.n
)});
  main.variable(observer("nDistinct")).define("nDistinct", ["T"], function(T){return(
T.nDistinct
)});
  main.variable(observer("sum")).define("sum", ["T"], function(T){return(
T.sum
)});
  main.variable(observer("variance")).define("variance", ["T"], function(T){return(
T.variance
)});
  main.variable(observer("rate")).define("rate", ["T"], function(T){return(
T.rate
)});
  main.variable(observer("cumsum")).define("cumsum", ["T"], function(T){return(
T.cumsum
)});
  main.variable(observer("roll")).define("roll", ["T"], function(T){return(
T.roll
)});
  main.variable(observer("pivotLonger")).define("pivotLonger", ["T"], function(T){return(
T.pivotLonger
)});
  main.variable(observer("pivotWider")).define("pivotWider", ["T"], function(T){return(
T.pivotWider
)});
  main.variable(observer("fullSeq")).define("fullSeq", ["T"], function(T){return(
T.fullSeq
)});
  main.variable(observer("fullSeqDate")).define("fullSeqDate", ["T"], function(T){return(
T.fullSeqDate
)});
  main.variable(observer("fullSeqDateISOString")).define("fullSeqDateISOString", ["T"], function(T){return(
T.fullSeqDateISOString
)});
  main.variable(observer("contains")).define("contains", ["T"], function(T){return(
T.contains
)});
  main.variable(observer("endsWith")).define("endsWith", ["T"], function(T){return(
T.endsWith
)});
  main.variable(observer("everything")).define("everything", ["T"], function(T){return(
T.everything
)});
  main.variable(observer("matches")).define("matches", ["T"], function(T){return(
T.matches
)});
  main.variable(observer("negate")).define("negate", ["T"], function(T){return(
T.negate
)});
  main.variable(observer("numRange")).define("numRange", ["T"], function(T){return(
T.numRange
)});
  main.variable(observer("startsWith")).define("startsWith", ["T"], function(T){return(
T.startsWith
)});
  main.variable(observer("TMath")).define("TMath", ["T"], function(T){return(
T.TMath
)});
  main.variable(observer("vectorSeq")).define("vectorSeq", ["T"], function(T){return(
T.vectorSeq
)});
  main.variable(observer("vectorSeqDate")).define("vectorSeqDate", ["T"], function(T){return(
T.vectorSeqDate
)});
  main.variable(observer("lead")).define("lead", ["T"], function(T){return(
T.lead
)});
  main.variable(observer("lag")).define("lag", ["T"], function(T){return(
T.lag
)});
  return main;
}
