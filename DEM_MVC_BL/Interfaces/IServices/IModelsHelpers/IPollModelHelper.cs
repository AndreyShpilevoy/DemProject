using System.Collections.Generic;
using DEM_MVC_BL.Models.PollOptionModels;

namespace DEM_MVC_BL.Interfaces.IServices.IModelsHelpers
{
    public interface IPollModelHelper
    {
        List<PollOptionViewModel> CalculatePollOptionTotalPercent(List<PollOptionViewModel> pollsOptionViewModels);
    }
}