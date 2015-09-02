using System.Data;

namespace DEM_MVC_DAL.Interfaces.IRepositories
{
    public interface IPollEntityRepository
    {
        DataSet GetPollWithOptionsByTopicId(int topicId, IUnitOfWork.IUnitOfWork unitOfWork);
    }
}