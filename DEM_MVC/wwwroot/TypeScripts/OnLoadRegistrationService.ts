/// <reference path="../TypingsForTypeScript/tsd.d.ts" />

window.onload = () => {
    var scrollPageToTopService = new ScrollPageService();
    regScrollToTopEvent(scrollPageToTopService);
    regScrollToPostEvent(scrollPageToTopService);

    var bbCodeService = new BbCodeService();
    regBbCodeSpoilerEvent(bbCodeService);
    regBbCodeCodeEvent(bbCodeService);

    var bbMediaService = new BbMediaService();
};

function regScrollToTopEvent(scrollPageToTopService: ScrollPageService) {
    if ($("#back-to-top").length) {
        scrollPageToTopService.setSize();
        $(window).scroll(scrollPageToTopService.setVisibility);
        $(window).resize(scrollPageToTopService.setSize);
        $("#back-to-top").click(() => {
            scrollPageToTopService.goToTop();
        });
    }
}

function regScrollToPostEvent(scrollPageToTopService: ScrollPageService) {
    var urlParametrService = new UrlParametrService();
    var postId = urlParametrService.getParametrByName("postId");
    if (postId) {
        scrollPageToTopService.goToPost(postId);
    }
}

function regBbCodeSpoilerEvent(bbCodeService: BbCodeService) {
    $("dl.spoilerbox > dt").on("click", bbCodeService.changeSpoilerState);
}

function regBbCodeCodeEvent(bbCodeService: BbCodeService) {
    $("dl.codebox > dt > span").on("click", bbCodeService.selectCode);
}