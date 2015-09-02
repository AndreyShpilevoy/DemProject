using DEM_MVC_Infrastructure.Interfaces.IServices;
using NLog;

namespace DEM_MVC_Infrastructure.Services
{
    public class LoggerFactory : ILoggerFactory
    {
        public ILogger CreateLogger()
        {
            return LogManager.GetCurrentClassLogger();
        }
    }
}