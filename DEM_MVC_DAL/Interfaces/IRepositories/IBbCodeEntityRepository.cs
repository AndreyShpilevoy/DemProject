using System.Data;

namespace DEM_MVC_DAL.Interfaces.IRepositories
{
    public interface IBbCodeEntityRepository
    {
        DataTable GetAllBbCodes(IUnitOfWork.IUnitOfWork unitOfWork);
    }
}