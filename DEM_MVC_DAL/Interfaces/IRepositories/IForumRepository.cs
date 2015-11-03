using System.Collections.Generic;
using System.Data;
using DEM_MVC_DAL.Entities;
using DEM_MVC_DAL.Interfaces.IFactory;

namespace DEM_MVC_DAL.Interfaces.IRepositories
{
    public interface IForumRepository
    {
        List<ForumEntity> GetAllForums(IConnectionFactory connectionFactory);

        ForumEntity GetForumInfoById(int forumId, IConnectionFactory connectionFactory);
    }
}