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
using Microsoft.AspNet.Identity;
using Microsoft.Practices.ServiceLocation;
using NLog;

namespace DEM_MVC_DAL.Repositories
{
    public class UserLoginsIdentityRepository : IUserLoginsIdentityRepository
    {
        public void Delete(UserIdentityEntity user, UserLoginInfo login, IConnectionFactory connectionFactory)
        {
            try
            {
                using (var connection = connectionFactory.Create())
                {
                    connection.Execute(SqlCommandStorageService.UserLoginsIdentityRepositoryDelete(), new { userId = user.Id, loginProvider = login.LoginProvider, providerKey = login.ProviderKey });
                }
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, "UserLoginsIdentityRepository. Error in function Delete");
            }
        }

        public void Delete(int userId, IConnectionFactory connectionFactory)
        {
            try
            {
                using (var connection = connectionFactory.Create())
                {
                    connection.Execute(SqlCommandStorageService.UserLoginsIdentityRepositoryDeleteById(), new { userId });
                }
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, "UserLoginsIdentityRepository. Error in function Delete");
            }
        }

        public void Insert(UserIdentityEntity user, UserLoginInfo login, IConnectionFactory connectionFactory)
        {
            try
            {
                using (var connection = connectionFactory.Create())
                {
                    connection.Execute(SqlCommandStorageService.UserLoginsIdentityRepositoryInsert(), new { loginProvider = login.LoginProvider, providerKey = login.ProviderKey, userId = user.Id });
                }
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, "UserLoginsIdentityRepository. Error in function Insert");
            }
        }

        public int FindUserIdByLogin(UserLoginInfo userLogin, IConnectionFactory connectionFactory)
        {
            int result= 0;
            try
            {
                using (var connection = connectionFactory.Create())
                {
                    result = connection.ExecuteScalar<int>(SqlCommandStorageService.UserLoginsIdentityRepositoryFindUserIdByLogin(), new { loginProvider = userLogin.LoginProvider, providerKey = userLogin.ProviderKey });
                }
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, "UserLoginsIdentityRepository. Error in function FindUserIdByLogin");
            }
            return result;
        }

        public List<UserLoginInfoIdentityEntity> FindByUserId(int userId, IConnectionFactory connectionFactory)
        {
            List<UserLoginInfoIdentityEntity> userLoginInfoIdentityEntities = new List<UserLoginInfoIdentityEntity>();
            try
            {
                using (var connection = connectionFactory.Create())
                {
                    userLoginInfoIdentityEntities = connection.Query<UserLoginInfoIdentityEntity>(SqlCommandStorageService.UserLoginsIdentityRepositoryFindByUserId(), new { userId }).ToList();
                }
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, "UserLoginsIdentityRepository. Error in function FindByUserId");
            }
            return userLoginInfoIdentityEntities;
        }
    }
}