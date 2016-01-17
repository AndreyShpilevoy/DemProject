using System.Collections.Generic;
using DEM_MVC_BL.Models.PollOptionModels;

namespace DEM_MVC_BL.Interfaces.IServices.IModelsHelpers
{
    public interface IPollOptionModelHelper
    {
        List<PollOptionViewModel> CalculatePollOptionTotalPercent(List<PollOptionViewModel> pollsOptionViewModels);
    }
}