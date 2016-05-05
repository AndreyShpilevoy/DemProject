/// <reference path="../../../TypingsForTypeScript/browser.d.ts" />

import * as $ from "jquery";
import UrlParametrService from "./UrlParametrService";


export default class ScrollPageService {
	private isVisible: boolean;
	private isTower: boolean;
	private backToTopCssSelector: string;
	private postId: string;
	private urlParametrService: UrlParametrService;

	constructor() {
		this.urlParametrService = new UrlParametrService();
		this.backToTopCssSelector = "#back-to-top";
		this.postId = "postId";
		this.isVisible = false;
		this.isTower = false;

		this.registerScrollToTopEvent();
	}

	registerScrollToPostEvent() {
		var postId = this.urlParametrService.getParametrByName(this.postId);
		if (postId) {
			this.goToPost(postId, this.postId);
		}
	}

	private registerScrollToTopEvent() {
		var self = this;
		if ($(this.backToTopCssSelector).length) {
			this.setSize(self);

			$(window).scroll(() => {
				this.setVisibility(this);
			});
			$(window).resize(() => {
				this.setSize(this);
			});

			$(this.backToTopCssSelector).click(() => {
				this.goToTop();
			});
		}
	}

	private setVisibility(self: ScrollPageService) {
		if ($(document).scrollTop() > 150) {
			if (this.isVisible) return;
			this.isVisible = true;
			$(self.backToTopCssSelector).stop(true, true).fadeIn();
		}
		else {
			if (!this.isVisible) return;
			this.isVisible = false;
			$(self.backToTopCssSelector).stop(true, true).fadeOut();
		}
	}

	private setSize(self: ScrollPageService) {
		if ($(document).width() - $("#wrap").width() > 120) {
			if (this.isTower) return;
			this.isTower = true;
			$(self.backToTopCssSelector).addClass("tower");
		}
		else {
			if (!this.isTower) return;
			this.isTower = false;
			$(self.backToTopCssSelector).removeClass("tower");
		}
	}

	private goToTop() {
		$("html, body").animate({ scrollTop: 0 }, 500);
	}

	private goToPost(postId: string, postIdName: string) {
		$("html, body").animate({ scrollTop: $(`#${postIdName}${postId}`).offset().top }, 500);
	}
}