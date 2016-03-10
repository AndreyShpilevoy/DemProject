using System;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Web.Mvc;
using System.Web.Routing;
using DEM_MVC_BL.Interfaces.IServices.Conference;
using Microsoft.Practices.ServiceLocation;

namespace DEM_MVC.Services.HtmlHelpers
{
    public static class CustomHtmlHelpers
    {
        public static MvcHtmlString SpanFor<TModel, TProperty>(this HtmlHelper<TModel> helper,
            Expression<Func<TModel, TProperty>> expression)
        {
            return SpanFor(helper, expression, null);
        }

        public static MvcHtmlString SpanFor<TModel, TProperty>(this HtmlHelper<TModel> helper, 
            Expression<Func<TModel, TProperty>> expression, object htmlAttributes)
        {
            var valueGetter = expression.Compile();
            var value = valueGetter(helper.ViewData.Model);

            var span = new TagBuilder("span");
            span.MergeAttributes(new RouteValueDictionary(htmlAttributes));
            if (!Equals(value, default(TProperty)))
            {
                span.SetInnerText(value.ToString());
            }

            return MvcHtmlString.Create(span.ToString());
        }

        public static MvcHtmlString Span(this HtmlHelper helper, object content)
        {
            return Span(helper, content, null);
        }

        public static MvcHtmlString Span(this HtmlHelper helper, object content, object htmlAttributes)
        {
            var span = new TagBuilder("span");
            span.MergeAttributes(new RouteValueDictionary(htmlAttributes));
            if (content != null)
            {
                span.SetInnerText(content.ToString());
            }
            return MvcHtmlString.Create(span.ToString());
        }

        public static MvcHtmlString BbCodeTextAreaFor<TModel, TValue>(this HtmlHelper<TModel> helper,
            Expression<Func<TModel, TValue>> expression)
        {
            return BbCodeTextAreaFor(helper, expression, null);
        }

        public static MvcHtmlString BbCodeTextAreaFor<TModel, TValue>(this HtmlHelper<TModel> helper,
            Expression<Func<TModel, TValue>> expression, object htmlAttributes)
        {
            return BbCodeTextAreaFor(helper, expression, htmlAttributes, null);
        }

        public static MvcHtmlString BbCodeTextAreaFor<TModel, TValue>(this HtmlHelper<TModel> helper, 
            Expression<Func<TModel, TValue>> expression, object htmlAttributes, object content)
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

            var bbCodeReadService = ServiceLocator.Current.GetInstance<IBbCodeReadService>();
            var bbCodes = bbCodeReadService.BbCodeModels;
            bbCodes = bbCodes.OrderBy(x => x.BbCodeOrder).ToList();

            var stringBuilder = new StringBuilder();
            foreach (var bbCode in bbCodes.Where(x => x.BbCodeOnPosting))
            {
                var buttonBuilder = new TagBuilder("a");
                buttonBuilder.Attributes.Add("title", bbCode.BbCodeHelpLine);
                buttonBuilder.Attributes.Add("id", "bbCodeId_" + bbCode.BbCodeTag);
                buttonBuilder.InnerHtml = bbCode.BbCodeTag;
                buttonBuilder.MergeAttribute("onClick", string.Format("doAddTags('[{0}]','[/{0}]','" + textarea.Attributes.SingleOrDefault(x => x.Key == "id").Value + "')", bbCode.BbCodeTag));
                buttonBuilder.AddCssClass("demNavigationBtn nonDecoration ui-button ui-state-default ui-button-text-only");

                stringBuilder.Append(buttonBuilder);
            }
            buttonsDiv.InnerHtml = stringBuilder.ToString();
            #endregion

            textAreaDiv.InnerHtml += textarea;
            mainDiv.InnerHtml += buttonsDiv;
            mainDiv.InnerHtml += textAreaDiv;
            return new MvcHtmlString(mainDiv.ToString());
        }
    }
}