using System.Collections.Generic;

namespace DEM_MVC_BL.Models.ForumModels
{
    public class PostTableViewModelList
    {
        public List<PostTableViewModel> PostTableViewModel { get; set; }
        public int PageNumber { get; set; }
    }
}