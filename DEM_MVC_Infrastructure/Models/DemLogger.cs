﻿using System.Runtime.CompilerServices;
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
            get
            {
                if (_current != null)
                    return _current;

                _current = ServiceLocator.Current.GetInstance<ILoggerFactory>().CreateLogger();
                return _current;
            }
        }

        public static string GetCallerInfo([CallerMemberName] string callerName = "", [CallerLineNumber] int lineNumber = 0)
        {
            return $"{callerName} on line #{lineNumber}";
        }
    }
}