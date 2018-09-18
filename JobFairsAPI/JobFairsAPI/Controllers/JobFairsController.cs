using JobFairsAPI.Models.Domain;
using JobFairsAPI.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace JobFairsAPI.Controllers
{
    [RoutePrefix("api/jobfairs")]
    public class JobFairsController : ApiController
    {
        readonly JobFairsService jobFairsService;

        public JobFairsController(JobFairsService jobFairsService)
        {
            this.jobFairsService = jobFairsService;
        }

        [Route("targeted"), HttpGet]
        public HttpResponseMessage GetTargetedJobFairs()
        {
            List<TargetedJobFair> targertedJobFairs = jobFairsService.GetTargetedJobFairs();

            return Request.CreateResponse(HttpStatusCode.OK, targertedJobFairs);
        }

        [Route("citycareer"), HttpGet]
        public HttpResponseMessage GetCityCareerFairs()
        {
            List<CityCareerFair> cityCareerFairs = jobFairsService.GetCityCareerFairs();

            return Request.CreateResponse(HttpStatusCode.OK, cityCareerFairs);
        }
    }
}