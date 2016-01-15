using System;
using System.Collections.Generic;
using System.Runtime.Caching;
using DEM_MVC_BL.Interfaces.IServices;
using DEM_MVC_BL.Models.ForumModels;

namespace DEM_MVC_BL.Services
{
    public class AppCache : IAppCache
    {
        public string BbCodeModels => "BbCodeModels";
        public string ConfigModels => "ConfigModels";

        public List<T> Get<T>(string key)
        {
            MemoryCache memoryCache = MemoryCache.Default;
            return memoryCache.Get(key) as List<T>;
        }

        public bool Add<T>(List<T> value, string key)
        {
            return Add(value, key, 20);
        }

        public bool Add<T>(List<T> value, string key, int expirationInMinutes)
        {
            MemoryCache memoryCache = MemoryCache.Default;
            return memoryCache.Add(key, value, DateTime.Now.AddMinutes(expirationInMinutes));
        }

        public void Update<T>(List<T> value, string key)
        {
            Update(value, key, 20);
        }

        public void Update<T>(List<T> value, string key, int expirationInMinutes)
        {
            MemoryCache memoryCache = MemoryCache.Default;
            memoryCache.Set(key, value, DateTime.Now.AddMinutes(expirationInMinutes));
        }

        public void Delete(string key)
        {
            MemoryCache memoryCache = MemoryCache.Default;
            if (memoryCache.Contains(key))
            {
                memoryCache.Remove(key);
            }
        }
        
    }
}