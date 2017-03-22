using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace HurisExample.Models
{
    [DataContract(IsReference = true)]
    public class Patient_Info
    {
        //Patient Info
        [DataMember]
        public int Id { get; set; }
        [DataMember]
        public int? MemberNumber { get; set; }
        [DataMember]
        public string MemberName { get; set; }
        [DataMember]
        public string MemberLastNames { get; set; }
        [DataMember]
        public int? coverageType { get; set; }
        
        //Provider Info

        // Foreign Key
        [DataMember]
        public int? ProviderId { get; set; }
        // Navigation property
        [DataMember]
        public virtual Provider Provider { get; set; }
        [DataMember]
        public string AdmitingName { get; set; }
        [DataMember]
        public string AdmitingLastNames { get; set; }
        [DataMember]
        public int? AdmissionType { get; set; }
    }
}