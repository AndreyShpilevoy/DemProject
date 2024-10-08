using System.Collections.Generic;
using DEM_MVC_BL.Models.ForumModels;
using DEM_MVC_BL.Interfaces.IServices.Common;

namespace DEM_MVC_BL.Interfaces.IServices.Conference
{
    public interface IForumReadService
    {
        List<ForumTableViewModel> GetAllForumTableViewModels(IPermissionsReadService _permissionsService);
        ForumTableViewModel GetForumTableViewModelById(int forumId, IPermissionsReadService _permissionsService);
        ForumInfoViewModel GetForumInfoViewModelById(int topicId, IPermissionsReadService _permissionsService);
        Dictionary<int, bool> GetForumsVisibility(IPermissionsReadService _permissionsService);
    }
}