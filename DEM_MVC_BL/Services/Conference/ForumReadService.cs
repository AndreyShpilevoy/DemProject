using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using DEM_MVC_BL.Interfaces.IServices.Conference;
using DEM_MVC_BL.Interfaces.IServices.IModelsHelpers;
using DEM_MVC_BL.Models.ForumModels;
using DEM_MVC_DAL.Entities.ForumsViewEntities;
using DEM_MVC_DAL.Interfaces.IFactory;
using DEM_MVC_DAL.Interfaces.IRepositories;
using DEM_MVC_Infrastructure.Models;

namespace DEM_MVC_BL.Services.Conference
{
    public class ForumReadService : IForumReadService
    {
        private readonly IConnectionFactory _connectionFactory;
        private readonly IForumModelHelper _forumModelHelper;
        private readonly IForumsViewRepository _forumRepository;

        public ForumReadService(IConnectionFactory connectionFactory,
            IForumModelHelper forumModelHelper,
            IForumsViewRepository forumRepository)
        {
            _connectionFactory = connectionFactory;
            _forumModelHelper = forumModelHelper;
            _forumRepository = forumRepository;
        }

        public List<ForumTableViewModel> GetAllForumTableViewModels()
        {
            var forumTableViewModels = new List<ForumTableViewModel>();

            try
            {
                List<ForumsViewEntity> forumViewEntities = _forumRepository.GetAllForums(_connectionFactory);
                var tempForumModels = Mapper.Map<List<ForumsViewEntity>, List<ForumTableViewModel>>(forumViewEntities);

                forumTableViewModels = _forumModelHelper.TransformToHierarchy(tempForumModels);
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, $"{nameof(ForumReadService)}. Error in function {DemLogger.GetCallerInfo()}");
            }
            return forumTableViewModels.OrderBy(x => x.ForumOrder).ToList();
        }

        public ForumTableViewModel GetForumTableViewModelById(int forumId)
        {
            var forumTableViewModel = new ForumTableViewModel();

            try
            {
                List<ForumsViewEntity> forumViewEntities = _forumRepository.GetAllForums(_connectionFactory);
                var tempForumModels = Mapper.Map<List<ForumsViewEntity>, List<ForumTableViewModel>>(forumViewEntities);
                var forumTableViewModelList = _forumModelHelper.TransformToHierarchy(tempForumModels);

                forumTableViewModel = _forumModelHelper.GetFromHierarchyById(forumTableViewModelList, forumId);
                forumTableViewModel.SubForums = forumTableViewModel.SubForums.OrderBy(x => x.ForumOrder).ToList();
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, $"{nameof(ForumReadService)}. Error in function {DemLogger.GetCallerInfo()}");
            }
            return forumTableViewModel;
        }

        public ForumInfoViewModel GetForumInfoViewModelById(int forumId)
        {
            var forumInfoViewModel = new ForumInfoViewModel();
            try
            {
                ForumsViewEntity forumViewEntity = _forumRepository.GetForumInfoById(forumId, _connectionFactory);
                forumInfoViewModel = Mapper.Map<ForumsViewEntity, ForumInfoViewModel>(forumViewEntity);
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, $"{nameof(ForumReadService)}. Error in function {DemLogger.GetCallerInfo()}");
            }
            return forumInfoViewModel;
        }
    }
}