using System;
using System.Collections.Generic;
using System.Linq;
using Dapper;
using DEM_MVC_DAL.Entities.PollEntities;
using DEM_MVC_DAL.Entities.PollOptionEntities;
using DEM_MVC_DAL.Interfaces.IFactory;
using DEM_MVC_DAL.Interfaces.IRepositories;
using DEM_MVC_DAL.Services;
using DEM_MVC_Infrastructure.Models;

namespace DEM_MVC_DAL.Repositories
{
    public class PollOptionRepository : IPollOptionRepository
    {
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
                DemLogger.Current.Error(exception, $"{nameof(PollOptionRepository)}. Error in function {DemLogger.GetCallerInfo()}");
            }
            return pollOptionEntities;
        }
    }
}