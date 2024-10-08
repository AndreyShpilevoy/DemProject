using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using DEM_MVC_BL.Interfaces.IServices.Common;
using DEM_MVC_BL.Interfaces.IServices.Conference;
using DEM_MVC_BL.Models.ForumModels;
using DEM_MVC_DAL.Entities.ForumsViewEntities;
using DEM_MVC_DAL.Interfaces.IFactory;
using DEM_MVC_DAL.Interfaces.IRepositories;
using DEM_MVC_Infrastructure.Models;
using Microsoft.AspNet.Identity;
using System.Web;

namespace DEM_MVC_BL.Services.Conference
{
    public class ForumReadService : IForumReadService
    {
        private readonly IConnectionFactory _connectionFactory;
        private readonly IForumsViewRepository _forumRepository;

        public ForumReadService(IConnectionFactory connectionFactory,
            IForumsViewRepository forumRepository)
        {
            _connectionFactory = connectionFactory;
            _forumRepository = forumRepository;
        }

        public List<ForumTableViewModel> GetAllForumTableViewModels(IPermissionsReadService _permissionsService)
        {
            var forumTableViewModels = new List<ForumTableViewModel>();

            try
            {
                List<string> hiddenForumIds;
                if (HttpContext.Current.User.Identity.IsAuthenticated)
                {
                    int userId = Int32.Parse(HttpContext.Current.User.Identity.GetUserId());
                    hiddenForumIds = _permissionsService.GetUserHiddenForumIds(userId);
                }
                else
                {
                    hiddenForumIds = _permissionsService.GetUnauthorisedHiddenForumIds();
                }

                List<ForumsViewEntity> forumViewEntities = _forumRepository.GetAllForums(_connectionFactory);
                var tempForumModels = Mapper.Map<List<ForumsViewEntity>, List<ForumTableViewModel>>(forumViewEntities);

                forumTableViewModels = TransformToHierarchy(tempForumModels, hiddenForumIds);
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, $"{nameof(ForumReadService)}. Error in function {DemLogger.GetCallerInfo()}");
            }
            return forumTableViewModels.OrderBy(x => x.ForumOrder).ToList();
        }

