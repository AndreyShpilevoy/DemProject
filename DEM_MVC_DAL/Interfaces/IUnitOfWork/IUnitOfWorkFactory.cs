namespace DEM_MVC_DAL.Interfaces.IUnitOfWork
{
    public interface IUnitOfWorkFactory
    {
        IUnitOfWork Create();
    }
}