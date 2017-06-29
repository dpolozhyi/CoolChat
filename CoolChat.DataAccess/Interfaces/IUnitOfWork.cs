using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoolChat.DataAccess.Interfaces
{
    public interface IUnitOfWork
    {
        IRepository<T> Get<T>() where T : class;

        void SaveChanges();
    }
}
