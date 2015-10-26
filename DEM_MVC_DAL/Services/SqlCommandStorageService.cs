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
                        FROM DEM_Project.dbo.AllForums";
        }
    }
}
