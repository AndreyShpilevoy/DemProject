using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Web;
using DEM_MVC_BL.Interfaces.IServices;
using DEM_MVC_BL.Models.ForumModels;
using DEM_MVC_Infrastructure.Models;
using Microsoft.Practices.ServiceLocation;
using NLog;

namespace DEM_MVC_BL.Services.ModelsHelpers
{
    public static class BbCodeHelper
    {
        public static Dictionary<Regex, string> BbCodes;
        public static List<BbCodeModel> BbCodeList;

        static BbCodeHelper()
        {
            var dataLoadService = ServiceLocator.Current.GetInstance<IDataLoadService>();
            BbCodes = new Dictionary<Regex, string>();
            FillTheDictionaryBbcodes(dataLoadService);
        }


        private static void FillTheDictionaryBbcodes(IDataLoadService dataLoadService)
        {
            try
            {
                BbCodeList = dataLoadService.GetAllBbCodeModels();

                foreach (var bbcode in BbCodeList)
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
                if (!String.IsNullOrWhiteSpace(text))
                {
                    text = ProcessNoParceBbCodes(text);
                    foreach (var bbCode in BbCodes)
                    {
                        while (bbCode.Key.IsMatch(text))
                        {
                            text = bbCode.Key.Replace(text, bbCode.Value);
                        }
                    }
                }
                return HttpUtility.UrlDecode(text);
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, "BbCodeHelper. Error in function BbCodeReplacerToHtml");
                return null;
            }
        }
        private static string ProcessNoParceBbCodes(string text)
        {
            try
            {
                List<string> noParceBbCodes = new List<string>() { "code" };
                if (!String.IsNullOrWhiteSpace(text))
                {
                    foreach (var code in noParceBbCodes)
                    {
                        var openCodesInfo = Regex.Matches(text, String.Format(@"(\[{0}\])", code), RegexOptions.IgnoreCase | RegexOptions.Compiled | RegexOptions.Singleline);
                        var closeCodesInfo = Regex.Matches(text, String.Format(@"(\[\/{0}\])", code), RegexOptions.IgnoreCase | RegexOptions.Compiled | RegexOptions.Singleline);
                        IEnumerable<Match> combinedCodesInfo = openCodesInfo.OfType<Match>().Concat(closeCodesInfo.OfType<Match>()).Where(m => m.Success).OrderBy(x=>x.Index);

                        List<NoParseBbCodeType> identifier = new List<NoParseBbCodeType>();
                        List<NoParseBbCodeHelper> noParseBbCodes = new List<NoParseBbCodeHelper>();

                        foreach (var codeInfo in combinedCodesInfo)
                        {
                            if (codeInfo.Value == String.Format("[{0}]", code) && (identifier.Count == 0))
                            {
                                noParseBbCodes.Add(new NoParseBbCodeHelper()
                                {
                                    StartPosition = codeInfo.Index,
                                    Length = codeInfo.Length,
                                    CodeType = NoParseBbCodeType.Open
                                });
                                identifier.Add(NoParseBbCodeType.Open);
                            }
                            else if (codeInfo.Value == String.Format("[{0}]", code) && (identifier.Count > 0))
                            {
                                identifier.Add(NoParseBbCodeType.Open);
                            }
                            else if (codeInfo.Value == String.Format("[/{0}]", code) && (identifier.Count(x => x == NoParseBbCodeType.Open) == 1))
                            {
                                noParseBbCodes.Add(new NoParseBbCodeHelper()
                                {
                                    StartPosition = codeInfo.Index,
                                    Length = codeInfo.Length,
                                    CodeType = NoParseBbCodeType.Close
                                });
                                identifier.Remove(NoParseBbCodeType.Open);
                            }
                            else if (codeInfo.Value == String.Format("[/{0}]", code) && (identifier.Count(x => x == NoParseBbCodeType.Open) > 1))
                            {
                                identifier.Remove(NoParseBbCodeType.Open);
                            }
                        }
                        for (var i = noParseBbCodes.Count-1; i >= 0 ; i -= 2)
                        {
                            var changedTextStartPosition = noParseBbCodes[i - 1].StartPosition + noParseBbCodes[i - 1].Length;
                            var changedTextLength = noParseBbCodes[i].StartPosition - (noParseBbCodes[i - 1].StartPosition + noParseBbCodes[i - 1].Length);

                            //var changedTextPart = HttpUtility.UrlEncode(text.Substring(changedTextStartPosition, changedTextLength));
                            var changedTextPart = text.Substring(changedTextStartPosition, changedTextLength)
                                .Replace("[", "%5B")
                                .Replace("]", "%5D");
                            var textStringBuilder = new StringBuilder(text);
                            textStringBuilder.Remove(changedTextStartPosition, changedTextLength);
                            textStringBuilder.Insert(changedTextStartPosition, changedTextPart);
                            text = textStringBuilder.ToString();
                        }
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

        private class NoParseBbCodeHelper
        {
            internal int StartPosition { get; set; }
            internal int Length { get; set; }
            internal NoParseBbCodeType CodeType { get; set; }
        }

        private enum NoParseBbCodeType { Open, Close }
    }
}