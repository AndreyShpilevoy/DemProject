using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using DEM_MVC_BL.Interfaces.IServices.Conference;
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
        private readonly IPollRepository _pollRepository;
        private readonly IPollOptionRepository _pollOptionRepository;

        public PollReadService(IConnectionFactory connectionFactory,
            IPollRepository pollRepository,
            IPollOptionRepository pollOptionRepository)
        {
            _connectionFactory = connectionFactory;
            _pollRepository = pollRepository;
            _pollOptionRepository = pollOptionRepository;
        }

        public List<PollViewModel> GetPollViewModelWithOptionsByTopicId(int topicId)
        {
            var pollViewModels = new List<PollViewModel>();
            var pollOptionsViewModels = new List<PollOptionViewModel>();

            try
            {
                var pollEntities = _pollRepository.GetPollsByTopicId(topicId, _connectionFactory);
                var pollOptionEntities = _pollOptionRepository.GetPollOptionsByPollsId(pollEntities.Select(x => x.PollId).ToList(), _connectionFactory);

                pollViewModels = Mapper.Map<List<PollEntity>, List<PollViewModel>>(pollEntities);
                pollOptionsViewModels = Mapper.Map<List<PollOptionEntity>, List<PollOptionViewModel>>(pollOptionEntities);

                foreach (var pollViewModel in pollViewModels)
                {
                    var pollsOptionViewModels = pollOptionsViewModels.Where(x => x.PollId == pollViewModel.PollId).OrderBy(x => x.PollOptionId).ToList();
                    pollsOptionViewModels = CalculatePollOptionTotalPercent(pollsOptionViewModels);
                    pollViewModel.PollOptionList = pollsOptionViewModels;
                }
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, $"{nameof(PollReadService)}. Error in function {DemLogger.GetCallerInfo()}");
            }
            return pollViewModels;
        }

        private List<PollOptionViewModel> CalculatePollOptionTotalPercent(List<PollOptionViewModel> pollsOptionViewModels)
        {
            double totalVotes = pollsOptionViewModels.Sum(x => x.PollOptionTotal);
            foreach (var pollsOptionViewModel in pollsOptionViewModels)
            {
                pollsOptionViewModel.PollOptionTotalPercent = (100 * pollsOptionViewModel.PollOptionTotal) / totalVotes;
            }
            return pollsOptionViewModels;
        }
    }
}