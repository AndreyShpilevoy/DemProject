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
                    connection.Execute(SqlCommandStorageService.AdminDeletePost(), new { postId });
                    connection.ExecuteScalar<int>(SqlCommandStorageService.AdminCheckPost(), new { postId });
                    return true;
                }
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, "AdminRepository. Error in function DeletePost");
                return false;
            }
        }

        public bool BanUser(int userId, IConnectionFactory connectionFactory)
        {
            try
            {
                using (var connection = connectionFactory.Create())
                {
                    connection.Execute(SqlCommandStorageService.BanUser(), new { userId });
                    connection.ExecuteScalar<int>(SqlCommandStorageService.CheckBanUser(), new { userId });
                    return true;
                }
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, "AdminRepository. Error in function BanUser");
                return false;
            }
        }

        public bool UnbanUser(int userId, IConnectionFactory connectionFactory)
        {
            try
            {
                using (var connection = connectionFactory.Create())
                {
                    connection.Execute(SqlCommandStorageService.UnbanUser(), new { userId });
                    connection.ExecuteScalar<int>(SqlCommandStorageService.CheckUnbanUser(), new { userId });
                    return true;
                }
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, "AdminRepository. Error in function UnbanUser");
                return false;
            }
        }
    }
}