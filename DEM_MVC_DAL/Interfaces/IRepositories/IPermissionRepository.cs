using System.Collections.Generic;
using DEM_MVC_DAL.Entities;
using DEM_MVC_DAL.Interfaces.IFactory;

namespace DEM_MVC_DAL.Interfaces.IRepositories
{
    public interface IPermissionRepository
    {
        Dictionary<IdentityPermissionEntity, string> GetPermissionsByUserId(string permissionTitle, int userId, IConnectionFactory connectionFactory);
    }
}