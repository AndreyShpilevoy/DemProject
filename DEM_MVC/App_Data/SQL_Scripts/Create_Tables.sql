CREATE TABLE dem_bbcodes ( 
	bbcode_id            tinyint NOT NULL   IDENTITY,
	bbcode_order         tinyint NOT NULL   ,
	bbcode_tag           nvarchar(255) NOT NULL   ,
	bbcode_helpline      nvarchar(255) NOT NULL   ,
	display_on_posting   bit NOT NULL   ,
	bbcode_match         nvarchar(max) NOT NULL   ,
	bbcode_tpl           nvarchar(max) NOT NULL   ,
	CONSTRAINT Pk_dem_bbcodes PRIMARY KEY ( bbcode_id )
 );


CREATE TABLE dem_config ( 
	config_name          nvarchar(255) NOT NULL   ,
	config_value         nvarchar(255) NOT NULL   ,
	CONSTRAINT Pk_dem_config PRIMARY KEY ( config_name )
 );

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

CREATE INDEX idx_dem_extensions ON dem_extensions ( group_id );

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

CREATE TABLE dem_medals_cats ( 
	medals_cat_id        int NOT NULL   IDENTITY,
	medals_cat_name      nvarchar(255) NOT NULL   ,
	medals_cat_order_id  int NOT NULL   ,
	CONSTRAINT Pk_dem_medals_cats PRIMARY KEY ( medals_cat_id )
 );

CREATE TABLE dem_permissions_rules ( 
	rule_id              int NOT NULL   IDENTITY,
	rule_name            nvarchar(255) NOT NULL   ,
	is_global            bit NOT NULL   ,
	is_local             bit NOT NULL   ,
	founder_only         bit NOT NULL   ,
	CONSTRAINT Pk_dem_permissions_rule PRIMARY KEY ( rule_id )
 );

CREATE TABLE dem_ranks ( 
	rank_id              int NOT NULL   IDENTITY,
	rank_title           nvarchar(255) NOT NULL   ,
	rank_min             int NOT NULL   ,
	rank_special         bit NOT NULL   ,
	rank_image_url       nvarchar(max) NOT NULL   ,
	CONSTRAINT Pk_dem_ranks PRIMARY KEY ( rank_id )
 );

