using System;
using System.Data;
using DEM_MVC_DAL.Interfaces.IRepositories;
using DEM_MVC_DAL.Interfaces.IUnitOfWork;
using DEM_MVC_Infrastructure.Models;
using Microsoft.Practices.ServiceLocation;
using NLog;

namespace DEM_MVC_DAL.Repositories
{
    public class ConfigRepository: IConfigRepository
    {
        public DataTable GetAllConfigs(IUnitOfWork unitOfWork)
        {
            DataTable dataTable = new DataTable();
            try
            {
                using (var cmd = unitOfWork.CreateCommand())
                {
                    cmd.CommandText = "GetAllConfigs";
                    cmd.CommandType = CommandType.StoredProcedure;
                    
                    var dataReader = cmd.ExecuteReader();
                    dataTable.Load(dataReader);
                    dataReader.Close();
                }
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, "ConfigEntityRepository. Error in function GetAllConfig");
            }
            return dataTable;
        }
    }
}