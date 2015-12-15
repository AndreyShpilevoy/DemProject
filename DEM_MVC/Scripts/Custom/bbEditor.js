/*****************************************/
// by kto: 15/dec/2015
// parts of Javascript Textarea BBCode Markup Editor Version: 1.3 was used
/******************************************/

function doAddTags(tag1, tag2, textAreaId) {
    var textarea = $('#' + textAreaId)[0];
    var selectedValue;

    if (tag1 === "[url]") {
        doURL(textarea);
    }
        // Code for IE
    else if (document.selection) {
        textarea.focus();
        selectedValue = document.selection.createRange();
        selectedValue.text = tag1 + selectedValue.text + tag2;
    }
        // Code for Mozilla Firefox
    else {
        var len = textarea.value.length;
        var start = textarea.selectionStart;
        var end = textarea.selectionEnd;

        var scrollTop = textarea.scrollTop;
        var scrollLeft = textarea.scrollLeft;


        selectedValue = textarea.value.substring(start, end);
        if (selectedValue.length === 0 && tag1 === "[img]") {
            doImage(textarea);
        } else {
            var rep = tag1 + selectedValue + tag2;
            textarea.value = textarea.value.substring(0, start) + rep + textarea.value.substring(end, len);

            textarea.scrollTop = scrollTop;
            textarea.scrollLeft = scrollLeft;
        }

    }
}

function doImage(textarea) {
    var url = prompt("Enter the Image URL:", "http://");
    var scrollTop = textarea.scrollTop;
    var scrollLeft = textarea.scrollLeft;
    var selectedValue;

    if (url !== "" && url != null) {

        if (document.selection) {
            textarea.focus();
            selectedValue = document.selection.createRange();
            selectedValue.text = "[img]" + url + "[/img]";
        }
        else {
            var length = textarea.value.length;
            var start = textarea.selectionStart;
            var end = textarea.selectionEnd;

            var replaceValue = "[img]" + url + "[/img]";
            textarea.value = textarea.value.substring(0, start) + replaceValue + textarea.value.substring(end, length);

            textarea.scrollTop = scrollTop;
            textarea.scrollLeft = scrollLeft;
        }
    }

}

function doURL(textarea) {
    var url = prompt("Enter the URL:", "http://");
    var scrollTop = textarea.scrollTop;
    var scrollLeft = textarea.scrollLeft;
    var selectedValue;
    var replaceValue;

    if (url !== "" && url != null) {

        if (document.selection) {
            textarea.focus();
            selectedValue = document.selection.createRange();

            if (selectedValue.text === "") {
                selectedValue.text = "[url]" + url + "[/url]";
            } else {
                selectedValue.text = "[url=" + url + "]" + selectedValue.text + "[/url]";
            }

            //alert(sel.text);

        }
        else {
            var length = textarea.value.length;
            var start = textarea.selectionStart;
            var end = textarea.selectionEnd;

            selectedValue = textarea.value.substring(start, end);

            if (selectedValue === "") {
                replaceValue = "[url]" + url + "[/url]";
            } else {
                replaceValue = "[url=" + url + "]" + selectedValue + "[/url]";
            }

            textarea.value = textarea.value.substring(0, start) + replaceValue + textarea.value.substring(end, length);


            textarea.scrollTop = scrollTop;
            textarea.scrollLeft = scrollLeft;
        }
    }
}