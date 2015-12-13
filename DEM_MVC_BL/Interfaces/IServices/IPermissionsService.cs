using DEM_MVC_BL.Models.IdentityModels;

namespace DEM_MVC_BL.Interfaces.IServices
{
    public interface IPermissionsService
    {
        bool UserHasPermission(IdentityUser user, int forumId, string permissionName);
    }
}