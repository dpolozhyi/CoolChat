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
            /*Mapper.Initialize(
            config =>
            {
                config.CreateMap<ChatRoom, ChatRoomViewModel>()
                    .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                    .ForMember(dest => dest.IsActive, opt => opt.MapFrom(src => src.IsActive))
                    .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                    .ForMember(dest => dest.CreatedTime, opt => opt.MapFrom(src => src.CreatedTime))
                    .ForMember(dest => dest.ClosedTime, opt => opt.MapFrom(src => src.ClosedTime))
                    .ForMember(dest => dest.Messages, opt => opt.MapFrom(src => src.Messages));

                config.CreateMap<Message, MessageViewModel>()
                    .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                    .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.UserName))
                    .ForMember(dest => dest.Body, opt => opt.MapFrom(src => src.Body))
                    .ForMember(dest => dest.PostedTime, opt => opt.MapFrom(src => src.PostedTime));

                config.CreateMap<MessageViewModel, Message>()
                    .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                    .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.UserName))
                    .ForMember(dest => dest.Body, opt => opt.MapFrom(src => src.Body))
                    .ForMember(dest => dest.PostedTime, opt => opt.MapFrom(src => src.PostedTime));
            });*/
        }
    }
}