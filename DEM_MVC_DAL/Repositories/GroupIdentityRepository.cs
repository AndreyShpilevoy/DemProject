using System;
using System.Linq;
using Dapper;
using DEM_MVC_DAL.Entities;
using DEM_MVC_DAL.Interfaces.IFactory;
using DEM_MVC_DAL.Interfaces.IRepositories;
using DEM_MVC_DAL.Services;
using DEM_MVC_Infrastructure.Models;

namespace DEM_MVC_DAL.Repositories
{
    public class GroupIdentityRepository : IGroupIdentityRepository
    {
        public void Delete(int groupId, IConnectionFactory connectionFactory)
        {
            try
            {
                using (var connection = connectionFactory.Create())
                {
                    connection.Execute(SqlCommandStorageService.GroupIdentityDelete(), new { id = groupId });
                }
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, "GroupIdentityRepository. Error in function Delete");
            }
        }

        public void Insert(GroupIdentityEntity group, IConnectionFactory connectionFactory)
        {
            try
            {
                using (var connection = connectionFactory.Create())
                {
                    connection.Execute(SqlCommandStorageService.GroupIdentityInsert(), new { name = group.Name });
                }
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, "GroupIdentityRepository. Error in function Insert");
            }
        }

        public string GetGroupName(int groupId, IConnectionFactory connectionFactory)
        {
            try
            {
                using (var connection = connectionFactory.Create())
                {
                    return connection.ExecuteScalar<string>(SqlCommandStorageService.GroupIdentityGetGroupName(), new { id = groupId });
                }
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, "GroupIdentityRepository. Error in function GetGroupName");
                return null;
            }
        }

        public int GetGroupId(string groupName, IConnectionFactory connectionFactory)
        {
            try
            {
                using (var connection = connectionFactory.Create())
                {
                    return connection.ExecuteScalar<int>(SqlCommandStorageService.GroupIdentityGetGroupId(), new { name = groupName });
                }
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, "GroupIdentityRepository. Error in function GetGroupId");
                return 0;
            }
        }

        public GroupIdentityEntity GetGroupById(int groupId, IConnectionFactory connectionFactory)
        {
            GroupIdentityEntity groupIdentityEntity = new GroupIdentityEntity();
            try
            {
                using (var connection = connectionFactory.Create())
                {
                    groupIdentityEntity = connection.Query<GroupIdentityEntity>(SqlCommandStorageService.GroupIdentityGetGroupById(), new { id = groupId }).SingleOrDefault();
                }
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, "GroupIdentityRepository. Error in function GetGroupById");
            }
            return groupIdentityEntity;
        }

        public GroupIdentityEntity GetGroupByName(string groupName, IConnectionFactory connectionFactory)
        {
            GroupIdentityEntity groupIdentityEntity = new GroupIdentityEntity();
            try
            {
                using (var connection = connectionFactory.Create())
                {
                    groupIdentityEntity = connection.Query<GroupIdentityEntity>(SqlCommandStorageService.GroupIdentityGetGroupByName(), new { nane = groupName }).SingleOrDefault();
                }
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, "GroupIdentityRepository. Error in function GetGroupByName");
            }
            return groupIdentityEntity;
        }

        public void Update(GroupIdentityEntity group, IConnectionFactory connectionFactory)
        {
            try
            {
                using (var connection = connectionFactory.Create())
                {
                    connection.Execute(SqlCommandStorageService.GroupIdentityUpdate(), new { name = group.Name, id = group.Id });
                }
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, "GroupIdentityRepository. Error in function Update");
            }
        }
    }
}