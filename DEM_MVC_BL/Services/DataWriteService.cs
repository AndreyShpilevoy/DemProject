using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using AutoMapper;
using DEM_MVC_BL.Interfaces.IServices;
using DEM_MVC_BL.Interfaces.IServices.IModelsHelpers;
using DEM_MVC_BL.Models;
using DEM_MVC_BL.Models.ForumModels;
using DEM_MVC_DAL.Entities;
using DEM_MVC_DAL.Interfaces.IFactory;
using DEM_MVC_DAL.Interfaces.IRepositories;
using DEM_MVC_Infrastructure.Models;
using Microsoft.Practices.ServiceLocation;

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
                DemLogger.Current.Error(exception, "DataWriteService. Error in function CreateNewPost");
            }
        }
    }
}
