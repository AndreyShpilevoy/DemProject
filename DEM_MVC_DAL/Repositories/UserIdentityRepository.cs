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
    public class UserIdentityRepository  : IUserIdentityRepository
    {
        public string GetUserName(int memberId, IConnectionFactory connectionFactory)
        {
            throw new NotImplementedException();
        }

        public int GetmemberId(string userName, IConnectionFactory connectionFactory)
        {
            throw new NotImplementedException();
        }

        public UserIdentityEntity GetUserById(int memberId, IConnectionFactory connectionFactory)
        {
            throw new NotImplementedException();
        }

        public List<UserIdentityEntity> GetUserByName(string userName, IConnectionFactory connectionFactory)
        {
            throw new NotImplementedException();
        }

        public UserIdentityEntity GetUserByEmail(string email, IConnectionFactory connectionFactory)
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

        public void Insert(UserIdentityEntity member, IConnectionFactory connectionFactory)
        {
            throw new NotImplementedException();
        }

        public void Delete(int memberId, IConnectionFactory connectionFactory)
        {
            throw new NotImplementedException();
        }

        public void Delete(UserIdentityEntity member, IConnectionFactory connectionFactory)
        {
            throw new NotImplementedException();
        }

        public void Update(UserIdentityEntity member, IConnectionFactory connectionFactory)
        {
            throw new NotImplementedException();
        }
    }
}