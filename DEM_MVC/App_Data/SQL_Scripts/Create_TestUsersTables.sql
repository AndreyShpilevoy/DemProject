CREATE TABLE [dbo].[UsersTest]
(
	[UserId] INT NOT NULL PRIMARY KEY IDENTITY, 
    [UserName] VARCHAR(MAX) NOT NULL, 
    [PasswordHash] VARCHAR(MAX) NULL, 
    [SecurityStamp] VARCHAR(MAX) NULL 
)

CREATE TABLE [dbo].[ExternalLogins]
(
	[ExternalLoginId] INT NOT NULL PRIMARY KEY, 
    [UserId] INT NOT NULL, 
    [LoginProvider] VARCHAR(MAX) NOT NULL, 
    [ProviderKey] VARCHAR(MAX) NOT NULL, 
    CONSTRAINT [FK_ExternalLogins_Users] FOREIGN KEY ([UserId]) REFERENCES [UsersTest]([UserId])
)

GO
CREATE PROCEDURE CreateNewUserAccount
    @userName NVARCHAR(MAX),
    @passwordHash NVARCHAR(MAX),
    @securityStamp NVARCHAR(MAX),
    @userId INT output
AS
    INSERT INTO UsersTest (UserName, PasswordHash, SecurityStamp) 
	--Output Inserted.UserId
	values(@userName, @passwordHash, @securityStamp);
	SELECT @userId = SCOPE_IDENTITY();
	return @userId;
GO