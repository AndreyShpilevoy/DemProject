using System.Collections.Generic;
using DEM_MVC_DAL.Entities.ConfigEntities;
using DEM_MVC_DAL.Interfaces.IFactory;

namespace DEM_MVC_DAL.Interfaces.IRepositories
{
    public interface IConfigRepository
    {
        List<ConfigEntity> GetAllConfigs(IConnectionFactory connectionFactory);
    }
}