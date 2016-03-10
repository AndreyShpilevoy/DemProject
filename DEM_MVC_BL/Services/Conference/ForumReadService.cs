using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using DEM_MVC_BL.Interfaces.IServices.Conference;
using DEM_MVC_BL.Models.ForumModels;
using DEM_MVC_DAL.Entities.ForumsViewEntities;
using DEM_MVC_DAL.Interfaces.IFactory;
using DEM_MVC_DAL.Interfaces.IRepositories;
using DEM_MVC_Infrastructure.Models;

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

        public List<ForumTableViewModel> GetAllForumTableViewModels()
        {
            var forumTableViewModels = new List<ForumTableViewModel>();

            try
            {
                List<ForumsViewEntity> forumViewEntities = _forumRepository.GetAllForums(_connectionFactory);
                var tempForumModels = Mapper.Map<List<ForumsViewEntity>, List<ForumTableViewModel>>(forumViewEntities);

                forumTableViewModels = TransformToHierarchy(tempForumModels);
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, $"{nameof(ForumReadService)}. Error in function {DemLogger.GetCallerInfo()}");
            }
            return forumTableViewModels.OrderBy(x => x.ForumOrder).ToList();
        }

        public ForumTableViewModel GetForumTableViewModelById(int forumId)
        {
            var forumTableViewModel = new ForumTableViewModel();

            try
            {
                List<ForumsViewEntity> forumViewEntities = _forumRepository.GetAllForums(_connectionFactory);
                var tempForumModels = Mapper.Map<List<ForumsViewEntity>, List<ForumTableViewModel>>(forumViewEntities);
                var forumTableViewModelList = TransformToHierarchy(tempForumModels);

                forumTableViewModel = GetFromHierarchyById(forumTableViewModelList, forumId);
                forumTableViewModel.SubForums = forumTableViewModel.SubForums.OrderBy(x => x.ForumOrder).ToList();
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, $"{nameof(ForumReadService)}. Error in function {DemLogger.GetCallerInfo()}");
            }
            return forumTableViewModel;
        }

        public ForumInfoViewModel GetForumInfoViewModelById(int forumId)
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


        private List<ForumTableViewModel> TransformToHierarchy(List<ForumTableViewModel> forumModels)
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
                    FillSubForums(forum, forumModels);
                }
                return result;
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, $"{nameof(ForumReadService)}. Error in function {DemLogger.GetCallerInfo()}");
                return null;
            }
        }

        private void FillSubForums(ForumTableViewModel root, List<ForumTableViewModel> forumModels)
        {
            try
            {
                foreach (ForumTableViewModel childNode in root.SubForums)
                {
                    childNode.SubForums = forumModels.Where(x => x.ParentId == childNode.ForumId).ToList();
                    if (childNode.SubForums.Count > 0)
                    {
                        FillSubForums(childNode, forumModels);
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