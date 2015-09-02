function selectCode(a) {
    // Get ID of code block
    var e = a.parentNode.parentNode.getElementsByTagName('CODE')[0];

    // Not IE and IE9+
    if (window.getSelection) {
        var s = window.getSelection();
        // Safari
        if (s.setBaseAndExtent) {
            s.setBaseAndExtent(e, 0, e, e.innerText.length - 1);
        }
            // Firefox and Opera
        else {
            
            if (window.opera && e.innerHTML.substring(e.innerHTML.length - 4) == '<BR>') {
                e.innerHTML = e.innerHTML + '&nbsp;';
            }

            var r = document.createRange();
            r.setStart(e.firstChild, 0);
            r.setEnd(e.lastChild, e.lastChild.textContent.length);
            s.removeAllRanges();
            s.addRange(r);
        }
    }
        // Some older browsers
    else if (document.getSelection) {
        var s = document.getSelection();
        var r = document.createRange();
        r.selectNodeContents(e);
        s.removeAllRanges();
        s.addRange(r);
    }
        // IE
    else if (document.selection) {
        var r = document.body.createTextRange();
        r.moveToElementText(e);
        r.select();
    }
}