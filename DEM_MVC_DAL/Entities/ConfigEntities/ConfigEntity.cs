using DEM_MVC_DAL.Services;

namespace DEM_MVC_DAL.Entities.ConfigEntities
{
    public class ConfigEntity
    {
        [Column(Name = "config_name")]
        public string ConfigName { get; set; }

        [Column(Name = "config_value")]
        public string ConfigValue { get; set; }
    }
}