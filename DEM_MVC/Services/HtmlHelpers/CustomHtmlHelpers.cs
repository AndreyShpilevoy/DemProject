using System;
using System.Linq;
using System.Linq.Expressions;
using System.Web.Mvc;
using System.Web.Routing;
using DEM_MVC_BL.Interfaces.IServices.IModelsHelpers;
using DEM_MVC_BL.Models.ForumModels;
using Microsoft.Practices.ServiceLocation;

namespace DEM_MVC.Services.HtmlHelpers
{
    public static class CustomHtmlHelpers
    {
        public static MvcHtmlString SpanFor<TModel, TProperty>(this HtmlHelper<TModel> helper, Expression<Func<TModel, TProperty>> expression, object htmlAttributes = null)
        {
            var valueGetter = expression.Compile();
            var value = valueGetter(helper.ViewData.Model);

            var span = new TagBuilder("span");
            span.MergeAttributes(new RouteValueDictionary(htmlAttributes));
            if (value != null)
            {
                span.SetInnerText(value.ToString());
            }

            return MvcHtmlString.Create(span.ToString());
        }

        public static MvcHtmlString Span(this HtmlHelper helper, object content, object htmlAttributes = null)
        {
            var span = new TagBuilder("span");
            span.MergeAttributes(new RouteValueDictionary(htmlAttributes));
            if (content != null)
            {
                span.SetInnerText(content.ToString());
            }
            return MvcHtmlString.Create(span.ToString());
        }

        public static MvcHtmlString BbCodeTextAreaFor<TModel, TValue>(this HtmlHelper<TModel> helper, Expression<Func<TModel, TValue>> expression, object htmlAttributes = null, object content = null)
        {

            var data = ModelMetadata.FromLambdaExpression(expression, helper.ViewData);
            string propertyName = data.PropertyName;

            var mainDiv = new TagBuilder("div");
            var buttonsDiv = new TagBuilder("div");
            var textAreaDiv = new TagBuilder("div");

            #region textarea

            TagBuilder textarea = new TagBuilder("textarea");
            textarea.MergeAttributes(new RouteValueDictionary(htmlAttributes));
            if (content != null)
            {
                textarea.SetInnerText(content.ToString());
            }
            if (!textarea.Attributes.ContainsKey("id"))
            {
                textarea.Attributes.Add("id", "textareaId_" + propertyName);
            }
            textarea.Attributes.Add("name", propertyName);
            textarea.Attributes.Add("rows", "10");

            if (htmlAttributes != null)
            {
                var attributes = HtmlHelper.AnonymousObjectToHtmlAttributes(htmlAttributes);
                textarea.MergeAttributes(attributes);
            }

            #endregion


            #region buttons

            var bbCodeHelper = ServiceLocator.Current.GetInstance<IBbCodeHelper>();
            var bbCodes = bbCodeHelper.BbCodeModels;
            bbCodes = bbCodes.OrderBy(x => x.BbCodeOrder).ToList();

            foreach (var bbCode in bbCodes.Where(x => x.BbCodeOnPosting))
            {
                var buttonBuilder = new TagBuilder("a");
                buttonBuilder.Attributes.Add("title", bbCode.BbCodeHelpLine);
                buttonBuilder.Attributes.Add("id", "bbCodeId_" + bbCode.BbCodeTag);
                buttonBuilder.InnerHtml = bbCode.BbCodeTag;
                buttonBuilder.MergeAttribute("onClick", String.Format("doAddTags('[{0}]','[/{0}]','" + textarea.Attributes.SingleOrDefault(x => x.Key == "id").Value + "')", bbCode.BbCodeTag));
                buttonBuilder.AddCssClass("ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only nonDecoration demNavigationBtn");

                buttonsDiv.InnerHtml += buttonBuilder;
            }

            #endregion

            textAreaDiv.InnerHtml += textarea;
            mainDiv.InnerHtml += buttonsDiv;
            mainDiv.InnerHtml += textAreaDiv;
            return new MvcHtmlString(mainDiv.ToString());
        }
    }
}