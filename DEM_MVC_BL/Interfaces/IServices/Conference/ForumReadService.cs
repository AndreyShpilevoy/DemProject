using System.Collections.Generic;
using DEM_MVC_BL.Models.ForumModels;

namespace DEM_MVC_BL.Interfaces.IServices.Conference
{
    public interface IForumReadService
    {
        List<ForumTableViewModel> GetAllForumTableViewModels();
        ForumTableViewModel GetForumTableViewModelById(int forumId);
        ForumInfoViewModel GetForumInfoViewModelById(int topicId);
    }
}