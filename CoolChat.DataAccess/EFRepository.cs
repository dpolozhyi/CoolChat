using CoolChat.DataAccess.EFContext;
using CoolChat.DataAccess.Interfaces;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;

namespace CoolChat.DataAccess
{
    public class EFRepository<T> : IRepository<T> where T : class
    {
        private ChatContext context;

        public EFRepository(ChatContext context)
        {
            this.context = context;
        }

        public IEnumerable<T> GetAll()
        {
            return this.context.Set<T>().ToList();
        }

        public IEnumerable<T> Get(
            Expression<Func<T, bool>> filter = null,
            Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null,
            string includeProperties = "",
            int offset = -1,
            int limit = 0,
            Func<IQueryable<T>, IOrderedQueryable<T>> postOrderBy = null
            )
        {
            IQueryable<T> query = this.context.Set<T>();

            if (filter != null)
            {
                query = query.Where(filter);
            }

            foreach (var includeProperty in includeProperties.Split
               (new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
            {
                query = query.Include(includeProperty);
            }

            if (orderBy != null)
            {
                query = orderBy(query);
            }

            if (offset != -1)
            {
                query = query.Skip(offset).Take(limit);
            }

            if (postOrderBy != null)
            {
                return postOrderBy(query).ToList();
            }
            else
            {
                return query.ToList();
            }
        }

        public T Insert(T item)
        {
            return this.context.Set<T>().Add(item);
        }

        public void Update(T item)
        {
            var entry = this.context.Entry<T>(item);
            entry.State = EntityState.Modified;
        }


        public void Delete(T item)
        {
            var entry = this.context.Entry<T>(item);
            entry.State = EntityState.Deleted;
        }
    }
}
