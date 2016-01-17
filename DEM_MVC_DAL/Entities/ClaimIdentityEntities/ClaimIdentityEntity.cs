using DEM_MVC_DAL.Services;

namespace DEM_MVC_DAL.Entities.ClaimIdentityEntities
{
    public class ClaimIdentityEntity
    {
        [Column(Name = "id")]
        public string Id { get; set; }

        [Column(Name = "user_id")]
        public int UserId { get; set; }

        [Column(Name = "claim_type")]
        public string ClaimType { get; set; }

        [Column(Name = "claim_value")]
        public string ClaimValue { get; set; }
    }
}