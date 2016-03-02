using System.Collections.Generic;
using DEM_MVC_BL.Models.ConfigModels;

namespace DEM_MVC_BL.Interfaces.IServices.Conference
{
    public interface IConfigReadService
    {
        List<ConfigModel> GetAllConfigModels();
    }
}