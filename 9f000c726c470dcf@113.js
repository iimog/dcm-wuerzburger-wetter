// https://observablehq.com/@iimog/wetter-daten-aufbereitung@113
import define1 from "./eb159cd244d1afa5@195.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([["data_OBS_DEU_PT1H_RR-F.csv",new URL("./files/171ca6990db4a6d5905f702f879c32267f1bc8515ab6123c5c3888bd5a4f6248067890157402dc0d468a090b007955dfa88e24007a8aa4d678cfd9cad0298224",import.meta.url)],["data_OBS_DEU_PT1H_RR.csv",new URL("./files/965a77a79716ebe49553683f379b2ebc704f0425a15945346fea63f9b41b0df27f635f65fc8c916a7d3eeee804b0181921e0a8ecbfe84641c7ebef5736ece980",import.meta.url)],["data_OBS_DEU_PT1H_SD.csv",new URL("./files/2c5d9c2378acbc20f75550c100bf0cf4ffbec03a4344bada4bf6d200ba233bf8cfc90238224a083abc570ae9029026e797ca5c2a2ab581ff6b5332cdcea132d8",import.meta.url)],["data_OBS_DEU_PT1H_N.csv",new URL("./files/636a220e1f2489049ae201b01dfa8bbe1b22a53b6dff2810c729e878d83a87cc7073ff5c2c469087466b0fd8b7ad78426254fe464030f535b60bf31769ca9404",import.meta.url)],["data_OBS_DEU_PT1H_T2M.csv",new URL("./files/5cf87453e790232d09d8bab7398146772629840b7c991c9459dce4e9478f8d90343286b29107502f373a278056220dd79516a46b4b45b1fcdb91670464000102",import.meta.url)],["data_OBS_DEU_PT1H_RF.csv",new URL("./files/67909b5333a68110da5a79fc08d2eac6401f970827a0a16cade61e3cdaafa9cb9a5213bf4bc034bee6bedb108f2698450eb33897185dbb042a810f20488af4c1",import.meta.url)]]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], function(md){return(
md`# Wetter Daten Aufbereitung`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Daten laden`
)});
  main.variable(observer("temperatur")).define("temperatur", ["FileAttachment"], async function(FileAttachment){return(
await FileAttachment("data_OBS_DEU_PT1H_T2M.csv").csv({typed: true})
)});
  main.variable(observer("niederschlag")).define("niederschlag", ["FileAttachment"], async function(FileAttachment){return(
await FileAttachment("data_OBS_DEU_PT1H_RR.csv").csv({typed: true})
)});
  main.variable(observer("niederschlagsart")).define("niederschlagsart", ["FileAttachment","T"], async function(FileAttachment,T)
{
  const niederschlagsart = await FileAttachment("data_OBS_DEU_PT1H_RR-F.csv").csv({typed: true})
  const niederschlag_codes = ["Kein Niederschlag", "Regen", "Unbekannt", "Unbekannt", "Unbekannt", "Unbekannt", "Regen", "Schnee", "Schneeregen", "Fehler"]
  return T.tidy(niederschlagsart, T.mutate({Wert: x=>niederschlag_codes[x.Wert]}))
}
);
  main.variable(observer("bedeckung")).define("bedeckung", ["FileAttachment"], async function(FileAttachment){return(
await FileAttachment("data_OBS_DEU_PT1H_N.csv").csv({typed: true})
)});
  main.variable(observer("luftfeuchtigkeit")).define("luftfeuchtigkeit", ["FileAttachment"], async function(FileAttachment){return(
await FileAttachment("data_OBS_DEU_PT1H_RF.csv").csv({typed: true})
)});
  main.variable(observer("sonnenscheindauer")).define("sonnenscheindauer", ["FileAttachment"], async function(FileAttachment){return(
await FileAttachment("data_OBS_DEU_PT1H_SD.csv").csv({typed: true})
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Daten verknüpfen`
)});
  main.variable(observer("combined")).define("combined", ["T","temperatur","luftfeuchtigkeit","niederschlag","niederschlagsart","bedeckung","sonnenscheindauer"], function(T,temperatur,luftfeuchtigkeit,niederschlag,niederschlagsart,bedeckung,sonnenscheindauer){return(
T.tidy(
  temperatur,
  T.transmute({Zeit: x=>x.Zeitstempel, Variable: "Temperatur", Wert: x=>x.Wert}),
  T.addRows(
    T.tidy(luftfeuchtigkeit, T.transmute({Zeit: x=>x.Zeitstempel, Variable: "Luftfeuchtigkeit", Wert: x=>x.Wert}))
  ),
  T.addRows(
    T.tidy(niederschlag, T.transmute({Zeit: x=>x.Zeitstempel, Variable: "Niederschlag", Wert: x=>x.Wert}))
  ),
  T.addRows(
    T.tidy(niederschlagsart, T.transmute({Zeit: x=>x.Zeitstempel, Variable: "Niederschlagsart", Wert: x=>x.Wert}))
  ),
  T.addRows(
    T.tidy(bedeckung, T.transmute({Zeit: x=>x.Zeitstempel, Variable: "Bedeckung", Wert: x=>x.Wert}))
  ),
  T.addRows(
    T.tidy(sonnenscheindauer, T.transmute({Zeit: x=>x.Zeitstempel, Variable: "Sonnenscheindauer", Wert: x=>x.Wert}))
  ),
  T.pivotWider({namesFrom: "Variable", valuesFrom: "Wert"})
)
)});
  main.variable(observer("combinedByDay")).define("combinedByDay", ["T","combined","d3"], function(T,combined,d3){return(
T.tidy(
  combined,
  T.mutate({Datum: x => d3.timeFormat("%d.%m.%Y")(x.Zeit)}),
  T.groupBy("Datum", [], T.groupBy.map())
)
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Daten zusammenfassen (täglich)`
)});
  main.variable(observer("dailyCombined")).define("dailyCombined", ["T","combined","d3","typeSummary","_","getKategorie"], function(T,combined,d3,typeSummary,_,getKategorie){return(
T.tidy(
  combined,
  T.mutate({Zeit: x=>d3.timeDay(x.Zeit)}),
  T.groupBy("Zeit", [T.summarize({
    "Temperatur Min": T.min("Temperatur"),
    "Temperatur Max": T.max("Temperatur"),
    "Temperatur": T.mean("Temperatur"),
    Luftfeuchtigkeit: T.mean("Luftfeuchtigkeit"),
    Niederschlag: T.sum("Niederschlag"),
    Niederschlagsart: typeSummary("Niederschlagsart"),
    Bedeckung: T.mean("Bedeckung"),
    Sonnenscheindauer: T.sum("Sonnenscheindauer")
  })]),
  T.mutate(
    {
      Datum: x => d3.timeFormat("%Y/%m/%d")(x.Zeit),
      Temperatur: x=>_.round(x.Temperatur,2),
      Luftfeuchtigkeit: x=>_.round(x.Luftfeuchtigkeit,2),
      Niederschlag: x=>_.round(x.Niederschlag,2),
      Bedeckung: x=>_.round(x.Bedeckung,2),
      Kategorie: getKategorie
    }
  )
)
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### Niederschlagstyp zusammenfassen

Idee: Wenn es irgendwann am Tag geschneit hat ist es Schnee, ansonsten falls es geregnet hat Regen. Wenn beides nicht der Fall ist bleibt der Wert leer.`
)});
  main.variable(observer("typeSummary")).define("typeSummary", ["_"], function(_){return(
(key) => (arr) => {
  let summaryString = _.uniq(arr.map(x=>x[key])).join(",")
  if(summaryString.indexOf("Schnee") >= 0){
    return "Schnee"
  } else if(summaryString.indexOf("Regen") >= 0){
    return "Regen"
  } else {
    return ""
  }
}
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### Kategorie

Die Kategorie kann einen dieser Werte annehmen:
 - ❄️ Snow
 - 🌧️ Rain
 - ☀️ Clear
 - 🌤️ Partially cloudy
 - ☁️ Overcast

Diese Einstufung wird für bestimmte fancy Wetterkomponenten benötigt.`
)});
  main.variable(observer("getKategorie")).define("getKategorie", function(){return(
x => {
  if(x.Niederschlagsart === "Schnee"){
    return "Snow"
  }
  if(x.Niederschlagsart === "Regen" && x.Niederschlag > .1){
    return "Rain"
  }
  if(x.Bedeckung < 4){
    return "Clear"
  }
  if(x.Sonnenscheindauer > 120){
    return "Partially cloudy"
  }
  return "Overcast"
}
)});
  main.variable(observer()).define(["Inputs","T","dailyCombined"], function(Inputs,T,dailyCombined){return(
Inputs.table(T.tidy(dailyCombined, T.count("Kategorie")))
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## js Bibliotheken`
)});
  const child1 = runtime.module(define1);
  main.import("T", child1);
  return main;
}
