using System;
using DEM_MVC_DAL.Services;

namespace DEM_MVC_DAL.Entities
{
    public class PostEntity
    {

        [Column(Name = "post_id")]
        public int PostId { get; set; }

        [Column(Name = "user_id")]
        public int UserId { get; set; }

        [Column(Name = "topic_id")]
        public int TopicId { get; set; }

        [Column(Name = "post_time")]
        public DateTime PostTime { get; set; }

        [Column(Name = "post_subject")]
        public string PostSubject { get; set; }

        [Column(Name = "post_text")]
        public string PostText { get; set; }

        [Column(Name = "post_rate")]
        public int PostRate { get; set; }

        [Column(Name = "post_edit_user")]
        public int PostEditUserId { get; set; }

        [Column(Name = "post_edit_time")]
        public DateTime PostEditTime { get; set; }

        [Column(Name = "post_edit_reason")]
        public string PostEditReason { get; set; }

        [Column(Name = "post_edit_count")]
        public int PostEditCount { get; set; }
    }
}