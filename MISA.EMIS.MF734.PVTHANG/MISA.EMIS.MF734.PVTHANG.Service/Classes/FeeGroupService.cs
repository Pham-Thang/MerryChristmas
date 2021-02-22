﻿using MISA.EMIS.MF734.PVTHANG.Common.Models;
using MISA.EMIS.MF734.PVTHANG.Service.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.EMIS.MF734.PVTHANG.Service.Classes
{
    public class FeeGroupService : BaseService<FeeGroup>, IFeeGroupService
    {
        public override ServiceResult Delete(string id)
        {
            _serviceResult.Data = 10;
            return _serviceResult;
        }
    }
}
