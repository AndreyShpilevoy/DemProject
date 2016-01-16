using System;
using System.Collections.Generic;
using System.Linq;
using Dapper;
using DEM_MVC_DAL.Entities;
using DEM_MVC_DAL.Interfaces.IFactory;
using DEM_MVC_DAL.Interfaces.IRepositories;
using DEM_MVC_DAL.Services;
using DEM_MVC_Infrastructure.Models;

namespace DEM_MVC_DAL.Repositories
{
    public class TopicRepository : ITopicRepository
    {
        public List<TopicEntity> GetTopicsByForumId(int forumId, IConnectionFactory connectionFactory, int onPage, int? page)
        {

            List<TopicEntity> topicEntities = new List<TopicEntity>();
            try
            {
                if (page == null || page < 1)
                    page = 1;

                using (var connection = connectionFactory.Create())
                {
                    topicEntities = connection.Query<TopicEntity>(SqlCommandStorageService.GetTopicsByForumId(), new { forumId, page, onPage }).ToList();
                }
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, $"{nameof(TopicRepository)}. Error in function {DemLogger.GetCallerInfo()}");
            }
            return topicEntities;
        }

        public TopicEntity GetTopicById(int topicId, IConnectionFactory connectionFactory)
        {
            TopicEntity topicEntity = new TopicEntity();
            try
            {
                using (var connection = connectionFactory.Create())
                {
                    topicEntity = connection.Query<TopicEntity>(SqlCommandStorageService.GetTopicById(), new { topicId }).SingleOrDefault();
                }
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, $"{nameof(TopicRepository)}. Error in function {DemLogger.GetCallerInfo()}");
            }
            return topicEntity;
        }
    }
}