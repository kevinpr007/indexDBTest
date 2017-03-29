using HurisExample.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HurisExample.Service
{
    public class Factories
    {
        public static Patient_Info SyncPatient_Info(StagingDTO staging)
        {
            Patient_Info result = new Patient_Info { };

            result.MemberNumber = String.IsNullOrEmpty(staging.patientInfo.memberNumber) ? (Int32?)null : Convert.ToInt32(staging.patientInfo.memberNumber);
            result.MemberName = staging.patientInfo.memberName;
            result.MemberLastNames = staging.patientInfo.memberLastNames;
            result.coverageType = String.IsNullOrEmpty(staging.patientInfo.memberCoverageType) ? (Int32?)null : Convert.ToInt32(staging.patientInfo.memberCoverageType);

            result.ProviderId = String.IsNullOrEmpty(staging.providerInfo.providerId) ? (Int32?)null : Convert.ToInt32(staging.providerInfo.providerId);
            result.AdmitingName = staging.providerInfo.admitingName;
            result.AdmitingLastNames = staging.providerInfo.admitingLastNames;
            result.AdmissionType = String.IsNullOrEmpty(staging.providerInfo.admissionType) == true ? (Int32?)null : Convert.ToInt32(staging.providerInfo.admissionType);

            return result;
        }

    }
}