using System;
using System.Collections.Generic;
using AutoMapper;
using DEM_MVC_BL.Interfaces.IServices.Common;
using DEM_MVC_BL.Interfaces.IServices.IModelsHelpers;
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
        private readonly IIdentityPermissionModelHelper _identityPermissionModelHelper;

        public PermissionsReadService(IConnectionFactory connectionFactory, 
            IIdentityPermissionRepository permissionRepository, 
            IForumsViewRepository forumRepository,
            IIdentityPermissionModelHelper identityPermissionModelHelper)
        {
            _connectionFactory = connectionFactory;
            _permissionRepository = permissionRepository;
            _forumRepository = forumRepository;
            _identityPermissionModelHelper = identityPermissionModelHelper;
        }

        public bool UserHasPermissionByForumId(int userId, int forumId, string permissionName)
        {
            bool result = false;
            try
            {
                var permissions = _permissionRepository.GetPermissionByUserId(permissionName, userId, _connectionFactory);
                var permissoionModels = Mapper.Map<List<IdentityPermissionEntity>, List<IdentityPermissionModel>>(permissions);
                result = _identityPermissionModelHelper.CalulateUserPermissionsForForumId(forumId, permissoionModels);
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
                result = _identityPermissionModelHelper.CalulateUserPermissionsForForumId(forumId, permissoionModels);
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
                result = _identityPermissionModelHelper.CalulateUserPermissionsForForumId(forumId, permissoionModels);
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
                result = _identityPermissionModelHelper.CalulateUserPermissionsForForumId(forumId, permissoionModels);
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, $"{nameof(PermissionsReadService)}. Error in function {DemLogger.GetCallerInfo()}");
            }
            return result;
        }
    }
}