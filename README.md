# Wie war's Würzburger Wetter? Eine interaktive Analyse mit JavaScript

Vortrag in der Serie *[Data Crunch Magic](https://ddojo.github.io/dcm)* am 03. Feburar 2022.

Das gemeinsam entwickelte Notebook ist auf [Observable](https://observablehq.com/@iimog/wie-wars-wurzburger-wetter?collection=@iimog/data-crunch-magic-2) zu finden.
https://observablehq.com/@iimog/wie-wars-wurzburger-wetter@208

## Lokale Kopie
View this notebook in your browser by running a web server in this folder. For
example:

~~~sh
npx http-server
~~~

Or, use the [Observable Runtime](https://github.com/observablehq/runtime) to
import this module directly into your application. To npm install:

~~~sh
npm install @observablehq/runtime@4
npm install https://api.observablehq.com/@iimog/wie-wars-wurzburger-wetter@208.tgz?v=3
~~~

Then, import your notebook and the runtime as:

~~~js
import {Runtime, Inspector} from "@observablehq/runtime";
import define from "@iimog/wie-wars-wurzburger-wetter";
~~~

To log the value of the cell named “foo”:

~~~js
const runtime = new Runtime();
const main = runtime.module(define);
main.value("foo").then(value => console.log(value));
~~~
