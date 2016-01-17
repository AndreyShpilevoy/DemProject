using DEM_MVC_DAL.Services;

namespace DEM_MVC_DAL.Entities.UserLoginInfoIdentityEntities
{
    public class UserLoginInfoIdentityEntity
    {  
        [Column(Name = "login_provider")]
        public string LoginProvider { get; set; }  
          
        [Column(Name = "provider_key")]
        public string ProviderKey { get; set; } 
           
        [Column(Name = "user_id")]
        public string UserId { get; set; }
    }
}