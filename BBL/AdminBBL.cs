﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL;

namespace BBL
{
    public class AdminBBL
    {
        public int LoginCheck(admin admin)
        {
            return new AdminDAL().LoginCheck(admin);
        }
    }
}
