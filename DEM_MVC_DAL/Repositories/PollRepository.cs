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
using Microsoft.Practices.ServiceLocation;
using NLog;

namespace DEM_MVC_DAL.Repositories
{
    public class PollRepository : IPollRepository
    {
        public List<PollEntity> GetPollsByTopicId(int topicId, IConnectionFactory connectionFactory)
        {
            List<PollEntity> pollEntities = new List<PollEntity>();
            try
            {
                using (var connection = connectionFactory.Create())
                {
                    pollEntities = connection.Query<PollEntity>(SqlCommandStorageService.GetPollsByTopicId(), new { topicId }).ToList();
                }
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, "PostEntityRepository. Error in function GetPollsByTopicId");
            }
            return pollEntities;
        }
        public List<PollOptionEntity> GetPollOptionsByPollsId(List<int> pollIdList, IConnectionFactory connectionFactory)
        {
            List<PollOptionEntity> pollOptionEntities = new List<PollOptionEntity>();
            try
            {
                using (var connection = connectionFactory.Create())
                {
                    pollOptionEntities = connection.Query<PollOptionEntity>(SqlCommandStorageService.GetPollOptionsByPollsId(), new { pollIdList }).ToList();
                }
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, "PostEntityRepository. Error in function GetPollOptionsByPollsId");
            }
            return pollOptionEntities;
        }
    }
}