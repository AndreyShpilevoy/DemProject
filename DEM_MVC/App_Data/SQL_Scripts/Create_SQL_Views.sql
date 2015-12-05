CREATE VIEW AllForums
AS
	SELECT    forumTable.forum_id,
			  parent_id,
			  forum_name,
			  forum_desc,
			  display_subforum_list,
			  display_on_index,
			  sub_forums_count,
			  topics_count,
			  posts_count,
			  last_post_time,
			  userTable.user_id,
			  userTable.username,
			  userTable.group_colour,
			  userTable.topic_title AS last_topic_title,
			  userTable.topic_id AS last_topic_id,
			  forum_order
	FROM (
	
	SELECT tableWithUserId.last_post_time
		,usersTable.username
		,usersTable.user_id
		,groupsTable.group_colour
		,tableWithUserId.forum_id
		,tableWithUserId.topic_title
		,tableWithUserId.topic_id
	  FROM dem_users usersTable JOIN (
	  
			SELECT tableWithTime.last_post_time
				,postsTable.user_id
				,postsTable.topic_id
				,tableWithTime.forum_id
				,topicsTable.topic_title
			FROM dem_posts postsTable, dem_topics topicsTable,(
	  
					  SELECT MAX(postsTable.post_time) AS last_post_time
							,topicsTable.forum_id
					  FROM dem_topics topicsTable JOIN dem_posts postsTable 
					   ON topicsTable.topic_id = postsTable.topic_id 
					   GROUP BY topicsTable.forum_id

			)tableWithTime 
			WHERE last_post_time = postsTable.post_time AND topicsTable.topic_id = postsTable.topic_id  AND topicsTable.forum_id = tableWithTime.forum_id 
	  
	  )tableWithUserId ON tableWithUserId.user_id = usersTable.user_id 
	  JOIN dem_user_groups userGroupsTable ON userGroupsTable.user_Id = usersTable.user_Id 
	  JOIN dem_groups groupsTable ON groupsTable.group_id = userGroupsTable.group_id

	) as userTable RIGHT JOIN (
	
	SELECT tableWithPostCount.forum_id
		,tableWithPostCount.parent_id
		,tableWithPostCount.forum_name
		,tableWithPostCount.forum_desc
		,tableWithPostCount.display_subforum_list
		,tableWithPostCount.display_on_index
		,tableWithPostCount.forum_order		
		,tableWithPostCount.sub_forums_count
		,COUNT(topicsTable.topic_id) AS topics_count
		,tableWithPostCount.posts_count
	FROM dem_topics topicsTable RIGHT JOIN (  

			SELECT tableWithTopicId.forum_id
					,tableWithTopicId.parent_id
					,tableWithTopicId.forum_name
					,tableWithTopicId.forum_desc
					,tableWithTopicId.display_subforum_list
					,tableWithTopicId.display_on_index
					,tableWithTopicId.forum_order
					,tableWithTopicId.sub_forums_count
   				    ,COUNT(postsTable.post_id) AS posts_count
	  			FROM dem_posts postsTable RIGHT JOIN ( 
 
						SELECT  forumsTable.forum_id
    							,forumsTable.parent_id
    							,forumsTable.forum_name
    							,forumsTable.forum_desc
    							,forumsTable.display_subforum_list
    							,forumsTable.display_on_index
    							,forumsTable.forum_order  
								,forumsTable.sub_forums_count
    							,topicsTable.topic_id    
  							FROM (
							
									SELECT  foumsMain.forum_id,
											foumsMain.parent_id,
											foumsMain.forum_name,
											foumsMain.forum_desc,
											foumsMain.display_subforum_list,
											foumsMain.display_on_index,
											foumsMain.forum_order,  
											COUNT(foumsSecondary.forum_id) AS sub_forums_count
									FROM dem_forums AS foumsMain LEFT JOIN dem_forums AS foumsSecondary	ON foumsSecondary.parent_id = foumsMain.forum_Id
									GROUP BY foumsMain.forum_id,
											 foumsMain.parent_id,
											 foumsMain.forum_name,
											 foumsMain.forum_desc,
											 foumsMain.display_subforum_list,
											 foumsMain.display_on_index,
											 foumsMain.forum_order

							) forumsTable LEFT JOIN dem_topics topicsTable
							ON forumsTable.forum_id = topicsTable.forum_id

				)tableWithTopicId ON tableWithTopicId.topic_id = postsTable.topic_id
  
				GROUP BY forum_id
					,parent_id
					,forum_name
					,forum_desc
					,display_subforum_list
					,display_on_index
					,forum_order					
					,sub_forums_count

   )tableWithPostCount ON tableWithPostCount.forum_id = topicsTable.forum_id
  
   GROUP BY tableWithPostCount.forum_id
      ,parent_id
      ,forum_name
      ,forum_desc
      ,display_subforum_list
      ,display_on_index
      ,forum_order
      ,posts_count
	  ,sub_forums_count

	) 
	AS forumTable ON userTable.forum_id = forumTable.forum_id;
	
