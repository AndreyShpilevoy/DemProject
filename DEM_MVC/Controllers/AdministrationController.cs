﻿using System;
using System.Web.Mvc;
using DEM_MVC_BL.Interfaces.IServices;
using DEM_MVC_Infrastructure.Models;
using Microsoft.AspNet.Identity;

namespace DEM_MVC.Controllers
{
    public class AdministrationController : Controller
    {
        private readonly IAdminService _adminService;
        private readonly IPermissionsService _permissionsService;

        public AdministrationController(IAdminService adminService,
            IPermissionsService permissionsService)
        {
            _adminService = adminService;
            _permissionsService = permissionsService;
        }
        [HttpPost]
        public ActionResult DeletePost(int postId)
        {
            var currentUserId = User.Identity.GetUserId<int>();

            if (currentUserId == 0)
                return new JsonResult { Data = new { success = false, responseText = "You can't delete post - You not authorized. Please, contact with administrator." } };
            
            if (!_permissionsService.UserHasPermissionByForumId(currentUserId, 8, CommonConstants.ShowAdminControls))//todo change check to Admin group, not to permisson
                return new JsonResult { Data = new { success = false, responseText = "You can't delete post - you have not permisson. Please, contact with administrator." } };

            if (_adminService.DeletePost(postId))
            {
                return new JsonResult { Data = new { success = true, responseText = "Post was deleted." } };
            }
            return new JsonResult { Data = new { success = false, responseText = "Post wasn't deleted. Please, contact with administrator." } };
        }

        [HttpPost]
        public ActionResult BanUser(int userId)
        {
            var currentUserId = User.Identity.GetUserId<int>();

            if (currentUserId == 0)
                return new JsonResult { Data = new { success = false, responseText = "You can't ban user - You not authorized. Please, contact with administrator." } };

            if (!_permissionsService.UserHasPermissionByForumId(currentUserId, 8, CommonConstants.ShowAdminControls))//todo change check to Admin group, not to permisson
                return new JsonResult { Data = new { success = false, responseText = "You can't ban user - you have not permisson. Please, contact with administrator." } };

            if (_adminService.BanUser(userId))
            {
                return new JsonResult { Data = new { success = true, responseText = "User wasn banned." } };
            }
            return new JsonResult { Data = new { success = false, responseText = "User wasn't banned. Please, contact with administrator." } };
        }

        [HttpPost]
        public ActionResult UnbanUser(int userId)
        {
            var currentUserId = User.Identity.GetUserId<int>();

            if (currentUserId == 0)
                return new JsonResult { Data = new { success = false, responseText = "You can't unban user - You not authorized. Please, contact with administrator." } };

            if (!_permissionsService.UserHasPermissionByForumId(currentUserId, 8, CommonConstants.ShowAdminControls))//todo change check to Admin group, not to permisson
                return new JsonResult { Data = new { success = false, responseText = "You can't unban user - you have not permisson. Please, contact with administrator." } };

            if (_adminService.UnbanUser(userId))
            {
                return new JsonResult { Data = new { success = true, responseText = "User wasn unbanned." } };
            }
            return new JsonResult { Data = new { success = false, responseText = "User wasn't unbanned. Please, contact with administrator." } };
        }

        protected override void OnException(ExceptionContext filterContext)
        {
            Exception e = filterContext.Exception;
            DemLogger.Current.Error(e, "AdministrationController. OnException");
        }
    }
}