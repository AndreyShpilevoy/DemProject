﻿using System;
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
        private readonly IPostRepository _postEntityRepository;

        public PostReadService(IConnectionFactory connectionFactory,
            IPostRepository postEntityRepository)
        {
            _connectionFactory = connectionFactory;
            _postEntityRepository = postEntityRepository;
        }

        public List<PostTableViewModel> GetPostTableViewModelsByTopicId(int topicId, int onPage, int? page)
        {
            var postTableViewModels = new List<PostTableViewModel>();
            var userTableViewModels = new List<UserTableViewModelForPosts>();
            try
            {
                List<ReadPostEntity> postEntities = _postEntityRepository.GetAllPostsByTopicId(topicId, _connectionFactory, onPage, page);
                var usersId = postEntities.Select(x => x.UserId).ToList();
                usersId.AddRange(postEntities.Where(x => x.PostEditCount > 0).Select(y => y.PostEditUserId).ToList());
                usersId = usersId.Distinct().ToList();
                List<UserForPostViewEntity> userForPostViewEntities = _postEntityRepository.GetUsersForPostsByUsersId(_connectionFactory, usersId);


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