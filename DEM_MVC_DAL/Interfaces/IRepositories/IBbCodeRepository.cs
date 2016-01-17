using System.Collections.Generic;
using DEM_MVC_DAL.Entities.BbCodeEntities;
using DEM_MVC_DAL.Interfaces.IFactory;

namespace DEM_MVC_DAL.Interfaces.IRepositories
{
    public interface IBbCodeRepository
    {
        List<BbCodeEntity> GetAllBbCodes(IConnectionFactory connectionFactory);
    }
}