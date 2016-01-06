using DEM_MVC_DAL.Services;

namespace DEM_MVC_DAL.Entities
{
    public class GroupIdentityEntity
    {
        [Column(Name = "group_id")]
        public int Id { get; set; }

        [Column(Name = "group_name")]
        public string Name { get; set; }
    }
}