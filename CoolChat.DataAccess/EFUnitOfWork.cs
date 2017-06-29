using CoolChat.DataAccess.EFContext;
using CoolChat.DataAccess.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoolChat.DataAccess
{
    public class EFUnitOfWork : IUnitOfWork
    {
        private ChatContext context;

        public EFUnitOfWork(ChatContext context)
        {
            this.context = context;
        }

        public IRepository<T> Get<T>() where T : class
        {
            return new EFRepository<T>(this.context);
        }

        public void SaveChanges()
        {
            this.context.SaveChanges();
        }
    }
}
