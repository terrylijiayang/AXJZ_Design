
export class utils {

  static validateIntRange(min, max) {
    var min = min;
    var max = max;
    return (rule, value, callback) => {
      if (!value) {
        return callback(new Error('不能为空'));
      }
      var newValue = value;
      setTimeout(() => {
        if (isNaN(newValue)) {

          callback(new Error('请输入整数'));

        } else {
          if (parseInt(newValue) != parseFloat(newValue)) {
            callback(new Error('请输入整数'));
          }
          var v1 = parseInt(newValue)
          if (v1 < min || v1 > max) {

            callback(new Error('输入的值必须在 ' + min + ' 和 ' + max + ' 之间'));
          }
          else {

            callback();
          }
        }
      }, 500);
    };
  }

  static validateFloatRange(min, max) {
    var min = min;
    var max = max;
    return (rule, value, callback) => {
      if (!value) {
        return callback(new Error('不能为空'));
      }
      var newValue = value;
      setTimeout(() => {
        if (isNaN(newValue)) {

          callback(new Error('请输入数字'));

        } else {
          var v1 = parseFloat(newValue)
          if (v1 < min || v1 > max) {

            callback(new Error('输入的值必须在 ' + min + ' 和 ' + max + ' 之间'));
          }
          else {

            callback();
          }
        }
      }, 500);
    };
  }

  /**
   *
   * @param min 最小长度
   * @param max 最大长度
   * @param pattern 正则表达,例如:
   * 邮件地址:      /^\w+([\.\-]\w+)*\@\w+([\.\-]\w+)*\.\w+$/
   * 身份证:        /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{4}$/
   * 数字：         /^([1-9]\d*(\.\d+)?)|(\d+(\.\d+))$/; isNumber=/^\d+(\.\d+)?$/
   * 整数：         /^\d+$/
   * 邮编：         /^[1-9]\d{5}(?!\d)$/
   * 手机号码：     /^1[3|4|5|7|8]\d{9}$/
   * @param patternMessage 正则表达是消息
   * @returns {function(*, *, *)}
   */


  static validateString(min, max, pattern, patternMessage) {
    var min = min;
    var max = max;
    return (rule, value, callback) => {

      var newValue = value;
      setTimeout(() => {
        if (!newValue) {
          if (min == 0) {
            callback();
            return
          }
          else {
            return callback(new Error('不能为空'));
          }
        }

        var v1 = newValue.trim();

        if (v1.length < min || v1.length > max) {
          callback(new Error('输入的字符串长度必須在 ' + min + '- ' + max + "之间"));
          return;
        }

        if (pattern) {
          if (!pattern.test(v1)) {
            if (patternMessage) {
              callback(new Error(patternMessage));
            }
            else {
              callback(new Error("格式不正确，格式为：" + pattern));
            }
          }
        }
        callback();
      }, 500);
    };
  }
  static objectsCached = {};
  static keysCached = new Array();

  static getObjectCached(key) {
    return this.objectsCached[key];
  }

  static cacheObject(key, obj) {
    this.objectsCached[key] = obj;
    this.keysCached.unshift(key);
    if (this.keysCached.length > 120) {
      for (i = this.keysCached.length - 1; i >= 100; i--) {
        delete this.objectsCached[this.keysCached[i]];
      }
    }
  }
}
