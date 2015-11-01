using System;
using DEM_MVC_DAL.Services;

namespace DEM_MVC_DAL.Entities
{
    public class TopicEntity
    {
        [Column(Name = "forum_id")]
        public int ForumId { get; set; }

        [Column(Name = "topic_id")]
        public int TopicId { get; set; }

        [Column(Name = "topic_title")]
        public string Title { get; set; }

        [Column(Name = "topic_starter_username")]
        public string TopicStarterUsername { get; set; }

        [Column(Name = "topic_starter_user_id")]
        public int TopicStarterUserId { get; set; }

        [Column(Name = "topic_starter_group_color")]
        public string TopicStarterGroupColor { get; set; }

        [Column(Name = "topic_start_time")]
        public DateTime TopicStartTime { get; set; }

        [Column(Name = "topic_views")]
        public int TopicViews { get; set; }

        [Column(Name = "topic_closed")]
        public bool TopicClosed { get; set; }

        [Column(Name = "topic_first_post_show")]
        public bool TopicFirstPostShow { get; set; }

        [Column(Name = "posts_count")]
        public int PostsCount { get; set; }

        [Column(Name = "last_post_time")]
        public DateTime LastPostTime { get; set; }

        [Column(Name = "last_post_user_id")]
        public int LastPostUserId { get; set; }

        [Column(Name = "last_post_username")]
        public string LastPostUsername { get; set; }

        [Column(Name = "last_post_group_color")]
        public string LastPostGroupColor { get; set; }

        [Column(Name = "last_post_id")]
        public int LastPostId { get; set; }

        [Column(Name = "polls_enabled")]
        public bool PollsEnabled { get; set; }

        [Column(Name = "polls_only")]
        public bool PollsOnly { get; set; }
    }
}