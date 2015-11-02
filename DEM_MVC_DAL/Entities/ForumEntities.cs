using System;
using DEM_MVC_DAL.Services;

namespace DEM_MVC_DAL.Entities
{
    public class ForumEntity
    {
        [Column(Name = "forum_id")]
        public int ForumId { get; set; }

        [Column(Name = "parent_id")]
        public int ParentId { get; set; }

        [Column(Name = "forum_name")]
        public string Title { get; set; }

        [Column(Name = "forum_desc")]
        public string Description { get; set; }

        [Column(Name = "display_subforum_list")]
        public bool DisplaySubForums { get; set; }

        [Column(Name = "display_on_index")]
        public bool DisplayOnIndex { get; set; }

        [Column(Name = "sub_forums_count")]
        public int SubForumsCount { get; set; }

        [Column(Name = "topics_count")]
        public int TopicsCount { get; set; }

        [Column(Name = "posts_count")]
        public int PostsCount { get; set; }

        [Column(Name = "last_post_time")]
        public DateTime LastPostTime { get; set; }

        [Column(Name = "user_id")]
        public int UserId { get; set; }

        [Column(Name = "username")]
        public string Username { get; set; }

        [Column(Name = "group_colour")]
        public string GroupColor { get; set; }

        [Column(Name = "last_topic_title")]
        public string LastTopicTitle { get; set; }

        [Column(Name = "last_topic_id")]
        public int LastTopicId { get; set; }

        [Column(Name = "forum_order")]
        public int ForumOrder { get; set; }
    }
}