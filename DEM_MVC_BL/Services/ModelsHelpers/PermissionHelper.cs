using System.Collections.Generic;
using System.Linq;
using DEM_MVC_BL.Models.PermissionModels;
using DEM_MVC_Infrastructure.Models;

namespace DEM_MVC_BL.Services.ModelsHelpers
{
    public static class PermissionHelper
    {
        public static bool CalulateUserPermissionsForForumId(int forumId, List<IdentityPermissionModel> permissoionModels)
        {
            var forumsId = new List<string>();
            foreach (var groupPermissoionModel in permissoionModels.Where(x=>x.Type == IdentityPermissionType.GroupPermission && x.SettingsState))
            {
                forumsId = groupPermissoionModel.ForumsId.Split(',').ToList();
            }
            forumsId = forumsId.Distinct().ToList();

            var userPermission = permissoionModels.SingleOrDefault(x => x.Type == IdentityPermissionType.UserPermission);

            if (userPermission == null) return forumsId.Contains(forumId.ToString());

            if (userPermission.SettingsState)
            {
                forumsId.AddRange(userPermission.ForumsId.Split(',').ToList());
            }
            else
            {
                foreach (var userForumId in userPermission.ForumsId.Split(',').ToList())
                {
                    forumsId.Remove(userForumId);
                }
            }
            return forumsId.Contains(forumId.ToString());
        }
    }
}