using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using DEM_MVC_BL.Models;

namespace DEM_MVC.Services
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
        
        public static MvcHtmlString PostPagingForViewTopic(this HtmlHelper helper, TopicShowViewModel model, string actionName, string controlName, object htmlDefaultBtnAttributes = null, object htmlSelectedBtnAttributes = null)
        {

            var mainDiv = new TagBuilder("div");

            var spanInfo = new TagBuilder("span");
            spanInfo.SetInnerText(String.Format("Сообщений: {0} • Страница {1} из {2} ", model.PostsCount, model.PageNumber, model.PagesCount));
            mainDiv.InnerHtml += spanInfo;

            if (model.PagesCount <= 10)
            {
                for (var i = 1; i <= model.PagesCount; i++)
                {
                    if (i == model.PageNumber)
                    {
                        var span = new TagBuilder("span");
                        span.MergeAttributes(new RouteValueDictionary(htmlSelectedBtnAttributes));
                        span.SetInnerText(i.ToString());
                        mainDiv.InnerHtml += span;
                    }
                    else
                    {
                        var a = new TagBuilder("a");
                        a.MergeAttributes(new RouteValueDictionary(htmlDefaultBtnAttributes));
                        a.Attributes.Add("href", String.Format("/{0}/{1}?topicId={2}&page={3}", controlName, actionName, model.TopicId, i));
                        a.InnerHtml += i.ToString();
                        mainDiv.InnerHtml += a;
                    }
                }
            }
            else if (model.PageNumber >= 1 && model.PageNumber <= 6)
            {
                for (var i = 1; i <= 9; i++)
                {
                    if (i == model.PageNumber)
                    {
                        var span = new TagBuilder("span");
                        span.MergeAttributes(new RouteValueDictionary(htmlSelectedBtnAttributes));
                        span.SetInnerText(i.ToString());
                        mainDiv.InnerHtml += span;
                    }
                    else
                    {
                        var a = new TagBuilder("a");
                        a.MergeAttributes(new RouteValueDictionary(htmlDefaultBtnAttributes));
                        a.Attributes.Add("href", String.Format("/{0}/{1}?topicId={2}&page={3}", controlName, actionName, model.TopicId, i));
                        a.InnerHtml += i.ToString();
                        mainDiv.InnerHtml += a;
                    }
                }

                var spanEllipsis = new TagBuilder("span");
                spanEllipsis.SetInnerText(" ... ");
                mainDiv.InnerHtml += spanEllipsis;

                var aLast = new TagBuilder("a");
                aLast.MergeAttributes(new RouteValueDictionary(htmlDefaultBtnAttributes));
                aLast.Attributes.Add("href", String.Format("/{0}/{1}?topicId={2}&page={3}", controlName, actionName, model.TopicId, model.PagesCount));
                aLast.InnerHtml += model.PagesCount.ToString();
                mainDiv.InnerHtml += aLast;
            }
            else if (model.PageNumber >= 7 && model.PageNumber <= model.PagesCount - 6)
            {
                var aFirst = new TagBuilder("a");
                aFirst.MergeAttributes(new RouteValueDictionary(htmlDefaultBtnAttributes));
                aFirst.Attributes.Add("href", String.Format("/{0}/{1}?topicId={2}&page={3}", controlName, actionName, model.TopicId, 1));
                aFirst.InnerHtml += 1.ToString();
                mainDiv.InnerHtml += aFirst;

                var spanEllipsis = new TagBuilder("span");
                spanEllipsis.SetInnerText(" ... ");
                mainDiv.InnerHtml += spanEllipsis;

                for (var i = model.PageNumber - 3; i <= model.PageNumber + 3; i++)
                {
                    if (i == model.PageNumber)
                    {
                        var span = new TagBuilder("span");
                        span.MergeAttributes(new RouteValueDictionary(htmlSelectedBtnAttributes));
                        span.SetInnerText(i.ToString());
                        mainDiv.InnerHtml += span;
                    }
                    else
                    {
                        var a = new TagBuilder("a");
                        a.MergeAttributes(new RouteValueDictionary(htmlDefaultBtnAttributes));
                        a.Attributes.Add("href", String.Format("/{0}/{1}?topicId={2}&page={3}", controlName, actionName, model.TopicId, i));
                        a.InnerHtml += i.ToString();
                        mainDiv.InnerHtml += a;
                    }
                }

                mainDiv.InnerHtml += spanEllipsis;

                var aLast = new TagBuilder("a");
                aLast.MergeAttributes(new RouteValueDictionary(htmlDefaultBtnAttributes));
                aLast.Attributes.Add("href", String.Format("/{0}/{1}?topicId={2}&page={3}", controlName, actionName, model.TopicId, model.PagesCount));
                aLast.InnerHtml += model.PagesCount.ToString();
                mainDiv.InnerHtml += aLast;
            }
            else
            {
                var aFirst = new TagBuilder("a");
                aFirst.MergeAttributes(new RouteValueDictionary(htmlDefaultBtnAttributes));
                aFirst.Attributes.Add("href", String.Format("/{0}/{1}?topicId={2}&page={3}", controlName, actionName, model.TopicId, 1));
                aFirst.InnerHtml += 1.ToString();
                mainDiv.InnerHtml += aFirst;

                var spanEllipsis = new TagBuilder("span");
                spanEllipsis.SetInnerText(" ... ");
                mainDiv.InnerHtml += spanEllipsis;

                for (var i = model.PagesCount - 8; i <= model.PagesCount; i++)
                {
                    if (i == model.PageNumber)
                    {
                        var span = new TagBuilder("span");
                        span.MergeAttributes(new RouteValueDictionary(htmlSelectedBtnAttributes));
                        span.SetInnerText(i.ToString());
                        mainDiv.InnerHtml += span;
                    }
                    else
                    {
                        var a = new TagBuilder("a");
                        a.MergeAttributes(new RouteValueDictionary(htmlDefaultBtnAttributes));
                        a.Attributes.Add("href", String.Format("/{0}/{1}?topicId={2}&page={3}", controlName, actionName, model.TopicId, i));
                        a.InnerHtml += i.ToString();
                        mainDiv.InnerHtml += a;
                    }
                }
            }
            return MvcHtmlString.Create(mainDiv.ToString());
        }

        public static MvcHtmlString PostPagingForViewForum(this HtmlHelper helper, TopicTableViewModel model, string actionName, string controlName, object htmlDefaultBtnAttributes = null)
        {

            var mainDiv = new TagBuilder("div");

            if (model.PagesCount > 1 && model.PagesCount <= 5)
            {
                for (var i = 1; i <= model.PagesCount; i++)
                {
                        var a = new TagBuilder("a");
                        a.MergeAttributes(new RouteValueDictionary(htmlDefaultBtnAttributes));
                        a.Attributes.Add("href", String.Format("/{0}/{1}?topicId={2}&page={3}", controlName, actionName, model.TopicId, i));
                        a.InnerHtml += i.ToString();
                        mainDiv.InnerHtml += a;
                    
                }
            }
            else if (model.PagesCount > 1)
            {
                var aFirst = new TagBuilder("a");
                aFirst.MergeAttributes(new RouteValueDictionary(htmlDefaultBtnAttributes));
                aFirst.Attributes.Add("href", String.Format("/{0}/{1}?topicId={2}&page={3}", controlName, actionName, model.TopicId, 1));
                aFirst.InnerHtml += 1.ToString();
                mainDiv.InnerHtml += aFirst;

                var spanEllipsis = new TagBuilder("span");
                spanEllipsis.SetInnerText(" ... ");
                mainDiv.InnerHtml += spanEllipsis;

                for (var i = model.PagesCount - 2; i <= model.PagesCount; i++)
                {
                        var a = new TagBuilder("a");
                        a.MergeAttributes(new RouteValueDictionary(htmlDefaultBtnAttributes));
                        a.Attributes.Add("href", String.Format("/{0}/{1}?topicId={2}&page={3}", controlName, actionName, model.TopicId, i));
                        a.InnerHtml += i.ToString();
                        mainDiv.InnerHtml += a;
                }
            }
            return MvcHtmlString.Create(mainDiv.ToString());
        }
        
        public static MvcHtmlString TopicPagingForViewForum(this HtmlHelper helper, ForumShowViewModel model, string actionName, string controlName, object htmlDefaultBtnAttributes = null, object htmlSelectedBtnAttributes = null)
        {

            var mainDiv = new TagBuilder("div");

            var spanInfo = new TagBuilder("span");
            spanInfo.SetInnerText(String.Format("Тем: {0} • Страница {1} из {2} ", model.TopicsCount, model.PageNumber, model.PagesCount));
            mainDiv.InnerHtml += spanInfo;

            if (model.PagesCount <= 10)
            {
                for (var i = 1; i <= model.PagesCount; i++)
                {
                    if (i == model.PageNumber)
                    {
                        var span = new TagBuilder("span");
                        span.MergeAttributes(new RouteValueDictionary(htmlSelectedBtnAttributes));
                        span.SetInnerText(i.ToString());
                        mainDiv.InnerHtml += span;
                    }
                    else
                    {
                        var a = new TagBuilder("a");
                        a.MergeAttributes(new RouteValueDictionary(htmlDefaultBtnAttributes));
                        a.Attributes.Add("href", String.Format("/{0}/{1}?forumId={2}&page={3}", controlName, actionName, model.ForumId, i));
                        a.InnerHtml += i.ToString();
                        mainDiv.InnerHtml += a;
                    }
                }
            }
            else if (model.PageNumber >= 1 && model.PageNumber <= 6)
            {
                for (var i = 1; i <= 9; i++)
                {
                    if (i == model.PageNumber)
                    {
                        var span = new TagBuilder("span");
                        span.MergeAttributes(new RouteValueDictionary(htmlSelectedBtnAttributes));
                        span.SetInnerText(i.ToString());
                        mainDiv.InnerHtml += span;
                    }
                    else
                    {
                        var a = new TagBuilder("a");
                        a.MergeAttributes(new RouteValueDictionary(htmlDefaultBtnAttributes));
                        a.Attributes.Add("href", String.Format("/{0}/{1}?forumId={2}&page={3}", controlName, actionName, model.ForumId, i));
                        a.InnerHtml += i.ToString();
                        mainDiv.InnerHtml += a;
                    }
                }

                var spanEllipsis = new TagBuilder("span");
                spanEllipsis.SetInnerText(" ... ");
                mainDiv.InnerHtml += spanEllipsis;

                var aLast = new TagBuilder("a");
                aLast.MergeAttributes(new RouteValueDictionary(htmlDefaultBtnAttributes));
                aLast.Attributes.Add("href", String.Format("/{0}/{1}?forumId={2}&page={3}", controlName, actionName, model.ForumId, model.PagesCount));
                aLast.InnerHtml += model.PagesCount.ToString();
                mainDiv.InnerHtml += aLast;
            }
            else if (model.PageNumber >= 7 && model.PageNumber <= model.PagesCount - 6)
            {
                var aFirst = new TagBuilder("a");
                aFirst.MergeAttributes(new RouteValueDictionary(htmlDefaultBtnAttributes));
                aFirst.Attributes.Add("href", String.Format("/{0}/{1}?forumId={2}&page={3}", controlName, actionName, model.ForumId, 1));
                aFirst.InnerHtml += 1.ToString();
                mainDiv.InnerHtml += aFirst;

                var spanEllipsis = new TagBuilder("span");
                spanEllipsis.SetInnerText(" ... ");
                mainDiv.InnerHtml += spanEllipsis;

                for (var i = model.PageNumber - 3; i <= model.PageNumber + 3; i++)
                {
                    if (i == model.PageNumber)
                    {
                        var span = new TagBuilder("span");
                        span.MergeAttributes(new RouteValueDictionary(htmlSelectedBtnAttributes));
                        span.SetInnerText(i.ToString());
                        mainDiv.InnerHtml += span;
                    }
                    else
                    {
                        var a = new TagBuilder("a");
                        a.MergeAttributes(new RouteValueDictionary(htmlDefaultBtnAttributes));
                        a.Attributes.Add("href", String.Format("/{0}/{1}?forumId={2}&page={3}", controlName, actionName, model.ForumId, i));
                        a.InnerHtml += i.ToString();
                        mainDiv.InnerHtml += a;
                    }
                }

                mainDiv.InnerHtml += spanEllipsis;

                var aLast = new TagBuilder("a");
                aLast.MergeAttributes(new RouteValueDictionary(htmlDefaultBtnAttributes));
                aLast.Attributes.Add("href", String.Format("/{0}/{1}?forumId={2}&page={3}", controlName, actionName, model.ForumId, model.PagesCount));
                aLast.InnerHtml += model.PagesCount.ToString();
                mainDiv.InnerHtml += aLast;
            }
            else
            {
                var aFirst = new TagBuilder("a");
                aFirst.MergeAttributes(new RouteValueDictionary(htmlDefaultBtnAttributes));
                aFirst.Attributes.Add("href", String.Format("/{0}/{1}?forumId={2}&page={3}", controlName, actionName, model.ForumId, 1));
                aFirst.InnerHtml += 1.ToString();
                mainDiv.InnerHtml += aFirst;

                var spanEllipsis = new TagBuilder("span");
                spanEllipsis.SetInnerText(" ... ");
                mainDiv.InnerHtml += spanEllipsis;

                for (var i = model.PagesCount - 8; i <= model.PagesCount; i++)
                {
                    if (i == model.PageNumber)
                    {
                        var span = new TagBuilder("span");
                        span.MergeAttributes(new RouteValueDictionary(htmlSelectedBtnAttributes));
                        span.SetInnerText(i.ToString());
                        mainDiv.InnerHtml += span;
                    }
                    else
                    {
                        var a = new TagBuilder("a");
                        a.MergeAttributes(new RouteValueDictionary(htmlDefaultBtnAttributes));
                        a.Attributes.Add("href", String.Format("/{0}/{1}?forumId={2}&page={3}", controlName, actionName, model.ForumId, i));
                        a.InnerHtml += i.ToString();
                        mainDiv.InnerHtml += a;
                    }
                }
            }
            return MvcHtmlString.Create(mainDiv.ToString());
        }

    }
}