CREATE TABLE dem_reports_reasons ( 
	reason_id            int NOT NULL   IDENTITY,
	reason_title         nvarchar(255) NOT NULL   ,
	reason_description   nvarchar(max) NOT NULL   ,
	reason_order         tinyint    ,
	CONSTRAINT Pk_dem_reports_reasons PRIMARY KEY ( reason_id )
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

CREATE TABLE dem_users ( 
	user_id              int NOT NULL   IDENTITY,
	user_type            tinyint NOT NULL   ,
	group_id             int NOT NULL   ,
	user_ip              nvarchar(100) NOT NULL   ,
	user_browser         nvarchar(225) NOT NULL   ,
	user_regdate         smalldatetime NOT NULL   ,
	username             nvarchar(255) NOT NULL   ,
	username_clean       nvarchar(255) NOT NULL   ,
	user_password        nvarchar(40) NOT NULL   ,
	user_password_change_date smalldatetime NOT NULL   ,
	user_email           nvarchar(255) NOT NULL   ,
	user_email_hash      nvarchar(40) NOT NULL   ,
	user_birthday        smalldatetime NOT NULL   ,
	user_gender          bit NOT NULL   ,
	user_lastvisit       smalldatetime NOT NULL   ,
	user_lastmark        smalldatetime NOT NULL   ,
	user_lastpage        nvarchar(255) NOT NULL   ,
	user_login_attempts  tinyint NOT NULL   ,
	user_inactive_reason tinyint NOT NULL   ,
	user_inactive_time   smalldatetime NOT NULL   ,
	user_lang            nvarchar(30) NOT NULL   ,
	user_timezone        decimal(5,2) NOT NULL   ,
	user_dateformat      nvarchar(30) NOT NULL   ,
	user_rank            int NOT NULL   ,
	user_notify          bit NOT NULL   ,
	user_notify_pm       bit NOT NULL   ,
	user_avatar          nvarchar(max) NOT NULL   ,
	user_sig             nvarchar(max) NOT NULL   ,
	user_from            nvarchar(255) NOT NULL   ,
	user_steam           nvarchar(255) NOT NULL   ,
	user_skype           nvarchar(255) NOT NULL   ,
	user_icq             nvarchar(255) NOT NULL   ,
	user_website         nvarchar(max) NOT NULL   ,
	user_occ             nvarchar(255) NOT NULL   ,
	user_interests       nvarchar(max) NOT NULL   ,
	user_actkey          nvarchar(32) NOT NULL   ,
	user_newpasswd       nvarchar(40) NOT NULL   ,
	user_form_salt       nvarchar(32) NOT NULL   ,
	CONSTRAINT Pk_dem_users PRIMARY KEY ( user_id )
 );

CREATE INDEX idx_dem_users ON dem_users ( group_id );

CREATE INDEX idx_dem_users_0 ON dem_users ( user_rank );

CREATE TABLE dem_words ( 
	word_id              int NOT NULL   IDENTITY,
	word                 nvarchar(255) NOT NULL   ,
	replacement          nvarchar(255) NOT NULL   ,
	CONSTRAINT Pk_dem_words PRIMARY KEY ( word_id )
 );

CREATE TABLE dem_banlist ( 
	ban_id               int NOT NULL   IDENTITY,
	user_id              int NOT NULL   ,
	ban_ip               nvarchar(100) NOT NULL   ,
	ban_email            nvarchar(255) NOT NULL   ,
	ban_start            smalldatetime NOT NULL   ,
	ban_end              smalldatetime NOT NULL   ,
	ban_exclude          bit NOT NULL   ,
	ban_type             nvarchar(255) NOT NULL   ,
	ban_reason           nvarchar(255) NOT NULL   ,
	CONSTRAINT Pk_banlist PRIMARY KEY ( ban_id )
 );

CREATE INDEX idx_dem_banlist ON dem_banlist ( user_id );

CREATE TABLE dem_bots ( 
	bot_id               int NOT NULL   IDENTITY,
	bot_active           bit NOT NULL   ,
	bot_name             nvarchar(255) NOT NULL   ,
	user_id              int NOT NULL   ,
	bot_agent            nvarchar(255) NOT NULL   ,
	bot_ip               nvarchar(100) NOT NULL   ,
	CONSTRAINT Pk_dem_bots PRIMARY KEY ( bot_id )
 );

CREATE INDEX idx_dem_bots ON dem_bots ( user_id );

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

CREATE INDEX idx_dem_medals ON dem_medals ( medals_cat_id );

CREATE TABLE dem_medals_awarded ( 
	awarded_id           int NOT NULL   IDENTITY,
	medal_id             int NOT NULL   ,
	user_id              int NOT NULL   ,
	awarder_id           int NOT NULL   ,
	awarded_time         smalldatetime NOT NULL   ,
	awarded_nominated    bit NOT NULL   ,
	awarded_nominated_reason nvarchar(max) NOT NULL   ,
	CONSTRAINT Pk_dem_medals_awarded PRIMARY KEY ( awarded_id )
 );

CREATE INDEX idx_dem_medals_awarded ON dem_medals_awarded ( medal_id );

CREATE INDEX idx_dem_medals_awarded_0 ON dem_medals_awarded ( user_id );

CREATE INDEX idx_dem_medals_awarded_1 ON dem_medals_awarded ( awarder_id );

CREATE TABLE dem_sessions_keys ( 
	key_id               nchar(32) NOT NULL   ,
	user_id              int NOT NULL   ,
	last_ip              nvarchar(100) NOT NULL   ,
	last_login           smalldatetime NOT NULL   ,
	CONSTRAINT Pk_dem_sessions_keys PRIMARY KEY ( key_id, user_id )
 );

CREATE INDEX idx_dem_sessions_keys ON dem_sessions_keys ( user_id );

CREATE TABLE dem_user_confirm_keys ( 
	confirm_key          nvarchar(10) NOT NULL   ,
	user_id              int NOT NULL   ,
	confirm_time         smalldatetime NOT NULL   ,
	CONSTRAINT Pk_dem_user_confirm_keys PRIMARY KEY ( confirm_key )
 );

CREATE INDEX idx_dem_user_confirm_keys ON dem_user_confirm_keys ( user_id );

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
	CONSTRAINT Pk_dem_forums PRIMARY KEY ( forum_id )
 );

