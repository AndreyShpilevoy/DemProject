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
	  
	  )tableWithUserId ON tableWithUserId.user_id = usersTable.user_id JOIN dem_groups groupsTable
	  ON groupsTable.group_id = usersTable.group_id

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



