using System.Collections.Generic;
using System.Data;
using DEM_MVC_DAL.Entities;
using DEM_MVC_DAL.Interfaces.IFactory;

namespace DEM_MVC_DAL.Interfaces.IRepositories
{
    public interface IPollRepository
    {
        List<PollEntity> GetPollsByTopicId(int topicId, IConnectionFactory connectionFactory);
        List<PollOptionEntity> GetPollOptionsByPollsId(List<int> pollIdList, IConnectionFactory connectionFactory);
    }
}