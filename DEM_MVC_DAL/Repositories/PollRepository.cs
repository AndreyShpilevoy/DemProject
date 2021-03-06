﻿using System;
using System.Collections.Generic;
using System.Linq;
using Dapper;
using DEM_MVC_DAL.Entities.PollEntities;
using DEM_MVC_DAL.Interfaces.IFactory;
using DEM_MVC_DAL.Interfaces.IRepositories;
using DEM_MVC_DAL.Services;
using DEM_MVC_Infrastructure.Models;

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
                DemLogger.Current.Error(exception, $"{nameof(PollRepository)}. Error in function {DemLogger.GetCallerInfo()}");
            }
            return pollEntities;
        }
    }
}