using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using System.Data;
using RoomReserveApp.Models;

namespace RoomReserveApp.Controllers
{
    
        [Route("api/[controller]")]
        [ApiController]
        public class RoomTypeController : ControllerBase
        {

            private readonly IConfiguration _configuration;
            public RoomTypeController(IConfiguration configuration)
            {
                _configuration = configuration;
            }


            [HttpGet]
            public JsonResult Get()
            {
                string query = @"
                            select RoomTypeId, RoomTypeName from
                            dbo.RoomType
                            ";

                DataTable table = new DataTable();
                string sqlDataSource = _configuration.GetConnectionString("DefaultConnection");
                SqlDataReader myReader;
                using (SqlConnection myCon = new SqlConnection(sqlDataSource))
                {
                    myCon.Open();
                    using (SqlCommand myCommand = new SqlCommand(query, myCon))
                    {
                        myReader = myCommand.ExecuteReader();
                        table.Load(myReader);
                        myReader.Close();
                        myCon.Close();
                    }
                }

                return new JsonResult(table);
            }

            [HttpPost]
            public JsonResult Post(RoomType dep)
            {
                string query = @"
                           insert into dbo.RoomType
                           values (@RoomTypeName)
                            ";

                DataTable table = new DataTable();
                string sqlDataSource = _configuration.GetConnectionString("DefaultConnection");
                SqlDataReader myReader;
                using (SqlConnection myCon = new SqlConnection(sqlDataSource))
                {
                    myCon.Open();
                    using (SqlCommand myCommand = new SqlCommand(query, myCon))
                    {
                        myCommand.Parameters.AddWithValue("@RoomTypeName", dep.RoomTypeName);
                        myReader = myCommand.ExecuteReader();
                        table.Load(myReader);
                        myReader.Close();
                        myCon.Close();
                    }
                }

                return new JsonResult("Added Successfully");
            }


            [HttpPut]
            public JsonResult Put(RoomType dep)
            {
                string query = @"
                           update dbo.RoomType
                           set RoomTypeName= @RoomTypeName
                            where RoomTypeId=@RoomTypeId
                            ";

                DataTable table = new DataTable();
                string sqlDataSource = _configuration.GetConnectionString("DefaultConnection");
                SqlDataReader myReader;
                using (SqlConnection myCon = new SqlConnection(sqlDataSource))
                {
                    myCon.Open();
                    using (SqlCommand myCommand = new SqlCommand(query, myCon))
                    {
                        myCommand.Parameters.AddWithValue("@RoomTypeId", dep.RoomTypeId);
                        myCommand.Parameters.AddWithValue("@RoomTypeId", dep.RoomTypeId);
                        myReader = myCommand.ExecuteReader();
                        table.Load(myReader);
                        myReader.Close();
                        myCon.Close();
                    }
                }

                return new JsonResult("Updated Successfully");
            }

            [HttpDelete("{id}")]
            public JsonResult Delete(int id)
            {
                string query = @"
                           delete from dbo.RoomType
                            where RoomTypeId=@RooMtypeId
                            ";

                DataTable table = new DataTable();
                string sqlDataSource = _configuration.GetConnectionString("DefaultConnection");
                SqlDataReader myReader;
                using (SqlConnection myCon = new SqlConnection(sqlDataSource))
                {
                    myCon.Open();
                    using (SqlCommand myCommand = new SqlCommand(query, myCon))
                    {
                        myCommand.Parameters.AddWithValue("@RoomTypeId", id);

                        myReader = myCommand.ExecuteReader();
                        table.Load(myReader);
                        myReader.Close();
                        myCon.Close();
                    }
                }

                return new JsonResult("Deleted Successfully");
            }


        }
    
}
