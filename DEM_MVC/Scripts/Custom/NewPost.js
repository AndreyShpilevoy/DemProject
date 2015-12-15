﻿$('.AddNewPost').on('click', function () {
    createItem("/Forum/CreatePost/", "#AddPostForm");
});

function createItem(stringUrl, formName) {
    $.ajax({
        type: 'get',
        url: stringUrl,
        success: function (partialView) {
            $(partialView).dialog({
                resizable: false,
                width: 915,
                modal: true,
                title: "Create new post",
                buttons: [
                    {
                        text: "Send",
                        "class": 'ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only',
                        click: function () {
                            var thisdata = this;
                            var data = $(formName).serialize();
                            $.post(stringUrl, data, function(returnedData) {
                                if (returnedData.succes) {
                                    //reloadPartial(partialName, reloadStringUrl);
                                    $(thisdata).remove();
                                } else alert(returnedData.responseText);
                            });
                        }
                    },
                    {
                        text: "Cancel",
                        "class": 'ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only',
                        click: function () {
                            $(this).dialog("close");
                        }
                    }
                ]
            });
        }
    });
}