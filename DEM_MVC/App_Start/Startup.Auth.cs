using System;
using DEM_MVC.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
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

            //app.UseTwitterAuthentication(
            //   consumerKey: "xvz1evFS4wEEPTGEFPHBog",
            //   consumerSecret: "L8qq9PZyRg6ieKGEKhZolGC0vJWLw8iEJ88DRdyOg");

            app.UseFacebookAuthentication(
               appId: "1485202508455441",
               appSecret: "1626c949c1be3e0e13c23c9ea9ab42c5");
            //   appId: "809815392478491",
            //   appSecret: "1aa8db07eb1e26241941ab3bfacab399");

            // Setup Google authentication.
            app.UseGoogleAuthentication(new GoogleOAuth2AuthenticationOptions
            {
                ClientId = "383782677897-n8jsk65idgso5fek0994eco32avsvp66.apps.googleusercontent.com",
                ClientSecret = "GZLOp-xZBSmWiaHlnFFvkzjL",
                CallbackPath = new PathString("/Manage/LinkLoginCallback/")
            });
            //app.UseGoogleAuthentication(new GoogleOAuth2AuthenticationOptions
            //{
            //    ClientId = "620387322426-cttg2916hjkos8ml5p2b897r9hgf1u1o.apps.googleusercontent.com",
            //    ClientSecret = "DqQuHx72WhYDyPwpky56fKdL"
            //});

            // Setup VK authentication.
            app.UseVkontakteAuthentication("5110893", "qSKFTkMQgkEKXE8rL5R5", "offline,email ");
            //app.UseVkontakteAuthentication("5172594", "s9A0IVjNjUUUoKf9TYaG", "offline,email ");
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