using JobFairsAPI.Models.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace JobFairsAPI.Services
{
    public class JobFairsService
    {
        public List<TargetedJobFair> GetTargetedJobFairs()
        {
            // var jobFairs = new List<TargetedJobFair>();
            List<TargetedJobFair> jobFairs = new List<TargetedJobFair>();
            var webClient = new WebClient();
            string webPage = "http://www.targetedjobfairs.com/";
            var html = webClient.DownloadString(webPage);
            var parser = new HtmlParser();
            var document = parser.Parse(html);
            string jQuerySelectTable = ".avia-data-table-wrap.avia_responsive_table";
            var table = document.QuerySelector(jQuerySelectTable);
            var rows = table.QuerySelectorAll("tr").Skip(1);

            foreach (var row in rows)
            {
                TargetedJobFair jobFair = new TargetedJobFair();
                jobFair.Date = row.QuerySelector("td").TextContent;
                jobFair.Location = row.QuerySelector("td:nth-child(2)").TextContent;
                jobFair.EventType = row.QuerySelector("td:nth-child(3)").TextContent;
                jobFair.CandidateLink = row.QuerySelector("td:nth-child(4) > div:nth-child(2) > a").Attr("href");

                jobFairs.Add(jobFair);
            }

            return jobFairs;
        }
        
    }
}