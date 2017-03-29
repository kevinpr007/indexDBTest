namespace HurisExample.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddStagingIDtotheErrorTable : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Errors", "stagingCR_Id", c => c.Int());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Errors", "stagingCR_Id");
        }
    }
}
