using System;
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
using DEM_MVC.Services;

namespace DEM_MVC
{
    public class EmailService : IIdentityMessageService, IDisposable
    {
        private MailMessage _myMessage;
        public async Task SendAsync(IdentityMessage message)
        {
            await ConfigSendGridasync(message).ConfigureAwait(false);
        }

        private async Task ConfigSendGridasync(IdentityMessage message)
        {
            _myMessage = new MailMessage();
            _myMessage.To.Add(new MailAddress(message.Destination));  // replace with valid value 
            _myMessage.From = new MailAddress(ConfigurationManager.AppSettings["mailAccount"],
                ConfigurationManager.AppSettings["mailAccountDisplayName"]);  // replace with valid value
            _myMessage.Subject = message.Subject;
            _myMessage.Body = message.Body;
            _myMessage.IsBodyHtml = true;

            using (var smtp = new SmtpClient())
            {

                var credentials = new NetworkCredential(
                           ConfigurationManager.AppSettings["mailAccount"],
                           ConfigurationManager.AppSettings["mailPassword"]
                           );

                smtp.Credentials = credentials;
                smtp.Host = ConfigurationManager.AppSettings["host"];
                smtp.Port = Int32.Parse(ConfigurationManager.AppSettings["port"]);
                smtp.EnableSsl = Boolean.Parse(ConfigurationManager.AppSettings["enableSsl"]);//false
                await smtp.SendMailAsync(_myMessage).ConfigureAwait(false);
            }
        }
        public void Dispose()
        {
            _myMessage.Dispose();
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
            PasswordValidator = new TranslateErrorMessagesForPasswordValidatorService
            {
                RequiredLength = 6,
                RequireNonLetterOrDigit = false,
                RequireDigit = true,
                RequireLowercase = true,
                RequireUppercase = true
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

        public static ApplicationSignInManager Create(IOwinContext context)//(IdentityFactoryOptions<ApplicationSignInManager> options, IOwinContext context)
        {
            return new ApplicationSignInManager(context.GetUserManager<ApplicationUserManager>(), context.Authentication);
        }
    }
}