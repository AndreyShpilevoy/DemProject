/// <reference path="../TypingsForTypeScript/browser.d.ts" />

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