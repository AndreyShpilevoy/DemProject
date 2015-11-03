using System.Data;

namespace DEM_MVC_DAL.Interfaces.IFactory
{
    public interface IConnectionFactory
    {
        IDbConnection Create();
    }
}