using System;
using Dapper;
using DEM_MVC_DAL.Interfaces.IFactory;
using DEM_MVC_DAL.Interfaces.IRepositories;
using DEM_MVC_DAL.Services;
using DEM_MVC_Infrastructure.Models;

namespace DEM_MVC_DAL.Repositories
{
    public class AdminRepository : IAdminRepository
    {
        public bool DeletePost(int postId, IConnectionFactory connectionFactory)
        {
            try
            {
                using (var connection = connectionFactory.Create())
                {
                    connection.Execute(SqlCommandStorageService.AdminDeletePost(), new {postId});
                    var validator = connection.ExecuteScalar<int>(SqlCommandStorageService.AdminCheckPost(), new {postId});

                    if(validator == 0)
                        return true;

                    return false;
                }
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, $"{nameof(AdminRepository)}. Error in function {DemLogger.GetCallerInfo()}");
                return false;
            }
        }

        public bool BanUser(int userId, IConnectionFactory connectionFactory)
        {
            try
            {
                using (var connection = connectionFactory.Create())
                {
                    var validator = connection.ExecuteScalar<int>(SqlCommandStorageService.CheckIsUserBanned(), new {userId});

                    if (validator != 0)
                        return false;

                    connection.Execute(SqlCommandStorageService.BanUser(), new {userId});
                    validator = connection.ExecuteScalar<int>(SqlCommandStorageService.CheckIsUserBanned(), new {userId});
                    return validator != 0;
                }
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, $"{nameof(AdminRepository)}. Error in function {DemLogger.GetCallerInfo()}");
                return false;
            }
        }

        public bool UnbanUser(int userId, IConnectionFactory connectionFactory)
        {
            try
            {
                using (var connection = connectionFactory.Create())
                {
                    var validator = connection.ExecuteScalar<int>(SqlCommandStorageService.CheckIsUserBanned(), new {userId});

                    if (validator == 0)
                        return false;

                    connection.Execute(SqlCommandStorageService.UnbanUser(), new {userId});
                    validator = connection.ExecuteScalar<int>(SqlCommandStorageService.CheckIsUserBanned(), new {userId});
                    return validator == 0;
                }
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, $"{nameof(AdminRepository)}. Error in function {DemLogger.GetCallerInfo()}");
                return false;
            }
        }
    }
}