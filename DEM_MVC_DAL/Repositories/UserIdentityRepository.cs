using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using DEM_MVC_DAL.Entities;
using DEM_MVC_DAL.Interfaces.IFactory;
using DEM_MVC_DAL.Interfaces.IRepositories;
using DEM_MVC_Infrastructure.Models;
using Microsoft.Practices.ServiceLocation;
using NLog;

namespace DEM_MVC_DAL.Repositories
{
    public class UserIdentityRepository<TUser>  : IUserIdentityRepository<TUser>
        where TUser : UserIdentityEntity
    {
        public string GetUserName(int memberId, IConnectionFactory connectionFactory)
        {
            throw new NotImplementedException();
        }

        public int GetmemberId(string userName, IConnectionFactory connectionFactory)
        {
            throw new NotImplementedException();
        }

        public TUser GetUserById(int memberId, IConnectionFactory connectionFactory)
        {
            throw new NotImplementedException();
        }

        public List<TUser> GetUserByName(string userName, IConnectionFactory connectionFactory)
        {
            throw new NotImplementedException();
        }

        public List<TUser> GetUserByEmail(string email, IConnectionFactory connectionFactory)
        {
            throw new NotImplementedException();
        }

        public string GetPasswordHash(int memberId, IConnectionFactory connectionFactory)
        {
            throw new NotImplementedException();
        }

        public void SetPasswordHash(int memberId, string passwordHash, IConnectionFactory connectionFactory)
        {
            throw new NotImplementedException();
        }

        public string GetSecurityStamp(int memberId, IConnectionFactory connectionFactory)
        {
            throw new NotImplementedException();
        }

        public void Insert(TUser member, IConnectionFactory connectionFactory)
        {
            throw new NotImplementedException();
        }

        public void Delete(int memberId, IConnectionFactory connectionFactory)
        {
            throw new NotImplementedException();
        }

        public void Delete(TUser member, IConnectionFactory connectionFactory)
        {
            throw new NotImplementedException();
        }

        public void Update(TUser member, IConnectionFactory connectionFactory)
        {
            throw new NotImplementedException();
        }
    }
}