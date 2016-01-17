using Microsoft.AspNet.Identity;

namespace DEM_MVC_BL.Models.IdentityGroupModels
{

    public class IdentityGroupModel : IRole<int>
    {
        public IdentityGroupModel()
        {
            //  Id = Guid.NewGuid().ToString();
        }

        public IdentityGroupModel(string name) : this()
        {
            Name = name;
        }

        public IdentityGroupModel(string name, int id)
        {
            Name = name;
            Id = id;
        }
        
        public int Id { get; set; }
        
        public string Name { get; set; }
    }
}