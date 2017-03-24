using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace HurisExample.Models
{
    public class Patient_Info_DTO
    {
        
        public int? Id { get; set; }
        
        public string MemberName { get; set; }
        
        public int? ProviderId { get; set; }
        
        public virtual Provider Provider { get; set; }
    }
}