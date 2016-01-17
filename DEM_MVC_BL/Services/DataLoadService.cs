using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using DEM_MVC_BL.Interfaces.IServices;
using DEM_MVC_BL.Interfaces.IServices.IModelsHelpers;
using DEM_MVC_BL.Models.ForumModels;
using DEM_MVC_DAL.Entities.BbCodeEntities;
using DEM_MVC_DAL.Entities.ConfigEntities;
using DEM_MVC_DAL.Entities.ForumsViewEntities;
using DEM_MVC_DAL.Entities.PollEntities;
using DEM_MVC_DAL.Entities.PollOptionEntities;
using DEM_MVC_DAL.Entities.PostEntities;
using DEM_MVC_DAL.Entities.TopicsViewEntities;
using DEM_MVC_DAL.Entities.UserForPostViewEntities;
using DEM_MVC_DAL.Interfaces.IFactory;
using DEM_MVC_DAL.Interfaces.IRepositories;
using DEM_MVC_Infrastructure.Models;

namespace DEM_MVC_BL.Services
{
    public class DataLoadService : IDataLoadService
    {
        private readonly IConnectionFactory _connectionFactory;
        private readonly IForumModelHelper _forumModelHelper;
        private readonly IPollModelHelper _pollModelHelper;
        private readonly IForumRepository _forumEntityRepository;
        private readonly ITopicRepository _topicEntityRepository;
        private readonly IPollRepository _pollEntityRepository;
        private readonly IPostRepository _postEntityRepository;
        private readonly IBbCodeRepository _bbCodeEntityRepository;
        private readonly IConfigRepository _configEntityRepository;

        public DataLoadService(IForumModelHelper forumModelHelper,
            IPollModelHelper pollModelHelper, IForumRepository forumEntityRepository,
            ITopicRepository topicEntityRepository, IPollRepository pollEntityRepository,
            IPostRepository postEntityRepository, IBbCodeRepository bbCodeEntityRepository,
            IConfigRepository configEntityRepository, IConnectionFactory connectionFactory)
        {
            _forumModelHelper = forumModelHelper;
            _pollModelHelper = pollModelHelper;
            _forumEntityRepository = forumEntityRepository;
            _topicEntityRepository = topicEntityRepository;
            _pollEntityRepository = pollEntityRepository;
            _postEntityRepository = postEntityRepository;
            _bbCodeEntityRepository = bbCodeEntityRepository;
            _configEntityRepository = configEntityRepository;
            _connectionFactory = connectionFactory;
        }

        public List<ForumTableViewModel> GetAllForumTableViewModels()
        {
            var forumTableViewModels = new List<ForumTableViewModel>();

            try
            {
                List<ForumsViewEntity> forumViewEntities = _forumEntityRepository.GetAllForums(_connectionFactory);
                var tempForumModels = Mapper.Map<List<ForumsViewEntity>, List<ForumTableViewModel>>(forumViewEntities);

                forumTableViewModels = _forumModelHelper.TransformToHierarchy(tempForumModels);
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, $"{nameof(DataLoadService)}. Error in function {DemLogger.GetCallerInfo()}");
            }
            return forumTableViewModels.OrderBy(x => x.ForumOrder).ToList();
        }

