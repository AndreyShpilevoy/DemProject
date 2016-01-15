﻿using System;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Web.Mvc;
using System.Web.Routing;
using DEM_MVC_BL.Interfaces.IServices.IModelsHelpers;
using DEM_MVC_BL.Models.ForumModels;
using Microsoft.Practices.ServiceLocation;

namespace DEM_MVC.Services.HtmlHelpers
{
    public static class PagingHtmlHelpers
    {
        public static MvcHtmlString PostPagingForViewTopic(this HtmlHelper helper, TopicInfoViewModel model,
            string actionName, string controlName)
        {
            return PostPagingForViewTopic(helper, model, actionName, controlName, null);
        }

        public static MvcHtmlString PostPagingForViewTopic(this HtmlHelper helper, TopicInfoViewModel model,
           string actionName, string controlName, object htmlDefaultBtnAttributes)
        {
            return PostPagingForViewTopic(helper, model, actionName, controlName, htmlDefaultBtnAttributes, null);
        }


        public static MvcHtmlString PostPagingForViewTopic(this HtmlHelper helper, TopicInfoViewModel model, 
            string actionName, string controlName, object htmlDefaultBtnAttributes, object htmlSelectedBtnAttributes)
        {

            var mainDiv = new TagBuilder("div");

            var spanInfo = new TagBuilder("span");
            spanInfo.SetInnerText(String.Format("Сообщений: {0} • Страница {1} из {2} ", model.PostsCount, model.PageNumber, model.PagesCount));
            mainDiv.InnerHtml += spanInfo;
            var stringBuilder = new StringBuilder();

            if (model.PagesCount <= 10)
            {
                for (var i = 1; i <= model.PagesCount; i++)
                {
                    if (i == model.PageNumber)
                    {
                        var span = new TagBuilder("span");
                        span.MergeAttributes(new RouteValueDictionary(htmlSelectedBtnAttributes));
                        span.SetInnerText(i.ToString());

                        stringBuilder.Append(span);
                    }
                    else
                    {
                        var a = new TagBuilder("a");
                        a.MergeAttributes(new RouteValueDictionary(htmlDefaultBtnAttributes));
                        a.Attributes.Add("href", String.Format("/{0}/{1}?topicId={2}&page={3}", controlName, actionName, model.TopicId, i));
                        a.InnerHtml = i.ToString();

                        stringBuilder.Append(a);
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

                        stringBuilder.Append(span);
                    }
                    else
                    {
                        var a = new TagBuilder("a");
                        a.MergeAttributes(new RouteValueDictionary(htmlDefaultBtnAttributes));
                        a.Attributes.Add("href", String.Format("/{0}/{1}?topicId={2}&page={3}", controlName, actionName, model.TopicId, i));
                        a.InnerHtml = i.ToString();

                        stringBuilder.Append(a);
                    }
                }

                var spanEllipsis = new TagBuilder("span");
                spanEllipsis.SetInnerText(" ... ");
                stringBuilder.Append(spanEllipsis);

                var aLast = new TagBuilder("a");
                aLast.MergeAttributes(new RouteValueDictionary(htmlDefaultBtnAttributes));
                aLast.Attributes.Add("href", String.Format("/{0}/{1}?topicId={2}&page={3}", controlName, actionName, model.TopicId, model.PagesCount));
                aLast.InnerHtml += model.PagesCount.ToString();
                stringBuilder.Append(aLast);
            }
            else if (model.PageNumber >= 7 && model.PageNumber <= model.PagesCount - 6)
            {
                var aFirst = new TagBuilder("a");
                aFirst.MergeAttributes(new RouteValueDictionary(htmlDefaultBtnAttributes));
                aFirst.Attributes.Add("href", String.Format("/{0}/{1}?topicId={2}&page={3}", controlName, actionName, model.TopicId, 1));
                aFirst.InnerHtml += 1.ToString();
                stringBuilder.Append(aFirst);

                var spanEllipsis = new TagBuilder("span");
                spanEllipsis.SetInnerText(" ... ");
                stringBuilder.Append(spanEllipsis);

                for (var i = model.PageNumber - 3; i <= model.PageNumber + 3; i++)
                {
                    if (i == model.PageNumber)
                    {
                        var span = new TagBuilder("span");
                        span.MergeAttributes(new RouteValueDictionary(htmlSelectedBtnAttributes));
                        span.SetInnerText(i.ToString());

                        stringBuilder.Append(span);
                    }
                    else
                    {
                        var a = new TagBuilder("a");
                        a.MergeAttributes(new RouteValueDictionary(htmlDefaultBtnAttributes));
                        a.Attributes.Add("href", String.Format("/{0}/{1}?topicId={2}&page={3}", controlName, actionName, model.TopicId, i));
                        a.InnerHtml = i.ToString();

                        stringBuilder.Append(a);
                    }
                }

                stringBuilder.Append(spanEllipsis);

                var aLast = new TagBuilder("a");
                aLast.MergeAttributes(new RouteValueDictionary(htmlDefaultBtnAttributes));
                aLast.Attributes.Add("href", String.Format("/{0}/{1}?topicId={2}&page={3}", controlName, actionName, model.TopicId, model.PagesCount));
                aLast.InnerHtml += model.PagesCount.ToString();
                stringBuilder.Append(aLast);
            }
            else
            {
                var aFirst = new TagBuilder("a");
                aFirst.MergeAttributes(new RouteValueDictionary(htmlDefaultBtnAttributes));
                aFirst.Attributes.Add("href", String.Format("/{0}/{1}?topicId={2}&page={3}", controlName, actionName, model.TopicId, 1));
                aFirst.InnerHtml += 1.ToString();
                stringBuilder.Append(aFirst);

                var spanEllipsis = new TagBuilder("span");
                spanEllipsis.SetInnerText(" ... ");
                stringBuilder.Append(spanEllipsis);

                for (var i = model.PagesCount - 8; i <= model.PagesCount; i++)
                {
                    if (i == model.PageNumber)
                    {
                        var span = new TagBuilder("span");
                        span.MergeAttributes(new RouteValueDictionary(htmlSelectedBtnAttributes));
                        span.SetInnerText(i.ToString());

                        stringBuilder.Append(span);
                    }
                    else
                    {
                        var a = new TagBuilder("a");
                        a.MergeAttributes(new RouteValueDictionary(htmlDefaultBtnAttributes));
                        a.Attributes.Add("href", String.Format("/{0}/{1}?topicId={2}&page={3}", controlName, actionName, model.TopicId, i));
                        a.InnerHtml = i.ToString();

                        stringBuilder.Append(a);
                    }
                }
            }
            mainDiv.InnerHtml += stringBuilder.ToString();

            return MvcHtmlString.Create(mainDiv.ToString());
        }

