using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace HurisExample.Models
{
    public class Patient_Info_DTO
    {
        
        //Patient Info
        //[DataMember]
        public int? Id { get; set; }
        //[DataMember]
        public string MemberName { get; set; }
        
        //[DataMember]
        public int? ProviderId { get; set; }
        // Navigation property
        public virtual Provider Provider { get; set; }
    }
}