GO 

CREATE VIEW AllTopics
AS

SELECT	tableWithUserId.forum_id,
		tableWithUserId.topic_id,
		tableWithUserId.topic_title,
		usersTable.username AS topic_starter_username,
		usersTable.user_id AS topic_starter_user_id,
		groupsTable.group_colour AS topic_starter_group_color,
		tableWithUserId.topic_time AS topic_start_time,
		tableWithUserId.posts_count,
		tableWithUserId.topic_views,
		tableWithUserId.last_post_time,
		tableWithUserId.user_id AS last_post_user_id,
		tableWithUserId.username AS last_post_username,
		tableWithUserId.group_colour AS last_post_group_color,
		tableWithUserId.post_id AS last_post_id,
		tableWithUserId.topic_closed,
		tableWithUserId.topic_first_post_show,
		tableWithUserId.polls_enabled,
		tableWithUserId.polls_only
	FROM dem_users usersTable 
	JOIN (

		SELECT	tableWithUserId.forum_id,
				tableWithUserId.topic_id,
				tableWithUserId.topic_title,
				tableWithUserId.topic_poster,
				tableWithUserId.topic_time,
				tableWithUserId.posts_count,
				tableWithUserId.topic_views,
				tableWithUserId.last_post_time,
				usersTable.username,
				usersTable.user_id,
				groupsTable.group_colour,
				tableWithUserId.post_id,
				tableWithUserId.topic_closed,
				tableWithUserId.topic_first_post_show,
				tableWithUserId.polls_enabled,
				tableWithUserId.polls_only
			FROM dem_users usersTable 
			JOIN (

				SELECT	topicTableWithPostsCount.forum_id,
						topicTableWithPostsCount.topic_id,
						topicTableWithPostsCount.topic_title,
						topicTableWithPostsCount.topic_poster,
						topicTableWithPostsCount.topic_time,
						topicTableWithPostsCount.posts_count,
						topicTableWithPostsCount.topic_views,
						topicTableWithPostsCount.last_post_time,
						postsTable.user_id,
						postsTable.post_id,
						topicTableWithPostsCount.topic_closed,
						topicTableWithPostsCount.topic_first_post_show,
						topicTableWithPostsCount.polls_enabled,
						topicTableWithPostsCount.polls_only
					FROM dem_posts postsTable, dem_topics topicsTable,(

							SELECT	topicsTable.forum_id,
									topicsTable.topic_id,
									topicsTable.topic_title,
									topicsTable.topic_poster,
									topicsTable.topic_time,
									COUNT(postsTable.post_id) AS posts_count,
									topicsTable.topic_views,
									MAX(postsTable.post_time) AS last_post_time,
									topicsTable.topic_closed,
									topicsTable.topic_first_post_show,
									topicsTable.polls_enabled,
									topicsTable.polls_only
								FROM		dem_topics topicsTable 
								JOIN		dem_posts postsTable ON	topicsTable.topic_id = postsTable.topic_id 
								GROUP BY	topicsTable.forum_id,
											topicsTable.topic_id,
											topicsTable.topic_title,
											topicsTable.topic_poster,
											topicsTable.topic_time,
											topicsTable.topic_views,
											topicsTable.topic_closed,
											topicsTable.topic_first_post_show,
											topicsTable.polls_enabled,
											topicsTable.polls_only

					)topicTableWithPostsCount 
					WHERE last_post_time = postsTable.post_time AND topicsTable.topic_id = postsTable.topic_id
	  
			)tableWithUserId ON tableWithUserId.user_id = usersTable.user_id 
			JOIN dem_user_groups userGroupsTable ON userGroupsTable.user_Id = usersTable.user_Id 
			JOIN dem_groups groupsTable ON groupsTable.group_id = userGroupsTable.group_id
	  
	)tableWithUserId ON tableWithUserId.topic_poster = usersTable.user_id 
	JOIN dem_user_groups userGroupsTable ON userGroupsTable.user_Id = usersTable.user_Id 
	  JOIN dem_groups groupsTable ON groupsTable.group_id = userGroupsTable.group_id

