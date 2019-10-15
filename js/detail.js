// ---------- 1.全局变量 -- 2.获取dom -- 3.列表字符串模板 -- 4.类 -- 5.实例 -- 6.事件 -- 7.函数 -- 8.请求 -- 9.启动函数 -------------------------------


// -------------------------------------------------- 1.全局变量 --------------------------------------------------

var student_name = ''; // 学生姓名
var ask_list = [];    // 教师提问列表
var practise_list = [];  // 练习下拉框列表
var practise_detail_list = [] // 课堂练习详情列表
var table_item = [];
var img_list = []; // 轮播图列表
var own_content_list = []; // 主观题

// -------------------------------------------------- 2.获取dom --------------------------------------------------
var dom = {
  date_now: $('.date_now'), // 当前年
  header: $('.header'), // 头部
  loading: $('.loading'), // loading
  select: $('select'), // 下拉框
  ask_page: $('.ask_page'), // 教师提问页面
  practise_page: $('.practise_page'), // 课堂作业页面
  common_main_menu_li: $('.common_main_menu li'), // tab
  banner_left_inner: $('.banner_left_inner'), // 上半部分左侧
  banner_right_inner: $('.banner_right_inner'), // 上半部分右侧
  askinRate: $('.askinRate'), // 教师提问参与率
  askrightRate: $('.askrightRate'), // 教师提问正确率
  testinRate: $('.testinRate'), // 课堂作业参与率
  testrightRate: $('.testrightRate'), // 课堂作业正确率
  randaskCount: $('.randaskCount'), // 随机问答
  ratingCount: $('.ratingCount'), // 抢答
  demoCount: $('.demoCount'), // 学生示范
  student_name: $('.student_name'), // 学生姓名
  practise_main_right_student: $('.practise_main_right_student'), // 课堂作业右侧学生姓名
  ask_page_have_data: $('.ask_page_have_data'), // 教师提问页面有数据
  ask_page_no_data: $('.ask_page_no_data'), // 教师提问页面无数据
  practise_page_have_data_select: $('.practise_page_have_data select'), // 课堂作业下拉框
  practise_page_have_data: $('.practise_page_have_data'), // 课堂作业有数据
  practise_page_no_data: $('.practise_page_no_data'), // 课堂作业无数据
  main_right_content: $('.main_right_content'), // 课堂作业右侧
  pb_carousel: $('.pb-carousel'), // 课堂练习左侧图片轮播
  pb_carousel_ind: $('.pb-carousel-ind'), // 轮播下方目录
  practise_main_right_strong: $('.practise_main_right_strong'), // 题目总数
  practise_main_right_score: $('.practise_main_right_score'), // 得分
}
// -------------------------------------------------- 3.列表字符串模板 --------------------------------------------------
// 教师提问模板
var ask_list_str = '{@ for(var i = 0; i < ask_list.length; i++) { @}' +
        '<div class="ask_page_item"> ' +
          '<p class="text_overflow question_title">提问{{ i + 1 }}</p>' +
          '<div class="question_content clearfix">' +
            '<div class="fl question_body">' +
              '<img class="can_view_img" src="{{ask_list[i].body}}">' +
            '</div>' +
            '<div class="stu_answer fl">' +
              '<p class="answer_title">学生作答</p>' +
              '{@ if(ask_list[i].astype === 1 && ask_list[i].questiontitle !== "主观题" && ask_list[i].rightResult !== ask_list[i].studentResult) { @}' +
                '<p class="answer_content wrong">{{ ask_list[i].studentResult }}</p>' +
              '{@ } @}' +
              '{@ if(ask_list[i].astype === 1 && ask_list[i].questiontitle !== "主观题" && ask_list[i].rightResult === ask_list[i].studentResult) { @}' +
                '<p class="answer_content correct">{{ ask_list[i].studentResult }}</p>' +
              '{@ } @}' +

              '{@ if(ask_list[i].astype === 1 && ask_list[i].questiontitle === "主观题") { @}' +
                '<div class="answer_content_img">' +
                  '<img class="can_view_img" src="{{ask_list[i].studentResult}}">' +
                '</div>' +
              '{@ } @}' +

              '{@ if(ask_list[i].astype === 2) { @}' +
                '<div class="answer_content_img">' +
                  '<img class="can_view_img" src="{{ask_list[i].studentResult}}">' +
                '</div>' +
              '{@ } @}' +

            '</div>' +
            '<div class="right_answer fl">' +
              '<p class="answer_title">正确答案</p>' +
              '<p class="answer_content right">{{ ask_list[i].rightResult }}</p>' +
            '</div>' +
          '</div>' +
        '</div>' +
    '{@ } @}';

