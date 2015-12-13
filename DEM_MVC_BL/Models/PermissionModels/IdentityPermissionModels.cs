namespace DEM_MVC_BL.Models.PermissionModels
{
    public class IdentityPermissionModel
    {
        public int Id { get; set; }

        public int PermissionId { get; set; }
        
        public int ForumsId { get; set; }
        
        public int SettingsState { get; set; }
    }
}