CREATE INDEX idx_dem_forums ON dem_forums ( parent_id );

CREATE TABLE dem_forums_access_groups ( 
	forum_id             int NOT NULL   ,
	group_id             int NOT NULL   ,
	CONSTRAINT Pk_dem_forums_access_groups PRIMARY KEY ( forum_id, group_id )
 );

CREATE INDEX idx_dem_forums_access_groups_0 ON dem_forums_access_groups ( forum_id );

CREATE INDEX idx_dem_forums_access_groups ON dem_forums_access_groups ( group_id );

CREATE TABLE dem_forums_access_users ( 
	forum_id             int NOT NULL   ,
	user_id              int NOT NULL   ,
	CONSTRAINT Pk_dem_forums_access PRIMARY KEY ( forum_id, user_id )
 );

CREATE INDEX idx_dem_forums_access_users ON dem_forums_access_users ( forum_id );

CREATE INDEX idx_dem_forums_access_users_0 ON dem_forums_access_users ( user_id );

CREATE TABLE dem_log ( 
	log_id               int NOT NULL   IDENTITY,
	log_type             tinyint NOT NULL   ,
	user_id              int NOT NULL   ,
	forum_id             int NOT NULL   ,
	topic_id             int NOT NULL   ,
	reportee_id          int NOT NULL   ,
	log_ip               nvarchar(100) NOT NULL   ,
	log_time             smalldatetime NOT NULL   ,
	log_operation        nvarchar(255) NOT NULL   ,
	log_data             nvarchar(max) NOT NULL   ,
	CONSTRAINT Pk_dem_log PRIMARY KEY ( log_id )
 );

CREATE INDEX idx_dem_log ON dem_log ( forum_id );

CREATE INDEX idx_dem_log_0 ON dem_log ( topic_id );

CREATE INDEX idx_dem_log_1 ON dem_log ( user_id );

CREATE TABLE dem_permissions_groups ( 
	group_id             int NOT NULL   ,
	forum_id             int NOT NULL   ,
	rule_id              int NOT NULL   ,
	settings_state       bit NOT NULL   
 );

CREATE INDEX idx_dem_permissions_groups ON dem_permissions_groups ( group_id );

CREATE INDEX idx_dem_permissions_groups_0 ON dem_permissions_groups ( forum_id );

CREATE INDEX idx_dem_permissions_groups_1 ON dem_permissions_groups ( rule_id );

CREATE TABLE dem_permissions_users ( 
	user_id              int NOT NULL   ,
	forum_id             int NOT NULL   ,
	rule_id              int NOT NULL   ,
	settings_state       int NOT NULL   
 );

CREATE INDEX idx_dem_permissions_users ON dem_permissions_users ( rule_id );

CREATE INDEX idx_dem_permissions_users_1 ON dem_permissions_users ( forum_id );

CREATE INDEX idx_dem_permissions_users_0 ON dem_permissions_users ( user_id );

CREATE TABLE dem_poll_options ( 
	poll_option_id       int NOT NULL   ,
	topic_id             int NOT NULL   ,
	poll_option_text     nvarchar(255) NOT NULL   ,
	poll_option_total    int NOT NULL
 );
 
CREATE INDEX Pk_dem_poll_options_0 ON DEM_Project.dem_poll_options ( poll_option_id );

CREATE INDEX idx_dem_poll_options ON DEM_Project.dem_poll_options ( topic_id );

CREATE TABLE dem_poll_votes ( 
	poll_option_id       int NOT NULL   ,
	topic_id             int NOT NULL   ,
	vote_user_id         int NOT NULL   ,
	vote_user_ip         nvarchar(100) NOT NULL
 );

CREATE INDEX Idx_dem_poll_votes_1 ON DEM_Project.dem_poll_votes ( poll_option_id );

CREATE INDEX idx_dem_poll_votes ON DEM_Project.dem_poll_votes ( topic_id );

CREATE INDEX idx_dem_poll_votes_0 ON DEM_Project.dem_poll_votes ( vote_user_id );

