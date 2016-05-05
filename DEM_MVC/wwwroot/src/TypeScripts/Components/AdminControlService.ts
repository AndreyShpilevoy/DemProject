/// <reference path="../../../TypingsForTypeScript/browser.d.ts" />

import * as $ from "jquery";
import PermissionService from "./PermissionService";

export default class AdminControlService {
	private topicId: string;
	private permissionArray: string[];
	private permissionService: PermissionService;

	constructor(topicId: string) {
		this.topicId = topicId;
		this.permissionArray = new Array<string>();
		this.permissionArray.push("show_admin_controls");
		this.permissionService = new PermissionService();
		this.initialFunction();
	}

	private initialFunction() {
		this.permissionService.checkPermisson("/Permissions/CheckPermissions/", { topicId: this.topicId, permissionsName: this.permissionArray }, (callback: boolean) => {
			if (callback) {
				$(".deletePostBtn").removeClass("display-none");
				$(".banUserBtn").removeClass("display-none");
				$(".unbanUserBtn").removeClass("display-none");
			} else {
				$(".admin-delete-post-buttons").remove();
				$(".admin-ban-unban-buttons").remove();
			}
		});
	}
}

function deletePost(postId: string) {
	var data = { postId: postId };

	$.post("/Administration/DeletePost/", data, returnedData => {
		if (returnedData.success) {
			location.reload();
		} else alert(returnedData.responseText);
	});

}

function banUser(userId: string) {
	var data = { userId: userId };

	$.post("/Administration/BanUser/", data, returnedData => {
		if (returnedData.success) {
			alert("user banned");
		} else alert(returnedData.responseText);
	});

}

function unbanUser(userId: string) {
	var data = { userId: userId };

	$.post("/Administration/UnbanUser/", data, returnedData => {
		if (returnedData.success) {
			alert("user unbanned");
		} else alert(returnedData.responseText);
	});

}