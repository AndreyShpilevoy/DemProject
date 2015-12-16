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
    public class PostRepository: IPostRepository
    {
        public List<PostEntity> GetAllPostsByTopicId(int topicId, IConnectionFactory connectionFactory, int onPage, int? page)
        {
            List<PostEntity> postEntities = new List<PostEntity>();
            try
            {
                if (page == null || page < 1) page = 1;
                using (var connection = connectionFactory.Create())
                {
                    postEntities = connection.Query<PostEntity>(SqlCommandStorageService.GetPostsByTopicId(), new { topicId, onPage, page }).ToList();
                }
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, "PostEntityRepository. Error in function GetAllPostsByTopicId");
            }
            return postEntities;
        }

        public List<UserEntity> GetUsersForPostsByUsersId(IConnectionFactory connectionFactory, List<int> usersId)
        {
            List<UserEntity> userEntities = new List<UserEntity>();
            try
            {
                using (var connection = connectionFactory.Create())
                {
                    userEntities = connection.Query<UserEntity>(SqlCommandStorageService.GetUsersForPostsByUsersId(), new { usersId }).ToList();
                }
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, "PostEntityRepository. Error in function GetUsersForPostsByUsersId");
            }
            return userEntities;
        }

        public void CreateNewPost(NewPostEntity newPostEntity, IConnectionFactory connectionFactory)
        {
            try
            {
                using (var connection = connectionFactory.Create())
                {
                    connection.Execute(SqlCommandStorageService.CreateNewPost(),
                        new
                        {
                            userId = newPostEntity.UserId,
                            topicId = newPostEntity.TopicId,
                            postTime = newPostEntity.PostTime,
                            postSubject= newPostEntity.PostSubject,
                            postText = newPostEntity.PostText
                        });
                }
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, "PostRepository. Error in function CreateNewPost");
            }
        }
    }
}