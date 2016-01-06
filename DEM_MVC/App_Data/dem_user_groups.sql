CREATE TABLE [dbo].[dem_user_groups] (
    [user_Id] INT NOT NULL,
    [group_Id]   INT NOT NULL,
	[primaryGroup]    bit NOT NULL,
    CONSTRAINT [PK_dbo.dem_user_groups] PRIMARY KEY CLUSTERED ([user_Id] ASC, [group_Id] ASC)
);

GO
CREATE NONCLUSTERED INDEX [IX_dem_user_groups_user_Id]
    ON [dbo].[dem_user_groups]([user_Id] ASC);

GO
CREATE NONCLUSTERED INDEX [IX_dem_user_groups_group_Id]
    ON [dbo].[dem_user_groups]([group_Id] ASC);

