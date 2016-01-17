using System;
using System.Collections.Generic;
using System.Linq;
using Dapper;
using DEM_MVC_DAL.Entities.UserIdentityEntities;
using DEM_MVC_DAL.Entities.UserLoginInfoIdentityEntities;
using DEM_MVC_DAL.Interfaces.IFactory;
using DEM_MVC_DAL.Interfaces.IRepositories;
using DEM_MVC_DAL.Services;
using DEM_MVC_Infrastructure.Models;
using Microsoft.AspNet.Identity;

namespace DEM_MVC_DAL.Repositories
{
    public class UserExternalLoginsIdentityRepository : IUserExternalLoginsIdentityRepository
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
                DemLogger.Current.Error(exception, $"{nameof(UserExternalLoginsIdentityRepository)}. Error in function {DemLogger.GetCallerInfo()}");
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
                DemLogger.Current.Error(exception, $"{nameof(UserExternalLoginsIdentityRepository)}. Error in function {DemLogger.GetCallerInfo()}");
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
                DemLogger.Current.Error(exception, $"{nameof(UserExternalLoginsIdentityRepository)}. Error in function {DemLogger.GetCallerInfo()}");
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
                DemLogger.Current.Error(exception, $"{nameof(UserExternalLoginsIdentityRepository)}. Error in function {DemLogger.GetCallerInfo()}");
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
                DemLogger.Current.Error(exception, $"{nameof(UserExternalLoginsIdentityRepository)}. Error in function {DemLogger.GetCallerInfo()}");
            }
            return userLoginInfoIdentityEntities;
        }
    }
}