CREATE TABLE dem_post_rates ( 
	post_id              int NOT NULL   ,
	user_id              int NOT NULL   ,
	rate                 smallint NOT NULL   ,
	rate_time            smalldatetime NOT NULL   ,
	CONSTRAINT Idx_dem_post_rates PRIMARY KEY ( post_id, user_id )
 );

CREATE INDEX idx_dem_post_rates_0 ON dem_post_rates ( post_id );

CREATE INDEX idx_dem_post_rates_1 ON dem_post_rates ( user_id );

CREATE TABLE dem_posts ( 
	post_id              int NOT NULL   IDENTITY,
	forum_id             int NOT NULL   ,
	topic_id             int NOT NULL   ,
	poster_id            int NOT NULL   ,
	poster_ip            nvarchar(100) NOT NULL   ,
	post_time            smalldatetime NOT NULL   ,
	post_merged          smalldatetime NOT NULL   ,
	post_reported        bit NOT NULL   ,
	enable_bbcode        bit NOT NULL   ,
	enable_smilies       bit NOT NULL   ,
	enable_magic_url     bit NOT NULL   ,
	enable_sig           bit NOT NULL   ,
	post_subject         nvarchar(255) NOT NULL   ,
	post_text            ntext NOT NULL   ,
	post_attachment      bit NOT NULL   ,
	post_edit_time       smalldatetime NOT NULL   ,
	post_edit_reason     nvarchar(255) NOT NULL   ,
	post_edit_user       int NOT NULL   ,
	post_edit_count      int NOT NULL   ,
	post_edit_locked     bit NOT NULL   ,
	CONSTRAINT Pk_dem_posts PRIMARY KEY ( post_id )
 );

CREATE INDEX idx_dem_posts ON dem_posts ( forum_id );

CREATE INDEX idx_dem_posts_0 ON dem_posts ( topic_id );

CREATE INDEX idx_dem_posts_1 ON dem_posts ( poster_id );

CREATE INDEX idx_dem_posts_2 ON dem_posts ( post_edit_user );

CREATE TABLE dem_reports ( 
	report_id            int NOT NULL   IDENTITY,
	post_id              int NOT NULL   ,
	user_id              int NOT NULL   ,
	reason_id            int NOT NULL   ,
	user_notify          bit NOT NULL   ,
	report_closed        bit NOT NULL   ,
	report_time          smalldatetime NOT NULL   ,
	report_text          nvarchar(max) NOT NULL   ,
	CONSTRAINT Pk_dem_reports PRIMARY KEY ( report_id )
 );

CREATE INDEX idx_dem_reports ON dem_reports ( post_id );

CREATE INDEX idx_dem_reports_0 ON dem_reports ( reason_id );

CREATE INDEX idx_dem_reports_1 ON dem_reports ( user_id );

CREATE TABLE dem_sessions ( 
	session_id           nchar(32) NOT NULL   ,
	session_user_id      int NOT NULL   ,
	session_forum_id     int NOT NULL   ,
	session_last_visit   smalldatetime NOT NULL   ,
	session_start        smalldatetime NOT NULL   ,
	session_time         smalldatetime NOT NULL   ,
	session_ip           nvarchar(100) NOT NULL   ,
	session_browser      nvarchar(255) NOT NULL   ,
	session_page         nvarchar(255) NOT NULL   ,
	session_viewonline   bit NOT NULL   ,
	session_autologin    bit NOT NULL   ,
	session_admin        bit NOT NULL   ,
	CONSTRAINT Pk_dem_sessions PRIMARY KEY ( session_id )
 );

CREATE INDEX idx_dem_sessions ON dem_sessions ( session_forum_id );

CREATE INDEX idx_dem_sessions_0 ON dem_sessions ( session_user_id );

CREATE TABLE dem_topics ( 
	topic_id             int NOT NULL   IDENTITY,
	forum_id             int NOT NULL   ,
	topic_title          nvarchar(255) NOT NULL   ,
	topic_poster         int NOT NULL   ,
	topic_time           smalldatetime NOT NULL   ,
	topic_time_limit     smalldatetime NOT NULL   ,
	topic_views          int NOT NULL   ,
	topic_private_type   bit NOT NULL   ,
	topic_last_view_time smalldatetime NOT NULL   ,
	poll_title           nvarchar(255) NOT NULL   ,
	poll_start           smalldatetime NOT NULL   ,
	poll_length          smalldatetime NOT NULL   ,
	poll_max_options     tinyint NOT NULL   ,
	poll_last_vote       smalldatetime NOT NULL   ,
	poll_vote_change     bit NOT NULL   ,
	topic_first_post_show bit NOT NULL   ,
	CONSTRAINT Pk_dem_topics PRIMARY KEY ( topic_id )
 );

