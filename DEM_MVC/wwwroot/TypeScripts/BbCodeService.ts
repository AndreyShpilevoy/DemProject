/// <reference path="../TypingsForTypeScript/tsd.d.ts" />

class BbCodeService {

    changeSpoilerState() {
        $(this).parent().toggleClass("spoilerbox-on");
    }

    selectCode() {
        if (window.getSelection) {
            var selection = window.getSelection();
            var range = document.createRange();
            range.selectNodeContents($(this).parent().parent().find("code")[0]);
            selection.removeAllRanges();
            selection.addRange(range);
            document.execCommand("copy");
        }
    }
}