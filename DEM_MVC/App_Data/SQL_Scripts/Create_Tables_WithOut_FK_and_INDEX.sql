
CREATE PROCEDURE GetAllConfigs
AS	
  SELECT config_name AS ConfigName,
         config_value AS ConfigValue
  FROM dem_config
GO

CREATE PROCEDURE GetAllBbCodes
AS	
  SELECT bbcode_order AS BbCodeOrder,
      bbcode_tag AS BbCodeTag,
      bbcode_helpline AS BbCodeHelpLine,
      display_on_posting AS BbCodeOnPosting,
      bbcode_match AS BbCodeMatch,
      bbcode_template AS BbCodeTemplate,
      bbcode_reg_options AS BbCodeRegexpOptions
  FROM dem_bbcodes
GO

CREATE PROCEDURE GetPollWithOptionsByTopicId
  @topicId INT
AS
			
  DECLARE @pollsTable TABLE
(
	  PollId INT,
    PollTitle nvarchar(255),
    PollStart DATETIME,
    PollLength DATETIME,
    PollMaxOptions INT,
    PollLastVote DATETIME,
    PollVoteChange BIT
);
INSERT INTO 
    @pollsTable 	
  SELECT poll_id AS PollId,
         poll_title AS PollTitle,
         poll_start AS PollStart,
         poll_length AS PollLength,
         poll_max_options AS PollMaxOptions,
         poll_last_vote AS PollLastVote,
         poll_vote_change AS PollVoteChange
    FROM dem_polls
    WHERE topic_id = @topicId;

			
  DECLARE @pollsOptionsTable TABLE
(
	PollOptionId INT,
	PollId INT,
	PollOptionText NVARCHAR(255),
	PollOptionTotal INT
);
INSERT INTO 
    @pollsOptionsTable 
  SELECT pollOptionsTable.poll_option_id AS PollOptionId,
         pollOptionsTable.poll_id AS PollId,
         poll_option_text AS PollOptionText,
  	   COUNT(pollVotesTable.poll_option_id) AS PollOptionTotal
    FROM dem_poll_options pollOptionsTable
    LEFT JOIN dem_poll_votes pollVotesTable ON pollOptionsTable.poll_option_id = pollVotesTable.poll_option_id AND pollOptionsTable.poll_id = pollVotesTable.poll_id
    WHERE pollOptionsTable.poll_id IN (SELECT PollId FROM @pollsTable)
    GROUP BY pollOptionsTable.poll_option_id,
         pollOptionsTable.poll_id,
         poll_option_text;

				
SELECT * FROM @pollsTable
SELECT * FROM @pollsOptionsTable
GO

CREATE PROCEDURE GetPostsAndUsersablesByTopicId
  @topicId INT,  
  @page INT,  
  @onpage INT
AS
			
  DECLARE @postsTable TABLE
(
	  PostId INT,
    UserId INT,
    TopicId INT,
    PostTime DATETIME,
    PostSubject nvarchar(255),
    PostText nvarchar(MAX),
	  PostRate INT,
    PostReportsCount INT,
    PostEditUser INT,
    PostEditTime DATETIME,
    PostEditReason nvarchar(255),
    PostEditCount INT
);
INSERT INTO 
    @postsTable 	
	   SELECT postsTable.post_id AS PostId,
			  postsTable.user_id AS UserId,
			  @topicId AS TopicId,
			  postsTable.post_time AS PostTime,
			  postsTable.post_subject AS PostSubject,
			  postsTable.post_text AS PostText,
			  SUM(postRatesTable.rate) AS PostRate,
			  reportsTable.report_closed AS PostReportsCount,			  
			  postsTable.post_edit_user AS PostEditUser,
			  postsTable.post_edit_time AS PostEditTime,
			  postsTable.post_edit_reason AS PostEditReason,
			  postsTable.post_edit_count AS PostEditCount
				FROM dem_posts postsTable 				
				LEFT JOIN dem_post_rates postRatesTable ON postsTable.post_id = postRatesTable.post_id
				LEFT JOIN dem_reports reportsTable ON postsTable.post_id = reportsTable.post_id
				WHERE topic_id = @topicId
		
		   GROUP BY postsTable.post_id,
		      postsTable.user_id,
			  postsTable.post_time,
			  postsTable.post_subject,
			  postsTable.post_text,
			  postsTable.post_edit_count,
			  reportsTable.report_closed,
			  postsTable.post_edit_user,
			  postsTable.post_edit_time,
			  postsTable.post_edit_reason

  			ORDER BY post_time 
			  Offset (@page-1)*@onpage Rows
			  Fetch Next @onpage Rows Only;

			
  DECLARE @usersTable TABLE
