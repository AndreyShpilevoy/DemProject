using DEM_MVC_BL.Models.ForumModels;

namespace DEM_MVC_BL.Interfaces.IServices
{
    public interface IDataWriteService
    {
        void CreateNewPost(NewPostModel newPostModel);
    }
}
