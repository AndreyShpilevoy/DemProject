using System.Collections.Generic;

namespace DEM_MVC_BL.Interfaces.IServices
{
    public interface IAppCache
    {
        List<T> Get<T>(string key);
        bool Add<T>(List<T> value, string key);
        bool Add<T>(List<T> value, string key, int expirationInMinutes);
        void Update<T>(List<T> value, string key);
        void Update<T>(List<T> value, string key, int expirationInMinutes);
        void Delete(string key);
    }
}