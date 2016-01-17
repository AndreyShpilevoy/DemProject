using DEM_MVC_DAL.Services;
using DEM_MVC_Infrastructure.Models;

namespace DEM_MVC_DAL.Entities.IdentityPermissionEntities
{
    public abstract class IdentityPermissionEntity
    {
        public int Id { get; set; }

        [Column(Name = "permission_Id")]
        public int PermissionId { get; set; }

        [Column(Name = "forums_id")]
        public string ForumsId { get; set; }

        [Column(Name = "state")]
        public int SettingsState { get; set; }

        public IdentityPermissionType Type { get; set; }
    }
}