using System.Data;

namespace DEM_MVC_DAL.Interfaces.IRepositories
{
    public interface IConfigRepository
    {
        DataTable GetAllConfigs(IUnitOfWork.IUnitOfWork unitOfWork);
    }
}