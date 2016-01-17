namespace DEM_MVC_BL.Models.PollOptionModels
{
    public class PollOptionViewModel
    {
        public int PollId { get; set; }
        public int PollOptionId { get; set; }
        public int PollOptionTotal { get; set; }
        public double PollOptionTotalPercent { get; set; }
        public string PollOptionText { get; set; }
    }
}