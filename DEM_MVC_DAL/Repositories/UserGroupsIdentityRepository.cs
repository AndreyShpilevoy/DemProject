using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using Dapper;
using DEM_MVC_DAL.Entities;
using DEM_MVC_DAL.Interfaces.IFactory;
using DEM_MVC_DAL.Interfaces.IRepositories;
using DEM_MVC_DAL.Services;
using DEM_MVC_Infrastructure.Models;
using Microsoft.Practices.ServiceLocation;
using NLog;

namespace DEM_MVC_DAL.Repositories
{
    public class UserGroupsIdentityRepository  : IUserGroupsIdentityRepository {
        public List<string> FindByUserId(int userId, IConnectionFactory connectionFactory)
        {
            List<string> groupNames = new List<string>();
            try
            {
                using (var connection = connectionFactory.Create())
                {
                    groupNames = connection.Query<string>(SqlCommandStorageService.UserGroupsIdentityFindByUserId(), new { userId }).ToList();
                }
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, "UserGroupsIdentityRepository. Error in function FindByUserId");
            }
            return groupNames;
        }

        public void Delete(int userId, IConnectionFactory connectionFactory)
        {
            try
            {
                using (var connection = connectionFactory.Create())
                {
                    connection.Execute(SqlCommandStorageService.UserGroupsIdentityDelete(), new { userId });
                }
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, "UserGroupsIdentityRepository. Error in function Delete");
            }
        }

        public void Insert(UserIdentityEntity user, int groupId, IConnectionFactory connectionFactory)
        {
            try
            {
                using (var connection = connectionFactory.Create())
                {
                    connection.Execute(SqlCommandStorageService.UserGroupsIdentityInsert(), new { userId = user.Id, groupId });
                }
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, "UserGroupsIdentityRepository. Error in function Insert");
            }
        }
    }
}