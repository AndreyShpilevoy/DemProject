using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DEM_MVC_DAL.Services
{
    static internal class SqlCommandStorageService
    {
        internal static string GetAllBbCode()
        {
            return @"SELECT bbcode_order, 
                            bbcode_tag, 
                            bbcode_helpline, 
                            display_on_posting, 
                            bbcode_match, 
                            bbcode_template, 
                            bbcode_reg_options 

                        FROM dem_bbcodes";
        }

        internal static string GetAllConfigs()
        {
            return @"SELECT config_name, 
                            config_value 

                        FROM dem_config";
        }

        internal static string GetAllForums()
        {
            return @"SELECT forum_id, 
                            parent_id, 
                            forum_name, 
                            forum_desc, 
                            display_subforum_list, 
                            display_on_index, 
                            topics_count, 
                            posts_count, 
                            last_post_time, 
                            user_id, username, 
                            group_colour, 
                            last_topic_title, 
                            last_topic_id, 
                            forum_order

                        FROM AllForums";
        }

        internal static string GetForumInfoById()
        {
            return @"SELECT forum_id, 
                            sub_forums_count, 
                            topics_count

                        FROM AllForums
                        WHERE forum_id = @forumId";
        }

        internal static string GetTopicsByForumId()
        {
            return @"SELECT topic_id, 
                            topic_title, 
                            topic_starter_username, 
                            topic_starter_user_id, 
                            topic_starter_group_color, 
                            topic_start_time,
                            posts_count, 
                            topic_views, 
                            last_post_time, 
                            last_post_user_id, 
                            last_post_username, 
                            last_post_group_color, 
                            last_post_id, 
                            topic_closed

                        FROM AllTopics
                        WHERE forum_id = @forumId

						ORDER BY AllTopics.last_post_time DESC
						Offset (@page-1)*@onpage Rows
						Fetch Next @onpage Rows Only";
        }

        internal static string GetTopicById()
        {
            return @"SELECT forum_id, 
                            topic_id, 
                            topic_title, 
                            topic_first_post_show, 
                            topic_closed, 
                            polls_enabled, 
                            polls_only, 
                            posts_count

                        FROM AllTopics
                        WHERE topic_id = @topicId";
        }

        internal static string GetPollsByTopicId()
        {
            return @"SELECT poll_id, 
                            poll_title, 
                            poll_start, 
                            poll_length, 
                            poll_max_options, 
                            poll_last_vote, 
                            poll_vote_change

                        FROM dem_polls
                        WHERE topic_id = @topicId";
        }

        internal static string GetPollOptionsByPollsId()
        {
            return @"SELECT pollOptionsTable.poll_option_id, 
                            pollOptionsTable.poll_id, 
                            poll_option_text, 
                            COUNT(pollVotesTable.poll_option_id) AS poll_option_total

                        FROM dem_poll_options pollOptionsTable
                        LEFT JOIN dem_poll_votes pollVotesTable ON pollOptionsTable.poll_option_id = pollVotesTable.poll_option_id AND pollOptionsTable.poll_id = pollVotesTable.poll_id
                        WHERE pollOptionsTable.poll_id IN @pollIdList

                        GROUP BY    pollOptionsTable.poll_option_id,
                                    pollOptionsTable.poll_id,
			                        poll_option_text;";
        }

        internal static string GetPostsByTopicId()
        {
            return @"SELECT postsTable.post_id,
			                postsTable.user_id,
			                postsTable.topic_id,
			                postsTable.post_time,
			                postsTable.post_subject,
			                postsTable.post_text,
			                SUM(postRatesTable.rate) AS post_rate,	  
			                postsTable.post_edit_user,
			                postsTable.post_edit_time,
			                postsTable.post_edit_reason,
			                postsTable.post_edit_count
                        FROM dem_posts postsTable 				
                        LEFT JOIN dem_post_rates postRatesTable ON postsTable.post_id = postRatesTable.post_id
                        WHERE topic_id = @topicId
		
                        GROUP BY    postsTable.post_id,
		                            postsTable.user_id,
			                        postsTable.topic_id,
			                        postsTable.post_time,
			                        postsTable.post_subject,
			                        postsTable.post_text,
			                        postsTable.post_edit_count,
			                        postsTable.post_edit_user,
			                        postsTable.post_edit_time,
			                        postsTable.post_edit_reason

                        ORDER BY post_time 
                        Offset (@page-1)*@onpage Rows
                        Fetch Next @onpage Rows Only;";
        }

        internal static string GetUsersForPostsByUsersId()
        {
            return @"SELECT user_id,
                   username,
                   user_birthday,
                   user_avatar,
                   user_signature,
                   user_from,
                   user_steam,
                   user_skype,
                   user_vk,
                   user_fb,
                   user_website,
                   unique_rank_title,
                   common_rank_title,
                   user_posts_count,
                   group_colour,
                   group_avatar_url

                        FROM AllUsersForPosts
                        WHERE user_id IN @usersId;";
        }

        internal static string GroupIdentityDelete()
        {
            return @"DELETE
                        FROM dem_groups
                        WHERE group_id = @id";
        }

        internal static string GroupIdentityInsert()
        {
            return @"INSERT INTO dem_groups (group_name) VALUES (@name)";
        }

        internal static string GroupIdentityGetGroupName()
        {
            return @"SELECT group_name 
                        FROM dem_groups 
                        WHERE group_id = @id";
        }

        internal static string GroupIdentityGetGroupId()
        {
            return @"SELECT group_id
                        FROM dem_groups 
                        WHERE group_name  = @name";
        }

        internal static string GroupIdentityUpdate()
        {
            return @"UPDATE dem_groups
                        SET group_name = @name
                        WHERE group_id = @id";
        }

        internal static string GroupIdentityGetGroupById()
        {
            return @"SELECT group_id,
                            group_type,
                            group_name,
                            group_desc,
                            group_avatar_url,
                            group_colour,
                            group_legend,
                        FROM dem_groups 
                        WHERE group_id  = @id";
        }

        internal static string GroupIdentityGetGroupByName()
        {
            return @"SELECT group_id,
                            group_type,
                            group_name,
                            group_desc,
                            group_avatar_url,
                            group_colour,
                            group_legend,
                        FROM dem_groups 
                        WHERE group_name  = @name";
        }

        internal static string UserGroupsIdentityInsert()
        {
            return @"INSERT INTO dem_user_group (user_Id, group_Id) VALUES (@userId, @groupId)";
        }

        internal static string UserGroupsIdentityDelete()
        {
            return @"DELETE 
                        FROM dem_user_group 
                        WHERE user_Id = @userId";
        }

        internal static string UserGroupsIdentityFindByUserId()
        {
            return @"SELECT dem_groups.group_name 
                        FROM dem_user_group, dem_groups 
                        WHERE dem_user_group.user_Id=@userId and dem_user_group.group_Id = dem_groups.group_id";
        }

        internal static string UserClaimIsdentityRepositoryFindByUserId()
        {
            return @"SELECT id,
                            user_id,
                            claim_type,
                            claim_value
                        FROM dem_user_claim 
                        WHERE user_id=@userId";
        }

        internal static string UserClaimIsdentityRepositoryDeleteById()
        {
            return @"DELETE 
                        FROM dem_user_claim 
                        WHERE user_id = @userId";
        }

        internal static string UserClaimIsdentityRepositoryDelete()
        {
            return @"DELETE 
                        FROM dem_user_claim 
                        WHERE user_id = @userId AND @claim_value = @claimValue AND claim_type = @claimType";
        }

        internal static string UserClaimIsdentityRepositoryInsert()
        {
            return @"INSERT INTO dem_user_claim (claim_value, claim_type, user_Id) VALUES (@claimValue, @claimType, @userId)";
        }

        internal static string UserLoginsIdentityRepositoryDelete()
        {
            return @"DELETE 
                        FROM dem_user_login 
                        WHERE user_id = @userId AND login_provider = @loginProvider AND provider_key = @providerKey";
        }

        internal static string UserLoginsIdentityRepositoryDeleteById()
        {
            return @"DELETE 
                        FROM dem_user_login 
                        WHERE user_id = @userId";
        }

        internal static string UserLoginsIdentityRepositoryInsert()
        {
            return @"INSERT INTO dem_user_login (login_provider, provider_key, user_id) VALUES (@loginProvider, @providerKey, @userId)";
        }

        internal static string UserLoginsIdentityRepositoryFindUserIdByLogin()
        {
            return @"SELECT user_id 
                        FROM dem_user_login 
                        WHERE LoginProvider = @loginProvider AND ProviderKey = @providerKey";
        }

        internal static string UserLoginsIdentityRepositoryFindByUserId()
        {
            return @"SELECT login_provider, 
                            provider_key,
                            user_id   
                        FROM dem_user_login 
                        WHERE user_id = @userId";
        }

        internal static string UserIdentityRepositoryGetUserName()
        {
            return @"SELECT username 
                        FROM dem_users_test 
                        WHERE user_id=@userId";
        }

        internal static string UserIdentityRepositoryGetUserId()
        {
            return @"SELECT user_id 
                        FROM dem_users_test 
                        WHERE username=@userName";
        }

        internal static string UserIdentityRepositoryGetUserById()
        {
            return @"SELECT user_id,
	                        user_type,
	                        user_ip,
	                        user_browser,
	                        user_regdate,
                            user_email,
                            user_email_confirmed,
                            password_hash,
                            security_stamp,
                            phone_number,
                            phone_number_confirmed,
                            two_factor_enabled,
                            lockout_end_date_utc,
                            lockout_enable,
                            access_failed_count,
                            username,
	                        user_birthday,
	                        user_gender,
	                        user_lastvisit,
	                        user_lastmark,
	                        user_lastpage,
	                        user_inactive_reason,
	                        user_inactive_time,
	                        user_lang,
	                        user_timezone,
	                        user_dateformat,
	                        user_rank,
	                        user_notify,
	                        user_notify_pm,
	                        user_avatar,
	                        user_signature,
	                        user_from,
	                        user_steam,
	                        user_skype,
	                        user_icq,
	                        user_vk,
	                        user_fb,
	                        user_website,
	                        user_profession,
	                        user_interests
                        FROM dem_users_test 
                        WHERE user_id = @userId";
        }

        internal static string UserIdentityRepositoryGetUserByName()
        {
            return @"SELECT user_id,
	                        user_type,
	                        user_ip,
	                        user_browser,
	                        user_regdate,
                            user_email,
                            user_email_confirmed,
                            password_hash,
                            security_stamp,
                            phone_number,
                            phone_number_confirmed,
                            two_factor_enabled,
                            lockout_end_date_utc,
                            lockout_enable,
                            access_failed_count,
                            username,
	                        user_birthday,
	                        user_gender,
	                        user_lastvisit,
	                        user_lastmark,
	                        user_lastpage,
	                        user_inactive_reason,
	                        user_inactive_time,
	                        user_lang,
	                        user_timezone,
	                        user_dateformat,
	                        user_rank,
	                        user_notify,
	                        user_notify_pm,
	                        user_avatar,
	                        user_signature,
	                        user_from,
	                        user_steam,
	                        user_skype,
	                        user_icq,
	                        user_vk,
	                        user_fb,
	                        user_website,
	                        user_profession,
	                        user_interests
                        FROM dem_users_test 
                        WHERE username=@userName";
        }

        internal static string UserIdentityRepositoryGetUserByEmail()
        {
            return @"SELECT user_id,
	                        user_type,
	                        user_ip,
	                        user_browser,
	                        user_regdate,
                            user_email,
                            user_email_confirmed,
                            password_hash,
                            security_stamp,
                            phone_number,
                            phone_number_confirmed,
                            two_factor_enabled,
                            lockout_end_date_utc,
                            lockout_enable,
                            access_failed_count,
                            username,
	                        user_birthday,
	                        user_gender,
	                        user_lastvisit,
	                        user_lastmark,
	                        user_lastpage,
	                        user_inactive_reason,
	                        user_inactive_time,
	                        user_lang,
	                        user_timezone,
	                        user_dateformat,
	                        user_rank,
	                        user_notify,
	                        user_notify_pm,
	                        user_avatar,
	                        user_signature,
	                        user_from,
	                        user_steam,
	                        user_skype,
	                        user_icq,
	                        user_vk,
	                        user_fb,
	                        user_website,
	                        user_profession,
	                        user_interests
                        FROM dem_users_test 
                        WHERE user_email=@email";
        }

        internal static string UserIdentityRepositoryGetPasswordHash()
        {
            return @"SELECT password_hash 
                        FROM dem_users_test 
                        WHERE user_id = @userId";
        }

        internal static string UserIdentityRepositorySetPasswordHash()
        {
            return @"UPDATE dem_users_test SET password_hash = @passwordHash WHERE user_id = @userId";
        }

        internal static string UserIdentityRepositoryGetSecurityStamp()
        {
            return @"SELECT security_stamp 
                        FROM dem_users_test 
                        WHERE user_id = @userId";
        }

        internal static string UserIdentityRepositoryInsert()
        {
            return @"INSERT INTO dem_users_test
                                                    (user_type,
                                                    user_ip,
                                                    user_browser,
                                                    user_regdate,
                                                    user_email,
                                                    user_email_confirmed,
                                                    password_hash,
                                                    security_stamp,
                                                    phone_number,
                                                    phone_number_confirmed,
                                                    two_factor_enabled,
                                                    lockout_end_date_utc,
                                                    lockout_enable,
                                                    access_failed_count,
                                                    username,
                                                    user_birthday,
                                                    user_gender,
                                                    user_lastvisit,
                                                    user_lastmark,
                                                    user_lastpage,
                                                    user_inactive_reason,
                                                    user_inactive_time,
                                                    user_lang,
                                                    user_timezone,
                                                    user_dateformat,
                                                    user_rank,
                                                    user_notify,
                                                    user_notify_pm,
                                                    user_avatar,
                                                    user_signature,
                                                    user_from,
                                                    user_steam,
                                                    user_skype,
                                                    user_icq,
                                                    user_vk,
                                                    user_fb,
                                                    user_website,
                                                    user_profession,
                                                    user_interests)
                    VALUES  
                                                    (@userType,
                                                    @userIp,
                                                    @userBrowser,
                                                    @userRegdate,
                                                    @userEmail,
                                                    @userEmailConfirmed,
                                                    @passwordHash,
                                                    @securityStamp,
                                                    @phoneNumber,
                                                    @phoneNumberConfirmed,
                                                    @twoFactorEnabled,
                                                    @lockoutEndDateUtc,
                                                    @lockoutEnable,
                                                    @accessFailedCount,
                                                    @userName,
                                                    @userBirthday,
                                                    @userGender,
                                                    @userLastVisit,
                                                    @userLastMark,
                                                    @userLastPage,
                                                    @userInactiveReason,
                                                    @userInactiveTime,
                                                    @userLang,
                                                    @userTimeZone,
                                                    @userDateFormat,
                                                    @userRank,
                                                    @userNotify,
                                                    @userNotify_pm,
                                                    @userAvatar,
                                                    @userSignature,
                                                    @userFrom,
                                                    @userSteam,
                                                    @userSkype,
                                                    @userIcq,
                                                    @userVk,
                                                    @userFb,
                                                    @userWebsite,
                                                    @userProfession,
                                                    @userInterests)
                    SELECT Cast(SCOPE_IDENTITY() as int)";
        }

        internal static string UserIdentityRepositoryDeleteById()
        {
            return @"DELETE 
                        FROM dem_users_test 
                        WHERE user_id = @userId";
        }

        internal static string UserIdentityRepositoryUpdate()
        {
            return @"UPDATE dem_users_test SET 
                                                    user_type = @userType,
                                                    user_ip = @userIp,
                                                    user_browser = @userBrowser,
                                                    user_regdate = @userRegdate,
                                                    user_email = @userEmail,
                                                    user_email_confirmed = @userEmailConfirmed,
                                                    password_hash = @passwordHash,
                                                    security_stamp = @securityStamp,
                                                    phone_number = @phoneNumber,
                                                    phone_number_confirmed = @phoneNumberConfirmed,
                                                    two_factor_enabled = @twoFactorEnabled,
                                                    lockout_end_date_utc = @lockoutEndDateUtc,
                                                    lockout_enable = @lockoutEnable,
                                                    access_failed_count = @accessFailedCount,
                                                    username = @userName,
                                                    user_birthday = @userBirthday,
                                                    user_gender = @userGender,
                                                    user_lastvisit = @userLastVisit,
                                                    user_lastmark = @userLastMark,
                                                    user_lastpage = @userLastPage,
                                                    user_inactive_reason = @userInactiveReason,
                                                    user_inactive_time = @userInactiveTime,
                                                    user_lang = @userLang,
                                                    user_timezone = @userTimeZone,
                                                    user_dateformat = @userDateFormat,
                                                    user_rank = @userRank,
                                                    user_notify = @userNotify,
                                                    user_notify_pm = @userNotify_pm,
                                                    user_avatar = @userAvatar,
                                                    user_signature = @userSignature,
                                                    user_from = @userFrom,
                                                    user_steam = @userSteam,
                                                    user_skype = @userSkype,
                                                    user_icq = @userIcq,
                                                    user_vk = @userVk,
                                                    user_fb = @userFb,
                                                    user_website = @userWebsite,
                                                    user_profession = @userProfession,
                                                    user_interests = @userInterests
                        WHERE user_id = @userId";
        }
    }
}
