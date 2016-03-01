using System.Collections.Generic;
using DEM_MVC_BL.Models.ConfigModels;

namespace DEM_MVC_BL.Interfaces.IServices.IModelsHelpers
{
    public interface IConfigModelHelper
    {
        List<ConfigModel> ConfigModels { get; }

        int GetPostsOnPageCount();
        int GetTopicsOnPageCount();
    }
}