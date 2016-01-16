using System.Collections.Generic;

namespace DEM_MVC_BL.Interfaces.IServices
{
    public interface IPermissionsService
    {
        bool UserHasPermissionByForumId(int userId, int forumId, string permissionName);

        bool UserHasPermissionByForumId(int userId, int forumId, List<string> permissionsNameList);

        bool UserHasPermissionByTopicId(int userId, int topicId, string permissionName);

        bool UserHasPermissionByTopicId(int userId, int topicId, List<string> permissionsNameList);
    }
}