(
	UserId INT,
	UserName NVARCHAR(MAX),
	UserBirthday DATETIME,
	UserAvatar NVARCHAR(MAX),
	UserSignature NVARCHAR(MAX),
	UserFrom NVARCHAR(255),
	UserSteam NVARCHAR(255),
	UserSkype NVARCHAR(255),
	UserVk NVARCHAR(255),
	UserFb NVARCHAR(255),
	UserWebSite NVARCHAR(max),
	UserUniqueRank NVARCHAR(255),	
	UserCommonRank NVARCHAR(255),
	UserPostsCount INT,
	GroupColor NVARCHAR(6),
	GroupAvatar NVARCHAR(MAX)
);
INSERT INTO 
    @usersTable 
		SELECT  usersTable.UserId,
				usersTable.UserName,
				usersTable.UserBirthday,
				usersTable.UserAvatar,
				usersTable.UserSignature,
				usersTable.UserFrom,
				usersTable.UserSteam,
				usersTable.UserSkype,
				usersTable.UserVk,
				usersTable.UserFb,
				usersTable.UserWebSite,
				usersTable.UserUniqueRank,	
				ranksCommonTable.rank_title AS UserCommonRank,
				usersTable.UserPostsCount,
				usersTable.GroupColor,
				usersTable.GroupAvatar
				FROM dem_ranks ranksCommonTable,(
				SELECT  usersTable.UserId,
						usersTable.UserName,
						usersTable.UserBirthday,
						usersTable.UserAvatar,
						usersTable.UserSignature,
						usersTable.UserFrom,
						usersTable.UserSteam,
						usersTable.UserSkype,
						usersTable.UserVk,
						usersTable.UserFb,
						usersTable.UserWebSite,
						usersTable.UserUniqueRank,
						usersTable.UserPostsCount,
						usersTable.GroupColor,
						usersTable.GroupAvatar,	
						MAX(ranksCommonTable.rank_min) AS rank_min
						FROM dem_ranks ranksCommonTable,(
						  SELECT usersTable.user_id AS UserId,
							  usersTable.username AS UserName,
							  usersTable.user_birthday AS UserBirthday,
							  usersTable.user_avatar AS UserAvatar,
							  usersTable.user_signature AS UserSignature,
							  usersTable.user_from AS UserFrom,
							  usersTable.user_steam AS UserSteam,
							  usersTable.user_skype AS UserSkype,
							  usersTable.user_vk AS UserVk,
							  usersTable.user_fb AS UserFb,
							  usersTable.user_website AS UserWebSite,
							  ranksUniqueTable.rank_title AS UserUniqueRank,
							  COUNT(postsTable.user_id) AS UserPostsCount,			  
							  groupsTable.group_colour AS GroupColor,
							  groupsTable.group_avatar_url AS GroupAvatar
								FROM dem_users usersTable 
								JOIN dem_groups groupsTable ON usersTable.group_id = groupsTable.group_id
								LEFT JOIN dem_posts postsTable ON usersTable.user_id = postsTable.user_id
								LEFT JOIN dem_ranks ranksUniqueTable ON usersTable.user_rank = ranksUniqueTable.rank_id
								WHERE usersTable.user_id IN (SELECT UserId FROM @postsTable) OR usersTable.user_id IN (SELECT PostEditUser FROM @postsTable)
								GROUP BY  usersTable.user_id,
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
						WHERE UserPostsCount >= ranksCommonTable.rank_min AND ranksCommonTable.rank_special <> 1
						GROUP BY    usersTable.UserId,
									usersTable.UserName,
									usersTable.UserBirthday,
									usersTable.UserAvatar,
									usersTable.UserSignature,
									usersTable.UserFrom,
									usersTable.UserSteam,
									usersTable.UserSkype,
									usersTable.UserVk,
									usersTable.UserFb,
									usersTable.UserWebSite,
									usersTable.UserUniqueRank,
									usersTable.UserPostsCount,
									usersTable.GroupColor,
									usersTable.GroupAvatar
			  
						)usersTable 
						WHERE ranksCommonTable.rank_min = usersTable.rank_min AND ranksCommonTable.rank_special <> 1;

				
SELECT * FROM @postsTable
SELECT * FROM @usersTable
GO

CREATE PROCEDURE Log_Insert
    @LogDate DATETIME,
    @CallSite NVARCHAR(MAX),
    @ExceptionType NVARCHAR(MAX),
    @ExceptionMessage NVARCHAR(MAX),
    @StackTrace NVARCHAR(MAX),
    @InnerExeption NVARCHAR(MAX),
    @Message NVARCHAR(MAX),
    @LogLevel NVARCHAR(MAX)
AS
    INSERT INTO dem_Log
       (LogDate,
		    CallSite,
			  ExceptionType,
			  ExceptionMessage,
		  	StackTrace,
		  	InnerExeption,
	  		Message,
	  		LogLevel)
     VALUES
           (@LogDate,
            @CallSite,
            @ExceptionType,
            @ExceptionMessage,
            @StackTrace,
            @InnerExeption,
            @Message,
			@LogLevel);
GO

CREATE PROCEDURE GetTopicById
    @topicId INT
AS

DECLARE @postsCount INT

  SELECT @postsCount = COUNT(topic_id)
    FROM dem_posts
    WHERE topic_id = @topicId;

  SELECT topic_id AS TopicId,
         forum_id AS ForumId,
         topic_title AS Title,
         topic_first_post_show AS TopicFirstPostShow,
         polls_enabled AS PollsEnabled,
         polls_only AS PollsOnly,
         topic_closed AS TopicClosed,
         @postsCount AS PostsCount
    FROM dem_topics
    WHERE topic_id = @topicId;
GO

CREATE PROCEDURE GetForumById
    @forumId INT
AS

DECLARE @topicsCount INT
DECLARE @subforumsCount INT

  SELECT @topicsCount = COUNT(topic_id)
    FROM dem_topics
    WHERE forum_id = @forumId;

  SELECT @subforumsCount = COUNT(forum_id)
    FROM dem_forums
    WHERE parent_id = @forumId;

  SELECT forum_id AS ForumId,  
         @topicsCount AS TopicsCount,
		 @subforumsCount AS SubForumsCount
    FROM dem_forums
    WHERE forum_id = @forumId;
GO

CREATE PROCEDURE GetAllForums
AS 
  DECLARE @ForumTempTable TABLE
(
    ForumId INT,
    ParentId INT,
    Title nvarchar(255),
    Description nvarchar(MAX),
    DisplaySubForums BIT,
    DisplayOnIndex BIT,
    ForumOrder INT,
	TopicsCount INT,
	PostsCount INT
);
INSERT INTO 
    @ForumTempTable   
  SELECT tableWithPostCount.ForumId
			,tableWithPostCount.ParentId
			,tableWithPostCount.Title
			,tableWithPostCount.Description
			,tableWithPostCount.DisplaySubForums
			,tableWithPostCount.DisplayOnIndex
			,tableWithPostCount.ForumOrder
			,COUNT(topicsTable.topic_id) AS TopicsCount
			,tableWithPostCount.PostsCount
	  FROM dem_topics topicsTable RIGHT JOIN (
  
  SELECT tableWithTopicId.ForumId
			,tableWithTopicId.ParentId
			,tableWithTopicId.Title
			,tableWithTopicId.Description
			,tableWithTopicId.DisplaySubForums
			,tableWithTopicId.DisplayOnIndex
			,tableWithTopicId.ForumOrder
      ,COUNT(postsTable.post_id) AS PostsCount
	  FROM dem_posts postsTable RIGHT JOIN ( 
 
 SELECT forumsTable.forum_id AS ForumId
    ,parent_id AS ParentId
    ,forum_name AS Title
    ,forum_desc AS Description
    ,display_subforum_list AS DisplaySubForums
    ,display_on_index AS DisplayOnIndex
    ,forum_order AS ForumOrder  
    ,topicsTable.topic_id    
  FROM dem_forums forumsTable LEFT JOIN dem_topics topicsTable
   ON forumsTable.forum_id = topicsTable.forum_id

   )tableWithTopicId ON tableWithTopicId.topic_id = postsTable.topic_id
  
   GROUP BY ForumId
      ,ParentId
      ,Title
      ,Description
      ,DisplaySubForums
      ,DisplayOnIndex
      ,ForumOrder

   )tableWithPostCount ON tableWithPostCount.ForumId = topicsTable.forum_id
  
   GROUP BY ForumId
      ,ParentId
      ,Title
      ,Description
      ,DisplaySubForums
      ,DisplayOnIndex
      ,ForumOrder
      ,PostsCount


  DECLARE @UsersInfoTempTable TABLE
(
	LastPostTime DATETIME,
    username nvarchar(255),
    UserId INT,
    group_colour nvarchar(8),
    forum_id INT,
	topic_title nvarchar(255),
    topic_id INT
);
INSERT INTO 
    @UsersInfoTempTable 
	  SELECT tableWithUserId.LastPostTime
			,usersTable.username
			,usersTable.user_id
			,groupsTable.group_colour
			,tableWithUserId.forum_id
			,tableWithUserId.topic_title
			,tableWithUserId.topic_id
	  FROM dem_users usersTable JOIN (
	  
	  		  SELECT tableWithTime.LastPostTime
				,postsTable.user_id
				,postsTable.topic_id
				,tableWithTime.forum_id
				,topicsTable.topic_title
		  FROM dem_posts postsTable, dem_topics topicsTable,(
	  
					  SELECT MAX(postsTable.post_time) AS LastPostTime
							,topicsTable.forum_id
					  FROM dem_topics topicsTable JOIN dem_posts postsTable 
					   ON topicsTable.topic_id = postsTable.topic_id 
					   GROUP BY topicsTable.forum_id

					)tableWithTime WHERE LastPostTime = postsTable.post_time AND topicsTable.topic_id = postsTable.topic_id  AND topicsTable.forum_id = tableWithTime.forum_id 
	  
	  )tableWithUserId ON tableWithUserId.user_id = usersTable.user_id JOIN dem_groups groupsTable
   ON groupsTable.group_id = usersTable.group_id;



	SELECT    ForumId,
			  ParentId,
			  Title,
			  Description,
			  DisplaySubForums,
			  DisplayOnIndex,
			  TopicsCount,
			  PostsCount,
			  LastPostTime,
        secondTable.UserId AS UserId,
			  secondTable.username AS Username,
			  secondTable.group_colour AS GroupColor,
			  secondTable.topic_title AS LastTopicTitle,
			  secondTable.topic_id AS LastTopicId,
        ForumOrder
	FROM @UsersInfoTempTable as secondTable RIGHT JOIN @ForumTempTable 
	AS firstTable ON secondTable.forum_id = firstTable.ForumId 
	ORDER BY ForumOrder, ForumId
GO

CREATE  PROCEDURE GetAllTopicsByForumId
@forumId INT,  
@page INT,  
@onpage INT
AS 
SELECT tableWithUserId.topic_id AS TopicId,
	   tableWithUserId.topic_title AS Title,
	   usersTable.username AS TopicStarterUsername,
	   usersTable.user_id AS TopicStarterUserId,
	   groupsTable.group_colour AS TopicStarterGroupColor,
	   tableWithUserId.topic_time AS TopicStartTime,
	   tableWithUserId.PostsCount AS PostsCount,
	   tableWithUserId.topic_views AS TopicViews,
	   tableWithUserId.LastPostTime AS LastPostTime,
	   tableWithUserId.user_id AS LastPostUserId,
	   tableWithUserId.username AS LastPostUsername,
	   tableWithUserId.group_colour AS LastPostGroupColor,
	   tableWithUserId.post_id AS LastPostId,
	   tableWithUserId.topic_closed AS TopicClosed
	FROM dem_users usersTable JOIN (

	SELECT tableWithUserId.topic_id,
		   tableWithUserId.topic_title,
		   tableWithUserId.topic_poster,
		   tableWithUserId.topic_time,
		   tableWithUserId.PostsCount,
		   tableWithUserId.topic_views,
		   tableWithUserId.LastPostTime,
		   usersTable.username,
		   usersTable.user_id,
		   groupsTable.group_colour,
		   tableWithUserId.post_id,
		   tableWithUserId.topic_closed
		FROM dem_users usersTable JOIN (

		SELECT topicTableWithPostsCount.topic_id,
			   topicTableWithPostsCount.topic_title,
			   topicTableWithPostsCount.topic_poster,
			   topicTableWithPostsCount.topic_time,
			   topicTableWithPostsCount.PostsCount,
			   topicTableWithPostsCount.topic_views,
			   topicTableWithPostsCount.LastPostTime,
			   postsTable.user_id,
			   postsTable.post_id,
			   topicTableWithPostsCount.topic_closed
			FROM dem_posts postsTable, dem_topics topicsTable,(

				SELECT topicsTable.topic_id,
					   topicsTable.topic_title,
					   topicsTable.topic_poster,
					   topicsTable.topic_time,
					   COUNT(postsTable.post_id) AS PostsCount,
					   topicsTable.topic_views,
					   MAX(postsTable.post_time) AS LastPostTime,
					   topicsTable.topic_closed
					FROM dem_topics topicsTable JOIN dem_posts postsTable 
					ON topicsTable.topic_id = postsTable.topic_id 
					WHERE topicsTable.forum_id = @forumId
					GROUP BY topicsTable.topic_id,
							 topicsTable.topic_title,
							 topicsTable.topic_poster,
							 topicsTable.topic_time,
							 topicsTable.topic_views,
							 topicsTable.topic_closed
			)topicTableWithPostsCount WHERE LastPostTime = postsTable.post_time AND topicsTable.topic_id = postsTable.topic_id

			
			  ORDER BY topicTableWithPostsCount.LastPostTime DESC
			  Offset (@page-1)*@onpage Rows
			  Fetch Next @onpage Rows Only
	  
		  )tableWithUserId ON tableWithUserId.user_id = usersTable.user_id JOIN dem_groups groupsTable
	   ON groupsTable.group_id = usersTable.group_id
	  
	  )tableWithUserId ON tableWithUserId.topic_poster = usersTable.user_id JOIN dem_groups groupsTable
   ON groupsTable.group_id = usersTable.group_id;
GO




CREATE TABLE dem_banlist ( 
	ban_id               int NOT NULL   IDENTITY,
	user_id              int NOT NULL   ,
	ban_ip               nvarchar(100) NOT NULL   ,
	ban_email            nvarchar(255) NOT NULL   ,
	ban_start            datetime NOT NULL   ,
	ban_end              datetime NOT NULL   ,
	ban_exclude          bit NOT NULL   ,
	ban_type             nvarchar(255) NOT NULL   ,
	ban_reason           nvarchar(255) NOT NULL   ,
	CONSTRAINT Pk_banlist PRIMARY KEY ( ban_id )
 );

CREATE TABLE dem_bbcodes ( 
	bbcode_id            tinyint NOT NULL   IDENTITY,
	bbcode_order         tinyint NOT NULL   ,
	bbcode_tag           nvarchar(255) NOT NULL   ,
	bbcode_helpline      nvarchar(255) NOT NULL   ,
	display_on_posting   bit NOT NULL   ,
	bbcode_match         nvarchar(max) NOT NULL   ,
	bbcode_template      nvarchar(max) NOT NULL   ,
  bbcode_reg_options   NVARCHAR(max) NOT NULL   ,
	CONSTRAINT Pk_dem_bbcodes PRIMARY KEY ( bbcode_id )
 );

  INSERT INTO dem_bbcodes
    (bbcode_order, bbcode_tag, bbcode_helpline, display_on_posting, bbcode_match, bbcode_reg_options, bbcode_template)
VALUES 
(1,		'b',    		N'Жирный текст: [b]текст[/b]',																												                                                           		1,	'\[b\](.+?)\[\/b\]',						              			'IgnoreCase/Compiled/Singleline',		N'<span style="font-weight:bold;">${1}</span>'),
(2,		'i',    		N'Наклонный текст: [i]текст[/i]',																										                                                           			1,	'\[i\](.+?)\[\/i\]',						              			'IgnoreCase/Compiled/Singleline',		N'<span style="font-style:italic;">${1}</span>'),
(3,		'u',	    	N'Подчёркнутый текст: [u]текст[/u]',																								                                                          			1,	'\[u\](.+?)\[\/u\]',						              			'IgnoreCase/Compiled/Singleline',		N'<span style="text-decoration:underline;">${1}</span>'),
(4,		's',	    	N'Зачёркнутый текст: [s]текст[/s]',																											                                                         		1,	'\[s\](.+?)\[\/s\]',						              			'IgnoreCase/Compiled/Singleline',		N'<span style="text-decoration:line-through;">$1</span>'),
(5,		'upd',  		N'Добавлено: [upd=Время][/upd]',																											                                                          		0,	'\[upd=(.+?)\[\/upd\]',						            			'IgnoreCase/Compiled/Singleline',		N'<span style="font-size: 85%;line-height: normal;color: #a7a7a7;"><i>Добавлено:</i></span>'),                
(6,		'offtopic',	N'[offtopic]ваш оффтоп[/offtopic]',																										                                                      	    	1,	'\[offtopic\](.+?)\[\/offtopic\]',	      					'IgnoreCase/Compiled/Singleline',		N'<dl><dt>Оффтоп:</dt><dd><span style="color: #a7a7a7;"><i>$1</i></span></dd></dl>'),
(7,		'think',  	N'Думаю: [think]напишите о чём вы думаете[/think]',																				                                                					1,	'\[think\](.+?)\[\/think\]',			          				'IgnoreCase/Compiled/Singleline',		N'<table border="0" cellpadding="0" cellspacing="0"><tr><td style="margin: 0;padding: 0;border: 0;"><div style=" background-color: #FFEBD5;color: #000000; -moz-border-radius: 16px; -webkit-border-radius: 16px; border: 1px solid #FFFFFF; padding: 4px;font-size: 1em;" >&nbsp; $1 &nbsp;</div><img src=''~/Content/Smiles/forBbCode/think.gif''></td></tr></table>'),
(8,		'color',  	N'Цвет шрифта: [color=red]текст[/color] или [color=#FF0000]текст[/color]',								                                    											1,	'\[color=(.+?)\](.+?)\[\/color\]',	      					'IgnoreCase/Compiled/Singleline',		N'<span style="color:$1">$2</span>'),
(9,		'center', 	N'Текст в центре [center]текст[/center]',																							                                                      				1,	'\[center\](.+?)\[\/center\]',		        					'IgnoreCase/Compiled/Singleline',		N'<div style="text-align:center;">$1</div>'),
(10,	'left',		  N'Текст слева [left]текст[/left]',																										                                                        			1,	'\[left\](.+?)\[\/left\]',				          				'IgnoreCase/Compiled/Singleline',		N'<div style="text-align:left;">$1</div>'),
(11,	'right',	  N'Текст справа [right]текст[/right]',																											                                                        	1,	'\[right\](.+?)\[\/right\]',		          					'IgnoreCase/Compiled/Singleline',		N'<div style="text-align:right;">$1</div>'),
(12,	'size',		  N'Размер шрифта: [size=85]текст[/size]',																					                                                        					1,	'\[size=(.+?)\](.+?)\[\/size\]',		        				'IgnoreCase/Compiled/Singleline',		N'<span style="font-size:$1%">$2</span>'),                
(13,	'code',		  N'[code]код[/code]',																															                                                                	1,	'\[code\](.+?)\[\/code\]',					          			'IgnoreCase/Compiled/Singleline',		N'<dl class="codebox"><dt>Код: <a onclick="selectCode(this); return false;" href="#">Выделить всё</a></dt><dd><code>&nbsp; &nbsp;&nbsp; &nbsp;${1}</code></dd></dl>'),
(14,	'spoiler',	N'Скрытый текст: [spoiler]текст[/spoiler] или [spoiler="заголовок"]текст[/spoiler]',								                              						  		1,	'\[spoiler\](.+?)\[\/spoiler\]',			        			'IgnoreCase/Compiled/Singleline',		N'<dl class="spoilerbox"><dt>Спойлер</dt><dd>$1</dd></dl>'),
(15,	'spoiler',	N'Скрытый текст: [spoiler]текст[/spoiler] или [spoiler="заголовок"]текст[/spoiler]',								                              							  	0,	'\[spoiler=(.+?)\](.+?)\[\/spoiler\]',    					'IgnoreCase/Compiled/Singleline',		N'<dl class="spoilerbox"><dt>$1</dt><dd>$2</dd></dl>'),
(16,	'quote',  	N'Цитата: [quote]текст[/quote] или [quote="имя"]текст[/quote]',																				                                          		1,	'\[quote\](.+?)\[\/quote\]',					          		'IgnoreCase/Compiled/Singleline',		N'<blockquote><p class="quoteAutor">Цитата:</p><p>$1</p></blockquote>'),
(17,	'quote',  	N'Цитата: [quote]текст[/quote] или [quote="имя"]текст[/quote]',																					                                          	0,	'\[quote=(.+?)\](.+?)\[\/quote\]',	      					'IgnoreCase/Compiled/Singleline',		N'<blockquote><p class="quoteAutor"><b>$1</b> писал(а):</p><p>$2</p></blockquote>'),
(18,	'email',  	N'[email]укажите email[/email]',																													                                                          1,	'\[email\](.+?)\[\/email\]',		          					'IgnoreCase/Compiled/Singleline',		N'<a href="mailto:$1" rel="nofollow">mailto:$1</a>'),
(19,	'url',	  	N'Вставить ссылку: [url]http://url[/url] или [url=http://url]текст[/url]',																			                                    1,	'\[url\](.+?)\[\/url\]',						            		'IgnoreCase/Compiled/Singleline',		N'<a href="$1" rel="nofollow">$1</a>'),
(20,	'url',  		N'Вставить ссылку: [url]http://url[/url] или [url=http://url]текст[/url]',																			                                    0,	'\[url=(.+?)\](.+?)\[\/url\]',					        		'IgnoreCase/Compiled/Singleline',		N'<a href="$1" rel="nofollow">$2</a>'),
(21,	'img',  		N'Вставить изображение: [img]http://image_url[/img] или [img width=200 height=100]http://image_url[/img] или [img 200x100]http://image_url[/img]',	1,	'\[img\](.+?)\[\/img\]',							            	'IgnoreCase/Compiled/Singleline',		N'<img src="$1" alt="" />'),
(22,	'img',  		N'Вставить изображение: [img]http://image_url[/img] или [img width=200 height=100]http://image_url[/img] или [img 200x100]http://image_url[/img]',	0,	'\[img width=(.+?) height=(.+?)\](.+?)\[\/img\]',		'IgnoreCase/Compiled/Singleline',		N'<img src="$3" alt="" width="$1" height="$2" />'),
(23,	'img',	  	N'Вставить изображение: [img]http://image_url[/img] или [img width=200 height=100]http://image_url[/img] или [img 200x100]http://image_url[/img]',	0,	'\[img (.+?)x(.+?)\](.+?)\[\/img\]',      					'IgnoreCase/Compiled/Singleline',		N'<img src="$3" alt="" width="$1" height="$2" />'),
(24,	'ol',	     	N'Нумерованый список (Каждый элемент списка должен быть заключён в тег [li][/li]) [ol]список[/ol]',													                        1,	'\[ol\](.+?)\[\/ol\]',							            		'IgnoreCase/Compiled/Singleline',		N'<ol>${1}</ol>'),
(25,	'ul',	     	N'Маркированный  список (Каждый элемент списка должен быть заключён в тег [li][/li]) [ul]список[/ul]',											                        1,	'\[ul\](.+?)\[\/ul\]',						            			'IgnoreCase/Compiled/Singleline',		N'<ul>${1}</ul>'),
(26,	'li',	     	N'Отдельный элемент списка (Должен быть внутри тега [ol]список[/ol] или [ul]список[/ul]) [li]текст[/li]',									                          1,	'\[li\](.+?)\[\/li\]',						            			'IgnoreCase/Compiled/Singleline',		N'<li>${1}</li>'),
(27,	'table',   	N'Объявляет таблицу (наолняется тегами [tr]строка таблицы[/tr]) [table]содержимое[/table]',													                            		1,	'\[table\](.+?)\[\/table\]',		          					'IgnoreCase/Compiled/Singleline',		N'<table>${1}</table>'),
(28,	'tr',	     	N'Объявляет строку таблицы (наолняется тегами [td]яйчейка[/td], [th]яйчейка-заголовок[/th]. Входит в [table]содержимое[/table]) [tr]текст[/tr]',    1,	'\[tr\](.+?)\[\/tr\]',					            				'IgnoreCase/Compiled/Singleline',		N'<tr>${1}</tr>'),
(29,	'td',	     	N'Объявляет яйчейку строки таблицы (Входит в [tr]содержимое[/tr]) [td]яйчейка[/td]',														                                  	1,	'\[td\](.+?)\[\/td\]',							    						'IgnoreCase/Compiled/Singleline',		N'<td>${1}</td>'),
(30,	'th',	     	N'Объявляет яйчейку-заголовок строки таблицы (Входит в [tr]содержимое[/tr]) [th]яйчейка-заголовок[/th]',						                        				1,	'\[th\](.+?)\[\/th\]',					    								'IgnoreCase/Compiled/Singleline',		N'<th>${1}</th>'),
(31,	'h1',	     	N'Заголовок первого уровня: [h1]Заголовок[/h1]',																						                                                    		1,	'\[h1\](.+?)\[\/h1\]',						    							'IgnoreCase/Compiled/Singleline',		N'<h1>$1</h1>'),
(32,	'h2',	     	N'Заголовок первого уровня: [h2]Заголовок[/h2]',																			                                                    					1,	'\[h2\](.+?)\[\/h2\]',						    							'IgnoreCase/Compiled/Singleline',		N'<h2>$1</h2>'),
(33,	'h3',	     	N'Заголовок первого уровня: [h3]Заголовок[/h3]',																					                                                     			1,	'\[h3\](.+?)\[\/h3\]',					    								'IgnoreCase/Compiled/Singleline',		N'<h3>$1</h3>'),
(34,	'h4',	    	N'Заголовок первого уровня: [h4]Заголовок[/h4]',																			                                                    					1,	'\[h4\](.+?)\[\/h4\]',						    							'IgnoreCase/Compiled/Singleline',		N'<h4>$1</h4>'),
(35,	'h5',	     	N'Заголовок первого уровня: [h5]Заголовок[/h5]',																			                                                    					1,	'\[h5\](.+?)\[\/h5\]',						    							'IgnoreCase/Compiled/Singleline',		N'<h5>$1</h5>'),
(36,	'media',   	N'Вставить аудио, видео, карту, панораму или другое мультимедиа: [media]http://youtube.com/url[/media]',                                   					1,	'\[media\](.+?)\[\/media\]',						    				'IgnoreCase/Compiled/Singleline',		N'<div class=''bbmedia'' data-url=''$1'' style=''margin: 1px; display: inline-block; vertical-align: bottom;''><div style=''width: 200px; height: 40px; border: 1px solid #999; display: table-cell; text-align: center; vertical-align: middle; font: 10px/10px Verdana; color: #555; opacity: 0.5;''><a style=''color: #555; text-decoration: none;'' href=''http://phpbbex.com/'' target=''_blank''>phpBB &#91;media&#93;</a></div><script>if (typeof bbmedia == ''undefined'') { bbmedia = true; var e = document.createElement(''script''); e.async = true; e.src = ''~/Scripts/Custom/bbMedia.js''; var s = document.getElementsByTagName(''script'')[0]; s.parentNode.insertBefore(e, s); }</script></div>'),
(37,	'new line',	N'Заменяет NewLine на <br/>',																											                                                          			  0,	'(\r\n|\r|\n|\n\r)',								              	'IgnoreCase/Singleline',	    			N'<br/>');

CREATE TABLE dem_bots ( 
	bot_id               int NOT NULL   IDENTITY,
	bot_active           bit NOT NULL   ,
	bot_name             nvarchar(255) NOT NULL   ,
	user_id              int NOT NULL   ,
	bot_agent            nvarchar(255) NOT NULL   ,
	bot_ip               nvarchar(100) NOT NULL   ,
	CONSTRAINT Pk_dem_bots PRIMARY KEY ( bot_id )
 );

CREATE TABLE dem_config ( 
	config_name          nvarchar(255) NOT NULL   ,
	config_value         nvarchar(255) NOT NULL   ,
	CONSTRAINT Pk_dem_config PRIMARY KEY ( config_name )
 );

  INSERT INTO dem_config
    (config_name, config_value)
VALUES 
('postsOnPage',		'20'),
('topicsOnPage',		'50');


CREATE TABLE dem_disallow_usernames ( 
	disallow_id          int NOT NULL   IDENTITY,
	disallow_username    nvarchar(255) NOT NULL   ,
	CONSTRAINT Pk_dem_disallow_usernames PRIMARY KEY ( disallow_id )
 );

CREATE TABLE dem_extension_groups ( 
	group_id             int NOT NULL   IDENTITY,
	group_name           nvarchar(255) NOT NULL   ,
	allow_group          bit NOT NULL   ,
	download_mode        bit NOT NULL   ,
	upload_icon          nvarchar(255) NOT NULL   ,
	max_filesize         int NOT NULL   ,
	CONSTRAINT Pk_dem_extension_groups PRIMARY KEY ( group_id )
 );

CREATE TABLE dem_extensions ( 
	extension_id         int NOT NULL   IDENTITY,
	group_id             int NOT NULL   ,
	extension            nvarchar(255) NOT NULL   ,
	CONSTRAINT Pk_dem_extensions PRIMARY KEY ( extension_id )
 );

CREATE TABLE dem_forums ( 
	forum_id             int NOT NULL   IDENTITY,
	parent_id            int NOT NULL   ,
	forum_name           nvarchar(255) NOT NULL   ,
	forum_desc           nvarchar(max) NOT NULL   ,
	forum_password       nvarchar(50) NOT NULL   ,
	forum_pm             bit NOT NULL   ,
	forum_status         bit NOT NULL   ,
	display_subforum_list bit NOT NULL   ,
	display_on_index     bit NOT NULL   ,
	enable_indexing      bit NOT NULL   ,
	forum_order      int NOT NULL   ,
	CONSTRAINT Pk_dem_forums PRIMARY KEY ( forum_id )
 );
CREATE INDEX idx_dem_forums_forum_id ON dem_forums ( forum_id );

CREATE TABLE dem_forums_access_groups ( 
	forum_id             int NOT NULL   ,
	group_id             int NOT NULL   ,
	CONSTRAINT Pk_dem_forums_access_groups PRIMARY KEY ( forum_id, group_id )
 );

CREATE TABLE dem_forums_access_users ( 
	forum_id             int NOT NULL   ,
	user_id              int NOT NULL   ,
	CONSTRAINT Pk_dem_forums_access PRIMARY KEY ( forum_id, user_id )
 );

CREATE TABLE dem_groups ( 
	group_id             int NOT NULL   IDENTITY,
	group_type           tinyint NOT NULL   ,
	group_name           nvarchar(255) NOT NULL   ,
	group_desc           nvarchar(max) NOT NULL   ,
	group_avatar_url     nvarchar(max) NOT NULL   ,
	group_colour         nvarchar(6) NOT NULL   ,
	group_legend         bit NOT NULL   ,
	CONSTRAINT Pk_dem_groups PRIMARY KEY ( group_id )
 );

CREATE TABLE dem_lang ( 
	lang_id              int NOT NULL   IDENTITY,
	lang_iso             nvarchar(30) NOT NULL   ,
	lang_dir             nvarchar(30) NOT NULL   ,
	lang_english_name    nvarchar(255) NOT NULL   ,
	lang_local_name      nvarchar(255) NOT NULL   ,
	lang_author          nvarchar(255) NOT NULL   ,
	CONSTRAINT Pk_dem_lang PRIMARY KEY ( lang_id )
 );

CREATE TABLE dem_Log(
    LogId [int] IDENTITY(1,1) NOT NULL,
	  LogLevel [nvarchar](max) NOT NULL,
    CallSite [nvarchar](max) NOT NULL,
    ExceptionType [nvarchar](max) NOT NULL,
    ExceptionMessage [nvarchar](max) NOT NULL,
    StackTrace [nvarchar](max) NOT NULL,
    InnerExeption [nvarchar](max) NOT NULL,
    Message [nvarchar](max) NOT NULL,
    LogDate [datetime] NOT NULL
PRIMARY KEY CLUSTERED 
([LogId] ASC) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
);

CREATE TABLE dem_medals ( 
	medal_id             int NOT NULL   IDENTITY,
	medal_name           nvarchar(255) NOT NULL   ,
	medal_description    nvarchar(255) NOT NULL   ,
	medal_image          nvarchar(max) NOT NULL   ,
	medals_cat_id        int NOT NULL   ,
	medal_nominated      bit NOT NULL   ,
	medal_order_id       int NOT NULL   ,
	CONSTRAINT Pk_dem_medals PRIMARY KEY ( medal_id )
 );

CREATE TABLE dem_medals_awarded ( 
	awarded_id           int NOT NULL   IDENTITY,
	medal_id             int NOT NULL   ,
	user_id              int NOT NULL   ,
	awarder_id           int NOT NULL   ,
	awarded_time         datetime NOT NULL   ,
	awarded_nominated    bit NOT NULL   ,
	awarded_nominated_reason nvarchar(max) NOT NULL   ,
	CONSTRAINT Pk_dem_medals_awarded PRIMARY KEY ( awarded_id )
 );

CREATE TABLE dem_medals_cats ( 
	medals_cat_id        int NOT NULL   IDENTITY,
	medals_cat_name      nvarchar(255) NOT NULL   ,
	medals_cat_order_id  int NOT NULL   ,
	CONSTRAINT Pk_dem_medals_cats PRIMARY KEY ( medals_cat_id )
 );

CREATE TABLE dem_permissions_groups ( 
	group_id             int NOT NULL   ,
	forum_id             int NOT NULL   ,
	rule_id              int NOT NULL   ,
	settings_state       bit NOT NULL   
 );

CREATE TABLE dem_permissions_rules ( 
	rule_id              int NOT NULL   IDENTITY,
	rule_name            nvarchar(255) NOT NULL   ,
	is_global            bit NOT NULL   ,
	is_local             bit NOT NULL   ,
	founder_only         bit NOT NULL   ,
	CONSTRAINT Pk_dem_permissions_rule PRIMARY KEY ( rule_id )
 );

CREATE TABLE dem_permissions_users ( 
	user_id              int NOT NULL   ,
	forum_id             int NOT NULL   ,
	rule_id              int NOT NULL   ,
	settings_state       int NOT NULL   
 );

CREATE TABLE dem_poll_options ( 
	poll_option_id       int NOT NULL   ,
	poll_id             int NOT NULL   ,
	poll_option_text     nvarchar(255) NOT NULL
 );

CREATE TABLE dem_poll_votes ( 
	poll_option_id       int NOT NULL   ,
	poll_id             int NOT NULL   ,
	vote_user_id         int NOT NULL   ,
	vote_user_ip         nvarchar(100) NOT NULL
 );

CREATE TABLE dem_post_rates ( 
	post_id              int NOT NULL   ,
	user_id              int NOT NULL   ,
	rate                 smallint NOT NULL   ,
	rate_time            datetime NOT NULL   ,
	CONSTRAINT Idx_dem_post_rates PRIMARY KEY ( post_id, user_id )
 );

CREATE TABLE dem_posts ( 
	post_id              int NOT NULL   IDENTITY,
	topic_id             int NOT NULL   ,
	user_id            int NOT NULL   ,
	poster_ip            nvarchar(100) NOT NULL   ,
	post_time            datetime NOT NULL   ,
	post_merged          datetime NOT NULL   ,
	post_reported        bit NOT NULL   ,
	enable_bbcode        bit NOT NULL   ,
	enable_smilies       bit NOT NULL   ,
	enable_magic_url     bit NOT NULL   ,
	enable_sig           bit NOT NULL   ,
	post_subject         nvarchar(255) NOT NULL   ,
	post_text            nvarchar(MAX) NOT NULL   ,
	post_attachment      bit NOT NULL   ,
	post_edit_time       datetime NOT NULL   ,
	post_edit_reason     nvarchar(255) NOT NULL   ,
	post_edit_user       int NOT NULL   ,
	post_edit_count      int NOT NULL   ,
	post_edit_locked     bit NOT NULL   ,
	CONSTRAINT Pk_dem_posts PRIMARY KEY ( post_id )
 );
CREATE INDEX idx_dem_posts_topic_id ON dem_posts ( topic_id );

CREATE TABLE dem_ranks ( 
	rank_id              int NOT NULL   IDENTITY,
	rank_title           nvarchar(255) NOT NULL   ,
	rank_min             int NOT NULL   ,
	rank_special         bit NOT NULL   ,
	rank_image_url       nvarchar(max) NOT NULL   ,
	CONSTRAINT Pk_dem_ranks PRIMARY KEY ( rank_id )
 );

CREATE TABLE dem_reports ( 
	report_id            int NOT NULL   IDENTITY,
	post_id              int NOT NULL   ,
	user_id              int NOT NULL   ,
	reason_id            int NOT NULL   ,
	user_notify          bit NOT NULL   ,
	report_closed        bit NOT NULL   ,
	report_time          datetime NOT NULL   ,
	report_text          nvarchar(max) NOT NULL   ,
	CONSTRAINT Pk_dem_reports PRIMARY KEY ( report_id )
 );

CREATE TABLE dem_reports_reasons ( 
	reason_id            int NOT NULL   IDENTITY,
	reason_title         nvarchar(255) NOT NULL   ,
	reason_description   nvarchar(max) NOT NULL   ,
	reason_order         tinyint    ,
	CONSTRAINT Pk_dem_reports_reasons PRIMARY KEY ( reason_id )
 );

CREATE TABLE dem_sessions ( 
	session_id           nchar(32) NOT NULL   ,
	session_user_id      int NOT NULL   ,
	session_forum_id     int NOT NULL   ,
	session_last_visit   datetime NOT NULL   ,
	session_start        datetime NOT NULL   ,
	session_time         datetime NOT NULL   ,
	session_ip           nvarchar(100) NOT NULL   ,
	session_browser      nvarchar(255) NOT NULL   ,
	session_page         nvarchar(255) NOT NULL   ,
	session_viewonline   bit NOT NULL   ,
	session_autologin    bit NOT NULL   ,
	session_admin        bit NOT NULL   ,
	CONSTRAINT Pk_dem_sessions PRIMARY KEY ( session_id )
 );

CREATE TABLE dem_sessions_keys ( 
	key_id               nchar(32) NOT NULL   ,
	user_id              int NOT NULL   ,
	last_ip              nvarchar(100) NOT NULL   ,
	last_login           datetime NOT NULL   ,
	CONSTRAINT Pk_dem_sessions_keys PRIMARY KEY ( key_id, user_id )
 );

CREATE TABLE dem_smilies ( 
	smiley_id            int NOT NULL   IDENTITY,
	code                 nvarchar(50) NOT NULL   ,
	emotion              nvarchar(50) NOT NULL   ,
	smiley_url           nvarchar(255) NOT NULL   ,
	smiley_width         tinyint NOT NULL   ,
	smiley_height        tinyint NOT NULL   ,
	smiley_order         int NOT NULL   ,
	display_on_posting   bit NOT NULL   ,
	CONSTRAINT Pk_dem_smilies PRIMARY KEY ( smiley_id )
 );

CREATE TABLE dem_topics ( 
	topic_id             int NOT NULL   IDENTITY,
	forum_id             int NOT NULL   ,
	topic_title          nvarchar(255) NOT NULL   ,
	topic_poster         int NOT NULL   ,
	topic_time           datetime NOT NULL   ,
	topic_time_limit     datetime NOT NULL   ,
	topic_views          int NOT NULL   ,
	topic_private_type   bit NOT NULL   ,
	topic_last_view_time datetime NOT NULL   ,
	topic_closed   bit NOT NULL   ,
	polls_enabled       bit NOT NULL   ,
	polls_only     bit NOT NULL   ,
	topic_first_post_show bit NOT NULL   ,
	CONSTRAINT Pk_dem_topics PRIMARY KEY ( topic_id )
 );
CREATE INDEX idx_dem_topics_forum_id ON dem_topics ( forum_id );

CREATE TABLE dem_polls ( 
	poll_id             int NOT NULL   IDENTITY,
	topic_id             int NOT NULL   ,
	poll_title           nvarchar(255) NOT NULL   ,
	poll_start           datetime NOT NULL   ,
	poll_length          datetime NOT NULL   ,
	poll_max_options     tinyint NOT NULL   ,
	poll_last_vote       datetime NOT NULL   ,
	poll_vote_change     bit NOT NULL   ,
	CONSTRAINT Pk_dem_polls PRIMARY KEY ( poll_id )
 );

CREATE TABLE dem_topics_watch ( 
	topic_id             int NOT NULL   ,
	user_id              int NOT NULL   ,
	notify_status        bit NOT NULL   
 );

CREATE TABLE dem_track_forums ( 
	forum_id             int NOT NULL   ,
	user_id              int NOT NULL   ,
	mark_time            datetime NOT NULL   ,
	CONSTRAINT Pk_dem_track_forums PRIMARY KEY ( forum_id, user_id )
 );

CREATE TABLE dem_track_topics ( 
	topic_id             int NOT NULL   ,
	user_id              int NOT NULL   ,
	forum_id             int NOT NULL   ,
	mark_time            datetime NOT NULL   ,
	CONSTRAINT Pk_dem_track_topics PRIMARY KEY ( topic_id, user_id )
 );

CREATE TABLE dem_user_confirm_keys ( 
	confirm_key          nvarchar(10) NOT NULL   ,
	user_id              int NOT NULL   ,
	confirm_time         datetime NOT NULL   ,
	CONSTRAINT Pk_dem_user_confirm_keys PRIMARY KEY ( confirm_key )
 );

CREATE TABLE dem_users ( 
	user_id              int NOT NULL   IDENTITY,
	user_type            tinyint NOT NULL   ,
	group_id             int NOT NULL   ,
	user_ip              nvarchar(100) NOT NULL   ,
	user_browser         nvarchar(225) NOT NULL   ,
	user_regdate         datetime NOT NULL   ,
	username             nvarchar(255) NOT NULL   ,
	username_clean       nvarchar(255) NOT NULL   ,
	user_password        nvarchar(40) NOT NULL   ,
	user_password_change_date datetime NOT NULL   ,
	user_email           nvarchar(255) NOT NULL   ,
	user_email_hash      nvarchar(40) NOT NULL   ,
	user_birthday        datetime NOT NULL   ,
	user_gender          INT NOT NULL   ,
	user_lastvisit       datetime NOT NULL   ,
	user_lastmark        datetime NOT NULL   ,
	user_lastpage        nvarchar(255) NOT NULL   ,
	user_login_attempts  tinyint NOT NULL   ,
	user_inactive_reason tinyint NOT NULL   ,
	user_inactive_time   datetime NOT NULL   ,
	user_lang            nvarchar(30) NOT NULL   ,
	user_timezone        decimal(5,2) NOT NULL   ,
	user_dateformat      nvarchar(30) NOT NULL   ,
	user_rank            int NOT NULL   ,
	user_notify          bit NOT NULL   ,
	user_notify_pm       bit NOT NULL   ,
	user_avatar          nvarchar(max) NOT NULL   ,
	user_signature       nvarchar(max) NOT NULL   ,
	user_from            nvarchar(255) NOT NULL   ,
	user_steam           nvarchar(255) NOT NULL   ,
	user_skype           nvarchar(255) NOT NULL   ,
	user_icq             nvarchar(255) NOT NULL   ,
	user_vk              nvarchar(255) NOT NULL   ,
	user_fb              nvarchar(255) NOT NULL   ,
	user_website         nvarchar(max) NOT NULL   ,
	user_profession      nvarchar(255) NOT NULL   ,
	user_interests       nvarchar(max) NOT NULL   ,
	user_actkey          nvarchar(32) NOT NULL   ,
	user_newpassword     nvarchar(40) NOT NULL   ,
	user_form_salt       nvarchar(32) NOT NULL   ,
	CONSTRAINT Pk_dem_users PRIMARY KEY ( user_id )
 );

CREATE TABLE dem_warnings ( 
	warning_id           int NOT NULL   IDENTITY,
	user_id              int NOT NULL   ,
	issuer_id            int NOT NULL   ,
	post_id              int NOT NULL   ,
	LogId                int NOT NULL   ,
	warning_time         datetime NOT NULL   ,
	warning_days         int NOT NULL   ,
	warning_type         nvarchar(255) NOT NULL   ,
	warning_text         nvarchar(max) NOT NULL   ,
	CONSTRAINT Pk_dem_warnings PRIMARY KEY ( warning_id )
 );

CREATE TABLE dem_words ( 
	word_id              int NOT NULL   IDENTITY,
	word                 nvarchar(255) NOT NULL   ,
	replacement          nvarchar(255) NOT NULL   ,
	CONSTRAINT Pk_dem_words PRIMARY KEY ( word_id )
 );