using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using HurisExample.Models;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;

namespace HurisExample.Controllers
{
    [RoutePrefix("api/StagingCRs")]
    public class StagingCRsController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: api/StagingCRs
        public IQueryable<StagingCR> GetStagingCRs()
        {
            return db.StagingCRs;
        }

        // GET: api/StagingCRs/5
        [ResponseType(typeof(StagingCR))]
        public async Task<IHttpActionResult> GetStagingCR(int id)
        {
            StagingCR stagingCR = await db.StagingCRs.FindAsync(id);
            if (stagingCR == null)
            {
                return NotFound();
            }

            return Ok(stagingCR);
        }

        // PUT: api/StagingCRs/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutStagingCR(int id, StagingCR stagingCR)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != stagingCR.Id)
            {
                return BadRequest();
            }

            db.Entry(stagingCR).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StagingCRExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/StagingCRs
        [ResponseType(typeof(StagingCR))]
        public async Task<IHttpActionResult> PostStagingCR(StagingCR stagingCR)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.StagingCRs.Add(stagingCR);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = stagingCR.Id }, stagingCR);
        }

        // POST: api/StagingCRs/StagingCR_DTO
        [Route("StagingCR_DTO")]
        public async Task<IHttpActionResult> PostStagingCR_DTO(StagingDTO stagingDTO)
        {

            string jsonData = JsonConvert.SerializeObject(stagingDTO, Formatting.Indented);

            StagingCR cr = new StagingCR { CR_Info = jsonData };

            db.StagingCRs.Add(cr); 
            await db.SaveChangesAsync();

            StagingDTO objDes = JsonConvert.DeserializeObject<StagingDTO>(cr.CR_Info);

            return Ok(objDes);
        }

        // DELETE: api/StagingCRs/5
        [ResponseType(typeof(StagingCR))]
        public async Task<IHttpActionResult> DeleteStagingCR(int id)
        {
            StagingCR stagingCR = await db.StagingCRs.FindAsync(id);
            if (stagingCR == null)
            {
                return NotFound();
            }

            db.StagingCRs.Remove(stagingCR);
            await db.SaveChangesAsync();

            return Ok(stagingCR);
        }

        [ResponseType(typeof(void))]
        [Route("StagingCRSync")]
        public IHttpActionResult GetStagingCRSync()
        {
            return Ok("success");// StatusCode(HttpStatusCode.NoContent);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool StagingCRExists(int id)
        {
            return db.StagingCRs.Count(e => e.Id == id) > 0;
        }
    }
}