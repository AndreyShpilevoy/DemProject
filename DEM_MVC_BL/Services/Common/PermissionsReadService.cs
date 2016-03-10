using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using DEM_MVC_BL.Interfaces.IServices.Common;
using DEM_MVC_BL.Models.IdentityPermissionModels;
using DEM_MVC_DAL.Entities.IdentityPermissionEntities;
using DEM_MVC_DAL.Interfaces.IFactory;
using DEM_MVC_DAL.Interfaces.IRepositories;
using DEM_MVC_Infrastructure.Models;

namespace DEM_MVC_BL.Services.Common
{
    public class PermissionsReadService : IPermissionsReadService
    {
        private readonly IConnectionFactory _connectionFactory;
        private readonly IIdentityPermissionRepository _permissionRepository;
        private readonly IForumsViewRepository _forumRepository;

        public PermissionsReadService(IConnectionFactory connectionFactory, 
            IIdentityPermissionRepository permissionRepository, 
            IForumsViewRepository forumRepository)
        {
            _connectionFactory = connectionFactory;
            _permissionRepository = permissionRepository;
            _forumRepository = forumRepository;
        }

        public bool UserHasPermissionByForumId(int userId, int forumId, string permissionName)
        {
            bool result = false;
            try
            {
                var permissions = _permissionRepository.GetPermissionByUserId(permissionName, userId, _connectionFactory);
                var permissoionModels = Mapper.Map<List<IdentityPermissionEntity>, List<IdentityPermissionModel>>(permissions);
                result = CalulateUserPermissionsForForumId(forumId, permissoionModels);
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, $"{nameof(PermissionsReadService)}. Error in function {DemLogger.GetCallerInfo()}");
            }
            return result;
        }

        public bool UserHasPermissionByForumId(int userId, int forumId, List<string> permissionsNameList)
        {
            bool result = false;
            try
            {
                var permissions = _permissionRepository.GetSeveralPermissionsByUserId(permissionsNameList, userId, _connectionFactory);
                var permissoionModels = Mapper.Map<List<IdentityPermissionEntity>, List<IdentityPermissionModel>>(permissions);
                result = CalulateUserPermissionsForForumId(forumId, permissoionModels);
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, $"{nameof(PermissionsReadService)}. Error in function {DemLogger.GetCallerInfo()}");
            }
            return result;
        }

        public bool UserHasPermissionByTopicId(int userId, int topicId, string permissionName)
        {
            bool result = false;
            try
            {
                var forumId = _forumRepository.GetForumIdByTopicId(topicId, _connectionFactory);

                var permissions = _permissionRepository.GetPermissionByUserId(permissionName, userId, _connectionFactory);
                var permissoionModels = Mapper.Map<List<IdentityPermissionEntity>, List<IdentityPermissionModel>>(permissions);
                result = CalulateUserPermissionsForForumId(forumId, permissoionModels);
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, $"{nameof(PermissionsReadService)}. Error in function {DemLogger.GetCallerInfo()}");
            }
            return result;
        }

        public bool UserHasPermissionByTopicId(int userId, int topicId, List<string> permissionsNameList)
        {
            bool result = false;
            try
            {
                var forumId = _forumRepository.GetForumIdByTopicId(topicId, _connectionFactory);

                var permissions = _permissionRepository.GetSeveralPermissionsByUserId(permissionsNameList, userId, _connectionFactory);
                var permissoionModels = Mapper.Map<List<IdentityPermissionEntity>, List<IdentityPermissionModel>>(permissions);
                result = CalulateUserPermissionsForForumId(forumId, permissoionModels);
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, $"{nameof(PermissionsReadService)}. Error in function {DemLogger.GetCallerInfo()}");
            }
            return result;
        }

        private bool CalulateUserPermissionsForForumId(int forumId, List<IdentityPermissionModel> permissoionModels)
        {
            var forumsId = new List<string>();
            var forumsIdForDelete = new List<string>();
            foreach (var groupPermissoionModel in permissoionModels.Where(x => x.Type == IdentityPermissionType.GroupPermission && x.SettingsState))
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
                List<string> list = userPermission.ForumsId.Split(',').ToList();
                forumsId.AddRange(list);
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