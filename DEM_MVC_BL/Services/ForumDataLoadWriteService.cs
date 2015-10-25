using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using AutoMapper;
using DEM_MVC_BL.ExtensionMethods;
using DEM_MVC_BL.Interfaces.IServices;
using DEM_MVC_BL.Interfaces.IServices.IModelsHelpers;
using DEM_MVC_BL.Models;
using DEM_MVC_DAL.Entities;
using DEM_MVC_DAL.Interfaces.IRepositories;
using DEM_MVC_DAL.Interfaces.IUnitOfWork;
using DEM_MVC_Infrastructure.Models;
using Microsoft.Practices.ServiceLocation;

namespace DEM_MVC_BL.Services
{
    public class ForumDataLoadWriteService : IForumDataLoadWriteService
    {
        private readonly IUnitOfWorkFactory _unitOfWorkFactory;
        private readonly IConnectionFactory _connectionFactory;
        private readonly IForumModelHelper _forumModelHelper;
        private readonly IPollModelHelper _pollModelHelper;
        private readonly IForumRepository _forumEntityRepository;
        private readonly ITopicRepository _topicEntityRepository;
        private readonly IPollRepository _pollEntityRepository;
        private readonly IPostRepository _postEntityRepository;
        private readonly IBbCodeRepository _bbCodeEntityRepository;
        private readonly IConfigRepository _configEntityRepository;
        //private readonly IPostModelHelper _postModelHelper;

        public ForumDataLoadWriteService(IUnitOfWorkFactory unitOfWorkFactory, IForumModelHelper forumModelHelper,
            IPollModelHelper pollModelHelper, IForumRepository forumEntityRepository,
            ITopicRepository topicEntityRepository, IPollRepository pollEntityRepository,
            IPostRepository postEntityRepository, IBbCodeRepository bbCodeEntityRepository,
            IConfigRepository configEntityRepository, IConnectionFactory connectionFactory) //, IPostModelHelper postModelHelper
        {
            _unitOfWorkFactory = unitOfWorkFactory;
            _forumModelHelper = forumModelHelper;
            _pollModelHelper = pollModelHelper;
            _forumEntityRepository = forumEntityRepository;
            _topicEntityRepository = topicEntityRepository;
            _pollEntityRepository = pollEntityRepository;
            _postEntityRepository = postEntityRepository;
            _bbCodeEntityRepository = bbCodeEntityRepository;
            _configEntityRepository = configEntityRepository;
            _connectionFactory = connectionFactory;
            //_postModelHelper = postModelHelper;
        }

        public List<ForumTableViewModel> GetAllForumTableViewModels()
        {
            var forumTableViewModels = new List<ForumTableViewModel>();

            try
            {
                DataTable dataTable;
                using (var unitOfWork = _unitOfWorkFactory.Create())
                {
                    dataTable = _forumEntityRepository.GetAllForums(unitOfWork);
                }
                forumTableViewModels = _forumModelHelper.TransformToHierarchy(dataTable.DataTableToList<ForumTableViewModel>());
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, "DataLoadService. Error in function GetAllForumTableViewModels");
            }
            return forumTableViewModels.OrderBy(x => x.ForumOrder).ToList();
        }

