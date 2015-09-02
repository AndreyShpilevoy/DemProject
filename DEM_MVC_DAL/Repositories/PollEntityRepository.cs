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
    public class PollEntityRepository : IPollEntityRepository
    {
        public DataSet GetPollWithOptionsByTopicId(int topicId, IUnitOfWork unitOfWork)
        {
            DataSet dataSet = new DataSet();
            try
            {
                using (var cmd = unitOfWork.CreateCommand())
                {
                    cmd.CommandText = "GetPollWithOptionsByTopicId";
                    cmd.CommandType = CommandType.StoredProcedure;

                    SqlParameter param = new SqlParameter
                    {
                        ParameterName = "@topicId",
                        SqlDbType = SqlDbType.Int,
                        Value = topicId,
                        Direction = ParameterDirection.Input
                    };
                    cmd.Parameters.Add(param);

                    var dataReader = cmd.ExecuteReader();
                    dataSet.Load(dataReader, LoadOption.Upsert, "Polls", "PollsOptions");
                    dataReader.Close();
                }
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, "PostEntityRepository. Error in function GetAllPostsWithUsersByTopicId");
            }
            return dataSet;
        }
    }
}