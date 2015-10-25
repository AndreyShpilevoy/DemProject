using System;
using System.Data;

namespace DEM_MVC_DAL.Interfaces.IUnitOfWork
{
    public interface IUnitOfWork : IDisposable
    {
        IDbTransaction Transaction { get; }
        IDbConnection ReturnConnection();
        IDbCommand CreateCommand();
        void Save();
    }
}