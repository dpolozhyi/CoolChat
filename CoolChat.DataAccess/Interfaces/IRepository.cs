using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace CoolChat.DataAccess.Interfaces
{
    public interface IRepository<T> where T : class
    {
        IEnumerable<T> GetAll();

        IEnumerable<T> Get(Expression<Func<T, bool>> filter = null, Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null, string includeProperties = "", int offset = -1, int limit = 0, Func<IQueryable<T>, IOrderedQueryable<T>> postOrderBy = null);

        T Insert(T item);

        void Update(T item);

        void Delete(T item);
    }
}
