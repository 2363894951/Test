using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL;

namespace BBL
{
    public class ManagerBBL
    {
        public List<mis_manager> GetManagerList(int pageIndex,int limit,string name)
        {
            return new ManagerDAL().GetManagerList(pageIndex,limit,name);
        }
        public List<mis_manager> GetManagerList(int pageIndex,int limit)
        {
            return new ManagerDAL().GetManagerList(pageIndex,limit);
        }

        public int AddManagerInfo(mis_manager misManager)
        {
            return new ManagerDAL().AddManagerInfo(misManager);
        }

        public int GetManagerCount()
        {
            return new ManagerDAL().GetManagerCount();
        }
        public int GetManagerCount(string name)
        {
            return new ManagerDAL().GetManagerCount(name);
        }
    }
}
