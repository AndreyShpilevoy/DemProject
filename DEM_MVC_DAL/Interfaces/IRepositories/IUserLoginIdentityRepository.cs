using System.Collections.Generic;
using System.Data;
using DEM_MVC_DAL.Entities;
using DEM_MVC_DAL.Interfaces.IFactory;
using Microsoft.AspNet.Identity;

namespace DEM_MVC_DAL.Interfaces.IRepositories
{
    public interface IUserLoginIdentityRepository
    {
        void Delete(UserIdentityEntity member, UserLoginInfo login, IConnectionFactory connectionFactory);
        void Delete(int userId, IConnectionFactory connectionFactory);
        void Insert(UserIdentityEntity member, UserLoginInfo login, IConnectionFactory connectionFactory);
        int FindUserIdByLogin(UserLoginInfo memberLogin, IConnectionFactory connectionFactory);
        List<UserLoginInfo> FindByUserId(int memberId, IConnectionFactory connectionFactory);
    }
}