CREATE INDEX idx_dem_topics ON dem_topics ( forum_id );

CREATE INDEX idx_dem_topics_0 ON dem_topics ( topic_poster );

CREATE TABLE dem_topics_watch ( 
	topic_id             int NOT NULL   ,
	user_id              int NOT NULL   ,
	notify_status        bit NOT NULL   
 );

CREATE INDEX idx_dem_topics_watch ON dem_topics_watch ( topic_id );

CREATE INDEX idx_dem_topics_watch_0 ON dem_topics_watch ( user_id );

CREATE TABLE dem_track_forums ( 
	forum_id             int NOT NULL   ,
	user_id              int NOT NULL   ,
	mark_time            smalldatetime NOT NULL   ,
	CONSTRAINT Pk_dem_track_forums PRIMARY KEY ( forum_id, user_id )
 );

CREATE INDEX idx_dem_track_forums ON dem_track_forums ( forum_id );

CREATE INDEX idx_dem_track_forums_0 ON dem_track_forums ( user_id );

CREATE TABLE dem_track_topics ( 
	topic_id             int NOT NULL   ,
	user_id              int NOT NULL   ,
	forum_id             int NOT NULL   ,
	mark_time            smalldatetime NOT NULL   ,
	CONSTRAINT Pk_dem_track_topics PRIMARY KEY ( topic_id, user_id )
 );

CREATE INDEX idx_dem_track_topics ON dem_track_topics ( topic_id );

CREATE INDEX idx_dem_track_topics_0 ON dem_track_topics ( forum_id );

CREATE INDEX idx_dem_track_topics_1 ON dem_track_topics ( user_id );

CREATE TABLE dem_warnings ( 
	warning_id           int NOT NULL   IDENTITY,
	user_id              int NOT NULL   ,
	issuer_id            int NOT NULL   ,
	post_id              int NOT NULL   ,
	log_id               int NOT NULL   ,
	warning_time         smalldatetime NOT NULL   ,
	warning_days         int NOT NULL   ,
	warning_type         nvarchar(255) NOT NULL   ,
	warning_text         nvarchar(max) NOT NULL   ,
	CONSTRAINT Pk_dem_warnings PRIMARY KEY ( warning_id )
 );

CREATE INDEX idx_dem_warnings ON dem_warnings ( post_id );

CREATE INDEX idx_dem_warnings_1 ON dem_warnings ( log_id );

CREATE INDEX idx_dem_warnings_0 ON dem_warnings ( user_id );

