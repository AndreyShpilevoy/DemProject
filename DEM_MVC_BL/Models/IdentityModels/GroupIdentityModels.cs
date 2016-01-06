using Microsoft.AspNet.Identity;

namespace DEM_MVC_BL.Models.IdentityModels
{

    public class IdentityGroup : IRole<int>
    {
        public IdentityGroup()
        {
            //  Id = Guid.NewGuid().ToString();
        }

        public IdentityGroup(string name) : this()
        {
            Name = name;
        }

        public IdentityGroup(string name, int id)
        {
            Name = name;
            Id = id;
        }
        
        public int Id { get; set; }
        
        public string Name { get; set; }
    }
}