SET IDENTITY_INSERT DEM_Project.dbo.dem_banlist ON
INSERT INTO DEM_Project.dbo.dem_banlist (ban_id
      ,user_id
      ,ban_ip
      ,ban_email
      ,ban_start
      ,ban_end
      ,ban_exclude
      ,ban_type
      ,ban_reason)
	SELECT ban_id
		  ,ban_userid as user_id
		  ,ban_ip
		  ,ban_email
		  ,dateadd(S, ban_start, '1970-01-01') as ban_start
		  ,dateadd(S, ban_end, '1970-01-01') as ban_end
		  ,ban_exclude
		  ,ban_reason
		  ,ban_give_reason
	FROM adeusexm_phpbbex.dbo.phpbb_banlist
SET IDENTITY_INSERT DEM_Project.dbo.dem_banlist OFF


SET IDENTITY_INSERT DEM_Project.dbo.dem_bots ON
INSERT INTO DEM_Project.dbo.dem_bots (bot_id
      ,bot_active
      ,bot_name
      ,user_id
      ,bot_agent
      ,bot_ip)
	SELECT TOP 1000 bot_id
		  ,bot_active
		  ,bot_name
		  ,user_id
		  ,bot_agent
		  ,bot_ip
	FROM adeusexm_phpbbex.dbo.phpbb_bots
SET IDENTITY_INSERT DEM_Project.dbo.dem_bots OFF


SET IDENTITY_INSERT DEM_Project.dbo.dem_disallow_usernames ON
INSERT INTO DEM_Project.dbo.dem_disallow_usernames
	  (disallow_id
      ,disallow_username)
	SELECT disallow_id
		  ,disallow_username
	FROM adeusexm_phpbbex.dbo.phpbb_disallow
SET IDENTITY_INSERT DEM_Project.dbo.dem_disallow_usernames OFF


SET IDENTITY_INSERT DEM_Project.dbo.dem_extension_groups ON
INSERT INTO DEM_Project.dbo.dem_extension_groups
	  (group_id
      ,group_name
      ,allow_group
      ,download_mode
      ,upload_icon
      ,max_filesize)
	SELECT group_id
		  ,group_name
		  ,allow_group
		  ,download_mode
		  ,upload_icon
		  ,max_filesize
	FROM adeusexm_phpbbex.dbo.phpbb_extension_groups
SET IDENTITY_INSERT DEM_Project.dbo.dem_extension_groups OFF


SET IDENTITY_INSERT DEM_Project.dbo.dem_extensions ON
INSERT INTO DEM_Project.dbo.dem_extensions
	  (extension_id
      ,group_id
      ,extension)
	SELECT extension_id
		  ,group_id
		  ,extension
	FROM adeusexm_phpbbex.dbo.phpbb_extensions
SET IDENTITY_INSERT DEM_Project.dbo.dem_extensions OFF


SET IDENTITY_INSERT DEM_Project.dbo.dem_forums ON
INSERT INTO DEM_Project.dbo.dem_forums
	  (forum_id
      ,parent_id
      ,forum_name
      ,forum_desc
      ,forum_password
      ,forum_pm
      ,forum_status
      ,display_subforum_list
      ,display_on_index
      ,enable_indexing
      ,forum_order)
	SELECT forum_id
		  ,parent_id
		  ,forum_name
		  ,forum_desc
		  ,forum_password
		  ,0 as forum_pm
		  ,forum_status
		  ,display_subforum_list
		  ,display_on_index
		  ,enable_indexing
      ,0 as forum_order
	FROM adeusexm_phpbbex.dbo.phpbb_forums
SET IDENTITY_INSERT DEM_Project.dbo.dem_forums OFF


