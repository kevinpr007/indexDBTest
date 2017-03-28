using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace HurisExample.Models
{
    public class Error
    {
        public int Id { get; set; }
        [Required]
        public string error { get; set; }

        public int? stagingCR_Id { get; set; }
    }
}