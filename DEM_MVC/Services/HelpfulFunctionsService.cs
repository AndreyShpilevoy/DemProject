using System;
using DEM_MVC_Infrastructure.Models;

namespace DEM_MVC.Services
{
    public static class HelpfulFunctionsService
    {

        public static string SelectRightEnding(int value, string wordForOne, string wordFromTwoToFour, string wordForElse)
        {
            try
            {
                value = Math.Abs(value) % 100;

                if (value > 10 && value < 15)
                    return wordForElse;

                value %= 10;

                if (value == 1)
                    return wordForOne;

                if (value > 1 && value < 5)
                    return wordFromTwoToFour;

                return wordForElse;
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, $"{nameof(HelpfulFunctionsService)}. Error in function {DemLogger.GetCallerInfo()}");
                return null;
            }
        }

        public static bool IsOdd(int value)
        {
            try
            {
                return value % 2 == 1;
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, $"{nameof(HelpfulFunctionsService)}. Error in function {DemLogger.GetCallerInfo()}");
                return false;
            }
        }

    }
}