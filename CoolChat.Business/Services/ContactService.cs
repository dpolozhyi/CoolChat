using CoolChat.Business.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CoolChat.Business.ViewModels;
using CoolChat.DataAccess.Interfaces;
using CoolChat.Entities;
using AutoMapper;

namespace CoolChat.Business.Services
{
    public class ContactService : IContactService
    {
        private IUnitOfWork unitOfWork;

        public ContactService(IUnitOfWork uow)
        {
            this.unitOfWork = uow;
        }

        public IEnumerable<UserViewModel> GetContactsList(string filter = "", int offset = -1, int limit = 0)
        {
            IEnumerable<User> contacts;
            if (String.IsNullOrEmpty(filter))
            {
                contacts = this.unitOfWork.Get<User>().Get();
            }
            else
            {
                contacts = this.unitOfWork.Get<User>().Get(n => n.Name.Contains(filter));
            }
            return Mapper.Map<IEnumerable<User>, IEnumerable<UserViewModel>>(contacts);
        }
    }
}