// 下拉框模板
var drop_list = '{@ for(var i = 0; i < practise_list.length; i++) { @}' +
      '<option value="{{practise_list[i]}}"> 作业{{ i + 1 }}' +
      '</option>' +
    '{@ } @}';

// 课堂练习作答详情模板
var practise_detail_str = '{@ for(var i = 0; i < practise_detail_list.length; i++) { @}' +
        '<div class="detail_list_item"> ' +
        '{@ if (practise_detail_list[i].questiontype <= 2 || practise_detail_list[i].questiontype === 10) { @}' +
          '<div class="answer_title">' +
            '<span>{{ get_han_number(i + 1) }}丶 {{ practise_detail_list[i].qsTitle }}' +
              '({{ practise_detail_list[i].fenValue }}&apos; x {{ practise_detail_list[i].singleQuestionSize }} = {{ practise_detail_list[i].fenValue * practise_detail_list[i].singleQuestionSize }} 分)</span>' +
            '<span class="fr">得分: <strong>{{ practise_detail_list[i].qsScore }}</strong> 分</span>' +
          '</div>' +
          '<div class="answer_table_head clearfix">' +
            '<div class="fl head no cell">' +
              '题号' +
            '</div>' +
            '<div class="fl head right_ans cell">' +
              '标准答案' +
            '</div>' +
            '<div class="fl head student_ans cell">' +
              '学生答案' +
            '</div>' +
            '<div class="fl head help cell">' +
              '求讲解' +
            '</div>' +
          '</div>'+
          '<div class="answer_table_content">' +
          '</div>' +
        '{@ } @}' +
        '{@ if (practise_detail_list[i].questiontype > 2 && practise_detail_list[i].questiontype !== 10) { @}' +
          '<div class="answer_title">' +
          '<span>{{ get_han_number(i + 1) }}丶 {{ practise_detail_list[i].qsTitle }}' +
            '({{ practise_detail_list[i].fenValue }}&apos; x {{ practise_detail_list[i].singleQuestionSize }} = {{ practise_detail_list[i].fenValue * practise_detail_list[i].singleQuestionSize }} 分)</span>' +
          '<span class="fr">得分: <strong>{{ practise_detail_list[i].qsScore }}</strong> 分</span>' +
          '</div>' +
          '<div class="answer_table_content">' +
          '</div>' +
        '{@ } @}' +
        '</div>' +
    '{@ } @}';

  // 表格内容
  var table_content_str = '{@ for(var j = 0; j < table_item.length; j++ ) {@}' +
      '<div class="content_item clearfix">' +
        '<div class="fl content no cell">' +
          '{{table_item[j].questionnumber}}' +
        '</div>' +
        '<div class="fl content right_ans cell text_overflow" title="{{answer_transform(table_item[j].rightresult || [], table_item[j].questiontype)}}">' +
          '{{answer_transform(table_item[j].rightresult || [], table_item[j].questiontype)}}' +
        '</div>' +
        '<div class="fl content student_ans cell text_overflow" title="{{answer_transform(table_item[j].answers, table_item[j].questiontype)}}">' +
          '{{answer_transform(table_item[j].answers, table_item[j].questiontype)}}' +
        '</div>' +
        '<div class="fl content help cell text_overflow">' +
          '{{table_item[j].helpers}}' +
        '</div>' +
      '</div>'+
    '{@ } @}';

    // 主观题
  var own_content_str = '{@ for(var i = 0; i < own_content_list.length; i++) { @}' +
    ' <div>' +
        '<div class="reference_answer">' +
          '<p class="small_tilte">参考答案</p>' +
          '<div>{{answer_transform(own_content_list[i].rightresult, own_content_list[i].questiontype)}}</div>' +
        '</div>' +
        '<div class="student_answer">' +
          '<div class="clearfix">' +
            '<p class="fl small_tilte">学生答案</p>' +
          '</div>' +
          '{@ if(own_content_list[i].ispic){ @}' +
          '<div class="student_answer_content" v-if="own_content_list[i].ispic" >' +
            '<img src="{{own_content_list[i].answers[0]}}" class="can_view_img" />' +
          '</div>' +
          '{@ } else { @}' +
          '<div class="student_answer_content">{{answer_transform(own_content_list[i].answers, own_content_list[i].questiontype)}}</div>' +
          '{@ } @}' +
          '<div class="remark">' +
            '<span>老师评语：</span>' +
            '{{ (own_content_list[i].comments && own_content_list[i].comments[0]) || "" }}' +
          '</div>' +
        '</div>' +
      '</div>' +
    '{@ } @}';
  // 轮播图
  var img_list_str = '{@ for(var i = 0; i < img_list.length; i++) { @}' +
        '{@ if (i === 0) { @}' +
          '<li class="pb-this">' +
            '<img class="can_view_img" src="{{img_list[i]}}"/>' +
          '</li>' +
        '{@ } else { @}' +
          '<li>' +
            '<img class="can_view_img" src="{{img_list[i]}}"/>' +
          '</li>' +
        '{@ } @}' +
      '{@ } @}';

  // 轮播图下面的目录
  var img_icon_str = '{@ for(var i = 0; i < img_list.length; i++) { @}' +
        '{@ if (i === 0) { @}' +
          '<li class="pb-this">' +
          '</li>' +
        '{@ } else { @}' +
          '<li></li>' +
        '{@ } @}' +
      '{@ } @}';
