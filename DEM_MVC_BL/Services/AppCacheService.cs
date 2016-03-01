using System;
using System.Collections.Generic;
using System.Runtime.Caching;
using DEM_MVC_BL.Interfaces.IServices;

namespace DEM_MVC_BL.Services
{
    public class AppCacheService : IAppCacheService
    {
        public List<T> Get<T>(string key)
        {
            MemoryCache memoryCache = MemoryCache.Default;
            return memoryCache.Get(key) as List<T>;
        }

        public Dictionary<T, TT> Get<T, TT>(string key)
        {
            MemoryCache memoryCache = MemoryCache.Default;
            return memoryCache.Get(key) as Dictionary<T, TT>;
        }

        public bool Add<T>(List<T> value, string key)
        {
            return Add(value, key, 20);
        }

        public bool Add<T, TT>(Dictionary<T, TT> value, string key)
        {
            return Add(value, key, 20);
        }

        public bool Add<T>(List<T> value, string key, int expirationInMinutes)
        {
            MemoryCache memoryCache = MemoryCache.Default;
            return memoryCache.Add(key, value, DateTime.Now.AddMinutes(expirationInMinutes));
        }

        public bool Add<T, TT>(Dictionary<T, TT> value, string key, int expirationInMinutes)
        {
            MemoryCache memoryCache = MemoryCache.Default;
            return memoryCache.Add(key, value, DateTime.Now.AddMinutes(expirationInMinutes));
        }

        public void Update<T>(List<T> value, string key)
        {
            Update(value, key, 20);
        }

        public void Update<T, TT>(Dictionary<T, TT> value, string key)
        {
            Update(value, key, 20);
        }

        public void Update<T>(List<T> value, string key, int expirationInMinutes)
        {
            MemoryCache memoryCache = MemoryCache.Default;
            memoryCache.Set(key, value, DateTime.Now.AddMinutes(expirationInMinutes));
        }

        public void Update<T, TT>(Dictionary<T, TT> value, string key, int expirationInMinutes)
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