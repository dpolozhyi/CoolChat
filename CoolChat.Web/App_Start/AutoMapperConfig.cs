using AutoMapper;
using CoolChat.Business.ViewModels;
using CoolChat.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CoolChat.Web.App_Start
{
    public class AutoMapperConfig
    {
        public static void RegisterMappings()
        {
            Mapper.Initialize(
            config =>
            {
                config.CreateMap<Dialog, BriefDialogViewModel>()
                    .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                    .ForMember(dest => dest.LastMessage, opt => opt.MapFrom(src => src.Messages.OrderByDescending(n => n.PostedTime).FirstOrDefault()))
                    .ForMember(dest => dest.Members, opt => opt.MapFrom(src => src.Members))
                    .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                    .ForMember(dest => dest.NewMessagesNumber, opt => opt.MapFrom(src => src.Messages.Count(n => !n.IsReaded)))
                    .ForMember(dest => dest.TimeCreated, opt => opt.MapFrom(src => src.TimeCreated));

                config.CreateMap<User, UserAccountViewModel>()
                    .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                    .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                    .ForMember(dest => dest.AvatarUrl, opt => opt.MapFrom(src => src.AvatarUrl))
                    .ForMember(dest => dest.IsOnline, opt => opt.MapFrom(src => src.IsOnline))
                    .ForMember(dest => dest.LastTimeActivity, opt => opt.MapFrom(src => src.LastTimeActivity));

                config.CreateMap<User, UserViewModel>()
                    .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                    .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                    .ForMember(dest => dest.AvatarUrl, opt => opt.MapFrom(src => src.AvatarUrl))
                    .ForMember(dest => dest.IsOnline, opt => opt.MapFrom(src => src.IsOnline))
                    .ForMember(dest => dest.LastTimeActivity, opt => opt.MapFrom(src => src.LastTimeActivity));

                config.CreateMap<Message, MessageViewModel>()
                    .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                    .ForMember(dest => dest.User, opt => opt.MapFrom(src => src.User))
                    .ForMember(dest => dest.Body, opt => opt.MapFrom(src => src.Body))
                    .ForMember(dest => dest.DialogId, opt => opt.MapFrom(src => src.Dialog.Id))
                    .ForMember(dest => dest.IsReaded, opt => opt.MapFrom(src => src.IsReaded))
                    .ForMember(dest => dest.PostedTime, opt => opt.MapFrom(src => src.PostedTime));
            });
        }
    }
}