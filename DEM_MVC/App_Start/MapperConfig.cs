using DEM_MVC_BL.Services;
using DEM_MVC_DAL.Services;

namespace DEM_MVC
{
    public static class MapperConfig
    {
        public static void Initial()
        {
            AutoMapperMapperRegistrationService.Initial();
            DapperMapperRegistrationService.Initial();
        }

    }
}