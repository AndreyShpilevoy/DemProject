using System;
using System.Collections.Generic;

namespace DEM_MVC_BL.Models.ForumModels
{
    public class ForumInfoViewModel
    {
        public int ForumId { get; set; }
        public int TopicsCount { get; set; }
        public int SubForumsCount { get; set; }
        public int PagesCount { get; set; }
        public int PageNumber { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int ParentId { get; set; }
        public List<Tuple<int, string>> Parents { get; set; }
    }
}