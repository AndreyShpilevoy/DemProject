namespace DEM_MVC_BL.Models.ForumModels
{
    public class TopicInfoViewModel
    {
        public int TopicId { get; set; }
        public int ForumId { get; set; }
        public string Title { get; set; }

        public bool TopicFirstPostShow { get; set; }
        public bool TopicClosed { get; set; }

        public bool PollsEnabled { get; set; }
        public bool PollsOnly { get; set; }

        public int PostsCount { get; set; }
        public int PagesCount { get; set; }
        public int PageNumber { get; set; }
    }
}