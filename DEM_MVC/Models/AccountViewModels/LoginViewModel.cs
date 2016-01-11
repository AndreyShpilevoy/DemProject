using System.ComponentModel.DataAnnotations;

namespace DEM_MVC.Models.AccountViewModels
{
    public class LoginViewModel
    {
        [Required]
        [DataType(DataType.Text)]
        [StringLength(25, ErrorMessage = "{0} должен быть не менее {2} символов в длинну.", MinimumLength = 3)]
        [Display(Name = "Логин")]
        public string UserName { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [Display(Name = "Пароль")]
        public string Password { get; set; }

        [Display(Name = "Запомнить меня?")]
        public bool RememberMe { get; set; }
    }
}
