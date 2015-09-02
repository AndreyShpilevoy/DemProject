using System;
using System.Collections.Generic;
using System.Text;
using System.Text.RegularExpressions;
using DEM_MVC_BL.Interfaces.IServices;
using DEM_MVC_Infrastructure.Models;
using Microsoft.Practices.ServiceLocation;
using NLog;

namespace DEM_MVC_BL.Services.ModelsHelpers
{
    public static class BbCodeHelper
    {
        private static readonly Dictionary<Regex, string> BbCodes;
        private static readonly IDataLoadService DataLoadService;

        static BbCodeHelper()
        {
            var dataLoadService = ServiceLocator.Current.GetInstance<IDataLoadService>();
            DataLoadService = dataLoadService;
            BbCodes = new Dictionary<Regex, string>();
            FillTheDictionaryBbcodes();
        }


        private static void FillTheDictionaryBbcodes()
        {
            try
            {
                var bbCodeList = DataLoadService.GetAllBbCodeModels();

                foreach (var bbcode in bbCodeList)
                {
                    RegexOptions regExOptions = RegexOptions.None;
                    var optionArray = bbcode.BbCodeRegexpOptions.Split('/');
                    foreach (var option in optionArray)
                    {
                        switch (option.ToLower())
                        {
                            case "compiled":
                                regExOptions |= RegexOptions.Compiled;
                                break;
                            case "cultureinvariant":
                                regExOptions |= RegexOptions.CultureInvariant;
                                break;
                            case "ecmascript":
                                regExOptions |= RegexOptions.ECMAScript;
                                break;
                            case "explicitcapture":
                                regExOptions |= RegexOptions.ExplicitCapture;
                                break;
                            case "ignorecase":
                                regExOptions |= RegexOptions.IgnoreCase;
                                break;
                            case "ignorepatternwhitespace":
                                regExOptions |= RegexOptions.IgnorePatternWhitespace;
                                break;
                            case "multiline":
                                regExOptions |= RegexOptions.Multiline;
                                break;
                            case "singleline":
                                regExOptions |= RegexOptions.Singleline;
                                break;
                            case "righttoleft":
                                regExOptions |= RegexOptions.RightToLeft;
                                break;
                            case "none":
                                regExOptions |= RegexOptions.None;
                                break;
                        }
                    }
                    BbCodes.Add(new Regex(bbcode.BbCodeMatch, regExOptions), bbcode.BbCodeTemplate);
                }
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, "BbCodeHelper. Error in function FillTheDictionaryBbcodes");
            }
        }

        public static string BbCodeReplacerToHtml(string text)
        {
            try
            {
                foreach (var bbCode in BbCodes)
                {
                    while (bbCode.Key.IsMatch(text))
                    {
                        text = bbCode.Key.Replace(text, bbCode.Value);
                    }
                }
                return text;
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, "BbCodeHelper. Error in function BbCodeReplacerToHtml");
                return null;
            }
        }
    }
}