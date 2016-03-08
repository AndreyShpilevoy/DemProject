using System;
using System.Collections.Generic;
using System.Web.Mvc;
using DEM_MVC_BL.Interfaces.IServices;
using DEM_MVC_BL.Interfaces.IServices.Common;
using DEM_MVC_BL.Interfaces.IServices.Conference;
using DEM_MVC_Infrastructure.Models;
using Microsoft.AspNet.Identity;

namespace DEM_MVC.Controllers
{
    public class PermissionsController : Controller
    {
        private readonly IPermissionsReadService _permissionsService;
        private readonly ITopicReadService _topicReadService;

        public PermissionsController(ITopicReadService topicReadService, 
            IPermissionsReadService permissionsService)
        {
            _permissionsService = permissionsService;
            _topicReadService = topicReadService;
        }

        [HttpPost]
        public JsonResult CheckPermissions(int topicId, List<string> permissionsName)
        {
            var userId = User.Identity.GetUserId<int>();

            if (userId == 0)
                return new JsonResult { Data = new { success = false, responseText = "You can't create post - You not authorized. Please, contact with administrator." } };

            var permission = _permissionsService.UserHasPermissionByTopicId(userId, topicId, permissionsName);

            return !permission ? new JsonResult { Data = new { success = false, responseText = "You can't create post in this topic. Please, contact with administrator." } }
                               : new JsonResult { Data = new { success = true } };
        }

        [HttpPost]
        public JsonResult CheckNewPostPermissions(int topicId)
        {
            var userId = User.Identity.GetUserId<int>();

            if (userId == 0)
                return new JsonResult { Data = new { success = false, responseText = "You can't create post - You not authorized. Please, contact with administrator." } };

            var topicInfoViewModel = _topicReadService.GetTopicInfoViewModelById(topicId);
            var permission = _permissionsService.UserHasPermissionByForumId(userId, topicInfoViewModel.ForumId, topicInfoViewModel.TopicClosed
                ? new List<string>() { CommonConstants.PostMessageInClosedTopic }
                : new List<string>() { CommonConstants.PostMessageInOpenTopic });

            return !permission ? new JsonResult { Data = new { success = false, responseText = "You can't create post in this topic. Please, contact with administrator." } }
                               : new JsonResult { Data = new { success = true } };
        }

        protected override void OnException(ExceptionContext filterContext)
        {
            Exception exception = filterContext.Exception;
            DemLogger.Current.Error(exception, $"{nameof(PermissionsController)}. Error was caught in {DemLogger.GetCallerInfo()}");
        }
    }
}