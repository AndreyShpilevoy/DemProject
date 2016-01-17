using System.Collections.Generic;
using DEM_MVC_DAL.Entities.UserIdentityEntities;
using DEM_MVC_DAL.Entities.UserLoginInfoIdentityEntities;
using DEM_MVC_DAL.Interfaces.IFactory;
using Microsoft.AspNet.Identity;

namespace DEM_MVC_DAL.Interfaces.IRepositories
{
    public interface IUserExternalLoginsIdentityRepository
    {
        void Delete(UserIdentityEntity user, UserLoginInfo login, IConnectionFactory connectionFactory);
        void Delete(int userId, IConnectionFactory connectionFactory);
        void Insert(UserIdentityEntity user, UserLoginInfo login, IConnectionFactory connectionFactory);
        int FindUserIdByLogin(UserLoginInfo userLogin, IConnectionFactory connectionFactory);
        List<UserLoginInfoIdentityEntity> FindByUserId(int userId, IConnectionFactory connectionFactory);
    }
}