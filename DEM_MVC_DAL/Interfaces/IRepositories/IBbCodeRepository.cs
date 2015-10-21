using System.Data;

namespace DEM_MVC_DAL.Interfaces.IRepositories
{
    public interface IBbCodeRepository
    {
        DataTable GetAllBbCodes(IUnitOfWork.IUnitOfWork unitOfWork);
    }
}