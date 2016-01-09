using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;

namespace DEM_MVC.Services
{
    //class for localization of password error messages on login page
    public class CustomErrorMessagesForPasswordValidatorService : PasswordValidator
    {
        public override async Task<IdentityResult> ValidateAsync(string password)
        {
            IdentityResult result = await base.ValidateAsync(password);

            if (!result.Succeeded)
            {
                List<string> errors = new List<string>();
                foreach (var error in result.Errors)
                {
                    if (error.Contains("Passwords must have at least one digit ('0'-'9')."))
                    {
                        errors.Add("Пароль должен содержать хотя бы одну цифру ('0'-'9').");
                    }
                    if (error.Contains("Passwords must have at least one non letter or digit character."))
                    {
                        errors.Add("Пароль должен содержать хотя бы один Спец символ (# _ и т.п.)");
                    }
                    if (error.Contains("Passwords must have at least one uppercase ('A'-'Z')."))
                    {
                        errors.Add("Пароль должен содержать хотя бы одну букву в верхнем регистре ('A'-'Z').");
                    }
                    if (error.Contains("Passwords must have at least one lowercase ('a'-'z')."))
                    {
                        errors.Add("Пароль должен содержать хотя бы одну букву в нижнем регистре ('a'-'z').");
                    }
                }
                result = new IdentityResult(errors);
            }
            return result;
        }
    }
}