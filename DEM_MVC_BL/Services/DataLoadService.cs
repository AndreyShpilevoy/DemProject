using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using DEM_MVC_BL.ExtensionMethods;
using DEM_MVC_BL.Interfaces.IServices;
using DEM_MVC_BL.Interfaces.IServices.IModelsHelpers;
using DEM_MVC_BL.Models;
using DEM_MVC_DAL.Interfaces.IRepositories;
using DEM_MVC_DAL.Interfaces.IUnitOfWork;
using DEM_MVC_Infrastructure.Models;
using Microsoft.Practices.ServiceLocation;

namespace DEM_MVC_BL.Services
{
    public class DataLoadService : IDataLoadService
    {
        private readonly IUnitOfWorkFactory _unitOfWorkFactory;
        private readonly IForumModelHelper _forumModelHelper;
        private readonly IPollModelHelper _pollModelHelper;
        //private readonly IPostModelHelper _postModelHelper;

        public DataLoadService(IUnitOfWorkFactory unitOfWorkFactory, IForumModelHelper forumModelHelper, IPollModelHelper pollModelHelper)//, IPostModelHelper postModelHelper)
        {
            _unitOfWorkFactory = unitOfWorkFactory;
            _forumModelHelper = forumModelHelper;
            _pollModelHelper = pollModelHelper;
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
                    IForumEntityRepository repository = ServiceLocator.Current.GetInstance<IForumEntityRepository>();
                    dataTable = repository.GetAllForums(unitOfWork);
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
                    IForumEntityRepository forumRepository = ServiceLocator.Current.GetInstance<IForumEntityRepository>();
                    forumsDataTable = forumRepository.GetAllForums(unitOfWork);
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

        public List<TopicTableViewModel> GetTopicTableViewModelsByForumId(int forumId, int onPage, int? page)
        {
            var topicTableViewModels = new List<TopicTableViewModel>();

            try
            {
                DataTable topicsDataTable;
                using (var unitOfWork = _unitOfWorkFactory.Create())
                {
                    ITopicEntityRepository topicRepository = ServiceLocator.Current.GetInstance<ITopicEntityRepository>();
                    topicsDataTable = topicRepository.GetAllTopicsByForumId(forumId, unitOfWork, onPage, page);
                }
                topicTableViewModels = topicsDataTable.DataTableToList<TopicTableViewModel>();
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, "DataLoadService. Error in function GetTopicTableViewModelsByForumId");
            }
            return topicTableViewModels.OrderByDescending(x => x.LastPostTime).ToList();
        }

        public ForumShowViewModel GetForumShowViewModelById(int forumId)
        {
            var forumShowViewModel = new ForumShowViewModel();
            try
            {
                DataTable topicDataTable;
                using (var unitOfWork = _unitOfWorkFactory.Create())
                {
                    IForumEntityRepository topicRepository = ServiceLocator.Current.GetInstance<IForumEntityRepository>();
                    topicDataTable = topicRepository.GetForumById(forumId, unitOfWork);
                }
                forumShowViewModel = topicDataTable.DataTableToModel<ForumShowViewModel>();
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, "DataLoadService. Error in function GetTopicShowViewModelById");
            }
            return forumShowViewModel;
        }

        public TopicShowViewModel GetTopicShowViewModelById(int topicId)
        {
            var topicShowViewModel = new TopicShowViewModel();
            try
            {
                DataTable topicDataTable;
                using (var unitOfWork = _unitOfWorkFactory.Create())
                {
                    ITopicEntityRepository topicRepository = ServiceLocator.Current.GetInstance<ITopicEntityRepository>();
                    topicDataTable = topicRepository.GetTopicById(topicId, unitOfWork);
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
                    IPollEntityRepository topicRepository = ServiceLocator.Current.GetInstance<IPollEntityRepository>();
                    dataSet = topicRepository.GetPollWithOptionsByTopicId(topicId, unitOfWork);
                }
                pollViewModels = dataSet.Tables["Polls"].DataTableToList<PollViewModel>();
                pollOptionsViewModels = dataSet.Tables["PollsOptions"].DataTableToList<PollOptionViewModel>();

                foreach (var pollViewModel in pollViewModels)
                {
                    var pollsOptionViewModels  = pollOptionsViewModels.Where(x => x.PollId == pollViewModel.PollId).OrderBy(x => x.PollOptionId).ToList();
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
                    IPostEntityRepository postRepository = ServiceLocator.Current.GetInstance<IPostEntityRepository>();
                    dataSet = postRepository.GetAllPostsWithUsersByTopicId(topicId, unitOfWork, onPage, page);
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
                DataTable dataTable;
                using (var unitOfWork = _unitOfWorkFactory.Create())
                {
                    IBbCodeEntityRepository repository = ServiceLocator.Current.GetInstance<IBbCodeEntityRepository>();
                    dataTable = repository.GetAllBbCodes(unitOfWork);
                }
                bbCodeModels = dataTable.DataTableToList<BbCodeModel>();
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
                    IConfigEntityRepository repository = ServiceLocator.Current.GetInstance<IConfigEntityRepository>();
                    dataTable = repository.GetAllConfigs(unitOfWork);
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
