using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CoolChat.AuthService.Models
{
    public class Header
    {
        [JsonProperty("alg")]
        public string Algorithm { get; set; }

        [JsonProperty("typ")]
        public string Type { get; set; }
    }

    public class Payload
    {
        [JsonProperty("id")]
        public string Id { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("exp")]
        public long Expires { get; set; }
    }

    public class TokenModel
    {
    }
}