using System.Data;
using DEM_MVC_BL.ExtensionMethods;
using DEM_MVC_BL.Models;
using Unit_Tests.BaseTest;
using Xunit;

namespace Unit_Tests.Tests
{
    public class DataTableExtentionsMethodsTests : UnitTestBase
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

        [Fact]
        public void IsDataTableToList()
        {
            var configNameValue = "Test";
            var configValueValue = "Item";

            var dataTable = new DataTable();
            dataTable.Columns.Add("ConfigName", typeof(string));
            dataTable.Columns.Add("ConfigValue", typeof(string));
            for (int i = 0; i < 2; i++)
            {
                var workRow = dataTable.NewRow();
                workRow[0] = configNameValue;
                workRow[1] = configValueValue;
                dataTable.Rows.Add(workRow);
            }

            var result = dataTable.DataTableToList<ConfigModel>();
            Assert.Equal(2, result.Count); 
            foreach (var model in result)
            {
                Assert.Equal(model.ConfigName, configNameValue);
                Assert.Equal(model.ConfigValue, configValueValue);
            }
        }
    }
}