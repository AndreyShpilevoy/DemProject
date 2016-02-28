using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using DEM_MVC_BL.Interfaces.IServices;
using DEM_MVC_BL.Interfaces.IServices.IModelsHelpers;
using DEM_MVC_BL.Models.BbCodeModels;
using DEM_MVC_Infrastructure.Models;

namespace DEM_MVC_BL.Services.ModelsHelpers
{
    public class BbCodeModelHelper : IBbCodeModelHelper
    {
        private readonly IDataLoadService _dataLoadService;
        private readonly IAppCache _appCache;

        private Dictionary<Regex, string> _bbCodes;
        private List<BbCodeModel> _bbCodeModels;
        public Dictionary<Regex, string> BbCodes
        {
            get
            {
                _bbCodes = _appCache.Get<Regex, string>(CommonConstants.BbCodes);
                if (_bbCodes != null)
                    return _bbCodes;
                _bbCodes = FillTheDictionaryBbcodes();
                if (_bbCodes == null || _bbCodes.Count == 0)
                    return null;
                _appCache.Add(_bbCodes, CommonConstants.BbCodes);
                return _bbCodes;
            }
        }
        public List<BbCodeModel> BbCodeModels
        {
            get
            {
                _bbCodeModels = _appCache.Get<BbCodeModel>(CommonConstants.BbCodeModels);
                if (_bbCodeModels != null)
                    return _bbCodeModels;
                _bbCodeModels = _dataLoadService.GetAllBbCodeModels();
                if (_bbCodeModels == null || _bbCodeModels.Count == 0)
                    return null;
                _appCache.Add(_bbCodeModels, CommonConstants.BbCodeModels);
                return _bbCodeModels;
            }
        }

        public BbCodeModelHelper(IDataLoadService dataLoadService,
            IAppCache appCache)
        {
            _dataLoadService = dataLoadService;
            _appCache = appCache;
        }

        public Dictionary<Regex, string> FillTheDictionaryBbcodes()
        {
            try
            {
                var bbCodes = new Dictionary<Regex, string>();

                foreach (var bbcode in BbCodeModels)
                {
                    RegexOptions regExOptions = RegexOptions.None;
                    var optionArray = bbcode.BbCodeRegexpOptions.Split('/');
                    foreach (var option in optionArray)
                    {
                        switch (option?.ToLower())
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
                            default:
                                regExOptions |= RegexOptions.None;
                                break;
                        }
                    }
                    bbCodes.Add(new Regex(bbcode.BbCodeMatch, regExOptions), bbcode.BbCodeTemplate);
                }
                return bbCodes;
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, $"{nameof(BbCodeModelHelper)}. Error in function {DemLogger.GetCallerInfo()}");
                return null;
            }
        }

        public string BbCodeReplacerToHtml(string text)
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
                return text?.Replace("[{ignoreCode}", "[");
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, $"{nameof(BbCodeModelHelper)}. Error in function {DemLogger.GetCallerInfo()}");
                return null;
            }
        }

        private string ProcessNoParceBbCodes(string text)
        {
            try
            {
                var noParceBbCodes = BbCodeModels.Where(x => x.NoParse).ToList();

                if (String.IsNullOrWhiteSpace(text))
                    return text;

                foreach (var code in noParceBbCodes)
                {
                    var openCodesInfo = Regex.Matches(text, $@"(\[{code.BbCodeTag}\])", RegexOptions.IgnoreCase | RegexOptions.Compiled | RegexOptions.Singleline);
                    var closeCodesInfo = Regex.Matches(text, $@"(\[\/{code.BbCodeTag}\])", RegexOptions.IgnoreCase | RegexOptions.Compiled | RegexOptions.Singleline);
                    IEnumerable<Match> combinedCodesInfo = openCodesInfo.OfType<Match>().Concat(closeCodesInfo.OfType<Match>()).Where(m => m.Success).OrderBy(x => x.Index);

                    List<NoParseBbCodeType> identifier = new List<NoParseBbCodeType>();
                    List<NoParseBbCodeHelper> noParseBbCodes = new List<NoParseBbCodeHelper>();

                    foreach (var codeInfo in combinedCodesInfo)
                    {
                        if (codeInfo.Value == $"[{code.BbCodeTag}]" && (identifier.Count == 0))
                        {
                            noParseBbCodes.Add(new NoParseBbCodeHelper()
                            {
                                StartPosition = codeInfo.Index,
                                Length = codeInfo.Length,
                                CodeType = NoParseBbCodeType.Open
                            });
                            identifier.Add(NoParseBbCodeType.Open);
                        }
                        else if (codeInfo.Value == $"[{code.BbCodeTag}]" && (identifier.Count > 0))
                        {
                            identifier.Add(NoParseBbCodeType.Open);
                        }
                        else if (codeInfo.Value == $"[/{code.BbCodeTag}]" && (identifier.Count(x => x == NoParseBbCodeType.Open) == 1))
                        {
                            noParseBbCodes.Add(new NoParseBbCodeHelper()
                            {
                                StartPosition = codeInfo.Index,
                                Length = codeInfo.Length,
                                CodeType = NoParseBbCodeType.Close
                            });
                            identifier.Remove(NoParseBbCodeType.Open);
                        }
                        else if (codeInfo.Value == $"[/{code.BbCodeTag}]" && (identifier.Count(x => x == NoParseBbCodeType.Open) > 1))
                        {
                            identifier.Remove(NoParseBbCodeType.Open);
                        }
                    }
                    for (var i = noParseBbCodes.Count - 1; i >= 0; i -= 2)
                    {
                        var changedTextStartPosition = noParseBbCodes[i - 1].StartPosition + noParseBbCodes[i - 1].Length;
                        var changedTextLength = noParseBbCodes[i].StartPosition - (noParseBbCodes[i - 1].StartPosition + noParseBbCodes[i - 1].Length);

                        var changedTextPart = text.Substring(changedTextStartPosition, changedTextLength)
                            .Replace("[", "[{ignoreCode}");
                        var textStringBuilder = new StringBuilder(text);
                        textStringBuilder.Remove(changedTextStartPosition, changedTextLength);
                        textStringBuilder.Insert(changedTextStartPosition, changedTextPart);
                        text = textStringBuilder.ToString();
                    }
                }
                return text;
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, $"{nameof(BbCodeModelHelper)}. Error in function {DemLogger.GetCallerInfo()}");
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