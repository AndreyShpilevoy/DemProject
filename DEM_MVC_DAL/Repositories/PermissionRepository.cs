using System;
using System.Collections.Generic;
using System.Linq;
using Dapper;
using DEM_MVC_DAL.Entities;
using DEM_MVC_DAL.Interfaces.IFactory;
using DEM_MVC_DAL.Interfaces.IRepositories;
using DEM_MVC_DAL.Services;
using DEM_MVC_Infrastructure.Models;

namespace DEM_MVC_DAL.Repositories
{
    public class PermissionRepository : IPermissionRepository
    {
        public List<IdentityPermissionEntity> GetPermissionsByUserId(string permissionTitle, int userId, IConnectionFactory connectionFactory)
        {
            List<IdentityPermissionEntity> identityPermissionEntities = new List<IdentityPermissionEntity>();

            try
            {
                UserPermissionEntity userPermissionEntity = new UserPermissionEntity();
                List<GroupPermissionEntity> groupPermissionEntities;

                using (var connection = connectionFactory.Create())
                {
                    List<int> groupsId = connection.Query<int>(SqlCommandStorageService.GetUserGroupsId(), new { userId }).ToList();

                    userPermissionEntity =
                        connection.Query<UserPermissionEntity>(
                            SqlCommandStorageService.GetUserPermissionByUserIdAndPermissionName(),
                            new { permissionTitle, userId}).SingleOrDefault();


                    groupPermissionEntities =
                        connection.Query<GroupPermissionEntity>(
                            SqlCommandStorageService.GetGroupsPermissionByGroupsIdAndPermissionName(),
                            new { permissionTitle, groupsId }).ToList();
                }

                if (userPermissionEntity != null)
                {
                    userPermissionEntity.Type = "UserPermission";
                    identityPermissionEntities.Add(userPermissionEntity);
                }
                foreach (var groupPermissionEntity in groupPermissionEntities)
                {
                    groupPermissionEntity.Type = "GroupPermission";
                    identityPermissionEntities.Add(groupPermissionEntity);
                }
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, "PermissionRepository. Error in function GetUserPermission");
            }

            return identityPermissionEntities;
        }
    }
}