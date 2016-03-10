using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using DEM_MVC_BL.Interfaces.IServices.Conference;
using DEM_MVC_BL.Models.PostModels;
using DEM_MVC_DAL.Entities.PostEntities;
using DEM_MVC_DAL.Entities.UserForPostViewEntities;
using DEM_MVC_DAL.Interfaces.IFactory;
using DEM_MVC_DAL.Interfaces.IRepositories;
using DEM_MVC_Infrastructure.Models;

namespace DEM_MVC_BL.Services.Conference
{
    public class PostReadService : IPostReadService
    {
        private readonly IConnectionFactory _connectionFactory;
        private readonly IPostRepository _postRepository;

        public PostReadService(IConnectionFactory connectionFactory,
            IPostRepository postRepository)
        {
            _connectionFactory = connectionFactory;
            _postRepository = postRepository;
        }

        public List<PostTableViewModel> GetPostTableViewModelsByTopicId(int topicId, int onPage, int? page)
        {
            var postTableViewModels = new List<PostTableViewModel>();
            var userTableViewModels = new List<UserTableViewModelForPosts>();
            try
            {
                List<ReadPostEntity> postEntities = _postRepository.GetAllPostsByTopicId(topicId, _connectionFactory, onPage, page);
                var usersId = postEntities.Select(x => x.UserId).ToList();
                var list = (from x in postEntities where x.PostEditCount > 0 select x.PostEditUserId).ToList();
                usersId.AddRange(list);
                usersId = usersId.Distinct().ToList();
                List<UserForPostViewEntity> userForPostViewEntities = _postRepository.GetUsersForPostsByUsersId(_connectionFactory, usersId);


                postTableViewModels = Mapper.Map<List<ReadPostEntity>, List<PostTableViewModel>>(postEntities);
                userTableViewModels = Mapper.Map<List<UserForPostViewEntity>, List<UserTableViewModelForPosts>>(userForPostViewEntities);

                #region AddUsersToPosts

                foreach (var user in userTableViewModels)
                {
                    var postsForAddUserByUserId = postTableViewModels.Where(x => x.UserId == user.UserId).ToList();
                    foreach (var post in postsForAddUserByUserId)
                    {
                        post.User = user;
                    }

                    var postsForAddUserByPostEditUserId = postTableViewModels.Where(x => x.PostEditUserId == user.UserId).ToList();
                    foreach (var post in postsForAddUserByPostEditUserId)
                    {
                        post.User = user;
                    }
                }

                #endregion
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, $"{nameof(PostReadService)}. Error in function {DemLogger.GetCallerInfo()}");
            }
            return postTableViewModels;
        }
    }
}