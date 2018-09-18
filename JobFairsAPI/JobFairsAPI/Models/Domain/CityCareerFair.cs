using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace JobFairsAPI.Models.Domain
{
    public class CityCareerFair : JobFair
    {
        public string DateEventName { get; set; }
        //public string Date { get; set; }
        //public string EventName { get; set; }
        public string EventLink { get; set; }
    }
}