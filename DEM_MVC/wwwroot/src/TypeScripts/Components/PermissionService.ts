﻿/// <reference path="../../../TypingsForTypeScript/browser.d.ts" />

import * as $ from "jquery";

export default class PermissionService {

	checkPermisson(url: string, data: Object, callback: Function) {
		$.post(url, data, permission => {
			if (permission.success) {
				callback(true);
			} else {
				callback(false);
			}
		});
	}
}

//permissionService.checkPermisson("/Permissions/CheckNewPostPermissions/", { topicId: 1448}, function(){alert("O")})