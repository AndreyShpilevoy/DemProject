﻿using System.ComponentModel.DataAnnotations;

namespace DEM_MVC.Models.AccountViewModels
{
    public class RegisterViewModel
    {
        [Required]
        [DataType(DataType.Text)]
        [StringLength(25, ErrorMessage = "{0} должен быть не менее {2} символов в длинну.", MinimumLength = 3)]
        [Display(Name = "Логин")]
        public string UserName { get; set; }

        [Required]
        [EmailAddress]
        [Display(Name = "Email")]
        public string Email { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "{0} должен быть не менее {2} символов в длинну.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "Пароль")]
        public string Password { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Подтверждение пароля")]
        [Compare("Password", ErrorMessage = "Пароль и Подтверждение пароля не совпадают.")]
        public string ConfirmPassword { get; set; }
    }
}
