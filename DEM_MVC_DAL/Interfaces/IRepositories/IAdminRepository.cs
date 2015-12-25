using System.Collections.Generic;
using System.Data;
using DEM_MVC_DAL.Entities;
using DEM_MVC_DAL.Interfaces.IFactory;

namespace DEM_MVC_DAL.Interfaces.IRepositories
{
    public interface IAdminRepository
    {
        bool DeletePost(int postId, IConnectionFactory connectionFactory);

        bool BanUser(int userId, IConnectionFactory connectionFactory);

        bool UnbanUser(int userId, IConnectionFactory connectionFactory);
    }
}