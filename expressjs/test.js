const sql = require('mssql/msnodesqlv8')

const pool = new sql.ConnectionPool({
  database: 'Auth',
  server: 'DESKTOP-FDCR8VU',
  driver: 'msnodesqlv8',
  options: {
    trustedConnection: true
  }
})

pool.connect().then(() => {
  //simple query
  pool.request().query(`/****** Script for SelectTopNRows command from SSMS  ******/
  SELECT TOP 1000 [id]
        ,[password]
        ,[email]
        ,[isActive]
        ,[role]
    FROM [Auth].[dbo].[Users]`, (err, result) => {
        console.dir(result)
    })
})