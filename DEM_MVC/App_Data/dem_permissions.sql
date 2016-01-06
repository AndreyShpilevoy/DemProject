CREATE TABLE [dbo].[dem_permissions] (
    [permission_Id]			INT IDENTITY (1, 1)		NOT NULL, 
	[permission_Title]		NVARCHAR(255)			NOT NULL UNIQUE,
    CONSTRAINT [PK_dbo.dem_permissions] PRIMARY KEY CLUSTERED ([permission_Id] ASC)
);

GO
CREATE NONCLUSTERED INDEX [IX_dem_permissions_permission_Id]
    ON [dbo].[dem_permissions]([permission_Id] ASC);

GO


CREATE TABLE [dbo].[dem_permissions_groups] ( 
	[permission_Id]        int			NOT NULL   ,
	[group_id]             int			NOT NULL   ,
	[forums_id]            varchar(max) NOT NULL   ,
	[state]			       bit			NOT NULL   ,
    CONSTRAINT [PK_dbo.dem_permissions_groups] PRIMARY KEY CLUSTERED ([permission_Id],[group_id] ASC)
 );

GO
CREATE NONCLUSTERED INDEX [IX_dem_dem_permissions_groups_group_id]
    ON [dbo].[dem_permissions_groups]([group_id] ASC);

GO

 CREATE TABLE [dbo].[dem_permissions_users] ( 
	[permission_Id]        int			NOT NULL   ,
	[user_id]              int			NOT NULL   ,
	[forums_id]            varchar(max) NOT NULL   ,
	[state]			       bit			NOT NULL   ,
    CONSTRAINT [PK_dbo.dem_permissions_users] PRIMARY KEY CLUSTERED ([permission_Id],[user_id] ASC)
 );

GO
CREATE NONCLUSTERED INDEX [IX_dem_permissions_users_user_id]
    ON [dbo].[dem_permissions_users]([user_id] ASC);

GO