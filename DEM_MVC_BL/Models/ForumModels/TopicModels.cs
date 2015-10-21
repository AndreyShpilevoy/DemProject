using System;
using System.Collections.Generic;
using DEM_MVC_BL.Services.ModelsHelpers;

namespace DEM_MVC_BL.Models
{
    public class TopicTableViewModel
    {
        public int TopicId { get; set; }
        public string Title { get; set; }

        public string TopicStarterUsername { get; set; }
        public int TopicStarterUserId { get; set; }
        public string TopicStarterGroupcolor { get; set; }
        public DateTime TopicStartTime { get; set; }

        public int PostsCount { get; set; }
        public int TopicViews { get; set; }

        public DateTime LastPostTime { get; set; }
        public int LastPostUserId { get; set; }
        public string LastPostUsername { get; set; }
        public string LastPostGroupcolor { get; set; }

        public int LastPostId { get; set; }
        public bool TopicClosed { get; set; }

        public int PagesCount
        {
            get
            {
                var result = (int)Math.Ceiling((double)PostsCount / ConfigHelper.GetPostsOnPageCount());
                return result;
            }
        }
    }

    public class TopicShowViewModel
    {
        public int TopicId { get; set; }
        public int ForumId { get; set; }
        public string Title { get; set; }

        public bool TopicFirstPostShow { get; set; }
        public bool TopicClosed { get; set; }

        public bool PollsEnabled { get; set; }
        public bool PollsOnly { get; set; }

        public int PostsCount { get; set; }
        public int PagesCount
        {
            get
            {
                var result = (int) Math.Ceiling((double) PostsCount/ConfigHelper.GetPostsOnPageCount());
                return result;
            }
        }
        public int PageNumber { get; set; }
    }
}