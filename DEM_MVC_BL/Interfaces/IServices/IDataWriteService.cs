using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DEM_MVC_BL.Models;
using DEM_MVC_BL.Models.ForumModels;

namespace DEM_MVC_BL.Interfaces.IServices
{
    public interface IDataWriteService
    {
        void CreateNewPost(NewPostModel newPostModel);
    }
}
