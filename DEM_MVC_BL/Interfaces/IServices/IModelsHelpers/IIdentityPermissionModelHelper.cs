using System.Collections.Generic;
using DEM_MVC_BL.Models.IdentityPermissionModels;

namespace DEM_MVC_BL.Interfaces.IServices.IModelsHelpers
{
    public interface IIdentityPermissionModelHelper
    {
        bool CalulateUserPermissionsForForumId(int forumId, List<IdentityPermissionModel> permissoionModels);
    }
}