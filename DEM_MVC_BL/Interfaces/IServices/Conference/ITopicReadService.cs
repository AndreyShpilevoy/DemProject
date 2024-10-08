using System.Collections.Generic;
using DEM_MVC_BL.Models.ForumModels;
using DEM_MVC_BL.Models.TopicModels;

namespace DEM_MVC_BL.Interfaces.IServices.Conference
{
    public interface ITopicReadService
    {
        List<TopicTableViewModel> GetTopicTableViewModelsByForumId(int forumId, int onPage, int? page);
        TopicInfoViewModel GetTopicInfoViewModelById(int topicId);
        List<TopicTableViewModel> GetLatestTopicsToShow(Dictionary<int, bool> forumsVisibility, int numberOfTopics);
    }
}