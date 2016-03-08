using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using DEM_MVC_BL.Interfaces.IServices.Conference;
using DEM_MVC_BL.Models.TopicModels;
using DEM_MVC_DAL.Entities.TopicsViewEntities;
using DEM_MVC_DAL.Interfaces.IFactory;
using DEM_MVC_DAL.Interfaces.IRepositories;
using DEM_MVC_Infrastructure.Models;

namespace DEM_MVC_BL.Services.Conference
{
    public class TopicReadService : ITopicReadService
    {
        private readonly IConnectionFactory _connectionFactory;
        private readonly ITopicRepository _topicRepository;

        public TopicReadService(IConnectionFactory connectionFactory,
            ITopicRepository topicRepository)
        {
            _connectionFactory = connectionFactory;
            _topicRepository = topicRepository;
        }

        public List<TopicTableViewModel> GetTopicTableViewModelsByForumId(int forumId, int onPage, int? page)
        {
            var topicTableViewModels = new List<TopicTableViewModel>();

            try
            {
                List<TopicsViewEntity> topicViewEntities = _topicRepository.GetTopicsByForumId(forumId, _connectionFactory, onPage, page);
                topicTableViewModels = Mapper.Map<List<TopicsViewEntity>, List<TopicTableViewModel>>(topicViewEntities);
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, $"{nameof(TopicReadService)}. Error in function {DemLogger.GetCallerInfo()}");
            }
            return topicTableViewModels.OrderByDescending(x => x.LastPostTime).ToList();
        }

        public TopicInfoViewModel GetTopicInfoViewModelById(int topicId)
        {
            var topicShowViewModel = new TopicInfoViewModel();
            try
            {
                TopicsViewEntity topicViewEntity = _topicRepository.GetTopicById(topicId, _connectionFactory);
                topicShowViewModel = Mapper.Map<TopicsViewEntity, TopicInfoViewModel>(topicViewEntity);
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, $"{nameof(TopicReadService)}. Error in function {DemLogger.GetCallerInfo()}");
            }
            return topicShowViewModel;
        }
    }
}