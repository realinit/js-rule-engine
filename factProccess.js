const _ = require('underscore');
const userDetails = require('./userDetails.js');
class processFact  {
  execute (userDetails) {
    return new Promise(function(resolve, reject) {
      let computedFactsObj = {};
      //check for account details in user data .
      if(_.has(userDetails,'accountdetails') ){
        computedFactsObj["accountdetails"] = true;
      } else {
        computedFactsObj["accountdetails"] = false;
      }

      if(_.has(userDetails,"userData") && _.has(userDetails["userData"],"score")){
        computedFactsObj["score"] = userDetails["userData"]['score'] ;
      } else {
        computedFactsObj["score"] = 0;
      }
      if(_.has(userDetails,"userData") && _.has(userDetails["userData"],"monthlyIncome")){
        computedFactsObj["monthlyIncome"] = userDetails["userData"]['monthlyIncome'] ;
      } else {
        computedFactsObj["monthlyIncome"] = 0;
      }
      if(_.isEmpty(computedFactsObj)){
        reject("Error setting facts");
      } else {
        resolve(computedFactsObj);
      }
    });
}
}
module.exports = {processFact};
