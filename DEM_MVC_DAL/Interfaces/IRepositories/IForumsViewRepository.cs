using System.Collections.Generic;
using DEM_MVC_DAL.Entities.ForumsViewEntities;
using DEM_MVC_DAL.Interfaces.IFactory;

namespace DEM_MVC_DAL.Interfaces.IRepositories
{
    public interface IForumsViewRepository
    {
        List<ForumsViewEntity> GetAllForums(IConnectionFactory connectionFactory);

        ForumsViewEntity GetForumInfoById(int forumId, IConnectionFactory connectionFactory);

        int GetForumIdByTopicId(int topicId, IConnectionFactory connectionFactory);
    }
}