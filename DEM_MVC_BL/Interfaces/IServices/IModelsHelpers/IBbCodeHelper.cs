using System.Collections.Generic;
using DEM_MVC_BL.Models.ForumModels;

namespace DEM_MVC_BL.Interfaces.IServices.IModelsHelpers
{
    public interface IBbCodeHelper
    {
        List<BbCodeModel> BbCodeModels { get; set; }
        void FillTheDictionaryBbcodes(IDataLoadService dataLoadService);
        string BbCodeReplacerToHtml(string text);
    }
}