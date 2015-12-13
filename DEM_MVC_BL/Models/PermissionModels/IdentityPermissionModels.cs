namespace DEM_MVC_BL.Models.PermissionModels
{
    public class IdentityPermissionModel
    {
        public int Id { get; set; }

        public int PermissionId { get; set; }
        
        public string ForumsId { get; set; }
        
        public bool SettingsState { get; set; }

        public string Type { get; set; }
    }
}