SET IDENTITY_INSERT DEM_Project.dbo.dem_groups ON
INSERT INTO DEM_Project.dbo.dem_groups (group_id
      ,group_type
      ,group_name
      ,group_desc
      ,group_avatar_url
      ,group_colour
      ,group_legend)
	SELECT TOP 1000 group_id
		  ,group_type
		  ,group_name
		  ,group_desc
		  ,group_avatar as group_avatar_url
		  ,group_colour
		  ,group_legend
	FROM adeusexm_phpbbex.dbo.phpbb_groups
SET IDENTITY_INSERT DEM_Project.dbo.dem_groups OFF


SET IDENTITY_INSERT DEM_Project.dbo.dem_medals ON
INSERT INTO DEM_Project.dbo.dem_medals
	  (medal_id
      ,medal_name
      ,medal_description
      ,medal_image
      ,medals_cat_id
      ,medal_nominated
      ,medal_order_id)
	SELECT id as medal_id
		  ,name as medal_name
		  ,description as medal_description
		  ,image as medal_image
		  ,parent as medals_cat_id
		  ,nominated as medal_nominated
		  ,order_id as medal_order_id
	FROM adeusexm_phpbbex.dbo.phpbb_medals
SET IDENTITY_INSERT DEM_Project.dbo.dem_medals OFF


SET IDENTITY_INSERT DEM_Project.dbo.dem_medals_awarded ON
INSERT INTO DEM_Project.dbo.dem_medals_awarded
	  (awarded_id
      ,medal_id
      ,user_id
      ,awarder_id
      ,awarded_time
      ,awarded_nominated
      ,awarded_nominated_reason)
	SELECT id as awarded_id
		  ,medal_id
		  ,user_id
		  ,awarder_id
		  ,dateadd(S, time, '1970-01-01') as awarded_time
		  ,nominated as awarded_nominated
		  ,REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(nominated_reason, ':'+bbuid,''), '&#58;',':'), '&#46;','.'), '&quot;','"'), '&amp;','&') as awarded_nominated_reason
	FROM adeusexm_phpbbex.dbo.phpbb_medals_awarded
SET IDENTITY_INSERT DEM_Project.dbo.dem_medals_awarded OFF


SET IDENTITY_INSERT DEM_Project.dbo.dem_medals_cats ON
INSERT INTO DEM_Project.dbo.dem_medals_cats
	  (medals_cat_id
      ,medals_cat_name
      ,medals_cat_order_id)
	SELECT id as medals_cat_id
		  ,name as medals_cat_name
		  ,order_id as medals_cat_order_id
	FROM adeusexm_phpbbex.dbo.phpbb_medals_cats
SET IDENTITY_INSERT DEM_Project.dbo.dem_medals_cats OFF


SET IDENTITY_INSERT DEM_Project.dbo.dem_permissions_rules ON
INSERT INTO DEM_Project.dbo.dem_permissions_rules
	  (rule_id
	  ,rule_name
	  ,is_global
	  ,is_local
	  ,founder_only)
	SELECT auth_option_id as rule_id
		  ,auth_option as rule_name
		  ,is_global
		  ,is_local
		  ,founder_only
	FROM adeusexm_phpbbex.dbo.phpbb_acl_options
SET IDENTITY_INSERT DEM_Project.dbo.dem_permissions_rules OFF

		
INSERT INTO DEM_Project.dbo.dem_poll_options
	  (poll_option_id
      ,poll_id
      ,poll_option_text)
	SELECT poll_option_id
		  ,topic_id
		  ,poll_option_text
		FROM adeusexm_phpbbex.dbo.phpbb_poll_options


INSERT INTO DEM_Project.dbo.dem_poll_votes
	  (poll_option_id
      ,poll_id
      ,vote_user_id
      ,vote_user_ip)
	SELECT poll_option_id
		  ,topic_id
		  ,vote_user_id
		  ,vote_user_ip
		FROM adeusexm_phpbbex.dbo.phpbb_poll_votes
		
		
