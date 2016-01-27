/// <reference path="../TypingsForTypeScript/tsd.d.ts" />

class ScrollPageService {
    isVisible = false;
    isTower = false;

    setVisibility() {
        if ($(document).scrollTop() > 150) {
            if (this.isVisible) return;
            this.isVisible = true;
            $("#back-to-top").stop(true, true).fadeIn();
        }
        else {
            if (!this.isVisible) return;
            this.isVisible = false;
            $("#back-to-top").stop(true, true).fadeOut();
        }
    }

    setSize() {
        if ($(document).width() - $("#wrap").width() > 120) {
            if (this.isTower) return;
            this.isTower = true;
            $("#back-to-top").addClass("tower");
        }
        else {
            if (!this.isTower) return;
            this.isTower = false;
            $("#back-to-top").removeClass("tower");
        }
    }

    goToTop() {
        $("html, body").animate({ scrollTop: 0 }, 500);
    }

    goToPost(postId: number) {
        $("html, body").animate({ scrollTop: $(`#postId${postId}`).offset().top }, 500);
    }
}



window.onload = () => {
    var scrollPageToTopService = new ScrollPageService();

    if ($("#back-to-top").length) {
        scrollPageToTopService.setSize();
        $(window).scroll(scrollPageToTopService.setVisibility);
        $(window).resize(scrollPageToTopService.setSize);
        $("#back-to-top").click(() => {
            scrollPageToTopService.goToTop();
        });
    }

    var urlParametrService = new UrlParametrService();
    var postId = urlParametrService.getParametrByName("postId");
    if (postId) {
        scrollPageToTopService.goToPost(postId);
    }
};