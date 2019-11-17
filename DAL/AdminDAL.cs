using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class AdminDAL
    {
        public int LoginCheck(admin admin)
        {
            helpsEntities helps = new helpsEntities();
            List<admin> list = helps.admin.Where(u => u.username == admin.username && u.password == admin.password).ToList();
            if (list.Count >= 1)
            {
                return list.Count;
            }
            else 
            {
                return -1;
            }

        }
    }
}
