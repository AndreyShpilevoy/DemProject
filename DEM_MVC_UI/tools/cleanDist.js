/* eslint no-console: "off" */
/* eslint no-unused-vars: "off" */
/* eslint import/no-extraneous-dependencies: "off" */
import del from "del";
import path from 'path';

del(['D:\\PersonalProject\\DemProject\\DEM_MVC\\wwwroot', '!D:\\PersonalProject\\DemProject\\DEM_MVC\\wwwroottemplate.html']).then(paths => {
    console.log('Deleted files and folders:\n', paths.join('\n'));
});
