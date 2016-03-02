using System.Collections.Generic;
using DEM_MVC_BL.Models.PostModels;

namespace DEM_MVC_BL.Interfaces.IServices.Conference
{
    public interface IPostReadService
    {
        List<PostTableViewModel> GetPostTableViewModelsByTopicId(int topicId, int onPage, int? page);
    }
}