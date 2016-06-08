import * as $ from 'jquery';

//add shrink class for nav element on page scrolling

$(window).scroll(function () {
	if ($(document).scrollTop() > 50) {
		$('nav').addClass('shrink');
	} else {
		$('nav').removeClass('shrink');
	}
});