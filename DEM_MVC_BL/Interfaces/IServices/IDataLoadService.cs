using System.Collections.Generic;
using DEM_MVC_BL.Models.BbCodeModels;
using DEM_MVC_BL.Models.ConfigModels;
using DEM_MVC_BL.Models.ForumModels;
using DEM_MVC_BL.Models.PollModels;
using DEM_MVC_BL.Models.PostModels;
using DEM_MVC_BL.Models.TopicModels;

namespace DEM_MVC_BL.Interfaces.IServices
{
    public interface IDataLoadService
    {
        List<ForumTableViewModel> GetAllForumTableViewModels();
        ForumTableViewModel GetForumTableViewModelById(int forumId);
        List<TopicTableViewModel> GetTopicTableViewModelsByForumId(int forumId, int onPage, int? page);
        ForumInfoViewModel GetForumInfoViewModelById(int topicId);
        TopicInfoViewModel GetTopicInfoViewModelById(int topicId);
        List<PollViewModel> GetPollViewModelWithOptionsByTopicId(int topicId);
        List<PostTableViewModel> GetPostTableViewModelsByTopicId(int topicId, int onPage, int? page);
        List<BbCodeModel> GetAllBbCodeModels();
        List<ConfigModel> GetAllConfigModels();
    }
}