        public static MvcHtmlString PostPagingForViewForum(this HtmlHelper helper, TopicTableViewModel model,
            string actionName, string controlName)
        {
            return PostPagingForViewForum(helper, model, actionName, controlName, null);
        }

        public static MvcHtmlString PostPagingForViewForum(this HtmlHelper helper, TopicTableViewModel model, 
            string actionName, string controlName, object htmlDefaultBtnAttributes)
        {

            var mainDiv = new TagBuilder("div");
            var stringBuilder = new StringBuilder();

            if (model.PagesCount > 1 && model.PagesCount <= 5)
            {
                for (var i = 1; i <= model.PagesCount; i++)
                {
                    var a = new TagBuilder("a");
                    a.MergeAttributes(new RouteValueDictionary(htmlDefaultBtnAttributes));
                    a.Attributes.Add("href", String.Format("/{0}/{1}?topicId={2}&page={3}", controlName, actionName, model.TopicId, i));
                    a.InnerHtml = i.ToString();

                    stringBuilder.Append(a);

                }
            }
            else if (model.PagesCount > 1)
            {
                var aFirst = new TagBuilder("a");
                aFirst.MergeAttributes(new RouteValueDictionary(htmlDefaultBtnAttributes));
                aFirst.Attributes.Add("href", String.Format("/{0}/{1}?topicId={2}&page={3}", controlName, actionName, model.TopicId, 1));
                aFirst.InnerHtml += 1.ToString();
                stringBuilder.Append(aFirst);

                var spanEllipsis = new TagBuilder("span");
                spanEllipsis.SetInnerText(" ... ");
                stringBuilder.Append(spanEllipsis);

                for (var i = model.PagesCount - 2; i <= model.PagesCount; i++)
                {
                    var a = new TagBuilder("a");
                    a.MergeAttributes(new RouteValueDictionary(htmlDefaultBtnAttributes));
                    a.Attributes.Add("href", String.Format("/{0}/{1}?topicId={2}&page={3}", controlName, actionName, model.TopicId, i));
                    a.InnerHtml = i.ToString();

                    stringBuilder.Append(a);
                }
            }
            mainDiv.InnerHtml += stringBuilder.ToString();
            return MvcHtmlString.Create(mainDiv.ToString());
        }

        public static MvcHtmlString TopicPagingForViewForum(this HtmlHelper helper, ForumInfoViewModel model,
            string actionName, string controlName)
        {
            return TopicPagingForViewForum(helper, model, actionName, controlName, null);
        }

        public static MvcHtmlString TopicPagingForViewForum(this HtmlHelper helper, ForumInfoViewModel model,
            string actionName, string controlName, object htmlDefaultBtnAttributes)
        {
            return TopicPagingForViewForum(helper, model, actionName, controlName, htmlDefaultBtnAttributes, null);
        }

