import $ from "jquery";

// add shrink class for nav element on page scrolling
$(window).scroll(() => {
	if ($(document).scrollTop() > 50) {
		$("#header").addClass("nav-shrink");
	} else {
		$("#header").removeClass("nav-shrink");
	}
});