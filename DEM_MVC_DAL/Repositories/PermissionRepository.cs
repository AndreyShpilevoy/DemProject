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
        public List<IdentityPermissionEntity> GetPermissionByUserId(string permissionTitle, int userId, IConnectionFactory connectionFactory)
        {
            List<IdentityPermissionEntity> identityPermissionEntities = new List<IdentityPermissionEntity>();

            try
            {
                UserPermissionEntity userPermissionEntity;
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
                    userPermissionEntity.Type = IdentityPermissionType.UserPermission;
                    identityPermissionEntities.Add(userPermissionEntity);
                }
                foreach (var groupPermissionEntity in groupPermissionEntities)
                {
                    groupPermissionEntity.Type = IdentityPermissionType.GroupPermission;
                    identityPermissionEntities.Add(groupPermissionEntity);
                }
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, $"{nameof(PermissionRepository)}. Error in function {DemLogger.GetCallerInfo()}");
            }

            return identityPermissionEntities;
        }

        public List<IdentityPermissionEntity> GetSeveralPermissionsByUserId(List<string> permissionsTitleList, int userId, IConnectionFactory connectionFactory)
        {
            List<IdentityPermissionEntity> identityPermissionEntities = new List<IdentityPermissionEntity>();

            try
            {
                List < UserPermissionEntity> userPermissionEntities;
                List<GroupPermissionEntity> groupPermissionEntities;

                using (var connection = connectionFactory.Create())
                {
                    List<int> groupsId = connection.Query<int>(SqlCommandStorageService.GetUserGroupsId(), new { userId }).ToList();

                    userPermissionEntities =
                        connection.Query<UserPermissionEntity>(
                            SqlCommandStorageService.GetUserSeveralPermissionsByUserIdAndPermissionName(),
                            new { permissionsTitleList, userId }).ToList();


                    groupPermissionEntities =
                        connection.Query<GroupPermissionEntity>(
                            SqlCommandStorageService.GetGroupsSeveralPermissionsByGroupsIdAndPermissionName(),
                            new { permissionsTitleList, groupsId }).ToList();
                }

                foreach (var userPermissionEntity in userPermissionEntities)
                {
                    userPermissionEntity.Type = IdentityPermissionType.UserPermission;
                    identityPermissionEntities.Add(userPermissionEntity);
                }

                foreach (var groupPermissionEntity in groupPermissionEntities)
                {
                    groupPermissionEntity.Type = IdentityPermissionType.GroupPermission;
                    identityPermissionEntities.Add(groupPermissionEntity);
                }
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, $"{nameof(PermissionRepository)}. Error in function {DemLogger.GetCallerInfo()}");
            }

            return identityPermissionEntities;
        }
    }
}