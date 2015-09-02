using System.Data;

namespace DEM_MVC_DAL.Interfaces.IRepositories
{
    public interface IPostEntityRepository
    {
        DataSet GetAllPostsWithUsersByTopicId(int topicId, IUnitOfWork.IUnitOfWork unitOfWork, int onPage, int? page);
    }
}