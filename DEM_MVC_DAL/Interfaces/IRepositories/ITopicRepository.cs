using System.Collections.Generic;
using DEM_MVC_DAL.Entities.TopicsViewEntities;
using DEM_MVC_DAL.Interfaces.IFactory;

namespace DEM_MVC_DAL.Interfaces.IRepositories
{
    public interface ITopicRepository
    {
        List<TopicsViewEntity> GetTopicsByForumId(int forumId, IConnectionFactory connectionFactory, int onPage, int? page);
        TopicsViewEntity GetTopicById(int topicId, IConnectionFactory connectionFactory);
    }
}