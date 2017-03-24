using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HurisExample.Models
{
    public class StagingDTO
    {
        public string id { get; set; }
        public Patient_InfoDTO2 patientInfo { get; set; }
        public Provider_InfoDTO providerInfo { get; set; }
    }
}