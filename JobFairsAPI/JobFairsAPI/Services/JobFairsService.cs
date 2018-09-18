using AngleSharp.Parser.Html;
using JobFairsAPI.Models.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
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

                string href = row.QuerySelector("td:nth-child(4) > div:nth-child(2) > a").GetAttribute("href");

                jobFair.CandidateLink = webPage + href;
                jobFair.JobFairSite = webPage;
                jobFair.JobFairSiteName = "Targeted Job Fairs";

                jobFairs.Add(jobFair);
            }

            return jobFairs;
        }
        
        public List<CityCareerFair> GetCityCareerFairs()
        {
            List<CityCareerFair> careerFairs = new List<CityCareerFair>();
            var webClient = new WebClient();
            string webPage = "http://citycareerfair.com/schedule/";
            var html = webClient.DownloadString(webPage);
            var parser = new HtmlParser();
            var document = parser.Parse(html);
            string jQuerySelectTable = ".et_pb_promo_description";
            var table = document.QuerySelector(jQuerySelectTable);
            var rows = table.QuerySelectorAll("p");

            foreach (var row in rows)
            {
                CityCareerFair careerFair = new CityCareerFair();
                careerFair.DateEventName = row.QuerySelector("a").TextContent;
                careerFair.EventLink = row.QuerySelector("a").GetAttribute("href");
                careerFair.JobFairSite = "http://citycareerfair.com";
                careerFair.JobFairSiteName = "City Career Fair";

                careerFairs.Add(careerFair);
            }

            return careerFairs;
        }

        //public List<JobFair> GetJobFairs()
        //{
        //    List<JobFair> jobFairs = new List<JobFair>();
        //    List<TargetedJobFair> targetedJobFairs = GetTargetedJobFairs();
        //    List<CityCareerFair> cityCareerFairs = GetCityCareerFairs();

            
        //}
    }
}