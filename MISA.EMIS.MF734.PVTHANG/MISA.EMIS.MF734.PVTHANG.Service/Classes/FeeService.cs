using MISA.EMIS.MF734.PVTHANG.Common.Models;
using MISA.EMIS.MF734.PVTHANG.Service.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.EMIS.MF734.PVTHANG.Service.Classes
{
    public class FeeService : BaseService<Fee>, IFeeService
    {
        public override ServiceResult GetAll()
        {
            var sqlCommand = $"SELECT * FROM Fee f LEFT JOIN FeeGroup fg ON f.FeeGroupId = fg.FeeGroupId";
            _serviceResult.Data = _dbConnector.GetList<Fee>(sqlCommand, new { }, System.Data.CommandType.Text);
            return _serviceResult;
        }

        public override ServiceResult GetById(int id)
        {
            return base.GetById(id);
        }
    }
}
