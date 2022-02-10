import axios from "axios"; // ezpz web comm

var login_url = "https://ziadabdelati.com/check.php";
var is_logged_in = {"toggle":false};
var template = {
  "email" : "",
  "pword" : "",
  "type"  : "",
  "post"  : ""
};

export const http_get = (URL) => {
  return axios({
    url: URL,
  }).then((response) => {
    return response.data;
  });
};

export const http_post = (URL, DATA) => {
  return axios({
    method: 'post',
    url: URL,
    data: DATA
  }).then((response) => {
      return response.data;
  });
}

// saves the login in order for future use in the data lib
export const save_login = (obj) => {
  template.email = obj.email;
  template.pword = obj.pword;
};

// returns a promise containing all the data from the server
export const data_recieve = () => {
  var new_obj = template;
  new_obj.type = "data_recieve";
  return http_post(login_url, new_obj).then((response) => {
    return response;
  });
};

// sends whatever data to the server
export const data_send = (data) => {
    var new_obj = template;
    new_obj.type = "data_send";
    new_obj.post = data;
    http_post(login_url, new_obj).then((response) => {
      //console.log(response);
    });
};

// returns a promise of reminder data
export const get_reminder_data = () => {
  var new_obj = template;
  new_obj.type = "get_reminder_data";
  return http_post(login_url, new_obj).then((response) => {
    return response;
  });
}

// automatically retrieves reminder data, adds the new data, then sends new one to server
export const send_reminder_data = (new_data) => {
  return get_reminder_data().then((response) => {
    var new_obj = template;
    new_obj.type = "send_reminder_data";
    if (response.length == 0) {
      new_obj.post = JSON.stringify('{"data":[{"date":"' + new_data.date + '", "reminder" : "' + new_data.reminder + '"}],"success":1}');
    } else {
      var post_obj = response;
      post_obj["data"].push({"date" : new_data.date, "reminder" : new_data.reminder, "minutes_before" : new_data.minutes_before});
      new_obj.post = JSON.stringify(post_obj);
      console.log(new_obj);
    }

    return http_post(login_url, new_obj).then((res) => {
      return res;
    });
  });
}

// remove the reminder data at i index
export const remove_reminder_data = (i) => {
  return get_reminder_data().then((response) => {
    var new_obj = template;
    new_obj.type = "send_reminder_data";
    var post_obj = response;
    post_obj.data.splice(i, 1);
    new_obj.post = JSON.stringify(post_obj);
    
    return http_post(login_url, new_obj).then((res) => {
      console.log(res);
      return res;
    });
  })
}

// contact as a string, either email or phone number
export const send_reminder_contact = (contact) => {
  return get_reminder_contact().then((response) => {
    var new_obj = template;
    new_obj.type = "send_reminder_contact";
    //new_obj.post = '{"data":[{"contact":"' + contact + '"}],"success":1}';
    if (response.length == 0) {
      new_obj.post = '{"data":[{"contact":"' + contact + '"}],"success":1}';
    } else {
      var post_obj = response;
      post_obj["data"].push({"contact" : contact });
      new_obj.post = JSON.stringify(post_obj);
    }
    
    return http_post(login_url, new_obj).then((res) => {
      return res;
    });
  })
}

// removes whatever contact i send it
export const remove_reminder_contact = (i) => {
  return get_reminder_contact().then((response) => {
    var new_obj = template;
    new_obj.type = "send_reminder_contact";
    var post_obj = response;
    post_obj.data.splice(i, 1);
    new_obj.post = JSON.stringify(post_obj);
    
    return http_post(login_url, new_obj).then((res) => {
      return res;
    });
  })
}

// returns a promise containing the json of the reminder details
export const get_reminder_contact = () => {
  var new_obj = template;
  new_obj.type = "get_reminder_contact";
  return http_post(login_url, new_obj).then((response) => {
    return response;
  });
};

// geolocation -> json
export const to_object = (obj) => {
  if (obj === null || !(obj instanceof Object)) return obj;
  var temp = (obj instanceof Array) ? [] : {};
  for (var key in obj) temp[key] = to_object(obj[key]);
  return temp;
}

// sends location object to the server 
export const send_geolocation = (location, set_home_location) => {
  return get_geolocation().then((response) => {
    var new_obj = template;
    new_obj.type = "send_geolocation";
    //new_obj.post = '{"data":[{"contact":"' + contact + '"}],"success":1}';

    if (response.length == 0) {
      var post_obj = {home: location.coords, current: location.coords};
      new_obj.post = JSON.stringify(post_obj);  
    } else if (set_home_location == false) {
      var post_obj = response;
      post_obj.current = location.coords;
      new_obj.post = JSON.stringify(post_obj);
    } else if (set_home_location == true) {
      var post_obj = response;
      post_obj.current = location.coords;
      post_obj.home    = location.coords;
      new_obj.post = JSON.stringify(post_obj);
    }
    return http_post(login_url, new_obj).then((res) => {
      return res;
    });
  })
}

// get the geolocation object from the server
export const get_geolocation = () => {
  var new_obj = template;
  new_obj.type = "get_geolocation";
  return http_post(login_url, new_obj).then((response) => {
    return response;
  });
}

// sends a base64 representation of an image to the server to be processed and saved
export const send_picture = (picture) => {
  var new_obj = template;
  new_obj.type = "picture";
  new_obj['post'] = picture;
  console.log("amogusboobs");
  return http_post(login_url, new_obj).then((response) => {
    console.log("boobs" + response);
    return response;
  });
}