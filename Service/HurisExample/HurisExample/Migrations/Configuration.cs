namespace HurisExample.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;
    using customRef = HurisExample.Models;

    internal sealed class Configuration : DbMigrationsConfiguration<HurisExample.Models.ApplicationDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(HurisExample.Models.ApplicationDbContext context)
        {
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data. E.g.
            //
            //    context.People.AddOrUpdate(
            //      p => p.FullName,
            //      new Person { FullName = "Andrew Peters" },
            //      new Person { FullName = "Brice Lambson" },
            //      new Person { FullName = "Rowan Miller" }
            //    );

            context.Providers.AddOrUpdate(p => p.Id,
                new HurisExample.Models.Provider() { Id = 1, Name = "Provider #1" },
                new HurisExample.Models.Provider() { Id = 2, Name = "Provider #2" }
                );

            context.Patient_Infos.AddOrUpdate(p => p.Id,
                new customRef.Patient_Info()
                {
                    Id = 1,
                    MemberNumber = 123456,
                    MemberName = "Nombre 1",
                    MemberLastNames = "Apellido 1",
                    coverageType = 1,
                    ProviderId = 1,
                    AdmitingName = "Admiting Name 1",
                    AdmitingLastNames = "Admiting LastName 1",
                    AdmissionType = 1
                },

                new customRef.Patient_Info()
                {
                    Id = 2,
                    MemberNumber = 789456123,
                    MemberName = "Nombre 2",
                    MemberLastNames = "Apellido 2",
                    coverageType = 2,
                    ProviderId = 2,
                    AdmitingName = "Admiting Name 2",
                    AdmitingLastNames = "Admiting LastName 2",
                    AdmissionType = 2
                }
            );

        }
    }
}
