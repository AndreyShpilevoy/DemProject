using System;
using System.Collections.Generic;
using System.Linq;
using Dapper;
using DEM_MVC_DAL.Entities.ForumsViewEntities;
using DEM_MVC_DAL.Interfaces.IFactory;
using DEM_MVC_DAL.Interfaces.IRepositories;
using DEM_MVC_DAL.Services;
using DEM_MVC_Infrastructure.Models;

namespace DEM_MVC_DAL.Repositories
{
    public class ForumRepository : IForumRepository
    {
        public List<ForumsViewEntity> GetAllForums(IConnectionFactory connectionFactory)
        {

            List<ForumsViewEntity> forumsViewEntities = new List<ForumsViewEntity>();
            try
            {
                using (var connection = connectionFactory.Create())
                {
                    forumsViewEntities = connection.Query<ForumsViewEntity>(SqlCommandStorageService.GetAllForumsView()).ToList();
                }
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, $"{nameof(ForumRepository)}. Error in function {DemLogger.GetCallerInfo()}");
            }
            return forumsViewEntities;
        }
        
        public ForumsViewEntity GetForumInfoById(int forumId, IConnectionFactory connectionFactory)
        {
            ForumsViewEntity forumsViewEntity = new ForumsViewEntity();
            try
            {
                using (var connection = connectionFactory.Create())
                {
                    forumsViewEntity = connection.Query<ForumsViewEntity>(SqlCommandStorageService.GetForumViewInfoById(), new { forumId }).SingleOrDefault();
                }
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, $"{nameof(ForumRepository)}. Error in function {DemLogger.GetCallerInfo()}");
            }
            return forumsViewEntity;
        }

        public int GetForumIdByTopicId(int topicId, IConnectionFactory connectionFactory)
        {
            int forumId = 0;
            try
            {
                using (var connection = connectionFactory.Create())
                {
                    forumId = connection.ExecuteScalar<int>(SqlCommandStorageService.GetForumIdByTopicId(), new { topicId });
                }
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, $"{nameof(ForumRepository)}. Error in function {DemLogger.GetCallerInfo()}");
            }
            return forumId;
        }
    }
}