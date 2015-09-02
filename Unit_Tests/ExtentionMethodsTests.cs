using System.Data;
using DEM_MVC_BL.ExtensionMethods;
using DEM_MVC_BL.Models;
using Moq;
using Xunit;

namespace Unit_Tests
{
    public class ExtentionMethodsTests : UnitTestBase
    {
        [Fact]
        public void IsDataTableToModel()
        {
            var configNameValue = "Test";
            var configValueValue = "Item";

            var dataTable = new DataTable();
            dataTable.Columns.Add("ConfigName", typeof(string));
            dataTable.Columns.Add("ConfigValue", typeof(string));
            var workRow = dataTable.NewRow();
            workRow[0] = configNameValue;
            workRow[1] = configValueValue;
            dataTable.Rows.Add(workRow);

            var result = dataTable.DataTableToModel<ConfigModel>();

            Assert.Equal(result.ConfigName, configNameValue);
            Assert.Equal(result.ConfigValue, configValueValue);
        }
    }
}