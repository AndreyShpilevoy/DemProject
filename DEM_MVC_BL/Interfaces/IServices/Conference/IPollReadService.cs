using System.Collections.Generic;
using DEM_MVC_BL.Models.PollModels;

namespace DEM_MVC_BL.Interfaces.IServices.Conference
{
    public interface IPollReadService
    {
        List<PollViewModel> GetPollViewModelWithOptionsByTopicId(int topicId);
    }
}