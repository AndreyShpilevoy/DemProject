using System;
using System.Collections.Generic;
using System.Linq;
using DEM_MVC_BL.Interfaces.IServices.IModelsHelpers;
using DEM_MVC_BL.Models;
using DEM_MVC_BL.Models.ForumModels;
using DEM_MVC_Infrastructure.Models;
using Microsoft.Practices.ServiceLocation;
using NLog;

namespace DEM_MVC_BL.Services.ModelsHelpers
{
    public class PollModelHelper : IPollModelHelper
    {
        public List<PollOptionViewModel> CalculatePollOptionTotalPercent(List<PollOptionViewModel> pollsOptionViewModels)
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