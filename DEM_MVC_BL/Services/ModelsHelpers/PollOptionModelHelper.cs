using System.Collections.Generic;
using System.Linq;
using DEM_MVC_BL.Interfaces.IServices.IModelsHelpers;
using DEM_MVC_BL.Models.PollOptionModels;

namespace DEM_MVC_BL.Services.ModelsHelpers
{
    public class PollOptionModelHelper : IPollOptionModelHelper
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