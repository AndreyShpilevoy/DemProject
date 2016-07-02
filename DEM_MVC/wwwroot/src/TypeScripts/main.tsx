//register css
import "./../scss/main-dem.scss";

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
import { render } from "react-dom";
import * as bootstrap from "bootstrap";
import * as ShrinkingHeader from "./Scripts/ShrinkingHeader";
import * as Layout from "./Components/Layout";

[bootstrap, ShrinkingHeader, Layout];

//render(

//);