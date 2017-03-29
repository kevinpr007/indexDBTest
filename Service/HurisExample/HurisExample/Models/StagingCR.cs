using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace HurisExample.Models
{
    public class StagingCR
    {
        public int Id { get; set; }
        
        [Required]
        public string CR_Info { get; set; }
        
        [DefaultValue(false)]
        public bool isSync { get; set; }

        [DefaultValue(false)]
        public bool containError { get; set; }
    }
}