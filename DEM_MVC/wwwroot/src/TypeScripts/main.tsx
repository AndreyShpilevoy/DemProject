//register jQuery as global variable - start
import * as JQuery from 'jquery';
import 'jquery-ui';


import CookiesService  from './Components/CookiesService.ts'; //todo delete global variable
import doAddTags  from './Components/BbEditor.ts'; //todo delete global variable

interface Window {
	jQuery: any;
	$: any;
	CookiesService: any; //todo delete global variable
	doAddTags: any; //todo delete global variable
}
declare var window: Window;

window.jQuery = window.$ = JQuery;
//register jQuery as global variable - end

window.CookiesService = CookiesService; //todo delete global variable
window.doAddTags = doAddTags; //todo delete global variable



import * as React from 'react';
import { render } from 'react-dom';

import GreeterTsx from './GreeterTsx';
render((
	<GreeterTsx greeting="Hello, world!" />
), document.getElementById('header'));


import AdminControlService from './Components/AdminControlService.ts';
import BbCodeService from './Components/BbCodeService.ts';
import PostService from './Components/PostService.ts';
import ScrollPageService from './Components/ScrollPageService.ts';
import UrlParametrService from './Components/UrlParametrService.ts';


$(document).ready(() => {
	var urlParametrService = new UrlParametrService();

	var bbCodeService = new BbCodeService();
	bbCodeService.processSpoilerBbCodes();
	bbCodeService.processCodeBbCodes();
	bbCodeService.processMediaBbCodes();

	var topicId = urlParametrService.getParametrByName("topicId");
	if (topicId) {
		var postService = new PostService(topicId);
		var adminControlService = new AdminControlService(topicId);
	}

	var scrollPageToTopService = new ScrollPageService();
	scrollPageToTopService.registerScrollToPostEvent();
});