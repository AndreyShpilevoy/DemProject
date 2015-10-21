using System.Data;

namespace DEM_MVC_DAL.Interfaces.IRepositories
{
    public interface IPostRepository
    {
        DataSet GetAllPostsWithUsersByTopicId(int topicId, IUnitOfWork.IUnitOfWork unitOfWork, int onPage, int? page);
    }
}