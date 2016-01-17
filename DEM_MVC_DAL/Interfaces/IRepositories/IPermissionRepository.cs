using System.Collections.Generic;
using DEM_MVC_DAL.Entities.IdentityPermissionEntities;
using DEM_MVC_DAL.Interfaces.IFactory;

namespace DEM_MVC_DAL.Interfaces.IRepositories
{
    public interface IPermissionRepository
    {
        List<IdentityPermissionEntity> GetPermissionByUserId(string permissionTitle, int userId, IConnectionFactory connectionFactory);
        List<IdentityPermissionEntity> GetSeveralPermissionsByUserId(List<string> permissionsTitleList, int userId, IConnectionFactory connectionFactory);
    }
}