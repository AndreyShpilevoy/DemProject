using System;
using System.Configuration;
using System.Net.Http;
using DEM_MVC.Models;
using DEM_MVC.Services.Handlers;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin;
using Microsoft.Owin.Security.Cookies;
using Microsoft.Owin.Security.Facebook;
using Microsoft.Owin.Security.Google;
using Owin;
using Owin.Security.Providers.Steam;
using Owin.Security.Providers.Wargaming;

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
                LoginPath = new PathString("/Account/Login"),
                Provider = new CookieAuthenticationProvider
                {
                    //// Enables the application to validate the security stamp when the AppMember logs in.
                    //// This is a security feature which is used when you change a password or add an external login to your account.  
                    //OnValidateIdentity = SecurityStampValidator.OnValidateIdentity<ApplicationUserManager, AppMember, int>(
                    //    validateInterval: TimeSpan.FromMinutes(30),
                    //    regenerateIdentityCallback: (manager, appMember) => 
                    //    appMember.GenerateUserIdentityAsync(manager),
                    //    getUserIdCallback: (id) => (Int32.Parse(id.GetUserId())))
                    OnValidateIdentity = SecurityStampValidator.OnValidateIdentity<ApplicationUserManager, AppMember, int>(
                    validateInterval: TimeSpan.FromMinutes(30),
                    regenerateIdentityCallback: (manager, user) =>
                        user.GenerateUserIdentityAsync(manager),
                    getUserIdCallback: (id) => GrabUserId(id))
                }
            });
            app.UseExternalSignInCookie(DefaultAuthenticationTypes.ExternalCookie);

            // Enables the application to temporarily store AppMember information when they are verifying the second factor in the two-factor authentication process.
            app.UseTwoFactorSignInCookie(DefaultAuthenticationTypes.TwoFactorCookie, TimeSpan.FromMinutes(5));

            // Enables the application to remember the second login verification factor such as phone or email.
            // Once you check this option, your second step of verification during the login process will be remembered on the device where you logged in from.
            // This is similar to the RememberMe option when you log in.
            app.UseTwoFactorRememberBrowserCookie(DefaultAuthenticationTypes.TwoFactorRememberBrowserCookie);

            // Uncomment the following lines to enable logging in with third party login providers
            //app.UseMicrosoftAccountAuthentication(
            //    clientId: "",
            //    clientSecret: "");

            if (Convert.ToBoolean(ConfigurationManager.AppSettings["TwitterEnable"]))
            {
                app.UseTwitterAuthentication(
                   consumerKey: ConfigurationManager.AppSettings["TwitterConsumerKey"],
                   consumerSecret: ConfigurationManager.AppSettings["TwitterConsumerSecret"]);
            }

            if (Convert.ToBoolean(ConfigurationManager.AppSettings["FacebookEnable"]))
            {
                var facebookOptions = new FacebookAuthenticationOptions()
                {
                    AppId = ConfigurationManager.AppSettings["FacebookId"],
                    AppSecret = ConfigurationManager.AppSettings["FacebookSecret"],
                    BackchannelHttpHandler = new FacebookBackChannelHandler(),
                    UserInformationEndpoint = ConfigurationManager.AppSettings["UserInformationEndpoint"]
                };
                app.UseFacebookAuthentication(facebookOptions);
            }

            if (Convert.ToBoolean(ConfigurationManager.AppSettings["GoogleEnable"]))
            {
                app.UseGoogleAuthentication(new GoogleOAuth2AuthenticationOptions
                {
                    ClientId = ConfigurationManager.AppSettings["GoogleClientId"],
                    ClientSecret = ConfigurationManager.AppSettings["GoogleClientSecret"],
                    CallbackPath = new PathString(ConfigurationManager.AppSettings["GoogleCallbackPath"])
                });
            }

            if (Convert.ToBoolean(ConfigurationManager.AppSettings["VkontakteEnable"]))
            {
                app.UseVkontakteAuthentication(ConfigurationManager.AppSettings["VkontakteId"],
                    ConfigurationManager.AppSettings["VkontakteSecret"],
                    ConfigurationManager.AppSettings["VkontakteOptions"]);
            }

            if (Convert.ToBoolean(ConfigurationManager.AppSettings["SteamEnable"]))
            {
                app.UseSteamAuthentication(ConfigurationManager.AppSettings["SteamApiKey"]);
            }

            if (Convert.ToBoolean(ConfigurationManager.AppSettings["WargamingEnable"]))
            {
                app.UseWargamingAccountAuthentication(ConfigurationManager.AppSettings["WargamingApiID"], WargamingAuthenticationOptions.Region.Russia);
            }
        }

        public static int GrabUserId(System.Security.Claims.ClaimsIdentity claim)
        {
            int id;
            var o = claim.GetUserId();
            if (!int.TryParse(o, out id))
                return 0;
            else
                return id;
        }
    }
}