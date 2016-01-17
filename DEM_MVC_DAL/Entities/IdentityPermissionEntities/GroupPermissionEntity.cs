using DEM_MVC_DAL.Services;

namespace DEM_MVC_DAL.Entities.IdentityPermissionEntities
{
    public class GroupPermissionEntity : IdentityPermissionEntity
    {
        [Column(Name = "group_id")]
        public int GroupId
        {
            get { return Id; }
            set { Id = value; }
        }
    }
}