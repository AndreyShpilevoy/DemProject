﻿using System.Collections.Generic;
using DEM_MVC_BL.Models;
using DEM_MVC_BL.Models.ForumModels;

namespace DEM_MVC_BL.Interfaces.IServices.IModelsHelpers
{
    public interface IForumModelHelper
    {
        List<ForumTableViewModel> TransformToHierarchy(List<ForumTableViewModel> forumModels);

        ForumTableViewModel GetGorumTreeById(List<ForumTableViewModel> forumModels, int forumId);
    }
}