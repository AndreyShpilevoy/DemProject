using System.Data;
using DEM_MVC_DAL.Entities;
using DEM_MVC_DAL.Interfaces.IFactory;

namespace DEM_MVC_DAL.Interfaces.IRepositories
{
    public interface IGroupIdentityRepository
    {
        void Delete(int roleId, IConnectionFactory connectionFactory);
        void Insert(GroupIdentityEntity role, IConnectionFactory connectionFactory);
        string GetRoleName(int roleId, IConnectionFactory connectionFactory);
        int GetRoleId(string roleName, IConnectionFactory connectionFactory);
        GroupIdentityEntity GetRoleById(int roleId, IConnectionFactory connectionFactory);
        GroupIdentityEntity GetRoleByName(string roleName, IConnectionFactory connectionFactory);
        void Update(GroupIdentityEntity role, IConnectionFactory connectionFactory);
    }
}