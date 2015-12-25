using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AutoMapper;
using DEM_MVC.Models;
using DEM_MVC_BL.Interfaces.IServices;
using DEM_MVC_BL.Models;
using DEM_MVC_BL.Models.ForumModels;
using DEM_MVC_BL.Services.ModelsHelpers;
using DEM_MVC_DAL.Entities;
using DEM_MVC_Infrastructure.Models;
using Microsoft.AspNet.Identity;

namespace DEM_MVC.Controllers
{
    public class ForumController : Controller
    {

        private readonly IDataLoadService _dataLoadService;
        private readonly IDataWriteService _dataWriteService;
        private readonly IPermissionsService _permissionsService;
        private readonly IAdminService _adminService;

        public ForumController(IDataLoadService dataLoadService,
            IPermissionsService permissionsService,
            IDataWriteService dataWriteService,
            IAdminService adminService)
        {
            _dataLoadService = dataLoadService;
            _permissionsService = permissionsService;
            _dataWriteService = dataWriteService;
            _adminService = adminService;
        }

        #region IndexPageZone

        [HttpGet]
        public ActionResult Index()
        {
            return View("Index/Index");
        }

        [HttpGet]
        public ActionResult ShowForumTable()
        {
            var forumTableViewModels = _dataLoadService.GetAllForumTableViewModels();
            return PartialView("Index/_ShowForumTable", forumTableViewModels);
        }

        #endregion

        #region ViewForumPageZone

        [HttpGet]
        public ActionResult ViewForum(int forumId, int? page)
        {
            var forumInfoViewModel = _dataLoadService.GetForumInfoViewModelById(forumId);
            if (page == null || page < 1) forumInfoViewModel.PageNumber = 1;
            else forumInfoViewModel.PageNumber = (int)page;
            return View("ViewForum/ViewForum", forumInfoViewModel);
        }

        [HttpGet]
        public ActionResult ShowForumTableById(int forumId)
        {
            var forumTableViewModel = _dataLoadService.GetForumTableViewModelById(forumId);
            return PartialView("ViewForum/_ShowForumTableById", forumTableViewModel);
        }

        [HttpGet]
        public ActionResult ShowTopicTableByForumId(int forumId, int? page)
        {
            var onPage = ConfigHelper.GetTopicsOnPageCount();
            var forumInfoViewModel = _dataLoadService.GetTopicTableViewModelsByForumId(forumId, onPage, page);
            return PartialView("ViewForum/_ShowTopicTableByForumId", forumInfoViewModel);
        }

        #endregion

        #region ViewTopicPageZone

        [HttpGet]
        public ActionResult ViewTopic(int topicId, int? page, int? postId)
        {
            var topicInfoViewModel = _dataLoadService.GetTopicInfoViewModelById(topicId);
            if (page == null || page < 1)
                topicInfoViewModel.PageNumber = 1;
            else
                topicInfoViewModel.PageNumber = (int)page;
            return View("ViewTopic/ViewTopic", topicInfoViewModel);
        }

        [HttpGet]
        public ActionResult ShowPostTableByTopicId(int topicId, int? page)
        {
            var onPage = ConfigHelper.GetPostsOnPageCount();
            var postTableViewModels = _dataLoadService.GetPostTableViewModelsByTopicId(topicId, onPage, page);

            if (page == null || page < 1)
                page = 1;
            PostTableViewModelList postTableViewModelList = new PostTableViewModelList()
            {
                PageNumber = (int)page,
                PostTableViewModel = postTableViewModels
            };
            return PartialView("ViewTopic/_ShowPostTableByTopicId", postTableViewModelList);
        }

        [HttpGet]
        public ActionResult ShowPollTableByTopicId(int topicId)
        {
            var pollViewModels = _dataLoadService.GetPollViewModelWithOptionsByTopicId(topicId);
            return PartialView("ViewTopic/_ShowPollTableByTopicId", pollViewModels);
        }

        #endregion

        #region CreatePostZone

