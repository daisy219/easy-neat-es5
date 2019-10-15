

// -------------------------------------------------- 1.全局变量 --------------------------------------------------

var TOKEN = '';
var MAIN_CONFIG = window.MAIN_CONFIG;
var LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
// 用户id
var USERID = GetQueryString('userid');
// token
var LOGINTOKEN = GetQueryString('logintoken');
// 报告id
var REPORTID = GetQueryString('reportid');
// 学生id
var STUDENTID = GetQueryString('studentid');
// 班级id
var CLASSID = GetQueryString('classid');

// -------------------------------------------------- 2.工具函数 --------------------------------------------------

/** 模板
 * @param str 字符串模板
 * @param data 数据
 */
var tpl = function(str, data) {
    var tplStr = str.replace(/\n/g, '')
        .replace(/{{(.+?)}}/g, function(match, p) { return "'+(" + p + ")+'"})
        .replace(/{@(.+?)@}/g, function(match, p) { return "'; " + p + "; tpl += '"})
    return new Function('data', "var tpl='" + tplStr + "'; return tpl;")(data)
};

/** 获取url上参数
 * @param name 需要查找的参数名
 */
function GetQueryString(name) {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r !== null) {
        return  unescape(r[2])
    };
    return null;
}

/**
 * 题目答案转换
 * - 过滤器使用: {{ ['1'] | answer_transform(questiontype, ['1']) }}
 * @param questiontype 题目类型
 * @param val 答案数组
 */
function answer_transform( arr, questiontype ) {
    // 第一个值为空说明没有答案
    var val = JSON.parse(JSON.stringify(arr));
    // val = [...val]; // copy 一下，避免引用
    if ( !val[0] ) { return val[0] = ''; }

    if ( questiontype === 2 ) { // 判断题
      if (String(val[0]) === '1') {
        return '对';
      } else if (String(val[0]) === '2') {
        return '错';
      } else {
        return '';
      }
    } else if ( questiontype === 1 ) { // 多选题
      val = val.sort().filter(function(s){ return s});
      // console.log(val)
      val.forEach( function(element, index) {
        if ( !!Number(element) ) {
          val[index] = get_letter( Number(val[index]) );
        }
      });
      return val.join();
    } else if ( questiontype === 0 ) {  // 单选题
      return get_letter( Number(val[0]) );
    } else {      // 填空题
      return (val.join('、'));
    }
  }


// 获取对应数字展示的选择项
function get_letter(index) {
    return LETTERS[index - 1];
}

/**
 * 阿拉伯数字转换中文数字 (0 ~ 99)
 *
 * get_han_number(10) => 十
 * get_han_number(21) => 二十一
 * get_han_number(21, (str) => str + '、') => 二十一、
 *
 * @export
 * @param {number} num
 * @param {(str: string) => string} strHandler
 * @returns {(string | null)}
 */
function get_han_number(num, strHandler) {
    var han_num = '';

    var han_num_arr = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
    var neg_num_han = '负';

    if (num < 0) {
      han_num = neg_num_han;
      num = Math.abs(num);
    }

    if (num === 0) {
      han_num += '零';
    } else if (num > 0 && num <= 10) {
      han_num += han_num_arr[num];
    } else if (num > 10 && num <= 99) {
      var num_arr = String(num).split('');

      if (num <= 19) {
        num_arr.splice(0, 1, '10');
      } else {
        num_arr.splice(1, 0, '10');
      }

      num_arr.forEach(function(n, index) {
        var _n = parseInt(n, 10);

        if ( (index === (num_arr.length - 1)) && (_n === 0)) { return null; }
        han_num += han_num_arr[_n];
      });
    } else {
      console.warn('只支持 -99 ~ 99 范围内的数字!');
      return null;
    }

    return strHandler ? strHandler(han_num) : han_num;
}


/** 获取图片的宽高 */
function get_image_dom_natural_wh(img_dom, cb) {
  if (img_dom.naturalWidth && img_dom.naturalHeight) {
    cb({ width: img_dom.naturalWidth, height: img_dom.naturalHeight });
  } else {
    var img = new Image();

    img.src = img_dom.src;
    img.onload = function() {
      cb({ width: img.width, height: img.height });
    };
    img.onerror = function() {
      cb({ width: 0, height: 0 });
    };
  }
}

// -------------------------------------------------- 3.请求封装 --------------------------------------------------
function ajax_get(api, data, cb) {
  $.ajax({
    url: api,
    type: 'get',
    data: data,
    success: function (data) {
      cb(data);
    },
  });
}