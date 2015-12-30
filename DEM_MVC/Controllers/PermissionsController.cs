using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using DEM_MVC_BL.Interfaces.IServices;
using DEM_MVC_Infrastructure.Models;
using Microsoft.AspNet.Identity;

namespace DEM_MVC.Controllers
{
    public class PermissionsController : Controller
    {
        private readonly IPermissionsService _permissionsService;
        private readonly IDataLoadService _dataLoadService;

        public PermissionsController(IDataLoadService dataLoadService, 
            IPermissionsService permissionsService)
        {
            _permissionsService = permissionsService;
            _dataLoadService = dataLoadService;
        }

        [HttpPost]
        public ActionResult CheckPermissions(int topicId, List<string> permissionsName)
        {
            var userId = User.Identity.GetUserId<int>();
            if (userId == 0) return new JsonResult { Data = new { success = false, responseText = "You can't create post - You not authorized. Please, contact with administrator." } };

            var permission = _permissionsService.UserHasPermissionByTopicId(userId, topicId, permissionsName);

            return !permission ? new JsonResult { Data = new { success = false, responseText = "You can't create post in this topic. Please, contact with administrator." } }
                               : new JsonResult { Data = new { success = true } };
        }

        [HttpPost]
        public ActionResult CheckNewPostPermissions(int topicId)
        {
            var userId = User.Identity.GetUserId<int>();
            if (userId == 0) return new JsonResult { Data = new { success = false, responseText = "You can't create post - You not authorized. Please, contact with administrator." } };

            var topicInfoViewModel = _dataLoadService.GetTopicInfoViewModelById(topicId);
            var permission = _permissionsService.UserHasPermissionByForumId(userId, topicInfoViewModel.ForumId, topicInfoViewModel.TopicClosed
                ? new List<string>() { CommonConstants.PostMessageInClosedTopic }
                : new List<string>() { CommonConstants.PostMessageInOpenTopic });

            return !permission ? new JsonResult { Data = new { success = false, responseText = "You can't create post in this topic. Please, contact with administrator." } }
                               : new JsonResult { Data = new { success = true } };
        }
    }
}