using System;
using System.Diagnostics;
using System.Net;
using System.Security.Claims;
using System.Threading.Tasks;
using DEM_MVC.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.DataProtection;
using System.Configuration;
using System.Net.Mail;
using DEM_MVC_Infrastructure.Models;

namespace DEM_MVC
{
    public class EmailService : IIdentityMessageService
    {
        public async Task SendAsync(IdentityMessage message)
        {
            await configSendGridasync(message);
        }
        private async Task configSendGridasync(IdentityMessage message)
        {
            var myMessage = new MailMessage();
            myMessage.To.Add(new MailAddress(message.Destination));  // replace with valid value 
            myMessage.From = new MailAddress("support@dem.org.ua", "DeusExMachina");  // replace with valid value
            myMessage.Subject = message.Subject;
            myMessage.Body = message.Body;
            myMessage.IsBodyHtml = true;

            using (var smtp = new SmtpClient())
            {

                var credentials = new NetworkCredential(
                           ConfigurationManager.AppSettings["mailAccount"],
                           ConfigurationManager.AppSettings["mailPassword"]
                           );

                smtp.Credentials = credentials;
                smtp.Host = ConfigurationManager.AppSettings["host"];//"mail.dem.org.ua";
                smtp.Port = Int32.Parse(ConfigurationManager.AppSettings["port"]); //2525;
                smtp.EnableSsl = Boolean.Parse(ConfigurationManager.AppSettings["enableSsl"]);//false
                await smtp.SendMailAsync(myMessage);
            }
        }
    }

    public class SmsService : IIdentityMessageService
    {
        public Task SendAsync(IdentityMessage message)
        {
            // Plug in your SMS service here to send a text message.
            return Task.FromResult(0);
        }
    }

    public class ApplicationUserManager : UserManager<AppMember, int>
    {
        public ApplicationUserManager(IUserStore<AppMember, int> store, IDataProtectionProvider dataProtectionProvider)
            : base(store)
        {
            UserValidator = new UserValidator<AppMember, int>(this)
            {
                AllowOnlyAlphanumericUserNames = false,
                RequireUniqueEmail = true
            };

            // Configure validation logic for passwords
            PasswordValidator = new PasswordValidator
            {
                RequiredLength = 6,
                RequireNonLetterOrDigit = true,
                RequireDigit = true,
                RequireLowercase = true,
                RequireUppercase = true,
            };

            // Configure user lockout defaults
            UserLockoutEnabledByDefault = false;
            DefaultAccountLockoutTimeSpan = TimeSpan.FromMinutes(5);
            MaxFailedAccessAttemptsBeforeLockout = 5;

            // Register two factor authentication providers. This application uses Phone and Emails as a step of receiving a code for verifying the user
            // You can write your own provider and plug it in here.
            RegisterTwoFactorProvider("Phone Code", new PhoneNumberTokenProvider<AppMember, int>
            {
                MessageFormat = "Your security code is {0}"
            });

            RegisterTwoFactorProvider("Email Code", new EmailTokenProvider<AppMember, int>
            {
                Subject = "Security Code",
                BodyFormat = "Your security code is {0}"
            });

            EmailService = new EmailService();
            SmsService = new SmsService();

            UserTokenProvider = new DataProtectorTokenProvider<AppMember, int>(dataProtectionProvider.Create("ASP.NET Identity"));
        }
    }

    // Configure the application sign-in manager which is used in this application.
    public class ApplicationSignInManager : SignInManager<AppMember, int>
    {
        public ApplicationSignInManager(ApplicationUserManager userManager, IAuthenticationManager authenticationManager)
            : base(userManager, authenticationManager)
        {
        }

        public override Task<ClaimsIdentity> CreateUserIdentityAsync(AppMember appMember)
        {
            return appMember.GenerateUserIdentityAsync((ApplicationUserManager)UserManager);
        }

        public static ApplicationSignInManager Create(IdentityFactoryOptions<ApplicationSignInManager> options, IOwinContext context)
        {
            return new ApplicationSignInManager(context.GetUserManager<ApplicationUserManager>(), context.Authentication);
        }
    }
}