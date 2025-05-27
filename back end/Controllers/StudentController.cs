using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace StudentApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        private static List<Student> students = new List<Student>();

        [HttpGet]
        public ActionResult<List<Student>> Get() => students;

        [HttpPost]
        public ActionResult<Student> Post(Student student)
        {
            students.Add(student);
            return student;
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            var student = students.FirstOrDefault(s => s.Id == id);
            if (student == null) return NotFound();
            students.Remove(student);
            return NoContent();
        }
    }

    public class Student
    {
        public string?  Id { get; set; }
        public string? Name { get; set; }
    }
}
