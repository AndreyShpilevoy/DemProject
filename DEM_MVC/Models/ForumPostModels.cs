using System;

namespace DEM_MVC.Models
{
    public class CreatePostModel
    {
        public string PostTitle { get; set; }

        public string PostBody { get; set; }

        public int PostTopicId { get; set; }

        public int PostUserId { get; set; }

        public DateTime PostTime { get; set; }

    }
}