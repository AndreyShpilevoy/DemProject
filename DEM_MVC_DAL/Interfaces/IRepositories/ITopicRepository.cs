using System.Collections.Generic;
using DEM_MVC_DAL.Entities;
using DEM_MVC_DAL.Interfaces.IFactory;

namespace DEM_MVC_DAL.Interfaces.IRepositories
{
    public interface ITopicRepository
    {
        List<TopicEntity> GetTopicsByForumId(int forumId, IConnectionFactory connectionFactory, int onPage, int? page);
        TopicEntity GetTopicById(int topicId, IConnectionFactory connectionFactory);
    }
}