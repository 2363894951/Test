using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BBL;
using DAL;

namespace Web.Controllers
{
    public class ManagerController : Controller, System.Web.SessionState.IRequiresSessionState
    {
        // GET: Manager
        public ActionResult Manager()
        {
            
            if (Session["toke"] == null)
            {
              return  Redirect("~/Login/Login");
            }
            return View();
        }
        public ActionResult AddManager()
        {
            return View();
        }


        public JsonResult FindManageList(int page, int limit ,string name)
        {
            List<mis_manager> list;
            int count;
            if (name != null)
            {
                 count=new  ManagerBBL().GetManagerCount(name);
                    list = new ManagerBBL().GetManagerList(page,limit,name);

            }
            else
            {
                count =new  ManagerBBL().GetManagerCount();
                list = new ManagerBBL().GetManagerList(page,limit);
            }

            List<manager> dlist = new List<manager>();
            foreach (var v in list) 
            {
                manager manager = new manager();
                manager.id = v.id;
                manager.name = v.name;
                manager.addres = v.addres;
                manager.phone = v.phone;
                manager.subject = v.subject;
                manager.@class = v.@class;
                manager.logDate = v.logDate.ToString();

                dlist.Add(manager);

            }
            Dictionary<string, object> dir = new Dictionary<string, object>();
                dir.Add("code", 0);
                dir.Add("msg", "");
                dir.Add("count", count);
                dir.Add("data", dlist);
                return Json(dir, JsonRequestBehavior.AllowGet);
            
        }

        public JsonResult AddManagerInfo(mis_manager misManager)
        {
            int r=new ManagerBBL().AddManagerInfo(misManager);
            if (r >= 1)
            {
                return Json(true, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
        

    }
}