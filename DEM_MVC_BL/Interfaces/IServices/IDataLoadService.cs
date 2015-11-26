using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DEM_MVC_BL.Models;
using DEM_MVC_BL.Models.ForumModels;

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
