using System;
using System.Collections.Generic;

namespace DEM_MVC_BL.Models
{
    public class PollViewModel
    {
        public int PollId { get; set; }
        public string PollTitle { get; set; }
        public DateTime PollStart { get; set; }
        public DateTime PollLength { get; set; }
        public int PollMaxOptions { get; set; }
        public DateTime PollLastVote { get; set; }
        public bool PollVoteChange { get; set; }

        public List<PollOptionViewModel> PollOptionList { get; set; }

        public PollViewModel()
        {
            PollOptionList = new List<PollOptionViewModel>();
        }
    }
    public class PollOptionViewModel
    {
        public int PollId { get; set; }
        public int PollOptionId { get; set; }
        public int PollOptionTotal { get; set; }
        public double PollOptionTotalPercent { get; set; }
        public string PollOptionText { get; set; }
    }
}