GO

CREATE VIEW AllUsersForPosts
AS
SELECT  usersTable.user_id,
		usersTable.username,
		usersTable.user_birthday,
		usersTable.user_avatar,
		usersTable.user_signature,
		usersTable.user_from,
		usersTable.user_steam,
		usersTable.user_skype,
		usersTable.user_vk,
		usersTable.user_fb,
		usersTable.user_website,
		usersTable.unique_rank_title,	
		ranksCommonTable.rank_title AS common_rank_title,
		usersTable.user_posts_count,
		usersTable.group_colour,
		usersTable.group_avatar_url
	FROM dem_ranks ranksCommonTable,(

		SELECT  usersTable.user_id,
				usersTable.username,
				usersTable.user_birthday,
				usersTable.user_avatar,
				usersTable.user_signature,
				usersTable.user_from,
				usersTable.user_steam,
				usersTable.user_skype,
				usersTable.user_vk,
				usersTable.user_fb,
				usersTable.user_website,
				usersTable.unique_rank_title,
				usersTable.user_posts_count,
				usersTable.group_colour,
				usersTable.group_avatar_url,	
				MAX(ranksCommonTable.rank_min) AS rank_min
			FROM dem_ranks ranksCommonTable,(

				SELECT  usersTable.user_id,
						usersTable.username,
						usersTable.user_birthday,
						usersTable.user_avatar,
						usersTable.user_signature,
						usersTable.user_from,
						usersTable.user_steam,
						usersTable.user_skype,
						usersTable.user_vk,
						usersTable.user_fb,
						usersTable.user_website,
						ranksUniqueTable.rank_title AS unique_rank_title,
						COUNT(postsTable.user_id) AS user_posts_count,			  
						groupsTable.group_colour,
						groupsTable.group_avatar_url
					FROM dem_users usersTable 
					JOIN dem_user_groups userGroupsTable ON userGroupsTable.user_Id = usersTable.user_Id 
					JOIN dem_groups groupsTable ON groupsTable.group_id = userGroupsTable.group_id
					LEFT JOIN dem_posts postsTable ON usersTable.user_id = postsTable.user_id
					LEFT JOIN dem_ranks ranksUniqueTable ON usersTable.user_rank = ranksUniqueTable.rank_id

					GROUP BY	usersTable.user_id,
								usersTable.username,
								usersTable.user_birthday,
								usersTable.user_avatar,
								usersTable.user_signature,
								usersTable.user_from,
								usersTable.user_steam,
								usersTable.user_skype,
								usersTable.user_vk,
								usersTable.user_fb,
								usersTable.user_website,
								ranksUniqueTable.rank_title,			  
								groupsTable.group_colour,
								groupsTable.group_avatar_url
			  
			)usersTable 
			WHERE user_posts_count >= ranksCommonTable.rank_min AND ranksCommonTable.rank_special <> 1
			GROUP BY    usersTable.user_id,
						usersTable.username,
						usersTable.user_birthday,
						usersTable.user_avatar,
						usersTable.user_signature,
						usersTable.user_from,
						usersTable.user_steam,
						usersTable.user_skype,
						usersTable.user_vk,
						usersTable.user_fb,
						usersTable.user_website,
						usersTable.unique_rank_title,
						usersTable.user_posts_count,
						usersTable.group_colour,
						usersTable.group_avatar_url
			  
	)usersTable 
	WHERE ranksCommonTable.rank_min = usersTable.rank_min AND ranksCommonTable.rank_special <> 1;
GO