        public ForumTableViewModel GetForumTableViewModelById(int forumId)
        {
            var forumTableViewModel = new ForumTableViewModel();

            try
            {
                DataTable forumsDataTable;
                using (var unitOfWork = _unitOfWorkFactory.Create())
                {
                    forumsDataTable = _forumEntityRepository.GetAllForums(unitOfWork);
                }
                var forumTableViewModelList = _forumModelHelper.TransformToHierarchy(forumsDataTable.DataTableToList<ForumTableViewModel>());
                forumTableViewModel = _forumModelHelper.GetGorumTreeById(forumTableViewModelList, forumId);
                forumTableViewModel.SubForums = forumTableViewModel.SubForums.OrderBy(x => x.ForumOrder).ToList();
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, "DataLoadService. Error in function GetForumTableViewModelById");
            }
            return forumTableViewModel;
        }

        public ForumShowViewModel GetForumShowViewModelById(int forumId)
        {
            var forumShowViewModel = new ForumShowViewModel();
            try
            {
                DataTable forumDataTable;
                using (var unitOfWork = _unitOfWorkFactory.Create())
                {
                    forumDataTable = _forumEntityRepository.GetForumById(forumId, unitOfWork);
                }
                forumShowViewModel = forumDataTable.DataTableToModel<ForumShowViewModel>();
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, "DataLoadService. Error in function GetTopicShowViewModelById");
            }
            return forumShowViewModel;
        }

        public List<TopicTableViewModel> GetTopicTableViewModelsByForumId(int forumId, int onPage, int? page)
        {
            var topicTableViewModels = new List<TopicTableViewModel>();

            try
            {
                DataTable topicsDataTable;
                using (var unitOfWork = _unitOfWorkFactory.Create())
                {
                    topicsDataTable = _topicEntityRepository.GetAllTopicsByForumId(forumId, unitOfWork, onPage, page);
                }
                topicTableViewModels = topicsDataTable.DataTableToList<TopicTableViewModel>();
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, "DataLoadService. Error in function GetTopicTableViewModelsByForumId");
            }
            return topicTableViewModels.OrderByDescending(x => x.LastPostTime).ToList();
        }

        public TopicShowViewModel GetTopicShowViewModelById(int topicId)
        {
            var topicShowViewModel = new TopicShowViewModel();
            try
            {
                DataTable topicDataTable;
                using (var unitOfWork = _unitOfWorkFactory.Create())
                {
                    topicDataTable = _topicEntityRepository.GetTopicById(topicId, unitOfWork);
                }
                topicShowViewModel = topicDataTable.DataTableToModel<TopicShowViewModel>();
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, "DataLoadService. Error in function GetTopicShowViewModelById");
            }
            return topicShowViewModel;
        }

        public List<PollViewModel> GetPollViewModelWithOptionsByTopicId(int topicId)
        {
            var pollViewModels = new List<PollViewModel>();
            var pollOptionsViewModels = new List<PollOptionViewModel>();
            try
            {
                DataSet dataSet;
                using (var unitOfWork = _unitOfWorkFactory.Create())
                {
                    dataSet = _pollEntityRepository.GetPollWithOptionsByTopicId(topicId, unitOfWork);
                }
                pollViewModels = dataSet.Tables["Polls"].DataTableToList<PollViewModel>();
                pollOptionsViewModels = dataSet.Tables["PollsOptions"].DataTableToList<PollOptionViewModel>();

                foreach (var pollViewModel in pollViewModels)
                {
                    var pollsOptionViewModels = pollOptionsViewModels.Where(x => x.PollId == pollViewModel.PollId).OrderBy(x => x.PollOptionId).ToList();
                    pollsOptionViewModels = _pollModelHelper.CalculatePollOptionTotalPercent(pollsOptionViewModels);
                    pollViewModel.PollOptionList = pollsOptionViewModels;
                }
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, "DataLoadService. Error in function GetPollViewModelByTopicId");
            }
            return pollViewModels;
        }

        public List<PostTableViewModel> GetPostTableViewModelsByTopicId(int topicId, int onPage, int? page)
        {
            var postTableViewModels = new List<PostTableViewModel>();
            var userTableViewModels = new List<UserTableViewModelForPosts>();
            try
            {
                DataSet dataSet;
                using (var unitOfWork = _unitOfWorkFactory.Create())
                {
                    dataSet = _postEntityRepository.GetAllPostsWithUsersByTopicId(topicId, unitOfWork, onPage, page);
                }
                postTableViewModels = dataSet.Tables["Posts"].DataTableToList<PostTableViewModel>();
                userTableViewModels = dataSet.Tables["Users"].DataTableToList<UserTableViewModelForPosts>();

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
                DemLogger.Current.Error(exception, "DataLoadService. Error in function GetPostTableViewModelsByTopicId");
            }
            return postTableViewModels;
        }

        public List<BbCodeModel> GetAllBbCodeModels()
        {
            var bbCodeModels = new List<BbCodeModel>();

            try
            {
                List<BbCodeEntity> bbCodeEntities = _bbCodeEntityRepository.GetAllBbCodes(_connectionFactory);

                Mapper.CreateMap<BbCodeEntity, BbCodeModel>();
                bbCodeModels = Mapper.Map<List<BbCodeEntity>, List<BbCodeModel>>(bbCodeEntities);
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, "DataLoadService. Error in function GetAllBbCodeModels");
            }
            return bbCodeModels;
        }

        public List<ConfigModel> GetAllConfigModels()
        {
            var configModels = new List<ConfigModel>();

            try
            {
                DataTable dataTable;
                using (var unitOfWork = _unitOfWorkFactory.Create())
                {
                    dataTable = _configEntityRepository.GetAllConfigs(unitOfWork);
                }
                configModels = dataTable.DataTableToList<ConfigModel>();
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, "DataLoadService. Error in function GetAllConfigModels");
            }
            return configModels;
        }
    }
}
