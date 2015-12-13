using System.Runtime.InteropServices;
using DEM_MVC_DAL.Services;

namespace DEM_MVC_DAL.Entities
{
    public class PermissionEntity
    {
        [Column(Name = "permission_Id")]
        public int PermissionId { get; set; }

        [Column(Name = "permission_Title")]
        public int PermissionTitle { get; set; }
    }

    public abstract class IdentityPermissionEntity
    {
        public int Id { get; set; }

        [Column(Name = "permission_Id")]
        public int PermissionId { get; set; }

        [Column(Name = "forums_id")]
        public string ForumsId { get; set; }

        [Column(Name = "state")]
        public int SettingsState { get; set; }

        public string Type { get; set; }
    }

    public class UserPermissionEntity : IdentityPermissionEntity
    {
        [Column(Name = "user_id")]
        public int UserId
        {
            get { return Id; }
            set { Id = value; }
        }
    }

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