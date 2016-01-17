using System.Collections.Generic;
using DEM_MVC_DAL.Entities.PollEntities;
using DEM_MVC_DAL.Interfaces.IFactory;

namespace DEM_MVC_DAL.Interfaces.IRepositories
{
    public interface IPollRepository
    {
        List<PollEntity> GetPollsByTopicId(int topicId, IConnectionFactory connectionFactory);
    }
}