// --------------------------------------------------- 4.类（图片放大轮播图） -------------------------------------------------
var PhotoswipeUtil = (function () {
  function PhotoswipeUtil(selector) {
    this.lock = false;
    this.options = {
      index: 0,                 // 开始的滑块（图片），必须为数字，默认0（第一张）
      bgOpacity: 0.85,          // 背景透明度
      showHideOpacity: true,    // 当调用时是否展示透明度和比例变化动画，默认false。
      loop: true,               // 是否循环展示图片，当左右滑动图片时
      closeOnScroll: false,     // 在页面上滚动关闭图集， 仅适用于没有硬件触摸支持的设备
      history: false,           // 是否使用history模式，默认true，历史记录模式支持url返回
      showAnimationDuration: 0, // 展示动画过渡时间，默认333，数字
      hideAnimationDuration: 0, // 隐藏动画过渡间隔时间，默认333，数字
    };
    this.el = document.querySelector(selector);
    if (!this.el) {
      console.warn('PhotoswipeUtil init error');
      return;
    }
  }

  PhotoswipeUtil.prototype = {
    constructor: PhotoswipeUtil,
    init: function (items) {
      this.gallery = new PhotoSwipe(this.el, PhotoSwipeUI_Default, items, this.options);
      this.gallery.init();
    },
    open: function (imgs) {
      var that = this;
      if (!imgs || !imgs.length) { return; }
      if (this.lock) { return; }
      that.lock = true;

      var items = [];

      get_image_dom_natural_wh(imgs[0], function(wh) {
        for (var i = 0; i < imgs.length; i++) {
          var img = imgs[i];
          items.push({src: img.src, w: wh.width, h: wh.height});
        }

        that.init(items);
        that.lock = false;
      });
    },
    set_active: function(index) {
      if (index < 0) { return; }
      if (!this.gallery || !this.gallery.goTo) { return null; }
      this.gallery.goTo(index);
    }
  }
  return PhotoswipeUtil
}());
// --------------------------------------------------- 5.实例 -------------------------------------------------

var loading = new Loading(dom.loading);

