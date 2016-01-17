using System;
using DEM_MVC_BL.Models.WarningModels;

namespace DEM_MVC_BL.Models.PostModels
{
    public class PostTableViewModel
    {
        public int PostId { get; set; }
        public int UserId { get; set; }
        public int TopicId { get; set; }

        public DateTime PostTime { get; set; }
        public string PostSubject { get; set; }
        public string PostText { get; set; }
        public int PostRate { get; set; }

        public int PostEditUserId { get; set; }
        public DateTime PostEditTime { get; set; }
        public string PostEditReason { get; set; }
        public int PostEditCount { get; set; }

        public WarningPostTableViewModel PostWarning { get; set; }
        public UserTableViewModelForPosts User { get; set; }
        public UserTableViewModelForPosts EditUser { get; set; }
    }
}