INSERT INTO DEM_Project.dbo.dem_post_rates
	  (post_id
      ,user_id
      ,rate
      ,rate_time)
	SELECT post_id
		  ,user_id
		  ,rate
		  ,dateadd(S, rate_time, '1970-01-01') as rate_time
		FROM adeusexm_phpbbex.dbo.phpbb_post_rates
		

SET IDENTITY_INSERT DEM_Project.dbo.dem_posts ON
INSERT INTO DEM_Project.dbo.dem_posts
	  (post_id
      ,topic_id
      ,user_id
      ,poster_ip
      ,post_time
      ,post_merged
      ,post_reported
      ,enable_bbcode
      ,enable_smilies
      ,enable_magic_url
      ,enable_sig
      ,post_subject
      ,post_text
      ,post_attachment
      ,post_edit_time
      ,post_edit_reason
      ,post_edit_user
      ,post_edit_count
      ,post_edit_locked)
	SELECT post_id
		  ,topic_id
		  ,poster_id
		  ,poster_ip
		  ,dateadd(S, post_time, '1970-01-01') as post_time
		  ,dateadd(S, post_merged, '1970-01-01') as post_merged
		  ,post_reported
		  ,enable_bbcode
		  ,enable_smilies
		  ,enable_magic_url
		  ,enable_sig
		  ,REPLACE(REPLACE(REPLACE(REPLACE(post_subject, '&#58;',':'), '&#46;','.'), '&quot;','"'), '&amp;','&') as post_subject
		  ,REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(post_text, ':'+bbcode_uid,''), '&#58;',':'), '&#46;','.'), '&quot;','"'), '&amp;','&') as post_text
		  ,post_attachment
		  ,dateadd(S, post_edit_time, '1970-01-01') as post_edit_time
		  ,post_edit_reason
		  ,post_edit_user
		  ,post_edit_count
		  ,post_edit_locked
		FROM adeusexm_phpbbex.dbo.phpbb_posts
SET IDENTITY_INSERT DEM_Project.dbo.dem_posts OFF


SET IDENTITY_INSERT DEM_Project.dbo.dem_ranks ON
INSERT INTO DEM_Project.dbo.dem_ranks
	  (rank_id
      ,rank_title
      ,rank_min
      ,rank_special
      ,rank_image_url)
	SELECT rank_id
		  ,rank_title
		  ,rank_min
		  ,rank_special
		  ,rank_image as rank_image_url
		FROM adeusexm_phpbbex.dbo.phpbb_ranks
SET IDENTITY_INSERT DEM_Project.dbo.dem_ranks OFF


SET IDENTITY_INSERT DEM_Project.dbo.dem_reports ON
INSERT INTO DEM_Project.dbo.dem_reports
	  (report_id
      ,post_id
      ,user_id
      ,reason_id
	  ,user_notify
      ,report_closed
      ,report_time
      ,report_text)
	SELECT report_id
		  ,post_id
		  ,user_id
		  ,reason_id
		  ,user_notify
		  ,report_closed
		  ,dateadd(S, report_time, '1970-01-01') as report_time
		  ,report_text
		FROM adeusexm_phpbbex.dbo.phpbb_reports
SET IDENTITY_INSERT DEM_Project.dbo.dem_reports OFF


SET IDENTITY_INSERT DEM_Project.dbo.dem_reports_reasons ON
INSERT INTO DEM_Project.dbo.dem_reports_reasons
	  (reason_id
      ,reason_title
      ,reason_description
      ,reason_order)
	SELECT reason_id
		  ,reason_title
		  ,reason_description
		  ,reason_order
		FROM adeusexm_phpbbex.dbo.phpbb_reports_reasons
SET IDENTITY_INSERT DEM_Project.dbo.dem_reports_reasons OFF