        public ForumTableViewModel GetForumTableViewModelById(int forumId, IPermissionsReadService _permissionsService)
        {
            var forumTableViewModel = new ForumTableViewModel();

            try
            {
                // TODO: very, very janky way to handle hidden forums. Best to implement a more comprehensive 'view' permission.
                // We don't have anything secret present on the forum, so this is just purely visual solution,
                // it will not even hide these "hidden" topic from the latest topics list
                // (as the only hidden forum is read-only 'trashcan' forum).
                // If user knows the exact forum id and topic id,
                // they will probably still be able to access "hidden" content by entering them in the url
                List<string> hiddenForumIds;
                if (HttpContext.Current.User.Identity.IsAuthenticated)
                {
                    int userId = Int32.Parse(HttpContext.Current.User.Identity.GetUserId());
                    hiddenForumIds = _permissionsService.GetUserHiddenForumIds(userId);
                }
                else
                {
                    hiddenForumIds = _permissionsService.GetUnauthorisedHiddenForumIds();
                }

                List<ForumsViewEntity> forumViewEntities = _forumRepository.GetAllForums(_connectionFactory);
                var tempForumModels = Mapper.Map<List<ForumsViewEntity>, List<ForumTableViewModel>>(forumViewEntities);
                var forumTableViewModelList = TransformToHierarchy(tempForumModels, hiddenForumIds);

                forumTableViewModel = GetFromHierarchyById(forumTableViewModelList, forumId);
                forumTableViewModel.SubForums = forumTableViewModel.SubForums.OrderBy(x => x.ForumOrder).ToList();
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, $"{nameof(ForumReadService)}. Error in function {DemLogger.GetCallerInfo()}");
            }
            return forumTableViewModel;
        }

        public Dictionary<int, bool> GetForumsVisibility(IPermissionsReadService _permissionsService)
        {
            List<string> hiddenForumIds;
            if (HttpContext.Current.User.Identity.IsAuthenticated)
            {
                int userId = Int32.Parse(HttpContext.Current.User.Identity.GetUserId());
                hiddenForumIds = _permissionsService.GetUserHiddenForumIds(userId);
            }
            else
            {
                hiddenForumIds = _permissionsService.GetUnauthorisedHiddenForumIds();
            }

            List<ForumsViewEntity> forumViewEntities = _forumRepository.GetAllForums(_connectionFactory);
            var tempForumModels = Mapper.Map<List<ForumsViewEntity>, List<ForumTableViewModel>>(forumViewEntities);
            var forumVisibility = DetermineVisibilityOfForums(tempForumModels, hiddenForumIds);
            return forumVisibility;
        }

        public ForumInfoViewModel GetForumInfoViewModelById(int forumId, IPermissionsReadService _permissionsService)
        {
            var forumInfoViewModel = new ForumInfoViewModel();
            try
            {
                ForumsViewEntity forumViewEntity = _forumRepository.GetForumInfoById(forumId, _connectionFactory);
                forumInfoViewModel = Mapper.Map<ForumsViewEntity, ForumInfoViewModel>(forumViewEntity);
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, $"{nameof(ForumReadService)}. Error in function {DemLogger.GetCallerInfo()}");
            }
            return forumInfoViewModel;
        }


        private List<ForumTableViewModel> TransformToHierarchy(List<ForumTableViewModel> forumModels, List<string> hiddenForumIds)
        {
            try
            {
                var result = (from forum in forumModels
                              let subForums = forumModels.Where(x => x.ParentId == forum.ForumId).ToList()
                              where subForums.Count != 0
                              let parentForum = forumModels.FirstOrDefault(x => x.ForumId == forum.ParentId)
                              where parentForum == null
                              select forum).ToList();

                foreach (var forum in result)
                {
                    forum.SubForums = forumModels.Where(x => x.ParentId == forum.ForumId).ToList();
                    forum.Invisible = hiddenForumIds.Contains(forum.ForumId.ToString());
                    FillSubForums(forum, forumModels, hiddenForumIds);
                }
                return result;
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, $"{nameof(ForumReadService)}. Error in function {DemLogger.GetCallerInfo()}");
                return null;
            }
        }

        private Dictionary<int, bool> DetermineVisibilityOfForums(List<ForumTableViewModel> forumModels, List<string> hiddenForumIds)
        {
            try
            {
                Dictionary<int, bool> visibility = new Dictionary<int, bool>();
                var result = (from forum in forumModels
                              let subForums = forumModels.Where(x => x.ParentId == forum.ForumId).ToList()
                              where subForums.Count != 0
                              let parentForum = forumModels.FirstOrDefault(x => x.ForumId == forum.ParentId)
                              where parentForum == null
                              select forum).ToList();

                foreach (var forum in result)
                {
                    forum.SubForums = forumModels.Where(x => x.ParentId == forum.ForumId).ToList();
                    forum.Invisible = hiddenForumIds.Contains(forum.ForumId.ToString());
                    visibility.Add(forum.ForumId, forum.Invisible);
                    visibility = DetermineVisibilityOfSubForums(forum, forumModels, hiddenForumIds, visibility);
                }
                return visibility;
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, $"{nameof(ForumReadService)}. Error in function {DemLogger.GetCallerInfo()}");
                return null;
            }
        }

        private Dictionary<int, bool> DetermineVisibilityOfSubForums(ForumTableViewModel root, List<ForumTableViewModel> forumModels, List<string> hiddenForumIds, Dictionary<int, bool> visibility)
        {
            try
            {
                foreach (ForumTableViewModel childNode in root.SubForums)
                {
                    if (root.Invisible)
                    {
                        childNode.Invisible = true;
                    }
                    else
                    {
                        childNode.Invisible = hiddenForumIds.Contains(childNode.ForumId.ToString());
                    }
                    visibility.Add(childNode.ForumId, childNode.Invisible);
                    childNode.SubForums = forumModels.Where(x => x.ParentId == childNode.ForumId).ToList();
                    if (childNode.SubForums.Count > 0)
                    {
                        visibility = DetermineVisibilityOfSubForums(childNode, forumModels, hiddenForumIds, visibility);
                    }
                }
                return visibility;
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, $"{nameof(ForumReadService)}. Error in function {DemLogger.GetCallerInfo()}");
                return null;
            }
        }

        private void FillSubForums(ForumTableViewModel root, List<ForumTableViewModel> forumModels, List<string> hiddenForumIds)
        {
            try
            {
                foreach (ForumTableViewModel childNode in root.SubForums)
                {
                    if (root.Invisible)
                    {
                        childNode.Invisible = true;
                    }
                    else
                    {
                        childNode.Invisible = hiddenForumIds.Contains(childNode.ForumId.ToString());
                    }
                    childNode.SubForums = forumModels.Where(x => x.ParentId == childNode.ForumId).ToList();
                    if (childNode.SubForums.Count > 0)
                    {
                        FillSubForums(childNode, forumModels, hiddenForumIds);
                    }
                }

                #region RefillLastPostData

                var latestDateTime = root.SubForums.Select(x => x.LastPostTime).Max();
                var lastForum = root.SubForums.FirstOrDefault(x => x.LastPostTime == latestDateTime);
                if (lastForum != null && latestDateTime > root.LastPostTime)
                {
                    root.LastTopicTitle = lastForum.LastTopicTitle;
                    root.LastTopicId = lastForum.LastTopicId;
                    root.LastPostTime = lastForum.LastPostTime;
                    root.LastPostId = lastForum.LastPostId;
                    root.LastTopicPostCount = lastForum.LastTopicPostCount;
                    root.GroupColor = lastForum.GroupColor;
                    root.Username = lastForum.Username;
                }

                #endregion

                #region RecountTopicsAndPosts

                root.TopicsCount += root.SubForums.Select(x => x.TopicsCount).Sum();
                root.PostsCount += root.SubForums.Select(x => x.PostsCount).Sum();

                #endregion
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, $"{nameof(ForumReadService)}. Error in function {DemLogger.GetCallerInfo()}");
            }
        }

        private ForumTableViewModel GetFromHierarchyById(List<ForumTableViewModel> forumModels, int forumId)
        {
            try
            {
                foreach (var forum in forumModels)
                {
                    if (forum.ForumId == forumId)
                        return forum;
                    var forumResult = GetFromHierarchyById(forum.SubForums, forumId);

                    if (forumResult != null)
                        return forumResult;
                }
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, $"{nameof(ForumReadService)}. Error in function {DemLogger.GetCallerInfo()}");
            }
            return null;
        }
    }
}