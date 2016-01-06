using NLog;

namespace DEM_MVC_Infrastructure.Interfaces.IServices
{
    public interface ILoggerFactory
    {
        ILogger CreateLogger();
    }
}