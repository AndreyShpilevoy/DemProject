using System;
using AutoMapper;
using DEM_MVC_BL.Interfaces.IServices;
using DEM_MVC_BL.Models.ForumModels;
using DEM_MVC_DAL.Entities.PostEntities;
using DEM_MVC_DAL.Interfaces.IFactory;
using DEM_MVC_DAL.Interfaces.IRepositories;
using DEM_MVC_Infrastructure.Models;

namespace DEM_MVC_BL.Services
{
    public class DataWriteService : IDataWriteService
    {
        private readonly IConnectionFactory _connectionFactory;
        private readonly IPostRepository _postRepository;

        public DataWriteService(IPostRepository postRepository, 
            IConnectionFactory connectionFactory)
        {
            _postRepository = postRepository;
            _connectionFactory = connectionFactory;
        }

        public void CreateNewPost(NewPostModel newPostModel)
        {
            try
            {
                var newPostEntity = Mapper.Map<NewPostModel, NewPostEntity>(newPostModel);
                _postRepository.CreateNewPost(newPostEntity, _connectionFactory);
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, $"{nameof(DataWriteService)}. Error in function {DemLogger.GetCallerInfo()}");
            }
        }
    }
}
