using System.Data;

namespace DEM_MVC_DAL.Interfaces.IRepositories
{
    public interface ITopicRepository
    {
        DataTable GetAllTopicsByForumId(int forumId, IUnitOfWork.IUnitOfWork unitOfWork, int onPage, int? page);
        DataTable GetTopicById(int topicId, IUnitOfWork.IUnitOfWork unitOfWork);
    }
}