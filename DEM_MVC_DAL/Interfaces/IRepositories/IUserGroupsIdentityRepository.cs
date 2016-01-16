using System.Collections.Generic;
using DEM_MVC_DAL.Entities;
using DEM_MVC_DAL.Interfaces.IFactory;

namespace DEM_MVC_DAL.Interfaces.IRepositories
{
    public interface IUserGroupsIdentityRepository
    {
        List<string> FindByUserId(int memberId, IConnectionFactory connectionFactory);
        void Delete(int memberId, IConnectionFactory connectionFactory);
        void Insert(UserIdentityEntity member, int groupId, IConnectionFactory connectionFactory);
    }
}