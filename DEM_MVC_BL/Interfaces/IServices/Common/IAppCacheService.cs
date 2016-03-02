using System.Collections.Generic;

namespace DEM_MVC_BL.Interfaces.IServices.Common
{
    public interface IAppCacheService
    {
        List<T> Get<T>(string key);
        Dictionary<T,TT> Get<T, TT>(string key);

        bool Add<T>(List<T> value, string key);
        bool Add<T, TT>(Dictionary<T, TT> value, string key);

        bool Add<T>(List<T> value, string key, int expirationInMinutes);
        bool Add<T, TT>(Dictionary<T, TT> value, string key, int expirationInMinutes);

        void Update<T>(List<T> value, string key);
        void Update<T, TT>(Dictionary<T, TT> value, string key);

        void Update<T>(List<T> value, string key, int expirationInMinutes);
        void Update<T, TT>(Dictionary<T, TT> value, string key, int expirationInMinutes);

        void Delete(string key);
    }
}