﻿using System;
using System.Collections.Generic;

namespace CoolChat.Entities
{
    public class User
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string AvatarUrl { get; set; }

        public bool IsOnline { get; set; }

        public DateTime LastTimeActivity { get; set; }

        public ICollection<Dialog> Dialogs { get; set; }
    }
}
