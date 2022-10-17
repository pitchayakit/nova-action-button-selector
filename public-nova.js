let fs = require("fs-extra");

// copy source folder to destination
fs.copy('../../vendor/laravel/nova/resources/js/mixins', 'resources/js/mixins', function (err) {
    if (err){
        console.log('An error occured while copying the folder.')
        return console.error(err)
    }
    console.log('Copy mixins completed!')
  });

fs.copy('../../vendor/laravel/nova/resources/js/util', 'resources/js/util', function (err) {
    if (err){
        console.log('An error occured while copying the folder.')
        return console.error(err)
    }
    console.log('Copy util completed!')
});