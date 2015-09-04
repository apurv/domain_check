/**
 * Domain
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

var dns = require('dns');
 
module.exports = {

  attributes: {
  	addr: {
		type: 'string',
		required: true
	},
	ip: {
		type: 'array'
	},
	mx: {
		type: 'array'
	},
	ns: {
		type: 'array'
	},
	cname: {
		type: 'array'
	},
	srv: {
		type: 'array'
	},
	txt: {
		type: 'array'
	}
  },
  beforeCreate: function(values, cb){
	dns.resolve4(values.addr, function(err, addresses){
		if(err){
			values.ip = [err.code];
		}else{
			values.ip = addresses;
		}		
		dns.resolveMx(values.addr, function(err, addresses){
			if(err){
				values.mx = [err.code];
			}else{
				values.mx = addresses;
			}
			dns.resolveNs(values.addr, function(err, addresses){
				if(err){
					values.ns = [err.code];
				}else{
					values.ns = addresses;
				}
				dns.resolveCname(values.addr, function(err, addresses){
					if(err){
						values.cname = [err.code];
					}else{
						values.cname = addresses;
					}
					dns.resolveSrv(values.addr, function(err, addresses){
						if(err){
							values.srv = [err.code];
						}else{
							values.srv = addresses;
						}
						dns.resolveTxt(values.addr, function(err, addresses){
							if(err){
								values.txt = [err.code];
							}else{
								values.txt = addresses;
							}
							cb();
						});
					});
				});
			});
		});
	});
  }

};
