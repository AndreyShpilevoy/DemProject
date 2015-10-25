using System.Data;
using System.Data.SqlClient;
using DEM_MVC_DAL.Interfaces.IUnitOfWork;

namespace DEM_MVC_DAL.UnitOfWork
{
    public class ConnectionFactory : IConnectionFactory
    {
        private readonly string _connectionString;

        public ConnectionFactory(string connectionString)
        {
            _connectionString = connectionString;
        }

        public virtual IDbConnection Create()
        {
            var connection = new SqlConnection(_connectionString);
            connection.Open();

            return connection;
        }
    }
}