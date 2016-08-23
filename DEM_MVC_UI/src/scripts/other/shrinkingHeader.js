import throttle from "lodash/throttle";
import root from "lodash/_root";

let initialized = false; // init flag

// add shrink class for nav element on page scrolling
export default function shrinkingHeader(){
	if(!initialized){
		root.document.addEventListener("scroll", throttle(() => {
			let header = root.document.getElementById("header");
			if(root.pageYOffset > 50) {
				header.classList.add("nav-shrink");
			} else {
				header.classList.remove("nav-shrink");
			}
		}, 250));
		initialized = true;
	}
}
