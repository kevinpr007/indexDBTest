namespace HurisExample.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Patient_Info : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Patient_Info",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        MemberNumber = c.Int(),
                        MemberName = c.String(),
                        MemberLastNames = c.String(),
                        coverageType = c.Int(),
                        ProviderId = c.Int(),
                        AdmitingName = c.String(),
                        AdmitingLastNames = c.String(),
                        AdmissionType = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Providers", t => t.ProviderId)
                .Index(t => t.ProviderId);
            
            CreateTable(
                "dbo.Providers",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Patient_Info", "ProviderId", "dbo.Providers");
            DropIndex("dbo.Patient_Info", new[] { "ProviderId" });
            DropTable("dbo.Providers");
            DropTable("dbo.Patient_Info");
        }
    }
}
