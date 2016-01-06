using System;

namespace DEM_MVC_BL.Models.ForumModels
{
    public class WarningPostTableViewModel
    {
        public string PostWarningText { get; set; }
        public string PostWarningType { get; set; }
        public int PostWarningDays { get; set; }
        public DateTime PostWarningTime { get; set; }

        public UserTableViewModelForPosts UserWhoCreateWarning { get; set; }
    }
}