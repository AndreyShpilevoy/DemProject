using System;
using System.Collections.Generic;
using AutoMapper;
using DEM_MVC_BL.Interfaces.IServices;
using DEM_MVC_BL.Models.ForumModels;
using DEM_MVC_BL.Models.IdentityModels;
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

        public PermissionsService(IConnectionFactory connectionFactory, IPermissionRepository permissionRepository)
        {
            _connectionFactory = connectionFactory;
            _permissionRepository = permissionRepository;
        }

        public bool UserHasPermission(int userId, int forumId, string permissionName)
        {
            bool result = false;
            try
            {
                var permissions = _permissionRepository.GetPermissionsByUserId(permissionName, userId, _connectionFactory);
                var permissoionModels = Mapper.Map<List<IdentityPermissionEntity>, List<IdentityPermissionModel>>(permissions);
                result = PermissionHelper.CalulateUserPermissionsForForumId(forumId, permissoionModels);
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, "PermissionsService. Error in function UserHasPermission");
            }
            return result;
        }
    }
}