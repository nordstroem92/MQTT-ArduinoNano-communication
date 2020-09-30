var IotApi = require('@arduino/arduino-iot-client');
var rp = require('request-promise');

async function getToken() {
    var options = {
        method: 'POST',
        url: 'https://api2.arduino.cc/iot/v1/clients/token',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        json: true,
        form: {
            grant_type: 'client_credentials',
            client_id: 'gmED5ANJG4GS2mOsFj7SXkX4d2cEAuPF',
            client_secret: '5rTnu9H0iOMrXAoAlWobaCr3O2BnWXxa7Tqwpgr3y5iR9lZRyu9yYezcTPWuCkIi',
            audience: 'https://api2.arduino.cc/iot'
        }
    };

    try {
        const response = await rp(options);
        return response['access_token'];
    }
    catch (error) {
        console.error("Failed getting an access token: " + error)
    }
}

async function run() {
    var client = IotApi.ApiClient.instance;
    // Configure OAuth2 access token for authorization: oauth2
    var oauth2 = client.authentications['oauth2'];
    oauth2.accessToken = await getToken();
    
    var api = new IotApi.PropertiesV2Api()    
    /*api.devicesV2List().then(devices => {
        console.log(devices);
    }, error => {
        console.log(error)
    });*/
    var id = "c2de13b1-06ac-4d61-ae14-3c2938b70ff6"; // {String} The id of the thing
    var pid = "b5ebbbe2-d328-4035-852d-5f98115957a1"; // {String} The id of the property
    var property = {
        "name": "lightstatus",
        "permission": "READ_WRITE",
        "persist": true,
        "tag": 1,
        "type": "STATUS",
        "update_parameter": 1,
        "update_strategy": "ON_CHANGE",
        "variable_name": "lightstatus"
    }; // {Property} 
    api.propertiesV2Update(id, pid, property).then(function(data) {
    console.log('API called successfully. Returned data: ' + data);
    }, function(error) {
    console.error(error);
    });
}
run();