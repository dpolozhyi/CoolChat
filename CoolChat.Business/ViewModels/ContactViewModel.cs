﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoolChat.Business.ViewModels
{
    public class ContactViewModel
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string AvatarUrl { get; set; }

        public bool IsAdded { get; set; }
    }
}
