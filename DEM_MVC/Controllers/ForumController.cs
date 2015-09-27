﻿using System;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using DEM_MVC_BL.Interfaces.IServices;
using DEM_MVC_BL.Models;
using DEM_MVC_BL.Services.ModelsHelpers;

namespace DEM_MVC.Controllers
{
    public class ForumController : Controller
    {

        private readonly IDataLoadService _dataLoadService;

        public ForumController(IDataLoadService dataLoadService)
        {
            _dataLoadService = dataLoadService;
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
            var forumShowViewModel = _dataLoadService.GetForumShowViewModelById(forumId);
            if (page == null || page < 1) forumShowViewModel.PageNumber = 1;
            else forumShowViewModel.PageNumber = (int)page;
            return View("ViewForum/ViewForum", forumShowViewModel);
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
            var forumShowViewModel = _dataLoadService.GetTopicTableViewModelsByForumId(forumId, onPage, page);
            return PartialView("ViewForum/_ShowTopicTableByForumId", forumShowViewModel);
        }

        #endregion

        #region ViewTopicPageZone

        [HttpGet]
        public ActionResult ViewTopic(int topicId, int? page, int? postId)
        {
            var topicShowViewModel = _dataLoadService.GetTopicShowViewModelById(topicId);
            if (page == null || page < 1) 
                topicShowViewModel.PageNumber = 1;
            else 
                topicShowViewModel.PageNumber = (int)page;
            return View("ViewTopic/ViewTopic", topicShowViewModel);
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