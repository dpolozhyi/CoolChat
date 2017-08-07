using AutoMapper;
using CoolChat.Business.Interfaces;
using CoolChat.Business.ViewModels;
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

        public UserViewModel GetUser(int userId)
        {
            User user = this.unitOfWork.Get<User>().Get(n => n.Id == userId).FirstOrDefault();
            return Mapper.Map<User, UserViewModel>(user);
        }
    }
}
