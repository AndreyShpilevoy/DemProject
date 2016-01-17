using System;
using System.Collections.Generic;
using System.Linq;
using Dapper;
using DEM_MVC_DAL.Entities.PostEntities;
using DEM_MVC_DAL.Entities.UserForPostViewEntities;
using DEM_MVC_DAL.Interfaces.IFactory;
using DEM_MVC_DAL.Interfaces.IRepositories;
using DEM_MVC_DAL.Services;
using DEM_MVC_Infrastructure.Models;

namespace DEM_MVC_DAL.Repositories
{
    public class PostRepository: IPostRepository
    {
        public List<ReadPostEntity> GetAllPostsByTopicId(int topicId, IConnectionFactory connectionFactory, int onPage, int? page)
        {
            List<ReadPostEntity> postEntities = new List<ReadPostEntity>();
            try
            {
                if (page == null || page < 1)
                    page = 1;

                using (var connection = connectionFactory.Create())
                {
                    postEntities = connection.Query<ReadPostEntity>(SqlCommandStorageService.GetPostsByTopicId(), new { topicId, onPage, page }).ToList();
                }
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, $"{nameof(PostRepository)}. Error in function {DemLogger.GetCallerInfo()}");
            }
            return postEntities;
        }

        public List<UserForPostViewEntity> GetUsersForPostsByUsersId(IConnectionFactory connectionFactory, List<int> usersId)
        {
            List<UserForPostViewEntity> userForPostViewEntities = new List<UserForPostViewEntity>();
            try
            {
                using (var connection = connectionFactory.Create())
                {
                    userForPostViewEntities = connection.Query<UserForPostViewEntity>(SqlCommandStorageService.GetUsersForPostsViewByUsersId(), new { usersId }).ToList();
                }
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, $"{nameof(PostRepository)}. Error in function {DemLogger.GetCallerInfo()}");
            }
            return userForPostViewEntities;
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
                            posterIp = newPostEntity.PosterIp,
                            postTime = newPostEntity.PostTime,
                            postMerged = newPostEntity.PostMerged,
                            postReported = newPostEntity.PostReported,
                            enableBbcode = newPostEntity.EnableBbcode,
                            enableSmilies = newPostEntity.EnableSmilies,
                            enableMagicUrl = newPostEntity.EnableMagicUrl,
                            enableSig = newPostEntity.EnableSignature,
                            postSubject = newPostEntity.PostSubject,
                            postText = newPostEntity.PostText,
                            postAttachment = newPostEntity.PostAttachment,
                            postEditTime = newPostEntity.PostEditTime,
                            postEditReason = newPostEntity.PostEditReason,
                            postEditUser = newPostEntity.PostEditUser,
                            postEditCount = newPostEntity.PostEditCount,
                            postEditLocked = newPostEntity.PostEditLocked
                        });
                }
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, $"{nameof(PostRepository)}. Error in function {DemLogger.GetCallerInfo()}");
            }
        }
        public bool DeletePost(int postId, IConnectionFactory connectionFactory)
        {
            try
            {
                using (var connection = connectionFactory.Create())
                {
                    connection.Execute(SqlCommandStorageService.AdminDeletePost(), new { postId });
                    var validator = connection.ExecuteScalar<int>(SqlCommandStorageService.AdminCheckPost(), new { postId });

                    if (validator == 0)
                        return true;

                    return false;
                }
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, $"{nameof(PostRepository)}. Error in function {DemLogger.GetCallerInfo()}");
                return false;
            }
        }
    }
}