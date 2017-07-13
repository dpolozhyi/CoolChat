using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace CoolChat.DataAccess.Interfaces
{
    public interface IRepository<T> where T : class
    {
        IEnumerable<T> GetAll();

        IEnumerable<T> Get(Expression<Func<T, bool>> filter = null, Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null, string includeProperties = "");

        T Insert(T item);

        void Update(T item);

        void Delete(T item);
    }
}
