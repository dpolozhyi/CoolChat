using CoolChat.Business.Interfaces;
using CoolChat.DataAccess.Interfaces;
using CoolChat.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoolChat.Business.Services
{
    public class UserService : IUserService
    {
        private IUnitOfWork unitOfWork;

        public UserService(IUnitOfWork uow)
        {
            this.unitOfWork = uow;
        }

        public User AddNewUser(User user)
        {
            var addedUser = this.unitOfWork.Get<User>().Insert(user);
            this.unitOfWork.SaveChanges();
            return addedUser;
        }
    }
}