SET IDENTITY_INSERT DEM_Project.dbo.dem_smilies ON
INSERT INTO DEM_Project.dbo.dem_smilies
	  (smiley_id
      ,code
      ,emotion
      ,smiley_url
      ,smiley_width
      ,smiley_height
      ,smiley_order
      ,display_on_posting)
	SELECT smiley_id
		  ,code
		  ,emotion
		  ,smiley_url
		  ,smiley_width
		  ,smiley_height
		  ,smiley_order
		  ,display_on_posting
		FROM adeusexm_phpbbex.dbo.phpbb_smilies
SET IDENTITY_INSERT DEM_Project.dbo.dem_smilies OFF


SET IDENTITY_INSERT DEM_Project.dbo.dem_polls ON
INSERT INTO DEM_Project.dbo.dem_polls
	  (poll_id
      ,topic_id
      ,poll_title
      ,poll_start
      ,poll_length
      ,poll_max_options
      ,poll_last_vote
      ,poll_vote_change)
	SELECT topic_id
		  ,topic_id
		  ,poll_title
		  ,dateadd(S, poll_start, '1970-01-01') as poll_start
		  ,dateadd(S, poll_length, '1970-01-01') as poll_length
		  ,poll_max_options
		  ,dateadd(S, poll_last_vote, '1970-01-01') as poll_last_vote
		  ,poll_vote_change
		FROM adeusexm_phpbbex.dbo.phpbb_topics
SET IDENTITY_INSERT DEM_Project.dbo.dem_polls OFF


SET IDENTITY_INSERT DEM_Project.dbo.dem_topics ON
INSERT INTO DEM_Project.dbo.dem_topics
	  (topic_id
      ,forum_id
      ,topic_title
      ,topic_poster
      ,topic_time
      ,topic_time_limit
      ,topic_views
      ,topic_private_type
      ,topic_last_view_time
      ,topic_closed
      ,polls_enabled
      ,polls_only
      ,topic_first_post_show)
	SELECT topic_id
		  ,forum_id
		  ,REPLACE(REPLACE(REPLACE(REPLACE(topic_title, '&#58;',':'), '&#46;','.'), '&quot;','"'), '&amp;','&') as topic_title
		  ,topic_poster
		  ,dateadd(S, topic_time, '1970-01-01') as topic_time
		  ,dateadd(S, topic_time_limit, '1970-01-01') as topic_time_limit
		  ,topic_views
		  ,0 as topic_private_type
		  ,dateadd(S, topic_last_view_time, '1970-01-01') as topic_last_view_time
		  ,topic_status
		  ,CASE WHEN LEN(poll_title) = 0 
             THEN 0
             ELSE 1
		   END
		  ,0
		  ,topic_first_post_show
		FROM adeusexm_phpbbex.dbo.phpbb_topics
SET IDENTITY_INSERT DEM_Project.dbo.dem_topics OFF


INSERT INTO DEM_Project.dbo.dem_topics_watch
	  (topic_id
      ,user_id
      ,notify_status)
	SELECT topic_id
		  ,user_id
		  ,notify_status
		FROM adeusexm_phpbbex.dbo.phpbb_topics_watch


