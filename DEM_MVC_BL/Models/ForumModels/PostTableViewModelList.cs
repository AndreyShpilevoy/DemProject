using System;
using System.Collections.Generic;
using DEM_MVC_BL.Services.ModelsHelpers;

namespace DEM_MVC_BL.Models.ForumModels
{
    public class PostTableViewModelList
    {
        public List<PostTableViewModel> PostTableViewModel { get; set; }
        public int PageNumber { get; set; }
    }
}