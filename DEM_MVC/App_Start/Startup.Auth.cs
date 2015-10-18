using Microsoft.AspNet.Identity;
using Microsoft.Owin;
using Microsoft.Owin.Security.Cookies;
using Microsoft.Owin.Security.Google;
using Owin;

namespace DEM_MVC
{
    public partial class Startup
    {
        // For more information on configuring authentication, please visit http://go.microsoft.com/fwlink/?LinkId=301864
        public void ConfigureAuth(IAppBuilder app)
        {
            // Enable the application to use a cookie to store information for the signed in user
            app.UseCookieAuthentication(new CookieAuthenticationOptions
            {
                AuthenticationType = DefaultAuthenticationTypes.ApplicationCookie,
                LoginPath = new PathString("/Account/Login")
            });
            // Use a cookie to temporarily store information about a user logging in with a third party login provider
            app.UseExternalSignInCookie(DefaultAuthenticationTypes.ExternalCookie);

            // Uncomment the following lines to enable logging in with third party login providers
            //app.UseMicrosoftAccountAuthentication(
            //    clientId: "",
            //    clientSecret: "");

            //app.UseTwitterAuthentication(
            //   consumerKey: "",
            //   consumerSecret: "");

            //app.UseFacebookAuthentication(
            //   appId: "",
            //   appSecret: "");

            // Setup Google authentication.
            //app.UseGoogleAuthentication(new GoogleOAuth2AuthenticationOptions
            //{
            //    ClientId = "822547630726-dauuvskrpg867qs0bc6b9n9efior1b5a.apps.googleusercontent.com",
            //    ClientSecret = "woq7VyGlR1310MGysdWwWvID"
            //});

            // Setup VK authentication.
            //app.UseVkontakteAuthentication("5110893", "qSKFTkMQgkEKXE8rL5R5", "offline,email ");
        }
    }
}