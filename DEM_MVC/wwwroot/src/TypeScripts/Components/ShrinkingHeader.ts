import * as $ from "jquery";

// add shrink class for nav element on page scrolling
$(window).scroll(function (): void {
	if ($(document).scrollTop() > 50) {
		$("#header").addClass("nav-shrink");
	} else {
		$("#header").removeClass("nav-shrink");
	}
});