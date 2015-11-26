using System;
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
    public class GroupIdentityRepository : IGroupIdentityRepository
    {
        public void Delete(int roleId, IConnectionFactory connectionFactory)
        {
            throw new NotImplementedException();
        }

        public void Insert(GroupIdentityEntity role, IConnectionFactory connectionFactory)
        {
            throw new NotImplementedException();
        }

        public string GetRoleName(int roleId, IConnectionFactory connectionFactory)
        {
            throw new NotImplementedException();
        }

        public int GetRoleId(string roleName, IConnectionFactory connectionFactory)
        {
            throw new NotImplementedException();
        }

        public GroupIdentityEntity GetRoleById(int roleId, IConnectionFactory connectionFactory)
        {
            throw new NotImplementedException();
        }

        public GroupIdentityEntity GetRoleByName(string roleName, IConnectionFactory connectionFactory)
        {
            throw new NotImplementedException();
        }

        public void Update(GroupIdentityEntity role, IConnectionFactory connectionFactory)
        {
            throw new NotImplementedException();
        }
    }
}