namespace DEM_MVC_BL.Models.BbCodeModels
{
    public class BbCodeModel
    {
        public int BbCodeOrder { get; set; }
        public string BbCodeTag { get; set; }
        public string BbCodeHelpLine { get; set; }
        public bool BbCodeOnPosting { get; set; }
        public string BbCodeMatch { get; set; }
        public string BbCodeTemplate { get; set; }
        public string BbCodeRegexpOptions { get; set; }
        public bool NoParse { get; set; }
    }
}