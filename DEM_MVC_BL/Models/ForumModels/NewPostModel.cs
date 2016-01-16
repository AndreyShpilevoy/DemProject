using System;

namespace DEM_MVC_BL.Models.ForumModels
{
    public class NewPostModel
    {
        public string PostSubject { get; set; }

        public string PostText { get; set; }

        public int TopicId { get; set; }

        public int UserId { get; set; }

        public DateTime PostTime { get; set; }
    }
}