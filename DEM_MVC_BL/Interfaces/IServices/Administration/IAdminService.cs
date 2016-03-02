namespace DEM_MVC_BL.Interfaces.IServices.Administration
{
    public interface IAdminService
    {
        bool DeletePost(int postId);

        bool BanUser(int userId);

        bool UnbanUser(int userId);
    }
}
