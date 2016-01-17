using System.Collections.Generic;
using DEM_MVC_BL.Models.BbCodeModels;

namespace DEM_MVC_BL.Interfaces.IServices.IModelsHelpers
{
    public interface IBbCodeModelHelper
    {
        List<BbCodeModel> BbCodeModels { get; set; }
        void FillTheDictionaryBbcodes(IDataLoadService dataLoadService);
        string BbCodeReplacerToHtml(string text);
    }
}