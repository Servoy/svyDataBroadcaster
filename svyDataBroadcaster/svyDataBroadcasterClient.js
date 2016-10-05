/**
 * @public 
 * @param {String} host
 * @param {String} serverName
 * @param {String} tableName
 * @param {String} [userName]
 * @param {String} [password]
 * 
 * @return {{success:Boolean, error:String, httpStatus:Number}}
 * @properties={typeid:24,uuid:"EB3C1024-638D-410C-A85E-700C3D017846"}
 */
function flushClientsChache(host, serverName, tableName, userName, password){
	
	// Server url
	var url = host + '/servoy-service/rest_ws/svyDataBroadcaster/flush';
	
	// create request w/ JSON header
	var client = plugins.http.createNewHttpClient();
	var put = client.createPutRequest(url);
	put.addHeader('Content-Type','application/json; charset=utf-8')
	
	//	set update content
	var content = {
		serverName:serverName,
		tableName:tableName
	};
	put.setBodyContent(JSON.stringify(content));
	
	//	 execute request
	var res;
	if(userName){
		res = put.executeRequest(userName, password);
	} else {
		res = put.executeRequest();
	}
	
	// parse response
	/** @type {{success:Boolean, error:String, httpStatus:Number}} */
	var responseObject = {};
	var statusCode = res.getStatusCode();
	if(statusCode == plugins.http.HTTP_STATUS.SC_OK){
		responseObject = JSON.parse(res.getResponseBody());
		responseObject.httpStatus = statusCode;
		
	//	 handle HTTP error
	} else {
		responseObject = {
			success:false,
			error:'HTTP error',
			httpStatus:statusCode
		};
	}
	
	return responseObject;
}

/**
 * @public 
 * @param {String} host
 * @param {String} serverName
 * @param {String} tableName
 * @param {Array<String|Number>|JSDataSet} pks
 * @param {Number} action
 * @param {String} [userName]
 * @param {String} [password]
 * 
 * @return {{success:Boolean, error:String, httpStatus:Number}}
 * @properties={typeid:24,uuid:"528F4D05-2040-413B-AC0C-0904F62F92EC"}
 */
function notifyDataChange(host, serverName, tableName, pks, action, userName, password){
	
	//	convert data set to array
	if(pks instanceof JSDataSet){
		/** @type {JSDataSet} */
		var ds = pks;
		pks = scopes.svyDataBroadcaster.dataSetToArray(ds);
	}
	
	// Server url
	var url = host + '/servoy-service/rest_ws/svyDataBroadcaster/notify';
	
	// create request w/ JSON header
	var client = plugins.http.createNewHttpClient();
	var put = client.createPutRequest(url);
	put.addHeader('Content-Type','application/json; charset=utf-8')
	
	//	set update content
	var content = {
		serverName:serverName,
		tableName:tableName,
		pks:pks,
		action:action
	};
	put.setBodyContent(JSON.stringify(content));
	
	//	 execute request
	var res;
	if(userName){
		res = put.executeRequest(userName, password);
	} else {
		res = put.executeRequest();
	}
	
	// parse response
	/** @type {{success:Boolean, error:String, httpStatus:Number}} */
	var responseObject = {};
	if(res){
		var statusCode = res.getStatusCode();
		if(statusCode == plugins.http.HTTP_STATUS.SC_OK){
			responseObject = JSON.parse(res.getResponseBody());
			responseObject.httpStatus = statusCode;
			
		//	 handle HTTP error
		} else {
			responseObject = {
				success:false,
				error:'HTTP error',
				httpStatus:statusCode
			};
		}
	} else {
		responseObject.success = false;
		responseObject.error = 'Unable to reach host: ' + host;
	}
	return responseObject;
}
