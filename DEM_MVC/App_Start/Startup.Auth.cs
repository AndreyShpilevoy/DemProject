using System;
using System.Configuration;
using DEM_MVC.Models;
using DEM_MVC.Services.Handlers;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.Cookies;
using Microsoft.Owin.Security.Facebook;
using Microsoft.Owin.Security.Google;
using Microsoft.Owin.Security.Twitter;
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
                    OnValidateIdentity = SecurityStampValidator.OnValidateIdentity<ApplicationUserManager, AppMember, int>(
                    validateInterval: TimeSpan.FromMinutes(30),
                    regenerateIdentityCallback: (manager, user) => user.GenerateUserIdentityAsync(manager),
                    getUserIdCallback: GrabUserId)
                },
                ExpireTimeSpan = TimeSpan.FromDays(7),
                SlidingExpiration = true
            });
            app.UseExternalSignInCookie(DefaultAuthenticationTypes.ExternalCookie);

            // Enables the application to temporarily store AppMember information when they are verifying the second factor in the two-factor authentication process.
            app.UseTwoFactorSignInCookie(DefaultAuthenticationTypes.TwoFactorCookie, TimeSpan.FromMinutes(5));

            // Enables the application to remember the second login verification factor such as phone or email.
            // Once you check this option, your second step of verification during the login process will be remembered on the device where you logged in from.
            // This is similar to the RememberMe option when you log in.
            app.UseTwoFactorRememberBrowserCookie(DefaultAuthenticationTypes.TwoFactorRememberBrowserCookie);

            #region logging in with third party login providers
            if (Convert.ToBoolean(ConfigurationManager.AppSettings["MicrosoftEnable"]))
            {
                app.UseMicrosoftAccountAuthentication(
                    clientId: ConfigurationManager.AppSettings["MicrosoftClientId"],
                    clientSecret: ConfigurationManager.AppSettings["MicrosoftClientSecret"]);
            }

            if (Convert.ToBoolean(ConfigurationManager.AppSettings["TwitterEnable"]))
            {
                app.UseTwitterAuthentication(
                    new TwitterAuthenticationOptions
                    {
                        ConsumerKey = ConfigurationManager.AppSettings["TwitterConsumerKey"],
                        ConsumerSecret = ConfigurationManager.AppSettings["TwitterConsumerSecret"],
                        BackchannelCertificateValidator = new CertificateSubjectKeyIdentifierValidator(
                       new[]
                       {
                          "A5EF0B11CEC04103A34A659048B21CE0572D7D47", // VeriSign Class 3 Secure Server CA - G2
                           "0D445C165344C1827E1D20AB25F40163D8BE79A5", // VeriSign Class 3 Secure Server CA - G3
                           "7FD365A7C2DDECBBF03009F34339FA02AF333133", // VeriSign Class 3 Public Primary Certification Authority - G5
                           "39A55D933676616E73A761DFA16A7E59CDE66FAD", // Symantec Class 3 Secure Server CA - G4
                           "4EB6D578499B1CCF5F581EAD56BE3D9B6744A5E5", // VeriSign Class 3 Primary CA - G5
                           "5168FF90AF0207753CCCD9656462A212B859723B", // DigiCert SHA2 High Assurance Server C‎A 
                           "B13EC36903F8BF4701D498261A0802EF63642BC3", // DigiCert High Assurance EV Root CA
                           "B77DDB6867D3B325E01C90793413E15BF0E44DF2" //https://github.com/RockstarLabs/oauthforaspnet/issues/12
                       })
                    });
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
            #endregion
        }

        public static int GrabUserId(System.Security.Claims.ClaimsIdentity claim)
        {
            int id;
            var o = claim.GetUserId();
            return int.TryParse(o, out id) ? id : 0;
        }
    }
}