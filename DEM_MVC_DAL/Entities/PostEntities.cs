using System;
using DEM_MVC_DAL.Services;

namespace DEM_MVC_DAL.Entities
{
    public class ReadPostEntity
    {

        [Column(Name = "post_id")]
        public int PostId { get; set; }

        [Column(Name = "user_id")]
        public int UserId { get; set; }

        [Column(Name = "topic_id")]
        public int TopicId { get; set; }

        [Column(Name = "post_time")]
        public DateTime PostTime { get; set; }

        [Column(Name = "post_subject")]
        public string PostSubject { get; set; }

        [Column(Name = "post_text")]
        public string PostText { get; set; }

        [Column(Name = "post_rate")]
        public int PostRate { get; set; }

        [Column(Name = "post_edit_user")]
        public int PostEditUserId { get; set; }

        [Column(Name = "post_edit_time")]
        public DateTime PostEditTime { get; set; }

        [Column(Name = "post_edit_reason")]
        public string PostEditReason { get; set; }

        [Column(Name = "post_edit_count")]
        public int PostEditCount { get; set; }
    }

    public class NewPostEntity
    {
        private DateTime _postEditTime;
        private DateTime _postMerged;
        private DateTime _postTime;
        private string _posterIp;
        private string _postSubject;
        private string _postText;
        private string _postEditReason;

        [Column(Name = "post_id")]
        public int PostId { get; set; }

        [Column(Name = "topic_id")]
        public int TopicId { get; set; }

        [Column(Name = "user_id")]
        public int UserId { get; set; }

        [Column(Name = "poster_ip")]
        public string PosterIp
        {
            get { return _posterIp ?? String.Empty; }
            set { _posterIp = value; }
        }

        [Column(Name = "post_time")]
        public DateTime PostTime
        {
            get { return _postTime == DateTime.MinValue ? DateTime.Parse("1/1/1753 12:00:00 AM") : _postTime; }
            set { _postTime = value; }
        }

        [Column(Name = "post_merged")]
        public DateTime PostMerged
        {
            get { return _postMerged == DateTime.MinValue ? DateTime.Parse("1/1/1753 12:00:00 AM") : _postMerged; }
            set { _postMerged = value; }
        }

        [Column(Name = "post_reported")]
        public bool PostReported { get; set; }

        [Column(Name = "enable_bbcode")]
        public bool EnableBbcode { get; set; }

        [Column(Name = "enable_smilies")]
        public bool EnableSmilies { get; set; }

        [Column(Name = "enable_magic_url")]
        public bool EnableMagicUrl { get; set; }

        [Column(Name = "enable_sig")]
        public bool EnableSignature { get; set; }

        [Column(Name = "post_subject")]
        public string PostSubject
        {
            get { return _postSubject ?? String.Empty; }
            set { _postSubject = value; }
        }

        [Column(Name = "post_text")]
        public string PostText
        {
            get { return _postText ?? String.Empty; }
            set { _postText = value; }
        }

        [Column(Name = "post_attachment")]
        public bool PostAttachment { get; set; }

        [Column(Name = "post_edit_time")]
        public DateTime PostEditTime
        {
            get { return _postEditTime == DateTime.MinValue ? DateTime.Parse("1/1/1753 12:00:00 AM") : _postEditTime; }
            set { _postEditTime = value; }
        }

        [Column(Name = "post_edit_reason")]
        public string PostEditReason
        {
            get { return _postEditReason ?? String.Empty; }
            set { _postEditReason = value; }
        }

        [Column(Name = "post_edit_user")]
        public int PostEditUser { get; set; }

        [Column(Name = "post_edit_count")]
        public int PostEditCount { get; set; }

        [Column(Name = "post_edit_locked")]
        public bool PostEditLocked { get; set; }
    }
}