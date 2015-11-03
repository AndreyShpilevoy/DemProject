using System;
using System.Data;
using System.Data.SqlClient;
using DEM_MVC_DAL.Interfaces.IRepositories;
using DEM_MVC_Infrastructure.Models;
using Microsoft.Practices.ServiceLocation;
using NLog;

namespace DEM_MVC_DAL.Repositories
{
    public class UserAccountRepository: IUserAccountRepository
    {
        //public int CreateNewUserAccount(string userName, string passwordHash, string securityStamp, IUnitOfWork unitOfWork)
        //{
        //    int userId = 0;
        //    try
        //    {
        //        using (var cmd = unitOfWork.CreateCommand())
        //        {
        //            cmd.CommandText = "CreateNewUserAccount";
        //            cmd.CommandType = CommandType.StoredProcedure;

        //            SqlParameter userNameParameter = new SqlParameter
        //            {
        //                ParameterName = "@userName",
        //                SqlDbType = SqlDbType.VarChar,
        //                Value = userName,
        //                Direction = ParameterDirection.Input
        //            };
        //            cmd.Parameters.Add(userNameParameter);

        //            SqlParameter passwordHashParameter = new SqlParameter
        //            {
        //                ParameterName = "@passwordHash",
        //                SqlDbType = SqlDbType.VarChar,
        //                Value = passwordHash,
        //                Direction = ParameterDirection.Input
        //            };
        //            cmd.Parameters.Add(passwordHashParameter);

        //            SqlParameter securityStampParameter = new SqlParameter
        //            {
        //                ParameterName = "@securityStamp",
        //                SqlDbType = SqlDbType.VarChar,
        //                Value = securityStamp,
        //                Direction = ParameterDirection.Input
        //            };
        //            cmd.Parameters.Add(securityStampParameter);

        //            SqlParameter userIdOutputParameter = new SqlParameter
        //            {
        //                ParameterName = "@userId",
        //                SqlDbType = SqlDbType.Int,
        //                Direction = ParameterDirection.Output
        //            };
        //            cmd.Parameters.Add(userIdOutputParameter);

        //            cmd.ExecuteNonQuery();
        //            unitOfWork.Save();

        //            var userIdOutputParameterOutput = (IDataParameter)cmd.Parameters["@userId"];
        //            userId = (int)userIdOutputParameterOutput.Value;
        //        }
        //    }
        //    catch (Exception exception)
        //    {
        //        DemLogger.Current.Error(exception, "UserEntityRepository. Error in function GetUserForPostById");
        //    }
        //    return userId;
        //}
    }
}