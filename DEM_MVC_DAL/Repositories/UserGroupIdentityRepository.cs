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
    public class UserGroupIdentityRepository  : IUserGroupIdentityRepository {
        public List<string> FindByUserId(int memberId, IConnectionFactory connectionFactory)
        {
            throw new NotImplementedException();
        }

        public void Delete(int memberId, IConnectionFactory connectionFactory)
        {
            throw new NotImplementedException();
        }

        public void Insert(UserIdentityEntity member, int roleId, IConnectionFactory connectionFactory)
        {
            throw new NotImplementedException();
        }
    }
}