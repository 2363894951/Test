using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using DAL;
using BBL;
namespace Web.Controllers
{
    public class LoginController : Controller, System.Web.SessionState.IRequiresSessionState
    {
        // GET: Login
        public ActionResult Login()
        {
            return View();
        }

        public void LoginCheck(admin admin)
        {
            int r = new AdminBBL().LoginCheck(admin);
            if (r >= 1)
            {
                Session.Add("toke", true);
                Response.Redirect("~/Manager/Manager");
            }
            else 
            {
   
                Response.Write("用户或密码错误");
            }
        }
    }
}