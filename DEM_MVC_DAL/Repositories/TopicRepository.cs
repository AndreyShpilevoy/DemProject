using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using Dapper;
using DEM_MVC_DAL.Entities.TopicsViewEntities;
using DEM_MVC_DAL.Interfaces.IFactory;
using DEM_MVC_DAL.Interfaces.IRepositories;
using DEM_MVC_DAL.Services;
using DEM_MVC_Infrastructure.Models;

namespace DEM_MVC_DAL.Repositories
{
    public class TopicRepository : ITopicRepository
    {
        public List<TopicsViewEntity> GetTopicsByForumId(int forumId, IConnectionFactory connectionFactory, int onPage, int? page)
        {

            List<TopicsViewEntity> topicViewEntities = new List<TopicsViewEntity>();
            try
            {
                if (page == null || page < 1)
                    page = 1;

                using (var connection = connectionFactory.Create())
                {
                    topicViewEntities = connection.Query<TopicsViewEntity>(SqlCommandStorageService.GetAllTopicsViewByForumId(), new { forumId, page, onPage }).ToList();
                }
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, $"{nameof(TopicRepository)}. Error in function {DemLogger.GetCallerInfo()}");
            }
            return topicViewEntities;
        }

        public TopicsViewEntity GetTopicById(int topicId, IConnectionFactory connectionFactory)
        {
            TopicsViewEntity topicViewEntity = new TopicsViewEntity();
            try
            {
                using (var connection = connectionFactory.Create())
                {
                    topicViewEntity = connection.Query<TopicsViewEntity>(SqlCommandStorageService.GetTopicViewById(), new { topicId }).SingleOrDefault();
                }
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, $"{nameof(TopicRepository)}. Error in function {DemLogger.GetCallerInfo()}");
            }
            return topicViewEntity;
        }

        public List<TopicsViewEntity> GetLastNTopics(IConnectionFactory connectionFactory, int numOfTopics, Dictionary<int, bool> forumsVisibility)
        {
            List<TopicsViewEntity> topicViewEntities = new List<TopicsViewEntity>();
            try
            {
                using (var connection = connectionFactory.Create())
                {
                    var invisibleForums = (from kvp in forumsVisibility
                                           where kvp.Value == true
                                           select kvp.Key).Distinct().ToArray();
                    topicViewEntities = connection.Query<TopicsViewEntity>(SqlCommandStorageService.GetLastNTopics(), new { numOfTopics, invisibleForums }).ToList();
                }
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, $"{nameof(TopicRepository)}. Error in function {DemLogger.GetCallerInfo()}");
            }
            return topicViewEntities;
        }
    }
}