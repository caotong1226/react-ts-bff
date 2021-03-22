const Mocha = require('mocha');
const mocha = new Mocha({
  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "./docs/mochawesome-report",
    quiet: true,
  },
});
mocha.addFile("./test/service/*.js");
mocha.run(function (err){
  if(err){
    process.exit(-1);
  }else{
    process.exit()
  }
});