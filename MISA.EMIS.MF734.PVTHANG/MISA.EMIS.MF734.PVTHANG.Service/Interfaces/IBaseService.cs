using MISA.EMIS.MF734.PVTHANG.Common.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.EMIS.MF734.PVTHANG.Service.Interfaces
{
    public interface IBaseService<TEntity>
    {
        ServiceResult GetAll();
        ServiceResult GetById(String id);
        ServiceResult Insert(TEntity entity);
        ServiceResult Update(TEntity entity);
        ServiceResult Delete(String id);
    }
}
