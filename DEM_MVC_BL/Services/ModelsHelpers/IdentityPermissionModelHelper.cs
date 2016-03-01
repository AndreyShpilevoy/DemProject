﻿using System.Collections.Generic;
using System.Linq;
using DEM_MVC_BL.Interfaces.IServices.IModelsHelpers;
using DEM_MVC_BL.Models.IdentityPermissionModels;
using DEM_MVC_Infrastructure.Models;

namespace DEM_MVC_BL.Services.ModelsHelpers
{
    public class IdentityPermissionModelHelper : IIdentityPermissionModelHelper
    {
        public bool CalulateUserPermissionsForForumId(int forumId, List<IdentityPermissionModel> permissoionModels)
        {
            var forumsId = new List<string>();
            var forumsIdForDelete = new List<string>();
            foreach (var groupPermissoionModel in permissoionModels.Where(x=>x.Type == IdentityPermissionType.GroupPermission && x.SettingsState))
            {
                forumsId = groupPermissoionModel.ForumsId.Split(',').ToList();
            }
            forumsId = forumsId.Distinct().ToList();

            foreach (var groupPermissoionModel in permissoionModels.Where(x => x.Type == IdentityPermissionType.GroupPermission && !x.SettingsState))
            {
                forumsIdForDelete = groupPermissoionModel.ForumsId.Split(',').ToList();
            }

            foreach (var forumIdForDelete in forumsIdForDelete.Distinct().ToList())
            {
                forumsId.Remove(forumIdForDelete);
            }

            var userPermission = permissoionModels.SingleOrDefault(x => x.Type == IdentityPermissionType.UserPermission);

            if (userPermission == null)
                return forumsId.Contains(forumId.ToString());

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