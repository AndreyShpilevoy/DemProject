using System;
using System.Collections.Generic;
using AutoMapper;
using DEM_MVC_BL.Interfaces.IServices;
using DEM_MVC_BL.Models.ForumModels;
using DEM_MVC_BL.Models.IdentityModels;
using DEM_MVC_BL.Models.PermissionModels;
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

        public bool UserHasPermission(IdentityUser user, int forumId, string permissionName)
        {
            var permissoionModels = new Dictionary<PermissionModel, string>();
            try
            {
                var permissions = _permissionRepository.GetPermissionsByUserId(permissionName, 66, _connectionFactory);
                permissoionModels = Mapper.Map<Dictionary <IdentityPermissionEntity, string>, Dictionary <PermissionModel, string>>(permissions);
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, "DataLoadService. Error in function GetTopicShowViewModelById");
            }
            return false;
        }
    }
}