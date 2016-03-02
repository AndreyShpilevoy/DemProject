using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using DEM_MVC_BL.Interfaces.IServices.Conference;
using DEM_MVC_BL.Interfaces.IServices.IModelsHelpers;
using DEM_MVC_BL.Models.PollModels;
using DEM_MVC_BL.Models.PollOptionModels;
using DEM_MVC_DAL.Entities.PollEntities;
using DEM_MVC_DAL.Entities.PollOptionEntities;
using DEM_MVC_DAL.Interfaces.IFactory;
using DEM_MVC_DAL.Interfaces.IRepositories;
using DEM_MVC_Infrastructure.Models;

namespace DEM_MVC_BL.Services.Conference
{
    public class PollReadService : IPollReadService
    {
        private readonly IConnectionFactory _connectionFactory;
        private readonly IPollOptionModelHelper _pollModelHelper;
        private readonly IPollRepository _pollEntityRepository;
        private readonly IPollOptionRepository _pollOptionEntityRepository;

        public PollReadService(IConnectionFactory connectionFactory,
            IPollOptionModelHelper pollModelHelper,
            IPollRepository pollEntityRepository,
            IPollOptionRepository pollOptionEntityRepository)
        {
            _connectionFactory = connectionFactory;
            _pollModelHelper = pollModelHelper;
            _pollEntityRepository = pollEntityRepository;
            _pollOptionEntityRepository = pollOptionEntityRepository;
        }

        public List<PollViewModel> GetPollViewModelWithOptionsByTopicId(int topicId)
        {
            var pollViewModels = new List<PollViewModel>();
            var pollOptionsViewModels = new List<PollOptionViewModel>();

            try
            {
                var pollEntities = _pollEntityRepository.GetPollsByTopicId(topicId, _connectionFactory);
                var pollOptionEntities = _pollOptionEntityRepository.GetPollOptionsByPollsId(pollEntities.Select(x => x.PollId).ToList(), _connectionFactory);

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
                DemLogger.Current.Error(exception, $"{nameof(PollReadService)}. Error in function {DemLogger.GetCallerInfo()}");
            }
            return pollViewModels;
        }
    }
}