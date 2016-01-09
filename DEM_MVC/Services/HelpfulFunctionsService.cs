using System;
using DEM_MVC_Infrastructure.Models;

namespace DEM_MVC.Services
{
    public static class HelpfulFunctionsService
    {

        public static string SelectRightEnding(int value, string wordForOne, string wordFromTwoToFive, string wordForElse)
        {
            try
            {
                value = Math.Abs(value) % 100;

                if (value > 10 && value < 15)
                    return wordForElse;

                value %= 10;
                if (value == 1) return wordForOne;
                if (value > 1 && value < 5) return wordFromTwoToFive;
                return wordForElse;
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, "HelpfulFunctionsService. Error in function SelectRightEnding");
                return null;
            }
        }

        public static bool IsOdd(int value)
        {
            try
            {
                return value % 2 != 0;
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, "HelpfulFunctionsService. Error in function IsOdd");
                return false;
            }
        }

    }
}