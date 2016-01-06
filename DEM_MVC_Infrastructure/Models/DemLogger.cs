using DEM_MVC_Infrastructure.Interfaces.IServices;
using Microsoft.Practices.ServiceLocation;
using NLog;

namespace DEM_MVC_Infrastructure.Models
{
    public static class DemLogger
    {
        private static ILogger _current;
        public static ILogger Current
        {
            get {return _current ?? (_current = ServiceLocator.Current.GetInstance<ILoggerFactory>().CreateLogger());}
        }
    }
}