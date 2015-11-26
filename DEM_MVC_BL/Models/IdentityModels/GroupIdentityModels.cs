using Microsoft.AspNet.Identity;

namespace DEM_MVC_BL.Models.IdentityModels
{

    public class IdentityRole : IRole<int>
    {
        public IdentityRole()
        {
            //  Id = Guid.NewGuid().ToString();
        }

        public IdentityRole(string name) : this()
        {
            Name = name;
        }

        public IdentityRole(string name, int id)
        {
            Name = name;
            Id = id;
        }
        
        public int Id { get; set; }
        
        public string Name { get; set; }
    }
}