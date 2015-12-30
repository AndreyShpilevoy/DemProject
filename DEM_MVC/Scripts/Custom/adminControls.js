$(document).ready(function () {
    var topicId = getUrlParameter("topicId");

    var permissionsName = new Array();
    permissionsName[1] = "show_admin_controls";


    $.post("/Permissions/CheckPermissions/", { topicId, permissionsName }, function (permissions) {
        if (permissions.success) {
            $('.deletePostBtn').removeClass("display-none");
            $('.banUserBtn').removeClass("display-none");
            $('.unbanUserBtn').removeClass("display-none");
        } else {
            $(".admin-delete-post-buttons").remove();
            $(".admin-ban-unban-buttons").remove();
        }
    });
});

function deletePost(postId) {
    var data = { postId: postId };

    $.post('/Administration/DeletePost/', data, function (returnedData) {
        if (returnedData.success) {
            location.reload();
        } else alert(returnedData.responseText);
    });

}

function banUser(userId) {
    var data = { userId: userId };

    $.post('/Administration/BanUser/', data, function (returnedData) {
        if (returnedData.success) {
            alert('user banned');
        } else alert(returnedData.responseText);
    });

}

function unbanUser(userId) {
    var data = { userId: userId };

    $.post('/Administration/UnbanUser/', data, function (returnedData) {
        if (returnedData.success) {
            alert('user unbanned');
        } else alert(returnedData.responseText);
    });

}