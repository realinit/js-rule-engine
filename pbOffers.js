const _ = require('underscore');
const {processFact} = require('./factProccess.js');
const userDetails = require('./userDetails.js');
const rule = require('./rules.js');


class apply {


  engine (userDeatil,rule) {
    this.userDeatil = userDeatil;
    this.execute(rule).then((success) => {
      if(success){
        console.log("Data available");
      } else {
        console.log("Data not available");
      }
    },(error)=>{
      console.error(error)
    }).catch((err) => {
      console.error(err);
    });
  };


  execute (rule) {
    return  new Promise((resolve, reject) => {
      if(this.typecheck(rule) == "object"){
        this.getObjectProperties(rule, (con,data) => {
          if(this.operandsValidator(con) && this.typecheck(data) == "array"){
            let fC = [];
            for (var i = 0; i < data.length; i++) {
              fC.push(this.executeQuery(data[i]));
            }
            if(con == "and"){
              resolve(eval(fC.join("&&")));
            } else {
              resolve(eval(fC.join("||")));
            }

          } else {
            reject("Operends is not valid !")
          }

        })
      } else {
        reject("Rule should be a object");
      }
    });

  }
  executeQuery(data){
    if(this.typecheck(data) == "object"){
      for (let i in data){
        let con = i;
        return this.checktarget(con,data[i]);
      }
    } else {
      return false;
    }

  }

  checktarget(con,data) {
    let fC =[];
    if (this.typecheck(data) == "array"){
      for (let i = 0; i < data.length; i++) {
        fC.push(this.getTargetValue(data[i]))
      }
    }

    if(con == "and"){
      return (eval(fC.join("&&")));
    } else {
      return (eval(fC.join("||")));
    }

  }

  getTargetValue (data) {
    switch (data.type) {
      case "boolean":
        return this.booleanCasecheck(data);
        break;
      case "number":
        return this.numberCasecheck(data);
        break;
      default:
      return false;

    }
  }
  booleanCasecheck (data) {
    let factName = data.factName;
    if(this.dataTypeValidator(data.type) &&  _.has(this.userDeatil,factName) == true && this.userDeatil[factName] == data.value){
      return true;
    }
    return false;
  }

  numberCasecheck (data) {

    let factName = data.factName;

    console.log(factName,"_____________ ",this.userDeatil[factName]);
    if(this.dataTypeValidator(data.type) && _.has(this.userDeatil,factName) == true){
      switch (data.operator) {
        case "greaterthan":
          if(data.value < this.userDeatil[factName]){
            return true;
          }
          return false;
          break;
        case "lessthen":
          if(data.value > this.userDeatil[factName]){
            return true;
          }
          return false;
          break;
        case "equal":
          if(data.value == this.userDeatil[factName]){
            return true;
          }
          return false;
          break;
        default:

      }
      return true;
    }
    return false;
  }

   getObjectProperties (data,callback) {
     for (let i in data) {
       callback(i,data[i])
     }
   }
 operatorValidator (o) {
   let opr = ["lessthen","greaterthan","equal","has"];
   if(_.indexOf(o) > -1){
     return true;
   }
   return false;
 }
 operandsValidator (o) {
   let opr = ["or","and"];
   if(_.indexOf(opr,o) > -1){
     return true;
   }
   return false;
 }

 dataTypeValidator (o) {
   let opr = ["number","boolean","array"];
   if(_.indexOf(opr,o) > -1){
     return true;
   }
   return false;
 }

  typecheck (data) {
    if(_.isArray(data)){
      return "array";
    } else if (_.isObject(data)) {
      return "object";
    } else if (_.isNumber(data)){
      return "number";
    } else if (_.isString(data)){
      return "string";
    } else {
      return "";
    }
  }

};


var startProcessFact = new processFact();
startProcessFact.execute(userDetails).then((factsData)=>{
  var startEngine = new apply();
  startEngine.engine(factsData,rule);
},(err) =>{
  console.log(err);
});
