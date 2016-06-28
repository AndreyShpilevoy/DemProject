// register jQuery and Tether as global variable (require for Bootstrap)
import * as JQuery from "jquery";
import * as tether from "tether";

interface IWindow {
	jQuery: any;
	$: any;
	Tether: any;
}
declare var window: IWindow;

window.jQuery = window.$ = JQuery;
window.Tether = tether;
// register jQuery and Tether as global variable (require for Bootstrap) - end

import * as React from "react";
import * as ReactDOM from "react-dom";
import * as ShrinkingHeader from "./Components/ShrinkingHeader";
import { Layout } from "./Components/Layout/Layout";

ReactDOM.render(
    <Layout compiler="TypeScript" framework="React" />,
    document.getElementById("wrap")
);



//import { Collapse } from "./Components/Collapse";

//let col = new Collapse();
//let a = col.test;
//alert(a);
//col.testAlert("rolf");

///////////////////////////

//import * as Collapse from "./Components/Collapse";

//Collapse.testAlert("lol");

import * as bootstrap from "bootstrap";
[bootstrap, ShrinkingHeader, Layout];



