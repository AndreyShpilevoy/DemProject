using System.Data;
using DEM_MVC_DAL.Entities;
using System.Collections.Generic;
using DEM_MVC_DAL.Interfaces.IFactory;

namespace DEM_MVC_DAL.Interfaces.IRepositories
{
    public interface IUserIdentityRepository//<TUser>
        //where TUser : UserIdentityEntity
    {
        string GetUserName(int memberId, IConnectionFactory connectionFactory);
        int GetmemberId(string userName, IConnectionFactory connectionFactory);
        UserIdentityEntity GetUserById(int memberId, IConnectionFactory connectionFactory);
        List<UserIdentityEntity> GetUserByName(string userName, IConnectionFactory connectionFactory);
        UserIdentityEntity GetUserByEmail(string email, IConnectionFactory connectionFactory);
        string GetPasswordHash(int memberId, IConnectionFactory connectionFactory);
        void SetPasswordHash(int memberId, string passwordHash, IConnectionFactory connectionFactory);
        string GetSecurityStamp(int memberId, IConnectionFactory connectionFactory);
        void Insert(UserIdentityEntity member, IConnectionFactory connectionFactory);
        void Delete(int memberId, IConnectionFactory connectionFactory);
        void Delete(UserIdentityEntity member, IConnectionFactory connectionFactory);
        void Update(UserIdentityEntity member, IConnectionFactory connectionFactory);
    }
}