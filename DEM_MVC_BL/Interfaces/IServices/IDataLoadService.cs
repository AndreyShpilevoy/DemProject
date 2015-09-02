using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DEM_MVC_BL.Models;

namespace DEM_MVC_BL.Interfaces.IServices
{
    public interface IDataLoadService
    {
        List<ForumTableViewModel> GetAllForumTableViewModels();
        ForumTableViewModel GetForumTableViewModelById(int forumId);
        List<TopicTableViewModel> GetTopicTableViewModelsByForumId(int forumId, int onPage, int? page);
        ForumShowViewModel GetForumShowViewModelById(int topicId);
        TopicShowViewModel GetTopicShowViewModelById(int topicId);
        List<PollViewModel> GetPollViewModelWithOptionsByTopicId(int topicId);
        List<PostTableViewModel> GetPostTableViewModelsByTopicId(int topicId, int onPage, int? page);
        List<BbCodeModel> GetAllBbCodeModels();
        List<ConfigModel> GetAllConfigModels();
    }
}
