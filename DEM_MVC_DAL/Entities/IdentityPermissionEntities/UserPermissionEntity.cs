using DEM_MVC_DAL.Services;

namespace DEM_MVC_DAL.Entities.IdentityPermissionEntities
{
    public class UserPermissionEntity : IdentityPermissionEntity
    {
        [Column(Name = "user_id")]
        public int UserId
        {
            get { return Id; }
            set { Id = value; }
        }
    }
}