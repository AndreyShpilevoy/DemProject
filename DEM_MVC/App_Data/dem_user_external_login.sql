CREATE TABLE [dbo].[dem_user_external_login] (
    [login_provider] NVARCHAR (128) NOT NULL,
    [provider_key]   NVARCHAR (128) NOT NULL,
    [user_id]      INT            NOT NULL,
    CONSTRAINT [PK_dbo.dem_user_external_login] PRIMARY KEY CLUSTERED ([login_provider] ASC, [provider_key] ASC, [user_id] ASC)
);


GO
CREATE NONCLUSTERED INDEX [IX_dem_user_external_login_user_id]
    ON [dbo].[dem_user_external_login]([user_id] ASC);

