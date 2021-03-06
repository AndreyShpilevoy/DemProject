﻿using System;
using DEM_MVC_DAL.Services;

namespace DEM_MVC_DAL.Entities.PollEntities
{
    public class PollEntity
    {
        [Column(Name = "poll_id")]
        public int PollId { get; set; }

        [Column(Name = "poll_title")]
        public string PollTitle { get; set; }

        [Column(Name = "poll_start")]
        public DateTime PollStart { get; set; }

        [Column(Name = "poll_length")]
        public DateTime PollLength { get; set; }

        [Column(Name = "poll_max_options")]
        public int PollMaxOptions { get; set; }

        [Column(Name = "poll_last_vote")]
        public DateTime PollLastVote { get; set; }

        [Column(Name = "poll_vote_change")]
        public bool PollVoteChange { get; set; }
    }
}