using System;
using System.Collections.Generic;
using DEM_MVC_BL.Models.PollOptionModels;

namespace DEM_MVC_BL.Models.PollModels
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
}