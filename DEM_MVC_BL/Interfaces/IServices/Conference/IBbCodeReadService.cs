using System.Collections.Generic;
using DEM_MVC_BL.Models.BbCodeModels;

namespace DEM_MVC_BL.Interfaces.IServices.Conference
{
    public interface IBbCodeReadService
    {
        List<BbCodeModel> GetAllBbCodeModels();
        List<BbCodeModel> BbCodeModels { get; }
        string BbCodeReplacerToHtml(string text);
    }
}