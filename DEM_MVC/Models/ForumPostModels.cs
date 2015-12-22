using System;
using System.Web;
using System.Web.Mvc;

namespace DEM_MVC.Models
{
    public class NewPostViewModel
    {
        private string _postSubject;
        private string _postText;

        [AllowHtml]
        public string PostSubject
        {
            get { return _postSubject; }
            set { _postSubject = HttpUtility.HtmlEncode(value); }
        }

        [AllowHtml]
        public string PostText
        {
            get { return _postText; }
            set { _postText = HttpUtility.HtmlEncode(value); }
        }

        public int TopicId { get; set; }

        public int UserId { get; set; }

        public DateTime PostTime { get; set; }

    }
}