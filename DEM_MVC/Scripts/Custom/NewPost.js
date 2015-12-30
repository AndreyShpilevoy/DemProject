$(document).ready(function() {
    var topicId = getUrlParameter("topicId");

    $.post("/Permissions/CheckNewPostPermissions/", { topicId }, function (permissions) {
        if (permissions.success) {
            $(".topic-actions-buttons").append('<button class="AddNewPost ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" role="button"><span class="ui-button-text">New Post</span></button>');

            $('.AddNewPost').on('click', function () {
                createItem("/Forum/CreatePost/", "#AddPostForm");
            });
        }
    });


});

function createItem(stringUrl, formName) {
    $.ajax({
        type: 'get',
        url: stringUrl + window.location.search,
        success: function (partialView) {
            $(partialView).dialog({
                resizable: false,
                width: 1000,
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
                                if (returnedData.success) {
                                    //reload partial
                                   // $("#postsMainPanel").load('/Forum/ShowPostTableByTopicId' + window.location.search);
                                    location.reload();
                                    //$(thisdata).remove();
                                } else alert(returnedData.responseText);
                            });
                        }
                    },
                    {
                        text: "Cancel",
                        "class": 'ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only',
                        click: function () {
                            $(formName).remove();
                            $(this).dialog("close");
                        }
                    }
                ]
            });
        }
    });
}