SET IDENTITY_INSERT DEM_Project.dbo.dem_users ON
INSERT INTO DEM_Project.dbo.dem_users (user_id
      ,user_type
      ,group_id
      ,user_ip
      ,user_browser
      ,user_regdate
      ,username
      ,username_clean
      ,user_password
      ,user_password_change_date
      ,user_email
      ,user_email_hash
      ,user_birthday
      ,user_gender
      ,user_lastvisit
      ,user_lastmark
      ,user_lastpage
      ,user_login_attempts
      ,user_inactive_reason
      ,user_inactive_time
      ,user_lang
      ,user_timezone
      ,user_dateformat
      ,user_rank
      ,user_notify
      ,user_notify_pm
      ,user_avatar
      ,user_signature
      ,user_from
      ,user_steam
      ,user_skype
      ,user_icq
	    ,user_vk
	    ,user_fb
      ,user_website
      ,user_occ
      ,user_interests
      ,user_actkey
      ,user_newpasswd
      ,user_form_salt)
	SELECT user_id
		  ,user_type
		  ,group_id
		  ,user_ip
		  ,user_browser
		  ,dateadd(S, user_regdate, '1970-01-01') as user_regdate
		  ,username
		  ,username_clean
		  ,user_password
		  ,dateadd(S, user_passchg, '1970-01-01') as user_password_change_date
		  ,user_email
		  ,user_email_hash
		  ,CASE 
				WHEN LEN(
							 CASE SUBSTRING(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(user_birthday,' ',''),'0-0-0',''),'-1-','-01-'),'-2-','-02-'),'-3-','-03-'),'-4-','-04-'),'-5-','-05-'),'-6-','-06-'),'-7-','-07-'),'-8-','-08-'),'-9-','-09-'), 1, 2)
							 WHEN '1-' THEN '01-' + SUBSTRING(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(user_birthday,' ',''),'0-0-0',''),'-1-','-01-'),'-2-','-02-'),'-3-','-03-'),'-4-','-04-'),'-5-','-05-'),'-6-','-06-'),'-7-','-07-'),'-8-','-08-'),'-9-','-09-'), 3, 8)
							 WHEN '2-' THEN '02-' + SUBSTRING(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(user_birthday,' ',''),'0-0-0',''),'-1-','-01-'),'-2-','-02-'),'-3-','-03-'),'-4-','-04-'),'-5-','-05-'),'-6-','-06-'),'-7-','-07-'),'-8-','-08-'),'-9-','-09-'), 3, 8)
							 WHEN '3-' THEN '03-' + SUBSTRING(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(user_birthday,' ',''),'0-0-0',''),'-1-','-01-'),'-2-','-02-'),'-3-','-03-'),'-4-','-04-'),'-5-','-05-'),'-6-','-06-'),'-7-','-07-'),'-8-','-08-'),'-9-','-09-'), 3, 8)
							 WHEN '4-' THEN '04-' + SUBSTRING(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(user_birthday,' ',''),'0-0-0',''),'-1-','-01-'),'-2-','-02-'),'-3-','-03-'),'-4-','-04-'),'-5-','-05-'),'-6-','-06-'),'-7-','-07-'),'-8-','-08-'),'-9-','-09-'), 3, 8)
							 WHEN '5-' THEN '05-' + SUBSTRING(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(user_birthday,' ',''),'0-0-0',''),'-1-','-01-'),'-2-','-02-'),'-3-','-03-'),'-4-','-04-'),'-5-','-05-'),'-6-','-06-'),'-7-','-07-'),'-8-','-08-'),'-9-','-09-'), 3, 8)
							 WHEN '6-' THEN '06-' + SUBSTRING(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(user_birthday,' ',''),'0-0-0',''),'-1-','-01-'),'-2-','-02-'),'-3-','-03-'),'-4-','-04-'),'-5-','-05-'),'-6-','-06-'),'-7-','-07-'),'-8-','-08-'),'-9-','-09-'), 3, 8)
							 WHEN '7-' THEN '07-' + SUBSTRING(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(user_birthday,' ',''),'0-0-0',''),'-1-','-01-'),'-2-','-02-'),'-3-','-03-'),'-4-','-04-'),'-5-','-05-'),'-6-','-06-'),'-7-','-07-'),'-8-','-08-'),'-9-','-09-'), 3, 8)
							 WHEN '8-' THEN '08-' + SUBSTRING(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(user_birthday,' ',''),'0-0-0',''),'-1-','-01-'),'-2-','-02-'),'-3-','-03-'),'-4-','-04-'),'-5-','-05-'),'-6-','-06-'),'-7-','-07-'),'-8-','-08-'),'-9-','-09-'), 3, 8)
							 WHEN '9-' THEN '09-' + SUBSTRING(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(user_birthday,' ',''),'0-0-0',''),'-1-','-01-'),'-2-','-02-'),'-3-','-03-'),'-4-','-04-'),'-5-','-05-'),'-6-','-06-'),'-7-','-07-'),'-8-','-08-'),'-9-','-09-'), 3, 8)
							 ELSE REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(user_birthday,' ',''),'0-0-0',''),'-1-','-01-'),'-2-','-02-'),'-3-','-03-'),'-4-','-04-'),'-5-','-05-'),'-6-','-06-'),'-7-','-07-'),'-8-','-08-'),'-9-','-09-')
							 END
				) < 10
				   THEN '' 
				   ELSE convert(smalldatetime, 
							 CASE SUBSTRING(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(user_birthday,' ',''),'0-0-0',''),'-1-','-01-'),'-2-','-02-'),'-3-','-03-'),'-4-','-04-'),'-5-','-05-'),'-6-','-06-'),'-7-','-07-'),'-8-','-08-'),'-9-','-09-'), 1, 2)
							 WHEN '1-' THEN '01-' + SUBSTRING(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(user_birthday,' ',''),'0-0-0',''),'-1-','-01-'),'-2-','-02-'),'-3-','-03-'),'-4-','-04-'),'-5-','-05-'),'-6-','-06-'),'-7-','-07-'),'-8-','-08-'),'-9-','-09-'), 3, 8)
							 WHEN '2-' THEN '02-' + SUBSTRING(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(user_birthday,' ',''),'0-0-0',''),'-1-','-01-'),'-2-','-02-'),'-3-','-03-'),'-4-','-04-'),'-5-','-05-'),'-6-','-06-'),'-7-','-07-'),'-8-','-08-'),'-9-','-09-'), 3, 8)
							 WHEN '3-' THEN '03-' + SUBSTRING(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(user_birthday,' ',''),'0-0-0',''),'-1-','-01-'),'-2-','-02-'),'-3-','-03-'),'-4-','-04-'),'-5-','-05-'),'-6-','-06-'),'-7-','-07-'),'-8-','-08-'),'-9-','-09-'), 3, 8)
							 WHEN '4-' THEN '04-' + SUBSTRING(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(user_birthday,' ',''),'0-0-0',''),'-1-','-01-'),'-2-','-02-'),'-3-','-03-'),'-4-','-04-'),'-5-','-05-'),'-6-','-06-'),'-7-','-07-'),'-8-','-08-'),'-9-','-09-'), 3, 8)
							 WHEN '5-' THEN '05-' + SUBSTRING(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(user_birthday,' ',''),'0-0-0',''),'-1-','-01-'),'-2-','-02-'),'-3-','-03-'),'-4-','-04-'),'-5-','-05-'),'-6-','-06-'),'-7-','-07-'),'-8-','-08-'),'-9-','-09-'), 3, 8)
							 WHEN '6-' THEN '06-' + SUBSTRING(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(user_birthday,' ',''),'0-0-0',''),'-1-','-01-'),'-2-','-02-'),'-3-','-03-'),'-4-','-04-'),'-5-','-05-'),'-6-','-06-'),'-7-','-07-'),'-8-','-08-'),'-9-','-09-'), 3, 8)
							 WHEN '7-' THEN '07-' + SUBSTRING(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(user_birthday,' ',''),'0-0-0',''),'-1-','-01-'),'-2-','-02-'),'-3-','-03-'),'-4-','-04-'),'-5-','-05-'),'-6-','-06-'),'-7-','-07-'),'-8-','-08-'),'-9-','-09-'), 3, 8)
							 WHEN '8-' THEN '08-' + SUBSTRING(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(user_birthday,' ',''),'0-0-0',''),'-1-','-01-'),'-2-','-02-'),'-3-','-03-'),'-4-','-04-'),'-5-','-05-'),'-6-','-06-'),'-7-','-07-'),'-8-','-08-'),'-9-','-09-'), 3, 8)
							 WHEN '9-' THEN '09-' + SUBSTRING(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(user_birthday,' ',''),'0-0-0',''),'-1-','-01-'),'-2-','-02-'),'-3-','-03-'),'-4-','-04-'),'-5-','-05-'),'-6-','-06-'),'-7-','-07-'),'-8-','-08-'),'-9-','-09-'), 3, 8)
							 ELSE REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(user_birthday,' ',''),'0-0-0',''),'-1-','-01-'),'-2-','-02-'),'-3-','-03-'),'-4-','-04-'),'-5-','-05-'),'-6-','-06-'),'-7-','-07-'),'-8-','-08-'),'-9-','-09-')
							 END
				   , 105)
		   END as user_birthday
		  ,user_gender
		  ,dateadd(S, user_lastvisit, '1970-01-01') as user_lastvisit
		  ,dateadd(S, user_lastmark, '1970-01-01') as user_lastmark
		  ,user_lastpage
		  ,user_login_attempts
		  ,user_inactive_reason
		  ,dateadd(S, user_inactive_time, '1970-01-01') as user_inactive_time
		  ,user_lang
		  ,user_timezone
		  ,user_dateformat
		  ,user_rank
		  ,user_notify
		  ,user_notify_pm
		  ,user_avatar
		  ,REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(user_sig, ':'+user_sig_bbcode_uid,''), '&#58;',':'), '&#46;','.'), '&quot;','"'), '&amp;','&') as user_sig
		  ,user_from
		  ,user_jabber as user_steam
		  ,user_skype
		  ,user_icq
	    ,''
	    ,''
		  ,user_website
		  ,user_occ
		  ,user_interests
		  ,user_actkey
		  ,user_newpasswd
		  ,user_form_salt
	FROM adeusexm_phpbbex.dbo.phpbb_users
