using DEM_MVC_BL.Models.PostModels;

namespace DEM_MVC_BL.Interfaces.IServices
{
    public interface IDataWriteService
    {
        void CreateNewPost(NewPostModel newPostModel);
    }
}
