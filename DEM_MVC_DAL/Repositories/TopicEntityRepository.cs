using System;
using System.Data;
using System.Data.SqlClient;
using DEM_MVC_DAL.Interfaces.IRepositories;
using DEM_MVC_DAL.Interfaces.IUnitOfWork;
using DEM_MVC_Infrastructure.Models;

namespace DEM_MVC_DAL.Repositories
{
    public class TopicEntityRepository: ITopicEntityRepository
    {
        public DataTable GetAllTopicsByForumId(int forumId, IUnitOfWork unitOfWork, int onPage, int? page)
        {
            DataTable dataTable = new DataTable();
            try
            {
                using (var cmd = unitOfWork.CreateCommand())
                {
                    cmd.CommandText = "GetAllTopicsByForumId";
                    cmd.CommandType = CommandType.StoredProcedure;

                    SqlParameter param = new SqlParameter
                    {
                        ParameterName = "@forumId",
                        SqlDbType = SqlDbType.Int,
                        Value = forumId,
                        Direction = ParameterDirection.Input
                    };
                    cmd.Parameters.Add(param);


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
                    dataTable.Load(dataReader);
                    dataReader.Close();
                }
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, "TopicEntityRepository. Error in function GetAllTopicsByForumId");
            }
            return dataTable;
        }

        public DataTable GetTopicById(int topicId, IUnitOfWork unitOfWork)
        {
            DataTable dataTable = new DataTable();
            try
            {
                using (var cmd = unitOfWork.CreateCommand())
                {
                    cmd.CommandText = "GetTopicById";
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
                    dataTable.Load(dataReader);
                    dataReader.Close();
                }
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, "TopicEntityRepository. Error in function GetTopicById");
            }
            return dataTable;
        }
    }
}