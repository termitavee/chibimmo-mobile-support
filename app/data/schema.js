const LogInfoSchema = {
  name: 'LogInfo',
  properties: {
    nick: {type: 'string'},
    token: {type: 'string'},
  }
};

const ConfSchema = {
  name: 'Conf',
  properties: {
    language: {type: 'string', default:'en'},
  }
};

export default [LogInfoSchema, ConfSchema]
//or export each schema
