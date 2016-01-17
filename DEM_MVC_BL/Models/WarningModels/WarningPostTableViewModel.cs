using System;
using DEM_MVC_BL.Models.PostModels;

namespace DEM_MVC_BL.Models.WarningModels
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