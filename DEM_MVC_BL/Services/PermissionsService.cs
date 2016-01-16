using System;
using System.Collections.Generic;
using AutoMapper;
using DEM_MVC_BL.Interfaces.IServices;
using DEM_MVC_BL.Models.PermissionModels;
using DEM_MVC_BL.Services.ModelsHelpers;
using DEM_MVC_DAL.Entities;
using DEM_MVC_DAL.Interfaces.IFactory;
using DEM_MVC_DAL.Interfaces.IRepositories;
using DEM_MVC_Infrastructure.Models;

namespace DEM_MVC_BL.Services
{
    public class PermissionsService : IPermissionsService
    {
        private readonly IConnectionFactory _connectionFactory;
        private readonly IPermissionRepository _permissionRepository;
        private readonly IForumRepository _forumRepository;

        public PermissionsService(IConnectionFactory connectionFactory, 
            IPermissionRepository permissionRepository, 
            IForumRepository forumRepository)
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
                result = PermissionHelper.CalulateUserPermissionsForForumId(forumId, permissoionModels);
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, $"{nameof(PermissionsService)}. Error in function {DemLogger.GetCallerInfo()}");
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
                result = PermissionHelper.CalulateUserPermissionsForForumId(forumId, permissoionModels);
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, $"{nameof(PermissionsService)}. Error in function {DemLogger.GetCallerInfo()}");
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
                result = PermissionHelper.CalulateUserPermissionsForForumId(forumId, permissoionModels);
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, $"{nameof(PermissionsService)}. Error in function {DemLogger.GetCallerInfo()}");
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
                result = PermissionHelper.CalulateUserPermissionsForForumId(forumId, permissoionModels);
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, $"{nameof(PermissionsService)}. Error in function {DemLogger.GetCallerInfo()}");
            }
            return result;
        }
    }
}