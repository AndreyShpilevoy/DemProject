using DEM_MVC_DAL.Services;

namespace DEM_MVC_DAL.Entities.PollOptionEntities
{
    public class PollOptionEntity
    {
        [Column(Name = "poll_id")]
        public int PollId { get; set; }

        [Column(Name = "poll_option_id")]
        public int PollOptionId { get; set; }

        [Column(Name = "poll_option_total")]
        public int PollOptionTotal { get; set; }

        [Column(Name = "poll_option_text")]
        public string PollOptionText { get; set; }
    }
}