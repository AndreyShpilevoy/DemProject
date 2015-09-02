using System.Data;

namespace DEM_MVC_DAL.Interfaces.IRepositories
{
    public interface IConfigEntityRepository
    {
        DataTable GetAllConfigs(IUnitOfWork.IUnitOfWork unitOfWork);
    }
}