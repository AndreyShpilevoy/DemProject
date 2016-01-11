using System.ComponentModel.DataAnnotations;

namespace DEM_MVC.Models.AccountViewModels
{
    public class ExternalLoginConfirmationViewModel
    {
        [Required]
        [DataType(DataType.Text)]
        [StringLength(25, ErrorMessage = "{0} должен быть не менее {2} символов в длинну.", MinimumLength = 3)]
        [Display(Name = "Логин")]
        public string UserName { get; set; }


        [Required]
        [Display(Name = "Email")]
        public string Email { get; set; }
    }
}
