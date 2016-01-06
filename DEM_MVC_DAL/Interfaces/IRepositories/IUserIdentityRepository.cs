using System.Data;
using DEM_MVC_DAL.Entities;
using System.Collections.Generic;
using DEM_MVC_DAL.Interfaces.IFactory;

namespace DEM_MVC_DAL.Interfaces.IRepositories
{
    public interface IUserIdentityRepository//<TUser>
        //where TUser : UserIdentityEntity
    {
        string GetUserName(int userId, IConnectionFactory connectionFactory);
        int GetUserId(string userName, IConnectionFactory connectionFactory);
        UserIdentityEntity GetUserById(int userId, IConnectionFactory connectionFactory);
        List<UserIdentityEntity> GetUserByName(string userName, IConnectionFactory connectionFactory);
        UserIdentityEntity GetUserByEmail(string email, IConnectionFactory connectionFactory);
        string GetPasswordHash(int userId, IConnectionFactory connectionFactory);
        void SetPasswordHash(int userId, string passwordHash, IConnectionFactory connectionFactory);
        string GetSecurityStamp(int userId, IConnectionFactory connectionFactory);
        int Insert(UserIdentityEntity user, IConnectionFactory connectionFactory);
        void Delete(int userId, IConnectionFactory connectionFactory);
        void Delete(UserIdentityEntity user, IConnectionFactory connectionFactory);
        void Update(UserIdentityEntity user, IConnectionFactory connectionFactory);
    }
}