using Dapper;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;

namespace MISA.EMIS.MF734.PVTHANG.DataLayer.Classes
{
    public class DatabaseConnector
    {
        protected String _connectionString;
        protected IDbConnection _dbConnection;
        public DatabaseConnector()
        {
            _connectionString = "User Id=dev;Password=12345678;Database=MISA.FeeManagement.MF734_PVTHANG;Port=3306;Host=47.241.69.179;Character Set=utf8";
            _dbConnection = new MySqlConnection(_connectionString);
        }

        public virtual IEnumerable<TEntity> GetList<TEntity>(String sqlCommand, Object input, CommandType type = CommandType.StoredProcedure)
        {
            return _dbConnection.Query<TEntity>(sqlCommand, input, commandType: type).ToList();
        }
        public virtual TEntity GetFirst<TEntity>(String sqlCommand, Object input, CommandType type = CommandType.StoredProcedure)
        {
            return _dbConnection.Query<TEntity>(sqlCommand, input, commandType: type).FirstOrDefault();
        }

        public virtual int Change(String sqlCommand, Object input, CommandType type = CommandType.StoredProcedure)
        {
            return _dbConnection.Execute(sqlCommand, input, commandType: type);
        }
    }
}
