using DEM_MVC_DAL.Services;

namespace DEM_MVC_DAL.Entities.PermissionEntities
{
    public class PermissionEntity
    {
        [Column(Name = "permission_Id")]
        public int PermissionId { get; set; }

        [Column(Name = "permission_Title")]
        public int PermissionTitle { get; set; }
    }
}