using System;
using System.Collections.Generic;

namespace DEM_MVC_BL.Models.ForumModels
{
    public class ForumTableViewModel
    {
        public int ForumId { get; set; }
        public int ParentId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public bool DisplaySubForums { get; set; }
        public bool DisplayOnIndex { get; set; }
        public int TopicsCount { get; set; }
        public int PostsCount { get; set; }
        public DateTime LastPostTime { get; set; }
        public int UserId { get; set; }
        public string Username { get; set; }
        public string GroupColor { get; set; }
        public string LastTopicTitle { get; set; }
        public int LastTopicId { get; set; }
        public int ForumOrder { get; set; }
        public List<ForumTableViewModel> SubForums { get; set; }

        public ForumTableViewModel()
        {
            SubForums = new List<ForumTableViewModel>();
        }
    }
}