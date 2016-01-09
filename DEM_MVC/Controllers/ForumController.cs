using System;
using System.Collections.Generic;
using System.Web.Mvc;
using AutoMapper;
using DEM_MVC.Models;
using DEM_MVC_BL.Interfaces.IServices;
using DEM_MVC_BL.Interfaces.IServices.IModelsHelpers;
using DEM_MVC_BL.Models.ForumModels;
using DEM_MVC_Infrastructure.Models;
using Microsoft.AspNet.Identity;

namespace DEM_MVC.Controllers
{
    public class ForumController : Controller
    {
        private readonly IDataLoadService _dataLoadService;
        private readonly IDataWriteService _dataWriteService;
        private readonly IPermissionsService _permissionsService;
        private IConfigHelper _configHelper;

        public ForumController(IDataLoadService dataLoadService,
            IPermissionsService permissionsService,
            IDataWriteService dataWriteService,
            IConfigHelper configHelper)
        {
            _dataLoadService = dataLoadService;
            _permissionsService = permissionsService;
            _dataWriteService = dataWriteService;
            _configHelper = configHelper;
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
            var onPage = _configHelper.GetTopicsOnPageCount();
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
            var onPage = _configHelper.GetPostsOnPageCount();
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
        public JsonResult CreatePost(NewPostViewModel newPostViewModel)
        {
            var userId = User.Identity.GetUserId<int>();
            if (userId == 0) return new JsonResult { Data = new { success = false, responseText = "You can't create post - You not authorized. Please, contact with administrator." } };

            var topicInfoViewModel = _dataLoadService.GetTopicInfoViewModelById(newPostViewModel.TopicId);
            var permission = _permissionsService.UserHasPermissionByForumId(userId, topicInfoViewModel.ForumId, topicInfoViewModel.TopicClosed
                ? new List<string>() { CommonConstants.PostMessageInClosedTopic }
                : new List<string>() { CommonConstants.PostMessageInOpenTopic });

            if (!permission) return new JsonResult { Data = new { success = false, responseText = "You can't create post in this topic. Please, contact with administrator." } };

            if (String.IsNullOrWhiteSpace(newPostViewModel.PostText)) return new JsonResult { Data = new { success = false, responseText = "You can't create post with empty \"PostText\" field." } };
            newPostViewModel.UserId = userId;
            newPostViewModel.PostTime = DateTime.Now;
            var newPostModel = Mapper.Map<NewPostViewModel, NewPostModel>(newPostViewModel);
            _dataWriteService.CreateNewPost(newPostModel);

            return new JsonResult { Data = new { success = true } };
        }

        #endregion
        
        [HttpGet]
        public ActionResult Chat()//todo Should be deleted in future
        {
            return PartialView("Chat/Chat");
        }

        protected override void OnException(ExceptionContext filterContext)
        {
            Exception e = filterContext.Exception;
            DemLogger.Current.Error(e, "ForumController. OnException");
        }
    }
}