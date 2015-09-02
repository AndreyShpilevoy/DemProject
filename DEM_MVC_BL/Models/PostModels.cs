using System;
using System.Collections.Generic;
using DEM_MVC_BL.Services.ModelsHelpers;

namespace DEM_MVC_BL.Models
{
    public class PostTableViewModel
    {
        private string _postText;
        public int PostId { get; set; }
        public int UserId { get; set; }

        public DateTime PostTime { get; set; }
        public string PostSubject { get; set; }

        public string PostText
        {
            get { return _postText; }
            set { _postText = BbCodeHelper.BbCodeReplacerToHtml(value); }
        }

        public int PostRate { get; set; }
        public int PostReportsCount { get; set; }

        public int PostEditUserId { get; set; }
        public DateTime PostEditTime { get; set; }
        public string PostEditReason { get; set; }
        public int PostEditCount { get; set; }

        public WarningPostTableViewModel PostWarning { get; set; }
        public UserTableViewModelForPosts User { get; set; }
        public UserTableViewModelForPosts EditUser { get; set; }
    }
}