        public static MvcHtmlString TopicPagingForViewForum(this HtmlHelper helper, ForumInfoViewModel model, 
            string actionName, string controlName, object htmlDefaultBtnAttributes, object htmlSelectedBtnAttributes)
        {

            var mainDiv = new TagBuilder("div");
            var stringBuilder = new StringBuilder();

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
                        stringBuilder.Append(span);
                    }
                    else
                    {
                        var a = new TagBuilder("a");
                        a.MergeAttributes(new RouteValueDictionary(htmlDefaultBtnAttributes));
                        a.Attributes.Add("href", String.Format("/{0}/{1}?forumId={2}&page={3}", controlName, actionName, model.ForumId, i));
                        a.InnerHtml = i.ToString();
                        stringBuilder.Append(a);
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
                        stringBuilder.Append(span);
                    }
                    else
                    {
                        var a = new TagBuilder("a");
                        a.MergeAttributes(new RouteValueDictionary(htmlDefaultBtnAttributes));
                        a.Attributes.Add("href", String.Format("/{0}/{1}?forumId={2}&page={3}", controlName, actionName, model.ForumId, i));
                        a.InnerHtml = i.ToString();
                        stringBuilder.Append(a);
                    }
                }

                var spanEllipsis = new TagBuilder("span");
                spanEllipsis.SetInnerText(" ... ");
                stringBuilder.Append(spanEllipsis);

                var aLast = new TagBuilder("a");
                aLast.MergeAttributes(new RouteValueDictionary(htmlDefaultBtnAttributes));
                aLast.Attributes.Add("href", String.Format("/{0}/{1}?forumId={2}&page={3}", controlName, actionName, model.ForumId, model.PagesCount));
                aLast.InnerHtml += model.PagesCount.ToString();
                stringBuilder.Append(aLast);
            }
            else if (model.PageNumber >= 7 && model.PageNumber <= model.PagesCount - 6)
            {
                var aFirst = new TagBuilder("a");
                aFirst.MergeAttributes(new RouteValueDictionary(htmlDefaultBtnAttributes));
                aFirst.Attributes.Add("href", String.Format("/{0}/{1}?forumId={2}&page={3}", controlName, actionName, model.ForumId, 1));
                aFirst.InnerHtml += 1.ToString();
                stringBuilder.Append(aFirst);

                var spanEllipsis = new TagBuilder("span");
                spanEllipsis.SetInnerText(" ... ");
                stringBuilder.Append(spanEllipsis);

                for (var i = model.PageNumber - 3; i <= model.PageNumber + 3; i++)
                {
                    if (i == model.PageNumber)
                    {
                        var span = new TagBuilder("span");
                        span.MergeAttributes(new RouteValueDictionary(htmlSelectedBtnAttributes));
                        span.SetInnerText(i.ToString());
                        stringBuilder.Append(span);
                    }
                    else
                    {
                        var a = new TagBuilder("a");
                        a.MergeAttributes(new RouteValueDictionary(htmlDefaultBtnAttributes));
                        a.Attributes.Add("href", String.Format("/{0}/{1}?forumId={2}&page={3}", controlName, actionName, model.ForumId, i));
                        a.InnerHtml = i.ToString();
                        stringBuilder.Append(a);
                    }
                }

                stringBuilder.Append(spanEllipsis);

                var aLast = new TagBuilder("a");
                aLast.MergeAttributes(new RouteValueDictionary(htmlDefaultBtnAttributes));
                aLast.Attributes.Add("href", String.Format("/{0}/{1}?forumId={2}&page={3}", controlName, actionName, model.ForumId, model.PagesCount));
                aLast.InnerHtml += model.PagesCount.ToString();
                stringBuilder.Append(aLast);
            }
            else
            {
                var aFirst = new TagBuilder("a");
                aFirst.MergeAttributes(new RouteValueDictionary(htmlDefaultBtnAttributes));
                aFirst.Attributes.Add("href", String.Format("/{0}/{1}?forumId={2}&page={3}", controlName, actionName, model.ForumId, 1));
                aFirst.InnerHtml += 1.ToString();
                stringBuilder.Append(aFirst);

                var spanEllipsis = new TagBuilder("span");
                spanEllipsis.SetInnerText(" ... ");
                stringBuilder.Append(spanEllipsis);

                for (var i = model.PagesCount - 8; i <= model.PagesCount; i++)
                {
                    if (i == model.PageNumber)
                    {
                        var span = new TagBuilder("span");
                        span.MergeAttributes(new RouteValueDictionary(htmlSelectedBtnAttributes));
                        span.SetInnerText(i.ToString());
                        stringBuilder.Append(span);
                    }
                    else
                    {
                        var a = new TagBuilder("a");
                        a.MergeAttributes(new RouteValueDictionary(htmlDefaultBtnAttributes));
                        a.Attributes.Add("href", String.Format("/{0}/{1}?forumId={2}&page={3}", controlName, actionName, model.ForumId, i));
                        a.InnerHtml = i.ToString();
                        stringBuilder.Append(a);
                    }
                }
            }
            mainDiv.InnerHtml += stringBuilder.ToString();
            return MvcHtmlString.Create(mainDiv.ToString());
        }
    }
}