var client = new Keen({
  projectId: "55e4d19790e4bd4f09be5024",
  readKey: "8c94f468c030f1e493f7ec19c4996a394ebfce36a774dbd4bfd430f41a0ac01b5e3fa661ec89ae590affe1eae98c785f7ee4d77b723374eddd5df0e1a9889a002caf312fa45b65e2f3cbcab48e5017a21e36cd3363d74ae9e37784a150196e6cf18f1c7d8d6961ff81c8154433582d02"

});

Keen.ready(function (){

//   // $(function () {

  var query = new Keen.Query("extraction", {
    eventCollection: "azk-button-test",
    timeframe: "this_1_days",
    filters: [{"operator":"ne","property_name":"name","property_value":"selfstarter"}],
    timezone: "UTC"
  });

  client.run(query, function(err, res){
    if (err) {
      console.error(err.message);
    } else {

      $(function () {
        var data = res.result;

        var getExecPath = R.map(function(x) { return x.execution_path }, data);
        var categories = R.uniq(getExecPath)
        /**/console.log('\n>>---------\n categories:\n', categories, '\n>>---------\n');/*-debug-*/

        var all_projects_names = R.map(function(x) { return x.name }, data);
        all_projects_names = R.uniq(all_projects_names)
        all_projects_names = all_projects_names.sort();
        /**/console.log('\n>>---------\n all_projects_names:\n', all_projects_names, '\n>>---------\n');/*-debug-*/

        var series = [];

        var _name = null;
        var _values = null;

        categories.forEach(function (execution_path) {

          // new project
          _name = execution_path;
          // reset values
          _values = []

          all_projects_names.forEach(function (project_name) {

            // ITEM
            var getProjectByName = function(item) {
              return item.name === project_name;
            };
            var projects_all_data = R.filter(getProjectByName, data);
            // /**/console.log('\n>>---------\n projects_all_data:\n', projects_all_data, '\n>>---------\n');/*-debug-*/

            // filter only one execution_path
            var getByExecutionPath = function(item) {
              return item.execution_path === execution_path;
            };
            var byExecutionPath = R.filter(getByExecutionPath, projects_all_data);
            // /**/console.log('\n>>---------\n byExecutionPath:\n', byExecutionPath, '\n>>---------\n');/*-debug-*/

            // calculate avarage elapsed time
            var all_elapsed = R.map(function(x) { return x.elapsed }, byExecutionPath);

            var add = function(a, b) {
              return a + b / 2;
            };
            var avarage_value = R.reduce(add, 0, all_elapsed);
            avarage_value = Math.floor10(avarage_value, -1);
            _values.push(avarage_value);
          })

          series.push({
            name: _name,
            data: _values
          })

        })

        /**/console.log('\n>>---------\n series:\n', series, '\n>>---------\n');/*-debug-*/

        $('#container').highcharts({
          chart: {
            type: 'bar'
          },
          plotOptions: {
            series: {
              stacking: 'normal'
            }
          },
          title: {
            text: 'azk start buttons - time elapsed'
          },
          xAxis: {
            categories: all_projects_names
          },
          yAxis: {
            title: {
              text: 'time elapsed in seconds'
            }
          },
          series: series
        });

      });


    }
  });

});
