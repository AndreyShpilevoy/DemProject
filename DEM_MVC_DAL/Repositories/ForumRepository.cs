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
    public class ForumRepository : IForumRepository
    {
        public List<ForumEntity> GetAllForums(IConnectionFactory connectionFactory)
        {

            List<ForumEntity> forumEntities = new List<ForumEntity>();
            try
            {
                using (var connection = connectionFactory.Create())
                {
                    forumEntities = connection.Query<ForumEntity>(SqlCommandStorageService.GetAllForums()).ToList();
                }
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, "ForumEntityRepository. Error in function GetAllForums");
            }
            return forumEntities;
        }
        
        public ForumEntity GetForumInfoById(int forumId, IConnectionFactory connectionFactory)
        {
            ForumEntity forumEntity = new ForumEntity();
            try
            {
                using (var connection = connectionFactory.Create())
                {
                    forumEntity = connection.Query<ForumEntity>(SqlCommandStorageService.GetForumInfoById(), new { forumId }).SingleOrDefault();
                }
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, "ForumEntityRepository. Error in function GetForumById");
            }
            return forumEntity;
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
                DemLogger.Current.Error(exception, "ForumEntityRepository. Error in function GetForumById");
            }
            return forumId;
        }
    }
}