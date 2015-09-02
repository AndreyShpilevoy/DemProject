using System.Configuration;
using System.Data.SqlClient;
using DEM_MVC_DAL.Interfaces.IUnitOfWork;

namespace DEM_MVC_DAL.UnitOfWork
{
    public class UnitOfWorkFactory : IUnitOfWorkFactory
    {
        private readonly string _connectionString;

        public UnitOfWorkFactory(string connectionString)
        {
            _connectionString = connectionString;
        }
        public IUnitOfWork Create()
        {
            var connection = new SqlConnection(_connectionString);
            connection.Open();

            return new UnitOfWork(connection);
        }
    }
}