        public ForumTableViewModel GetForumTableViewModelById(int forumId)
        {
            var forumTableViewModel = new ForumTableViewModel();

            try
            {
                List<ForumsViewEntity> forumViewEntities = _forumEntityRepository.GetAllForums(_connectionFactory);
                var tempForumModels = Mapper.Map<List<ForumsViewEntity>, List<ForumTableViewModel>>(forumViewEntities);
                var forumTableViewModelList = _forumModelHelper.TransformToHierarchy(tempForumModels);

                forumTableViewModel = _forumModelHelper.GetForumTreeById(forumTableViewModelList, forumId);
                forumTableViewModel.SubForums = forumTableViewModel.SubForums.OrderBy(x => x.ForumOrder).ToList();
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, $"{nameof(DataLoadService)}. Error in function {DemLogger.GetCallerInfo()}");
            }
            return forumTableViewModel;
        }

        public ForumInfoViewModel GetForumInfoViewModelById(int forumId)
        {
            var forumInfoViewModel = new ForumInfoViewModel();
            try
            {
                ForumsViewEntity forumViewEntity = _forumEntityRepository.GetForumInfoById(forumId, _connectionFactory);
                forumInfoViewModel = Mapper.Map<ForumsViewEntity, ForumInfoViewModel>(forumViewEntity);
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, $"{nameof(DataLoadService)}. Error in function {DemLogger.GetCallerInfo()}");
            }
            return forumInfoViewModel;
        }

        public List<TopicTableViewModel> GetTopicTableViewModelsByForumId(int forumId, int onPage, int? page)
        {
            var topicTableViewModels = new List<TopicTableViewModel>();

            try
            {
                List<TopicsViewEntity> topicViewEntities = _topicEntityRepository.GetTopicsByForumId(forumId, _connectionFactory, onPage, page);
                topicTableViewModels = Mapper.Map<List<TopicsViewEntity>, List<TopicTableViewModel>>(topicViewEntities);
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, $"{nameof(DataLoadService)}. Error in function {DemLogger.GetCallerInfo()}");
            }
            return topicTableViewModels.OrderByDescending(x => x.LastPostTime).ToList();
        }

        public TopicInfoViewModel GetTopicInfoViewModelById(int topicId)
        {
            var topicShowViewModel = new TopicInfoViewModel();
            try
            {
                TopicsViewEntity topicViewEntity = _topicEntityRepository.GetTopicById(topicId, _connectionFactory);
                topicShowViewModel = Mapper.Map<TopicsViewEntity, TopicInfoViewModel>(topicViewEntity);
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, $"{nameof(DataLoadService)}. Error in function {DemLogger.GetCallerInfo()}");
            }
            return topicShowViewModel;
        }

        public List<PollViewModel> GetPollViewModelWithOptionsByTopicId(int topicId)
        {
            var pollViewModels = new List<PollViewModel>();
            var pollOptionsViewModels = new List<PollOptionViewModel>();

            try
            {
                var pollEntities = _pollEntityRepository.GetPollsByTopicId(topicId, _connectionFactory);
                var pollOptionEntities = _pollEntityRepository.GetPollOptionsByPollsId(pollEntities.Select(x => x.PollId).ToList(), _connectionFactory);

                pollViewModels = Mapper.Map<List<PollEntity>, List<PollViewModel>>(pollEntities);
                pollOptionsViewModels = Mapper.Map<List<PollOptionEntity>, List<PollOptionViewModel>>(pollOptionEntities);

                foreach (var pollViewModel in pollViewModels)
                {
                    var pollsOptionViewModels = pollOptionsViewModels.Where(x => x.PollId == pollViewModel.PollId).OrderBy(x => x.PollOptionId).ToList();
                    pollsOptionViewModels = _pollModelHelper.CalculatePollOptionTotalPercent(pollsOptionViewModels);
                    pollViewModel.PollOptionList = pollsOptionViewModels;
                }
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, $"{nameof(DataLoadService)}. Error in function {DemLogger.GetCallerInfo()}");
            }
            return pollViewModels;
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
                userTableViewModels = Mapper.Map<List<UserForPostViewEntity>,List<UserTableViewModelForPosts>> (userForPostViewEntities);

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
                DemLogger.Current.Error(exception, $"{nameof(DataLoadService)}. Error in function {DemLogger.GetCallerInfo()}");
            }
            return postTableViewModels;
        }

        public List<BbCodeModel> GetAllBbCodeModels()
        {
            var bbCodeModels = new List<BbCodeModel>();

            try
            {
                List<BbCodeEntity> bbCodeEntities = _bbCodeEntityRepository.GetAllBbCodes(_connectionFactory);
                bbCodeModels = Mapper.Map<List<BbCodeEntity>, List<BbCodeModel>>(bbCodeEntities);
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, $"{nameof(DataLoadService)}. Error in function {DemLogger.GetCallerInfo()}");
            }
            return bbCodeModels;
        }

        public List<ConfigModel> GetAllConfigModels()
        {
            var configModels = new List<ConfigModel>();

            try
            {
                List<ConfigEntity> configEntities = _configEntityRepository.GetAllConfigs(_connectionFactory);
                configModels = Mapper.Map<List<ConfigEntity>, List<ConfigModel>>(configEntities);
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, $"{nameof(DataLoadService)}. Error in function {DemLogger.GetCallerInfo()}");
            }
            return configModels;
        }
    }
}
