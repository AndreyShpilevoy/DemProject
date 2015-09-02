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
    public class UserEntityRepository: IUserEntityRepository
    {

        //public DataTable GetUserForPostById(int userId, IUnitOfWork unitOfWork)
        //{
        //    DataTable dataTable = new DataTable();
        //    try
        //    {
        //        using (var cmd = unitOfWork.CreateCommand())
        //        {
        //            cmd.CommandText = "GetUserForPostById";
        //            cmd.CommandType = CommandType.StoredProcedure;

        //            SqlParameter param = new SqlParameter
        //            {
        //                ParameterName = "@userId",
        //                SqlDbType = SqlDbType.Int,
        //                Value = userId,
        //                Direction = ParameterDirection.Input
        //            };
        //            cmd.Parameters.Add(param);

        //            var dataReader = cmd.ExecuteReader();
        //            dataTable.Load(dataReader);
        //            dataReader.Close();
        //        }
        //    }
        //    catch (Exception exception)
        //    {
        //        DemLogger.Current.Error(exception, "UserEntityRepository. Error in function GetUserForPostById");
        //    }
        //    return dataTable;
        //}
    }
}