SET IDENTITY_INSERT DEM_Project.dbo.dem_users OFF


SET IDENTITY_INSERT DEM_Project.dbo.dem_warnings ON
INSERT INTO DEM_Project.dbo.dem_warnings
	  (warning_id
      ,user_id
	  ,issuer_id
      ,post_id
      ,LogId
      ,warning_time
      ,warning_days
      ,warning_type
      ,warning_text)
	SELECT warning_id
		  ,user_id
		  ,issuer_id
		  ,post_id
		  ,log_id
		  ,dateadd(S, warning_time, '1970-01-01') as warning_time
		  ,warning_days
		  ,warning_type
		  ,warning_text
		FROM adeusexm_phpbbex.dbo.phpbb_warnings
SET IDENTITY_INSERT DEM_Project.dbo.dem_warnings OFF



--for test
	
INSERT INTO DEM_Project.dbo.dem_sessions_keys
	  (key_id
      ,user_id
      ,last_ip
      ,last_login)
	SELECT key_id
		  ,user_id
		  ,last_ip
		  ,dateadd(S, last_login, '1970-01-01') as last_login
		FROM adeusexm_phpbbex.dbo.phpbb_sessions_keys
		
		
INSERT INTO DEM_Project.dbo.dem_sessions
	  (session_id
      ,session_user_id
      ,session_forum_id
      ,session_last_visit
      ,session_start
      ,session_time
      ,session_ip
      ,session_browser
      ,session_page
      ,session_viewonline
      ,session_autologin
      ,session_admin)
	SELECT session_id
		  ,session_user_id
		  ,session_forum_id
		  ,dateadd(S, session_last_visit, '1970-01-01') as session_last_visit
		  ,dateadd(S, session_start, '1970-01-01') as session_start
		  ,dateadd(S, session_time, '1970-01-01') as session_time
		  ,session_ip
		  ,session_browser
		  ,session_page
		  ,session_viewonline
		  ,session_autologin
		  ,session_admin
		FROM adeusexm_phpbbex.dbo.phpbb_sessions
		
