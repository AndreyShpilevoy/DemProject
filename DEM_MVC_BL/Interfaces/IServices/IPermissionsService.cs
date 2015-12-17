using DEM_MVC_BL.Models.IdentityModels;

namespace DEM_MVC_BL.Interfaces.IServices
{
    public interface IPermissionsService
    {
        bool UserHasPermissionByForumId(int userId, int forumId, string permissionName);

        bool UserHasPermissionByTopicId(int userId, int topicId, string permissionName);
    }
}