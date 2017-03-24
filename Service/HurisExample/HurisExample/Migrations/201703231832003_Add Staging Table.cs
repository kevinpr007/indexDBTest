namespace HurisExample.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddStagingTable : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.StagingCRs",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        CR_Info = c.String(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.StagingCRs");
        }
    }
}
