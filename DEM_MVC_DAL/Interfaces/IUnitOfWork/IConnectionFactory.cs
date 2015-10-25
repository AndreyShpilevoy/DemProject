using System.Data;

namespace DEM_MVC_DAL.Interfaces.IUnitOfWork
{
    public interface IConnectionFactory
    {
        IDbConnection Create();
    }
}