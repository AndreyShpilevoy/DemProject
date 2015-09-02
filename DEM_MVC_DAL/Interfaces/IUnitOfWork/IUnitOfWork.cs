using System;
using System.Data;

namespace DEM_MVC_DAL.Interfaces.IUnitOfWork
{
    public interface IUnitOfWork : IDisposable
    {
        IDbCommand CreateCommand();
        void Save();
    }
}