namespace CoolChat.DataAccess.Interfaces
{
    public interface IUnitOfWork
    {
        IRepository<T> Get<T>() where T : class;

        void SaveChanges();
    }
}
