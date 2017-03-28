namespace HurisExample.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddnewfieldsandErrorTable : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Errors",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        error = c.String(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            AddColumn("dbo.StagingCRs", "isSync", c => c.Boolean(nullable: false));
            AddColumn("dbo.StagingCRs", "containError", c => c.Boolean(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.StagingCRs", "containError");
            DropColumn("dbo.StagingCRs", "isSync");
            DropTable("dbo.Errors");
        }
    }
}
