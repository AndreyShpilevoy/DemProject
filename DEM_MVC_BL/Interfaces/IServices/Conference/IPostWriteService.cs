using DEM_MVC_BL.Models.PostModels;

namespace DEM_MVC_BL.Interfaces.IServices.Conference
{
    public interface IPostWriteService
    {
        void CreateNewPost(NewPostModel newPostModel);
    }
}
