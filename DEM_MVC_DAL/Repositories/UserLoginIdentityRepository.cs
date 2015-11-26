using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using DEM_MVC_DAL.Entities;
using DEM_MVC_DAL.Interfaces.IFactory;
using DEM_MVC_DAL.Interfaces.IRepositories;
using DEM_MVC_Infrastructure.Models;
using Microsoft.AspNet.Identity;
using Microsoft.Practices.ServiceLocation;
using NLog;

namespace DEM_MVC_DAL.Repositories
{
    public class UserLoginIdentityRepository  : IUserLoginIdentityRepository {
        public void Delete(UserIdentityEntity member, UserLoginInfo login, IConnectionFactory connectionFactory)
        {
            throw new NotImplementedException();
        }

        public void Delete(int userId, IConnectionFactory connectionFactory)
        {
            throw new NotImplementedException();
        }

        public void Insert(UserIdentityEntity member, UserLoginInfo login, IConnectionFactory connectionFactory)
        {
            throw new NotImplementedException();
        }

        public int FindUserIdByLogin(UserLoginInfo memberLogin, IConnectionFactory connectionFactory)
        {
            throw new NotImplementedException();
        }

        public List<UserLoginInfo> FindByUserId(int memberId, IConnectionFactory connectionFactory)
        {
            throw new NotImplementedException();
        }
    }
}