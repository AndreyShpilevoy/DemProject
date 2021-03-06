﻿using System;
using System.Collections.Generic;
using System.Linq;
using Dapper;
using DEM_MVC_DAL.Entities.UserIdentityEntities;
using DEM_MVC_DAL.Interfaces.IFactory;
using DEM_MVC_DAL.Interfaces.IRepositories;
using DEM_MVC_DAL.Services;
using DEM_MVC_Infrastructure.Models;

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
                DemLogger.Current.Error(exception, $"{nameof(UserGroupsIdentityRepository)}. Error in function {DemLogger.GetCallerInfo()}");
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
                DemLogger.Current.Error(exception, $"{nameof(UserGroupsIdentityRepository)}. Error in function {DemLogger.GetCallerInfo()}");
            }
        }

        public void Insert(UserIdentityEntity user, int groupId, IConnectionFactory connectionFactory)
        {
            try
            {
                using (var connection = connectionFactory.Create())
                {
                    connection.Execute(SqlCommandStorageService.UserGroupsIdentityInsert(), new { userId = user.Id, groupId, primaryGroup = true });
                }
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, $"{nameof(UserGroupsIdentityRepository)}. Error in function {DemLogger.GetCallerInfo()}");
            }
        }
    }
}