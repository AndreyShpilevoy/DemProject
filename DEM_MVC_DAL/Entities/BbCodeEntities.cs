using DEM_MVC_DAL.Services;

namespace DEM_MVC_DAL.Entities
{
    public class BbCodeEntity
    {
        [Column(Name = "bbcode_order")]
        public int BbCodeOrder { get; set; }

        [Column(Name = "bbcode_tag")]
        public string BbCodeTag { get; set; }

        [Column(Name = "bbcode_helpline")]
        public string BbCodeHelpLine { get; set; }

        [Column(Name = "display_on_posting")]
        public bool BbCodeOnPosting { get; set; }

        [Column(Name = "bbcode_match")]
        public string BbCodeMatch { get; set; }

        [Column(Name = "bbcode_template")]
        public string BbCodeTemplate { get; set; }

        [Column(Name = "bbcode_reg_options")]
        public string BbCodeRegexpOptions { get; set; }

        [Column(Name = "no_parse_code")]
        public bool NoParse { get; set; }
    }
}