// --------------------------------------------------- 6.事件 -------------------------------------------------
/** 课堂练习下拉框变化 */
dom.select.change(function(e) {
  ajax_detail_require.getDetailList(e.target.value);
});


// --------------------------------------------------- 7.函数 -------------------------------------------------

/** 切换tab */
function change_tab(type) {
  if (type === 'ask') {
    dom.common_main_menu_li.eq(0).attr('class', 'active');
    dom.common_main_menu_li.eq(1).attr('class', '');
    dom.ask_page.show();
    dom.practise_page.hide();
  } else {
    dom.common_main_menu_li.eq(0).attr('class', '');
    dom.common_main_menu_li.eq(1).attr('class', 'active');
    dom.ask_page.hide();
    dom.practise_page.show();
  }
}

/** 设置环形进度 */
function set_rate_attr(rate, name) {
  if (rate < 50) {
    $('.' + name + '_left').attr('style', 'height: ' + rate * 100 / 50 + 'px');
    $('.' + name + '_right').attr('style', 'height: 0');
  } else {
    $('.' + name + '_left').attr('style', 'height: 100px');
    $('.' + name + '_right').attr('style', 'height:' + (rate - 50) * 100 / 50 + 'px');
  }
}

/** 轮播图 */
function swipt_run() {
  carousel(
    $('.swipt'),	//必选， 要轮播模块(id/class/tagname均可)，必须为jQuery元素
    {
      type: 'leftright',	//可选，默认左右(leftright) - 'leftright' / 'updown' / 'fade' (左右/上下/渐隐渐现)
      autoplay: false,	//可选，默认true - true / false (开启轮播/关闭轮播)
    }
  );
}

/** 加载loading */
function banner_loading() {
  dom.loading.show();
  dom.banner_left_inner.hide();
  dom.banner_right_inner.hide();
}

/** 获取学生分析成功后的回调loading消失 */
function loading_cb () {
  setTimeout(function(){
    dom.loading.hide();
    dom.banner_left_inner.show();
    dom.banner_right_inner.show();
  }, 200);
};

