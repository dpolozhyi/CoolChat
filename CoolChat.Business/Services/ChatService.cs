using CoolChat.Business.Interfaces;
using System.Collections.Generic;
using System.Linq;
using CoolChat.Entities;
using CoolChat.DataAccess.Interfaces;
using CoolChat.DataAccess.Extensions;
using CoolChat.Business.ViewModels;
using AutoMapper;

namespace CoolChat.Business.Services
{
    public class ChatService
    {
        private IUnitOfWork unitOfWork;

        public ChatService(IUnitOfWork uow)
        {
            this.unitOfWork = uow;
        }
    }
}
