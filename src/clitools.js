/**
 * Created by Administrator on 6/22/2016.
 */

exports.associateCommand = function(vantage, clicmd) {
    var command = vantage.command(clicmd.name);

    command.description(clicmd.description)

    command.action(clicmd.action);

    clicmd.options.forEach(function(option) {
        command.option(option.name, option.description);
    });
};
