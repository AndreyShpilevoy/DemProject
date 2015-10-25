namespace DEM_MVC_DAL.Entities
{
    public class BbCodeEntity
    {
        public int BbCodeOrder { get; set; }
        public string BbCodeTag { get; set; }
        public string BbCodeHelpLine { get; set; }
        public bool BbCodeOnPosting { get; set; }
        public string BbCodeMatch { get; set; }
        public string BbCodeTemplate { get; set; }
        public string BbCodeRegexpOptions { get; set; }
    }
}