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

namespace HurisExample.Controllers
{
    public class Patient_InfoController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: api/Patient_Info
        public IQueryable<Patient_Info> GetPatient_Info()
        {
            return db.Patient_Infos;
        }

        // GET: api/Patient_Info/5
        [ResponseType(typeof(Patient_Info))]
        public async Task<IHttpActionResult> GetPatient_Info(int id)
        {
            Patient_Info patient_Info = await db.Patient_Infos.FindAsync(id);
            if (patient_Info == null)
            {
                return NotFound();
            }

            return Ok(patient_Info);
        }

        // PUT: api/Patient_Info/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutPatient_Info(int id, Patient_Info patient_Info)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != patient_Info.Id)
            {
                return BadRequest();
            }

            db.Entry(patient_Info).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Patient_InfoExists(id))
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

        // POST: api/Patient_Info
        [ResponseType(typeof(Patient_Info))]
        public async Task<IHttpActionResult> PostPatient_Info(Patient_Info patient_Info)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Patient_Infos.Add(patient_Info);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = patient_Info.Id }, patient_Info);
        }

        // DELETE: api/Patient_Info/5
        [ResponseType(typeof(Patient_Info))]
        public async Task<IHttpActionResult> DeletePatient_Info(int id)
        {
            Patient_Info patient_Info = await db.Patient_Infos.FindAsync(id);
            if (patient_Info == null)
            {
                return NotFound();
            }

            db.Patient_Infos.Remove(patient_Info);
            await db.SaveChangesAsync();

            return Ok(patient_Info);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool Patient_InfoExists(int id)
        {
            return db.Patient_Infos.Count(e => e.Id == id) > 0;
        }
    }
}