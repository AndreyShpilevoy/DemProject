import $ from "jquery";

let initialized = false; // init flag

// add shrink class for nav element on page scrolling
export function ShrinkingHeader(){
	if(!initialized){
		$(window).scroll(() => {
			if ($(document).scrollTop() > 50) {
				$("#header").addClass("nav-shrink");
			} else {
				$("#header").removeClass("nav-shrink");
			}
		});
		initialized = true;
	}
}
