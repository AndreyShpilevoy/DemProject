using System;
using System.Collections.Generic;
using System.Linq;
using DEM_MVC_BL.Interfaces.IServices.IModelsHelpers;
using DEM_MVC_BL.Models;
using DEM_MVC_Infrastructure.Models;
using Microsoft.Practices.ServiceLocation;
using NLog;

namespace DEM_MVC_BL.Services.ModelsHelpers
{
    public class ForumModelHelper : IForumModelHelper
    {

        public List<ForumTableViewModel> TransformToHierarchy(List<ForumTableViewModel> forumModels)
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
                DemLogger.Current.Error(exception, "ForumModelHelper. Error in function TransformToHierarchy");
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
                if (lastForum != null)
                {
                    root.LastTopicTitle = lastForum.LastTopicTitle;
                    root.LastPostTime = lastForum.LastPostTime;
                    root.Groupcolor = lastForum.Groupcolor;
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
                DemLogger.Current.Error(exception, "ForumModelHelper. Error in function FillSubForums");
            }
        }

        public ForumTableViewModel GetGorumTreeById(List<ForumTableViewModel> forumModels, int forumId)
        {
            try
            {
                foreach (var forum in forumModels)
                {
                    if (forum.ForumId == forumId)
                        return forum;
                    var forumResult = GetGorumTreeById(forum.SubForums, forumId);
                    if (forumResult != null) return forumResult;
                }
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, "ForumModelHelper. Error in function GetGorumTreeById");
            }
            return null;
        }
    }

    public class PollModelHelper : IPollModelHelper
    {
        public List<PollOptionViewModel> CalculatePollOptionTotalPercent(List<PollOptionViewModel> pollsOptionViewModels)
        {
            double totalVotes = pollsOptionViewModels.Sum(x => x.PollOptionTotal);
            foreach (var pollsOptionViewModel in pollsOptionViewModels)
            {
                pollsOptionViewModel.PollOptionTotalPercent = (100 * pollsOptionViewModel.PollOptionTotal) / totalVotes;
            }
            return pollsOptionViewModels;
        }
    }

    public class PostModelHelper : IPostModelHelper
    {
    }
}