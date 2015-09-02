using System;
using System.Data;
using System.Data.SqlClient;
using DEM_MVC_DAL.Interfaces.IRepositories;
using DEM_MVC_DAL.Interfaces.IUnitOfWork;
using DEM_MVC_Infrastructure.Models;
using Microsoft.Practices.ServiceLocation;
using NLog;

namespace DEM_MVC_DAL.Repositories
{
    public class ForumEntityRepository : IForumEntityRepository
    {
        public DataTable GetAllForums(IUnitOfWork unitOfWork)
        {
            DataTable dataTable = new DataTable();
            try
            {
                using (var cmd = unitOfWork.CreateCommand())
                {
                    cmd.CommandText = "GetAllForums";
                    cmd.CommandType = CommandType.StoredProcedure;
                    var dataReader = cmd.ExecuteReader();
                    dataTable.Load(dataReader);
                    dataReader.Close();
                }
            }
            catch(Exception exception)
            {
                DemLogger.Current.Error(exception, "ForumEntityRepository. Error in function GetAllForums");
            }
            return dataTable;
        }
        
        public DataTable GetForumById(int forumId, IUnitOfWork unitOfWork)
        {
            DataTable dataTable = new DataTable();
            try
            {
                using (var cmd = unitOfWork.CreateCommand())
                {
                    cmd.CommandText = "GetForumById";
                    cmd.CommandType = CommandType.StoredProcedure;

                    SqlParameter param = new SqlParameter
                    {
                        ParameterName = "@forumId",
                        SqlDbType = SqlDbType.Int,
                        Value = forumId,
                        Direction = ParameterDirection.Input
                    };
                    cmd.Parameters.Add(param);

                    var dataReader = cmd.ExecuteReader();
                    dataTable.Load(dataReader);
                    dataReader.Close();
                }
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, "ForumEntityRepository. Error in function GetForumById");
            }
            return dataTable;
        }
    }
}