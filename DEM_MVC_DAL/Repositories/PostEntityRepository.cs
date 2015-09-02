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
    public class PostEntityRepository: IPostEntityRepository
    {
        public DataSet GetAllPostsWithUsersByTopicId(int topicId, IUnitOfWork unitOfWork, int onPage, int? page)
        {
            DataSet dataSet = new DataSet();
            try
            {
                using (var cmd = unitOfWork.CreateCommand())
                {
                    cmd.CommandText = "GetPostsAndUsersablesByTopicId";
                    cmd.CommandType = CommandType.StoredProcedure;

                    SqlParameter topicIdParam = new SqlParameter
                    {
                        ParameterName = "@topicId",
                        SqlDbType = SqlDbType.Int,
                        Value = topicId,
                        Direction = ParameterDirection.Input
                    };
                    cmd.Parameters.Add(topicIdParam);

                    if (page == null || page < 1) page = 1;
                    SqlParameter pageParam = new SqlParameter
                    {
                        ParameterName = "@page",
                        SqlDbType = SqlDbType.Int,
                        Value = page,
                        Direction = ParameterDirection.Input
                    };
                    cmd.Parameters.Add(pageParam);

                    SqlParameter onPageParam = new SqlParameter
                    {
                        ParameterName = "@onPage",
                        SqlDbType = SqlDbType.Int,
                        Value = onPage,
                        Direction = ParameterDirection.Input
                    };
                    cmd.Parameters.Add(onPageParam);

                    var dataReader = cmd.ExecuteReader();
                    dataSet.Load(dataReader, LoadOption.Upsert, "Posts", "Users");
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