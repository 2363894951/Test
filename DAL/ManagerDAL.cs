using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
   public class ManagerDAL
    {
        public List<mis_manager> GetManagerList(int pageIndex ,int pageSize,string name)
        {            helpsEntities helps = new helpsEntities();

            
            string     sql = "declare @pagesize int declare @pageindex int set @pageindex="+pageIndex+" set @pagesize="+pageSize+" select* from(select ROW_NUMBER() OVER(ORDER BY ID) as num,*from[mis_manager] where name='"+name+"') temp where num between @pageIndex* @pagesize-(@pageSize - 1) and @pageIndex*@pageSize";

            
            return helps.mis_manager.SqlQuery(sql).ToList();
        }
        public List<mis_manager> GetManagerList(int pageIndex ,int pageSize)
        {            helpsEntities helps = new helpsEntities();

            
            string     sql = "declare @pagesize int declare @pageindex int set @pageindex="+pageIndex+" set @pagesize="+pageSize+" select* from(select ROW_NUMBER() OVER(ORDER BY ID) as num,*from[mis_manager]) temp where num between @pageIndex* @pagesize-(@pageSize - 1) and @pageIndex*@pageSize";

            
            return helps.mis_manager.SqlQuery(sql).ToList();
        }
        public int AddManagerInfo(mis_manager misManager)
        {
            helpsEntities helps = new helpsEntities();
            helps.mis_manager.Add(misManager);
            helps.SaveChanges();
            return 1;
        }

        public int GetManagerCount()
        {
            helpsEntities helps = new helpsEntities();

            return helps.mis_manager.Count();
        }
        public int GetManagerCount(string name)
        {
            helpsEntities helps = new helpsEntities();

            return helps.mis_manager.Where(c=>c.name==name).Count();
        }
    }
}
