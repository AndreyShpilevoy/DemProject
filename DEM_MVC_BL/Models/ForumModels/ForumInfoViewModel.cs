namespace DEM_MVC_BL.Models.ForumModels
{
    public class ForumInfoViewModel
    {
        public int ForumId { get; set; }
        public int TopicsCount { get; set; }
        public int SubForumsCount { get; set; }
        public int PagesCount { get; set; }
        public int PageNumber { get; set; }
    }
}