        [HttpGet]
        public ActionResult CreatePost(int topicId)
        {
            var userId = User.Identity.GetUserId<int>();
            if (userId == 0) return new JsonResult { Data = new { success = false, responseText = "You can't create post - You not authorized. Please, contact with administrator." } };
            
            var topicInfoViewModel = _dataLoadService.GetTopicInfoViewModelById(topicId);
            var permission = _permissionsService.UserHasPermissionByForumId(userId, topicInfoViewModel.ForumId, topicInfoViewModel.TopicClosed 
                ? new List<string>() { CommonConstants.PostMessageInClosedTopic } 
                : new List<string>() { CommonConstants.PostMessageInOpenTopic });

            if (!permission) return new JsonResult { Data = new { success = false, responseText = "You can't create post in this topic. Please, contact with administrator." } };
            return PartialView("ViewTopic/_CreatePost", new NewPostViewModel() { TopicId = topicId });
            
        }

        [HttpPost]
        public ActionResult CreatePost(NewPostViewModel newPostViewModel)
        {
            var userId = User.Identity.GetUserId<int>();
            if (userId == 0) return new JsonResult { Data = new { success = false, responseText = "You can't create post - You not authorized. Please, contact with administrator." } };

            var topicInfoViewModel = _dataLoadService.GetTopicInfoViewModelById(newPostViewModel.TopicId);
            var permission = _permissionsService.UserHasPermissionByForumId(userId, topicInfoViewModel.ForumId, topicInfoViewModel.TopicClosed
                ? new List<string>() { CommonConstants.PostMessageInClosedTopic }
                : new List<string>() { CommonConstants.PostMessageInOpenTopic });

            if (!permission) return new JsonResult { Data = new { success = false, responseText = "You can't create post in this topic. Please, contact with administrator." } };
            newPostViewModel.UserId = userId;
            newPostViewModel.PostTime = DateTime.Now;
            var newPostModel = Mapper.Map<NewPostViewModel, NewPostModel>(newPostViewModel);
            _dataWriteService.CreateNewPost(newPostModel);

            return new JsonResult { Data = new { success = true } };
        }

        #endregion

        #region CheckPermissionsZone

        [HttpPost]
        public ActionResult CheckPermissions (int topicId, List<string> permissionsName)
        {
            var userId = User.Identity.GetUserId<int>();
            if (userId == 0) return new JsonResult { Data = new { success = false, responseText = "You can't create post - You not authorized. Please, contact with administrator." } };

            var permission = _permissionsService.UserHasPermissionByTopicId(userId, topicId, permissionsName);

            return !permission ? new JsonResult { Data = new { success = false, responseText = "You can't create post in this topic. Please, contact with administrator." } } 
                               : new JsonResult { Data = new {success = true } };
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

        #endregion

        #region AdminActions


        [HttpPost]
        public ActionResult DeletePost(int postId)
        {
            if (_adminService.DeletePost(postId))
            {
                return new JsonResult { Data = new { success = true, responseText = "Post was deleted." } };
            }
            return new JsonResult { Data = new { success = false, responseText = "Post wasn't deleted. Please, contact with administrator." } };
        }

        [HttpPost]
        public ActionResult BanUser(int userId)
        {
            if (_adminService.BanUser(userId))
            {
                return new JsonResult { Data = new { success = true, responseText = "User wasn banned." } };
            }
            return new JsonResult { Data = new { success = false, responseText = "User wasn't banned. Please, contact with administrator." } };
        }

        [HttpPost]
        public ActionResult UnbanUser(int userId)
        {
            if (_adminService.UnbanUser(userId))
            {
                return new JsonResult { Data = new { success = true, responseText = "User wasn unbanned." } };
            }
            return new JsonResult { Data = new { success = false, responseText = "User wasn't unbanned. Please, contact with administrator." } };
        }

        #endregion

        #region RestartAppZone

        [HttpGet]
        public ActionResult RestartApp()//todo create autorize for this method. Should be deleted in future
        {
            HttpRuntime.UnloadAppDomain();
            return null;
        }

        #endregion

        #region Chat

        [HttpGet]
        public ActionResult Chat()//todo Should be deleted in future
        {
            return PartialView("Chat/Chat");
        }

        #endregion

    }
}