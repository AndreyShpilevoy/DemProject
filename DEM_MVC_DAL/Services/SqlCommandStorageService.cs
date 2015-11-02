using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DEM_MVC_DAL.Services
{
    static internal class SqlCommandStorageService
    {
        static internal string GetAllBbCode()
        {
            return @"SELECT bbcode_order, bbcode_tag, bbcode_helpline, display_on_posting, bbcode_match, bbcode_template, bbcode_reg_options 
                        FROM dem_bbcodes";
        }

        public static string GetAllConfigs()
        {
            return @"SELECT config_name, config_value 
                        FROM dem_config";
        }

        public static string GetAllForums()
        {
            return @"SELECT forum_id, parent_id, forum_name, forum_desc, display_subforum_list, display_on_index, topics_count, posts_count, 
                            last_post_time, user_id, username, group_colour, last_topic_title, last_topic_id, forum_order
                        FROM AllForums";
        }

        public static string GetForumInfoById()
        {
            return @"SELECT forum_id, sub_forums_count, topics_count
                        FROM AllForums
                        WHERE forum_id = @forumId";
        }

        public static string GetTopicsByForumId()
        {
            return @"SELECT topic_id, topic_title, topic_starter_username, topic_starter_user_id, topic_starter_group_color, topic_start_time,
                            posts_count, topic_views, last_post_time, last_post_user_id, last_post_username, last_post_group_color, last_post_id, 
                            topic_closed
                        FROM AllTopics
                        WHERE forum_id = @forumId
						ORDER BY AllTopics.last_post_time DESC
						Offset (@page-1)*@onpage Rows
						Fetch Next @onpage Rows Only";
        }

        public static string GetTopicById()
        {
            return @"SELECT forum_id, topic_id, topic_title, topic_first_post_show, topic_closed, polls_enabled, polls_only, posts_count
                        FROM AllTopics
                        WHERE topic_id = @topicId";
        }

        public static string GetPollsByTopicId()
        {
            return @"SELECT poll_id, poll_title, poll_start, poll_length, poll_max_options, poll_last_vote, poll_vote_change
                        FROM dem_polls
                        WHERE topic_id = @topicId";
        }

        public static string GetPollOptionsByPollsId()
        {
            return @"SELECT pollOptionsTable.poll_option_id, pollOptionsTable.poll_id, poll_option_text, COUNT(pollVotesTable.poll_option_id) AS poll_option_total
                        FROM dem_poll_options pollOptionsTable
                        LEFT JOIN dem_poll_votes pollVotesTable ON pollOptionsTable.poll_option_id = pollVotesTable.poll_option_id AND pollOptionsTable.poll_id = pollVotesTable.poll_id
                        WHERE pollOptionsTable.poll_id IN (@pollIdList)
                        GROUP BY    pollOptionsTable.poll_option_id,
			                        pollOptionsTable.poll_id,
			                        poll_option_text;";
        }
    }
}
