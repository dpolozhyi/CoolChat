using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace CoolChat.DataAccess.Extensions
{
    public static class DataAccessExtensions
    {
        public static string GetReferencePropertiesString(this Type type)
        {
            IList<string> navigationProperties = new List<string>();
            PropertyInfo[] properties = type.GetProperties();
            foreach(var prop in properties)
            {
                if(prop.PropertyType.IsAbstract || (prop.PropertyType.IsClass && prop.PropertyType != typeof(string)))
                {
                    navigationProperties.Add(prop.Name);
                }
            }
            int len = navigationProperties.Count;
            StringBuilder include = new StringBuilder();
            for (int i=0; i < len; i++)
            {
                include.Append(navigationProperties[i]);
                if(i < len-1)
                {
                    include.Append(", ");
                }
            }
            return include.ToString();
        }
    }
}
