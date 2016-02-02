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
  no_parse_code			 bit NOT NULL
	CONSTRAINT Pk_dem_bbcodes PRIMARY KEY ( bbcode_id )
 );

  INSERT INTO dem_bbcodes
    (bbcode_order, bbcode_tag, bbcode_helpline, display_on_posting, bbcode_match, bbcode_reg_options, bbcode_template, no_parse_code)
VALUES 
(1,		'b',    	N'Жирный текст: [b]текст[/b]',																												        1,	'\[b\](.*?)\[\/b\]',						        'IgnoreCase/Compiled/Singleline',		N'<span style="font-weight:bold;">${1}</span>',0),
(2,		'i',    	N'Наклонный текст: [i]текст[/i]',																										            1,	'\[i\](.*?)\[\/i\]',						        'IgnoreCase/Compiled/Singleline',		N'<span style="font-style:italic;">${1}</span>',0),
(3,		'u',	    N'Подчёркнутый текст: [u]текст[/u]',																								                1,	'\[u\](.*?)\[\/u\]',						        'IgnoreCase/Compiled/Singleline',		N'<span style="text-decoration:underline;">${1}</span>',0),
(4,		's',	    N'Зачёркнутый текст: [s]текст[/s]',																											        1,	'\[s\](.*?)\[\/s\]',						        'IgnoreCase/Compiled/Singleline',		N'<span style="text-decoration:line-through;">$1</span>',0),
(5,		'upd',  	N'Добавлено: [upd=Время][/upd]',																											        0,	'\[upd=(.*?)\[\/upd\]',						        'IgnoreCase/Compiled/Singleline',		N'<span style="font-size: 85%;line-height: normal;color: #a7a7a7;"><i>Добавлено:</i></span>',0),                
(6,		'offtopic',	N'[offtopic]ваш оффтоп[/offtopic]',																										            1,	'\[offtopic\](.*?)\[\/offtopic\]',	      			'IgnoreCase/Compiled/Singleline',		N'<dl><dt>Оффтоп:</dt><dd><span style="color: #a7a7a7;"><i>$1</i></span></dd></dl>',0),
(7,		'think',  	N'Думаю: [think]напишите о чём вы думаете[/think]',																				                    1,	'\[think\](.*?)\[\/think\]',			          	'IgnoreCase/Compiled/Singleline',		N'<table border="0" cellpadding="0" cellspacing="0"><tr><td style="margin: 0;padding: 0;border: 0;"><div style=" background-color: #FFEBD5;color: #000000; -moz-border-radius: 16px; -webkit-border-radius: 16px; border: 1px solid #FFFFFF; padding: 4px;font-size: 1em;" >&nbsp; $1 &nbsp;</div><img src=''~/Content/Smiles/forBbCode/think.gif''></td></tr></table>',0),
(8,		'color',  	N'Цвет шрифта: [color=red]текст[/color] или [color=#FF0000]текст[/color]',								                                    		1,	'\[color=(.*?)\](.*?)\[\/color\]',	      			'IgnoreCase/Compiled/Singleline',		N'<span style="color:$1">$2</span>',0),
(9,		'center', 	N'Текст в центре [center]текст[/center]',																							                1,	'\[center\](.*?)\[\/center\]',		        		'IgnoreCase/Compiled/Singleline',		N'<div style="text-align:center;">$1</div>',0),
(10,	'left',		N'Текст слева [left]текст[/left]',																										            1,	'\[left\](.*?)\[\/left\]',				          	'IgnoreCase/Compiled/Singleline',		N'<div style="text-align:left;">$1</div>',0),
(11,	'right',	N'Текст справа [right]текст[/right]',																											    1,	'\[right\](.*?)\[\/right\]',		          		'IgnoreCase/Compiled/Singleline',		N'<div style="text-align:right;">$1</div>',0),
(12,	'size',		N'Размер шрифта: [size=85]текст[/size]',																					                        1,	'\[size=(.*?)\](.*?)\[\/size\]',		        	'IgnoreCase/Compiled/Singleline',		N'<span style="font-size:$1%">$2</span>',0),                
(13,	'code',		N'[code]код[/code]',																															    1,	'\[code\](.*?)\[\/code\]',					        'IgnoreCase/Compiled/Singleline',		N'<dl class="codebox"><dt>Код: <span>Ctrl+A, Ctrl+C</span></dt><dd><code>&nbsp; &nbsp;&nbsp; &nbsp;${1}</code></dd></dl>',1),
(14,	'spoiler',	N'Скрытый текст: [spoiler]текст[/spoiler] или [spoiler="заголовок"]текст[/spoiler]',								                              	1,	'\[spoiler\](.*?)\[\/spoiler\]',			        'IgnoreCase/Compiled/Singleline',		N'<dl class="spoilerbox"><dt>Спойлер</dt><dd>$1</dd></dl>',0),
(15,	'spoiler',	N'Скрытый текст: [spoiler]текст[/spoiler] или [spoiler="заголовок"]текст[/spoiler]',								                              	0,	'\[spoiler=(.*?)\](.*?)\[\/spoiler\]',    			'IgnoreCase/Compiled/Singleline',		N'<dl class="spoilerbox"><dt>$1</dt><dd>$2</dd></dl>',0),
(16,	'quote',  	N'Цитата: [quote]текст[/quote] или [quote="имя"]текст[/quote]',																				        1,	'\[quote\](.*?)\[\/quote\]',					    'IgnoreCase/Compiled/Singleline',		N'<blockquote><p class="quoteAutor">Цитата:</p><p>$1</p></blockquote>',0),
(17,	'quote',  	N'Цитата: [quote]текст[/quote] или [quote="имя"]текст[/quote]',																					   	0,	'\[quote=(.*?)\](.*?)\[\/quote\]',	      			'IgnoreCase/Compiled/Singleline',		N'<blockquote><p class="quoteAutor"><b>$1</b> писал(а):</p><p>$2</p></blockquote>',0),
(18,	'email',  	N'[email]укажите email[/email]',																													1,	'\[email\](.*?)\[\/email\]',		          		'IgnoreCase/Compiled/Singleline',		N'<a href="mailto:$1" rel="nofollow">mailto:$1</a>',0),
(19,	'url',	  	N'Вставить ссылку: [url]http://url[/url] или [url=http://url]текст[/url]',																			1,	'\[url\](.*?)\[\/url\]',						    'IgnoreCase/Compiled/Singleline',		N'<a href="$1" rel="nofollow">$1</a>',0),
(20,	'url',  	N'Вставить ссылку: [url]http://url[/url] или [url=http://url]текст[/url]',																			0,	'\[url=(.*?)\](.*?)\[\/url\]',					    'IgnoreCase/Compiled/Singleline',		N'<a href="$1" rel="nofollow">$2</a>',0),
(21,	'img',  	N'Вставить изображение: [img]http://image_url[/img] или [img width=200 height=100]http://image_url[/img] или [img 200x100]http://image_url[/img]',	1,	'\[img\](.*?)\[\/img\]',							'IgnoreCase/Compiled/Singleline',		N'<img src="$1" alt="" />',0),
(22,	'img',  	N'Вставить изображение: [img]http://image_url[/img] или [img width=200 height=100]http://image_url[/img] или [img 200x100]http://image_url[/img]',	0,	'\[img width=(.*?) height=(.*?)\](.*?)\[\/img\]',	'IgnoreCase/Compiled/Singleline',		N'<img src="$3" alt="" width="$1" height="$2" />',0),
(23,	'img',	  	N'Вставить изображение: [img]http://image_url[/img] или [img width=200 height=100]http://image_url[/img] или [img 200x100]http://image_url[/img]',	0,	'\[img (.*?)x(.*?)\](.*?)\[\/img\]',      			'IgnoreCase/Compiled/Singleline',		N'<img src="$3" alt="" width="$1" height="$2" />',0),
(24,	'ol',	    N'Нумерованый список (Каждый элемент списка должен быть заключён в тег [li][/li]) [ol]список[/ol]',													1,	'\[ol\](.*?)\[\/ol\]',							    'IgnoreCase/Compiled/Singleline',		N'<ol>${1}</ol>',0),
(25,	'ul',	    N'Маркированный  список (Каждый элемент списка должен быть заключён в тег [li][/li]) [ul]список[/ul]',											    1,	'\[ul\](.*?)\[\/ul\]',						        'IgnoreCase/Compiled/Singleline',		N'<ul>${1}</ul>',0),
(26,	'li',	    N'Отдельный элемент списка (Должен быть внутри тега [ol]список[/ol] или [ul]список[/ul]) [li]текст[/li]',									        1,	'\[li\](.*?)\[\/li\]',						        'IgnoreCase/Compiled/Singleline',		N'<li>${1}</li>',0),
(27,	'table',   	N'Объявляет таблицу (наолняется тегами [tr]строка таблицы[/tr]) [table]содержимое[/table]',													        1,	'\[table\](.*?)\[\/table\]',		          		'IgnoreCase/Compiled/Singleline',		N'<table>${1}</table>',0),
(28,	'tr',	    N'Объявляет строку таблицы (наолняется тегами [td]яйчейка[/td], [th]яйчейка-заголовок[/th]. Входит в [table]содержимое[/table]) [tr]текст[/tr]',    1,	'\[tr\](.*?)\[\/tr\]',					            'IgnoreCase/Compiled/Singleline',		N'<tr>${1}</tr>',0),
(29,	'td',	    N'Объявляет яйчейку строки таблицы (Входит в [tr]содержимое[/tr]) [td]яйчейка[/td]',														        1,	'\[td\](.*?)\[\/td\]',							    'IgnoreCase/Compiled/Singleline',		N'<td>${1}</td>',0),
(30,	'th',	    N'Объявляет яйчейку-заголовок строки таблицы (Входит в [tr]содержимое[/tr]) [th]яйчейка-заголовок[/th]',						                    1,	'\[th\](.*?)\[\/th\]',					    		'IgnoreCase/Compiled/Singleline',		N'<th>${1}</th>',0),
(31,	'h1',	    N'Заголовок первого уровня: [h1]Заголовок[/h1]',																						            1,	'\[h1\](.*?)\[\/h1\]',						    	'IgnoreCase/Compiled/Singleline',		N'<h1>$1</h1>',0),
(32,	'h2',	    N'Заголовок первого уровня: [h2]Заголовок[/h2]',																			                        1,	'\[h2\](.*?)\[\/h2\]',						    	'IgnoreCase/Compiled/Singleline',		N'<h2>$1</h2>',0),
(33,	'h3',	    N'Заголовок первого уровня: [h3]Заголовок[/h3]',																					                1,	'\[h3\](.*?)\[\/h3\]',					    		'IgnoreCase/Compiled/Singleline',		N'<h3>$1</h3>',0),
(34,	'h4',	    N'Заголовок первого уровня: [h4]Заголовок[/h4]',																			                        1,	'\[h4\](.*?)\[\/h4\]',						    	'IgnoreCase/Compiled/Singleline',		N'<h4>$1</h4>',0),
(35,	'h5',	    N'Заголовок первого уровня: [h5]Заголовок[/h5]',																			                        1,	'\[h5\](.*?)\[\/h5\]',						    	'IgnoreCase/Compiled/Singleline',		N'<h5>$1</h5>',0),
(36,	'media',   	N'Вставить аудио, видео, карту, панораму или другое мультимедиа: [media]http://youtube.com/url[/media]',                                   			1,	'\[media\](.*?)\[\/media\]',						'IgnoreCase/Compiled/Singleline',		N'<div class=''bbCodeMedia'' data-url=''$1'' style=''margin: 1px; display: inline-block; vertical-align: bottom;''><div style=''width: 200px; height: 40px; border: 1px solid #999; display: table-cell; text-align: center; vertical-align: middle; font: 10px/10px Verdana; color: #555; opacity: 0.5;''></div></div>',0),
(37,	'new line',	N'Заменяет NewLine на <br/>',																											            0,	'(\r\n|\r|\n|\n\r)',								'IgnoreCase/Singleline',	    		N'<br/>',0);

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