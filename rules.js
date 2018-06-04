var rule = {
  "and":[{
    "or" :[{
      factName : "score",
      operator : "lessthen",
      type     : "number",
      value    : 800
    },
    {
      factName : "monthlyIncome",
      operator : "greaterthan",
      type     : "number",
      value    : 2000
    }]
  },
  {
    "and" :[{
      factName : "score",
      operator : "greaterthan",
      type     : "number",
      value    : 800
    },
    {
      factName : "PLaccount",
      operator : "has",
      type     : "boolean",
      value    : true
    }]
  }
  ]
};

module.exports = rule;
