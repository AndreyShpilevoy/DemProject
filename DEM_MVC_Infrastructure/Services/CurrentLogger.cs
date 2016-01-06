using System;
using DEM_MVC_DAL.Interfaces.IServices;
using NLog;

namespace DEM_MVC_DAL.Services
{
    public class CurrentLogger : ICurrentLogger
    {
        private Logger NLog { get; set; }

        public CurrentLogger()
        {
            NLog = LogManager.GetCurrentClassLogger();
        }

        public void Error(Exception exception, string message)
        {
            NLog.Error(exception, message);
        }
    }
}
