CREATE TABLE [dbo].[dem_user_claim] (
    [id]         INT            IDENTITY (1, 1) NOT NULL,
    [user_id]   INT            NOT NULL,
    [claim_type]  NVARCHAR (MAX) NULL,
    [claim_value] NVARCHAR (MAX) NULL,
    CONSTRAINT [PK_dbo.dem_user_claim] PRIMARY KEY CLUSTERED ([id] ASC)
);


GO
CREATE NONCLUSTERED INDEX [IX_dem_user_claim_user_id]
    ON [dbo].[dem_user_claim]([user_id] ASC);

