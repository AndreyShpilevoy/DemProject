using System.Data;

namespace DEM_MVC_DAL.Interfaces.IRepositories
{
    public interface IForumEntityRepository
    {
        DataTable GetAllForums(IUnitOfWork.IUnitOfWork unitOfWork);
        
        DataTable GetForumById(int forumId, IUnitOfWork.IUnitOfWork unitOfWork);
    }
}