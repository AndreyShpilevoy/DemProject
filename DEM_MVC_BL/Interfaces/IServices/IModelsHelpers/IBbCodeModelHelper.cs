using System.Collections.Generic;
using System.Text.RegularExpressions;
using DEM_MVC_BL.Models.BbCodeModels;

namespace DEM_MVC_BL.Interfaces.IServices.IModelsHelpers
{
    public interface IBbCodeModelHelper
    {
        List<BbCodeModel> BbCodeModels { get; }
        Dictionary<Regex, string> FillTheDictionaryBbcodes();
        string BbCodeReplacerToHtml(string text);
    }
}