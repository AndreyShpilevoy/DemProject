using System.Collections.Generic;
using DEM_MVC_BL.Models.ForumModels;

namespace DEM_MVC_BL.Interfaces.IServices
{
    public interface IAppCache
    {
        string BbCodeModels { get; }
        string ConfigModels { get; }

        List<T> Get<T>(string key);
        bool Add<T>(List<T> value, string key, int expirationInMinutes = 20);
        void Update<T>(List<T> value, string key, int expirationInMinutes = 20);
        void Delete(string key);
    }
}