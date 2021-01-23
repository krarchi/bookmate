'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db,callback) {
  db.createTable('user', {
    id: {
      type: 'int',
      primaryKey: true,
      autoIncrement: true
    },
    first_name: {
      type: 'string',
      length: 40
    },
    last_name: {
      type: 'string',
      length: 40
    },
    mobile: {
      type: 'int',
      unique: true
    },
    email: {
      type: 'string',
      length: 50,
      unique: true
    },
      password:{
        type: 'string',
        length: 50,
        required: true
      },
    address: {
      type: 'string',
      length: 399
    },
    device_id:{
      type: 'string',
      length: 100
    },
    device_type: {
      type: 'string',
      length: 100
    }
  }, function(err) {
    if (err) return callback(err);
    return callback();
  });

 db.createTable('blacklist', {
   id: {
     type: 'int',
     primaryKey: true
   },
   token: {
     type: 'string',
     required: true
   }
 })
};

exports.down = function(db,callback) {
  db.dropTable('user', callback);
};

exports._meta = {
  "version": 1
};
