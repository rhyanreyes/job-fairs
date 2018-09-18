using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace JobFairsAPI.Models.Domain
{
    public class TargetedJobFair : JobFair
    {
        public string Date { get; set; }
        public string Location { get; set; }
        public string EventType { get; set; }
        public string CandidateLink { get; set; }
    }
}