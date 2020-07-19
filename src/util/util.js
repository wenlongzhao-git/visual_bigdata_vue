export default {

  //获取Cookie
  getCookie : function(name){
    name = name + "="
    var start = document.cookie.indexOf(name),
      value = null;
    if(start>-1){
      var end = document.cookie.indexOf(";",start);
      if(end == -1){
        end = document.cookie.length;
      }
      value = document.cookie.substring(start+name.length,end);
    }
    return value;
  },

  //设置Cookie
  setCookie : function(c_name, value, expiredays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
  },


  //删除cookie
  delCookie : function(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = this.getCookie(name);
    if (cval != null)
      document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();

  }
}
