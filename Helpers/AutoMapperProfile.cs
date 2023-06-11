using AutoMapper;
using core7_reactjs_azure.Entities;
using core7_reactjs_azure.Models.dto;

namespace core7_reactjs_azure.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<User, UserModel>();
            CreateMap<UserRegister, User>();
            CreateMap<UserLogin, User>();
            CreateMap<UserUpdate, User>();

            CreateMap<Product, ProductModel>();


        }
    }
    

}