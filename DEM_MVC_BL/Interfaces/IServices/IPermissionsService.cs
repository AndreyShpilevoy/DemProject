using DEM_MVC_BL.Models.IdentityModels;

namespace DEM_MVC_BL.Interfaces.IServices
{
    public interface IPermissionsService
    {
        bool UserHasPermission(int userId, int forumId, string permissionName);
    }
}