// --------------------------------------------------- 8.请求 -------------------------------------------------
var ajax_detail_require = {

  /** 获取学生分析 */
  getStudentsAnalysis: function(cb) {
    var api = MAIN_CONFIG.WORK_API_ROOT + '/api/classreport/students-analysis-data?token=' + LOGINTOKEN + '&reportid=' + REPORTID;
    ajax_get(api, null, function(data) {
      var result = data.data;

      // 匹配当前学生id
      result.forEach(function(item, index) {
        if (Number(item.studentid) === Number(STUDENTID)) {
          // 填数据
          student_name = item.studentname;
          dom.askinRate.text(parseInt(item.askinRate));
          dom.askrightRate.text(parseInt(item.askrightRate));
          dom.testinRate.text(parseInt(item.testinRate));
          dom.testrightRate.text(parseInt(item.testrightRate));
          // 饼图进度
          set_rate_attr(parseInt(item.askinRate), 'askinRate');
          set_rate_attr(parseInt(item.askrightRate), 'askrightRate');
          set_rate_attr(parseInt(item.testinRate), 'testinRate');
          set_rate_attr(parseInt(item.testrightRate), 'testrightRate');
        }
        dom.randaskCount.text(item.randaskCount);
        dom.ratingCount.text(item.ratingCount);
        dom.demoCount.text(item.demoCount);
      });
      dom.student_name.text(student_name);
      dom.student_name.attr('title', student_name);
      dom.practise_main_right_student.text(student_name);
      dom.practise_main_right_student.attr('title', student_name);
      cb();
    });
  },

  /** 获取教师提问列表 */
  getTeacherAskList: function () {
    dom.ask_page_have_data.empty();
    var api = MAIN_CONFIG.WORK_API_ROOT + '/api/classreport/student-teacherAsk-list?token='+ LOGINTOKEN +'&reportid=' + REPORTID + '&studentid=' +  STUDENTID;

    ajax_get(api, null, function(data) {
      ask_list = data.data;
      if (ask_list && ask_list.length !== 0) {
        dom.ask_page_have_data.append(tpl(ask_list_str, ask_list));
        dom.ask_page_have_data.show();
        dom.ask_page_no_data.hide();
      } else {
        dom.ask_page_have_data.hide();
        dom.ask_page_no_data.show();
      }
    });
  },

  /** 课堂练习 */
  /** 获取练习列表 */
  getPractiseList: function () {
    var api = MAIN_CONFIG.WORK_API_ROOT + '/api/classreport/classpracticeid-list?token='+ LOGINTOKEN +'&reportid=' + REPORTID;

    ajax_get(api, null, function(data) {
      practise_list = data.data;
      if (practise_list && practise_list.length !== 0) {
        dom.practise_page_have_data_select.append(tpl(drop_list, practise_list));
        dom.practise_page_have_data.show();
        dom.practise_page_no_data.hide();
        ajax_detail_require.getDetailList(practise_list[0]);
        dom.select.selectMatch();
      } else {
        dom.practise_page_have_data.hide();
        dom.practise_page_no_data.show();
      }
    });
  },
  /** 获取作答详情 */
  getDetailList: function (actionid) {
    // 清空课堂作业数据
    dom.main_right_content.empty();
    dom.pb_carousel.empty();
    dom.pb_carousel_ind.empty();

    var api = MAIN_CONFIG.WORK_API_ROOT + '/api/markingstudent/action-detail?token='+ LOGINTOKEN +'&studentid=' + STUDENTID + '&classid=' +
    CLASSID + '&correctstate=1&actionid=' + actionid;

    ajax_get(api, null, function(data) {
      // 填数据
      dom.practise_main_right_strong.text(data.data.page.questionSize);
      dom.practise_main_right_score.text(data.data.page.totalScore);
      practise_detail_list = data.data.answerMapList;
      img_list = data.data.imgpath;

      // 轮播图
      if (img_list && img_list.length !== 0) {
        dom.pb_carousel.append(tpl(img_list_str, img_list));
        dom.pb_carousel_ind.append(tpl(img_icon_str, img_list));
        swipt_run();
      }

      // 表格数据
      if (practise_detail_list && practise_detail_list.length !== 0) {
        dom.main_right_content.append(tpl(practise_detail_str, practise_detail_list));
        for (var i = 0; i < practise_detail_list.length; i++) {
          if (practise_detail_list[i].questiontype <= 2 || practise_detail_list[i].questiontype === 10) { // 客观题
            table_item = practise_detail_list[i].singleQuestionList;
            $('.answer_table_content').eq(i).append(tpl(table_content_str, table_item));
          } else { // 主观题
            own_content_list = practise_detail_list[i].singleQuestionList;
            $('.answer_table_content').eq(i).append(tpl(own_content_str, own_content_list));
          }
        }
      }
    });
  },
};

// --------------------------------------------------- 9.启动函数 -------------------------------------------------

$(function(){
  banner_loading();
  ajax_detail_require.getStudentsAnalysis(loading_cb);
  ajax_detail_require.getTeacherAskList();
  ajax_detail_require.getPractiseList();
  dom.date_now.text(new Date().getFullYear());
  if (GetQueryString('platform') !== 'mobile') {
    dom.header.show();
  }

  var photo = new PhotoswipeUtil('.pswp');
  window.addEventListener('click', function (ev) {
    var target = ev.target;
    var imgs = [];
    var active_index = 0;

    if (target.nodeName.toLowerCase() !== 'img' || (target.className.indexOf('can_view_img') === -1)) { return; }

    // 轮播图内或者父级元素有 can_view_img_wrapper className 的图片，多张展示
    var $wrap = $(target).parents('.pb-carousel');
    if ($wrap.length) {
      var $imgs = $wrap.find('img');

      for (var i = 0; i < $imgs.length; i++) {
        imgs.push($imgs[i]); // 转原生 dom
        if ($imgs[i] === target) { active_index = i; }
      }
    } else {
      imgs = [target];
    }

    photo.open(imgs);
    // 当前展示第几张图片
    photo.set_active(active_index);
  });
});