ALTER TABLE dem_banlist ADD CONSTRAINT fk_dem_banlist_dem_users_user_id FOREIGN KEY ( user_id ) REFERENCES dem_users( user_id ) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE dem_bots ADD CONSTRAINT fk_dem_bots_dem_users_user_id FOREIGN KEY ( user_id ) REFERENCES dem_users( user_id ) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE dem_extension_groups_allowed_forums ADD CONSTRAINT fk_extension_groups_allowed_forums_forum_id FOREIGN KEY ( forum_id ) REFERENCES dem_forums( forum_id ) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE dem_extension_groups_allowed_forums ADD CONSTRAINT fk_extension_groups_allowed_forums_group_id FOREIGN KEY ( group_id ) REFERENCES dem_extension_groups( group_id ) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE dem_extensions ADD CONSTRAINT fk_extensions_group_id FOREIGN KEY ( group_id ) REFERENCES dem_extension_groups( group_id ) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE dem_forums ADD CONSTRAINT fk_forums_dem_forums_parent_id FOREIGN KEY ( parent_id ) REFERENCES dem_forums( forum_id ) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE dem_forums_access_groups ADD CONSTRAINT fk_dem_forums_access_groups_forum_id FOREIGN KEY ( forum_id ) REFERENCES dem_forums( forum_id ) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE dem_forums_access_groups ADD CONSTRAINT fk_dem_forums_access_groups_group_id FOREIGN KEY ( group_id ) REFERENCES dem_groups( group_id ) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE dem_forums_access_users ADD CONSTRAINT fk_dem_forums_access_users_forum_id FOREIGN KEY ( forum_id ) REFERENCES dem_forums( forum_id ) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE dem_forums_access_users ADD CONSTRAINT fk_dem_forums_access_users_user_id FOREIGN KEY ( user_id ) REFERENCES dem_users( user_id ) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE dem_log ADD CONSTRAINT fk_dem_log_dem_forums_forum_id FOREIGN KEY ( forum_id ) REFERENCES dem_forums( forum_id ) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE dem_log ADD CONSTRAINT fk_dem_log_dem_topics_topic_id FOREIGN KEY ( topic_id ) REFERENCES dem_topics( topic_id ) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE dem_log ADD CONSTRAINT fk_dem_log_dem_users_user_id FOREIGN KEY ( user_id ) REFERENCES dem_users( user_id ) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE dem_medals ADD CONSTRAINT fk_dem_medals_dem_medals_cats_cat_id FOREIGN KEY ( medals_cat_id ) REFERENCES dem_medals_cats( medals_cat_id ) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE dem_medals_awarded ADD CONSTRAINT fk_dem_medals_awarded_medal_id FOREIGN KEY ( medal_id ) REFERENCES dem_medals( medal_id ) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE dem_medals_awarded ADD CONSTRAINT fk_dem_medals_awarded_user_id FOREIGN KEY ( user_id ) REFERENCES dem_users( user_id ) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE dem_medals_awarded ADD CONSTRAINT fk_dem_medals_awarded_awarder_id FOREIGN KEY ( awarder_id ) REFERENCES dem_users( user_id ) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE dem_permissions_groups ADD CONSTRAINT fk_dem_permissions_groups_group_id FOREIGN KEY ( group_id ) REFERENCES dem_groups( group_id ) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE dem_permissions_groups ADD CONSTRAINT fk_dem_permissions_groups_forum_id FOREIGN KEY ( forum_id ) REFERENCES dem_forums( forum_id ) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE dem_permissions_groups ADD CONSTRAINT fk_dem_permissions_groups_rule_id FOREIGN KEY ( rule_id ) REFERENCES dem_permissions_rules( rule_id ) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE dem_permissions_users ADD CONSTRAINT fk_dem_permissions_users_rule_id FOREIGN KEY ( rule_id ) REFERENCES dem_permissions_rules( rule_id ) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE dem_permissions_users ADD CONSTRAINT fk_dem_permissions_users_forum_id FOREIGN KEY ( forum_id ) REFERENCES dem_forums( forum_id ) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE dem_permissions_users ADD CONSTRAINT fk_dem_permissions_users_user_id FOREIGN KEY ( user_id ) REFERENCES dem_users( user_id ) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE dem_poll_options ADD CONSTRAINT fk_dem_poll_options_dem_topics_topic_id FOREIGN KEY ( topic_id ) REFERENCES dem_topics( topic_id ) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE dem_poll_votes ADD CONSTRAINT fk_dem_poll_votes_poll_option_id FOREIGN KEY ( poll_option_id ) REFERENCES dem_poll_options( poll_option_id ) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE dem_poll_votes ADD CONSTRAINT fk_dem_poll_votes_dem_topics_topic_id FOREIGN KEY ( topic_id ) REFERENCES dem_topics( topic_id ) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE dem_poll_votes ADD CONSTRAINT fk_dem_poll_votes_dem_users_user_id FOREIGN KEY ( vote_user_id ) REFERENCES dem_users( user_id ) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE dem_post_rates ADD CONSTRAINT fk_dem_post_rates_dem_posts_post_id FOREIGN KEY ( post_id ) REFERENCES dem_posts( post_id ) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE dem_post_rates ADD CONSTRAINT fk_dem_post_rates_dem_users_user_id FOREIGN KEY ( user_id ) REFERENCES dem_users( user_id ) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE dem_posts ADD CONSTRAINT fk_dem_posts_dem_forums_forum_id FOREIGN KEY ( forum_id ) REFERENCES dem_forums( forum_id ) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE dem_posts ADD CONSTRAINT fk_dem_posts_dem_topics_topic_id FOREIGN KEY ( topic_id ) REFERENCES dem_topics( topic_id ) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE dem_posts ADD CONSTRAINT fk_dem_posts_dem_users_user_id FOREIGN KEY ( poster_id ) REFERENCES dem_users( user_id ) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE dem_posts ADD CONSTRAINT fk_dem_posts_dem_users_post_edit_user FOREIGN KEY ( post_edit_user ) REFERENCES dem_users( user_id ) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE dem_reports ADD CONSTRAINT fk_dem_reports_dem_posts_post_id FOREIGN KEY ( post_id ) REFERENCES dem_posts( post_id ) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE dem_reports ADD CONSTRAINT fk_dem_reports_reson_id FOREIGN KEY ( reason_id ) REFERENCES dem_reports_reasons( reason_id ) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE dem_reports ADD CONSTRAINT fk_dem_reports_dem_users_user_id FOREIGN KEY ( user_id ) REFERENCES dem_users( user_id ) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE dem_sessions ADD CONSTRAINT fk_dem_sessions_dem_forums_forum_id FOREIGN KEY ( session_forum_id ) REFERENCES dem_forums( forum_id ) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE dem_sessions ADD CONSTRAINT fk_dem_sessions_dem_users_user_id FOREIGN KEY ( session_user_id ) REFERENCES dem_users( user_id ) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE dem_sessions_keys ADD CONSTRAINT fk_dem_sessions_keys_dem_users_user_id FOREIGN KEY ( user_id ) REFERENCES dem_users( user_id ) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE dem_topics ADD CONSTRAINT fk_dem_topics_dem_forums_forum_id FOREIGN KEY ( forum_id ) REFERENCES dem_forums( forum_id ) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE dem_topics ADD CONSTRAINT fk_dem_topics_dem_users_user_id FOREIGN KEY ( topic_poster ) REFERENCES dem_users( user_id ) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE dem_topics_watch ADD CONSTRAINT fk_dem_topics_watch_dem_topics_topic_id FOREIGN KEY ( topic_id ) REFERENCES dem_topics( topic_id ) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE dem_topics_watch ADD CONSTRAINT fk_dem_topics_watch_dem_users_user_id FOREIGN KEY ( user_id ) REFERENCES dem_users( user_id ) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE dem_track_forums ADD CONSTRAINT fk_dem_track_forums_dem_forums_forum_id FOREIGN KEY ( forum_id ) REFERENCES dem_forums( forum_id ) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE dem_track_forums ADD CONSTRAINT fk_dem_track_forums_dem_users_user_id FOREIGN KEY ( user_id ) REFERENCES dem_users( user_id ) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE dem_track_topics ADD CONSTRAINT fk_dem_track_topics_dem_topics_topic_id FOREIGN KEY ( topic_id ) REFERENCES dem_topics( topic_id ) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE dem_track_topics ADD CONSTRAINT fk_dem_track_topics_dem_forums_forum_id FOREIGN KEY ( forum_id ) REFERENCES dem_forums( forum_id ) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE dem_track_topics ADD CONSTRAINT fk_dem_track_topics_dem_users_user_id FOREIGN KEY ( user_id ) REFERENCES dem_users( user_id ) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE dem_user_confirm_keys ADD CONSTRAINT fk_dem_user_confirm_keys_user_id FOREIGN KEY ( user_id ) REFERENCES dem_users( user_id ) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE dem_users ADD CONSTRAINT fk_dem_users_dem_groups_group_id FOREIGN KEY ( group_id ) REFERENCES dem_groups( group_id ) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE dem_users ADD CONSTRAINT fk_dem_users_dem_ranks_rank_id FOREIGN KEY ( user_rank ) REFERENCES dem_ranks( rank_id ) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE dem_warnings ADD CONSTRAINT fk_dem_warnings_dem_posts_post_id FOREIGN KEY ( post_id ) REFERENCES dem_posts( post_id ) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE dem_warnings ADD CONSTRAINT fk_dem_warnings_dem_log_log_id FOREIGN KEY ( log_id ) REFERENCES dem_log( log_id ) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE dem_warnings ADD CONSTRAINT fk_dem_warnings_dem_users FOREIGN KEY ( user_id ) REFERENCES dem_users( user_id ) ON DELETE NO ACTION ON UPDATE NO ACTION;

