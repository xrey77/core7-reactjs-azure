using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;

namespace core7_reactjs_azure.Models.dto
{
  public class UserUpdate
    {        
        [Required]
        public string Firstname { get; set; }

        [Required]
        public string Lastname { get; set; }
        public string Password { get; set; }

        public string Mobile { get; set; }
        public IFormFile Profilepic { get; set; }
        public bool Twofactorenabled { get; set; }

      //  public DateTimeOffset Updatedat { get; set; }
    }

    
}