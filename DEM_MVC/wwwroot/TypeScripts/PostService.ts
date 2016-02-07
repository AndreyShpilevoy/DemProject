/// <reference path="../TypingsForTypeScript/tsd.d.ts" />

class PostService {
    private permissionService: PermissionService;
    private newButtonCode: string;
    private topicId: string;
    private buttonHolderCssSelector: string;
    private postFormCssSelector: string;
    private dialogButtonClasses: string;

    constructor(topicId: string) {
        this.permissionService = new PermissionService();
        this.newButtonCode = "<button class=\"AddNewPost ui-button ui-widget ui-state-default ui-button-text-only\" role=\"button\"><span class=\"ui-button-text\">New Post</span></button>";
        this.topicId = topicId;
        this.buttonHolderCssSelector = ".topic-actions-buttons";
        this.postFormCssSelector = "#AddPostForm";
        this.dialogButtonClasses = "ui-button ui-widget ui-state-default ui-button-text-only";
        this.createNewPostButton();
    }

    private createNewPostButton() {
        var self = this;
        this.permissionService.checkPermisson("/Permissions/CheckNewPostPermissions/", { topicId: this.topicId }, (callback: boolean) => {
            if (callback) {
                $(this.buttonHolderCssSelector).append(this.newButtonCode);

                $(".AddNewPost").on("click", () => {
                    this.addNewPost("/Forum/CreatePost/", self);
                });
            }
        });
    }

    private addNewPost(stringUrl: string, self: PostService) {

        $.ajax({
            type: "get",
            url: stringUrl + window.location.search,
            success(partialView) {
                $(partialView).dialog({
                    resizable: false,
                    width: 1000,
                    modal: true,
                    title: "Create new post",
                    close() {
                        $(self.postFormCssSelector).remove();
                    },
                    buttons: [
                        {
                            text: "Send",
                            "class": self.dialogButtonClasses,
                            click() {
                                var data = $(self.postFormCssSelector).serialize();
                                $.post(stringUrl, data, returnedData => {
                                    if (returnedData.success) {
                                        location.reload();
                                    } else alert(returnedData.responseText);
                                });
                            }
                        },
                        {
                            text: "Cancel",
                            "class": self.dialogButtonClasses,
                            click() {
                                $(this).dialog("close");
                            }
                        }
                    ]
                });
            }
        });
    }
}