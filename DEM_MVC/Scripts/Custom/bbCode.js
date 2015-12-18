function selectCode(a) {
    // Get ID of code block
    var e = a.parentNode.parentNode.getElementsByTagName("CODE")[0];

    // Not IE and IE9+
    var s;
    var r;
    if (window.getSelection) {
        s = window.getSelection(); // Safari
        if (s.setBaseAndExtent) {
            s.setBaseAndExtent(e, 0, e, e.innerText.length - 1);
        }
            // Firefox and Opera
        else {
            
            if (window.opera && e.innerHTML.substring(e.innerHTML.length - 4) === "<BR>") {
                e.innerHTML = e.innerHTML + "&nbsp;";
            }
            r = document.createRange();
            r.setStart(e.firstChild, 0);
            r.setEnd(e.lastChild, e.lastChild.textContent.length);
            s.removeAllRanges();
            s.addRange(r);
        }
    }
        // Some older browsers
    else if (document.getSelection) {
        s = document.getSelection();
        r = document.createRange();
        r.selectNodeContents(e);
        s.removeAllRanges();
        s.addRange(r);
    }
        // IE
    else if (document.selection) {
        r = document.body.createTextRange();
        r.moveToElementText(e);
        r.select();
    }
}