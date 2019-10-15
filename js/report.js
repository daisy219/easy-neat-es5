// ---------- 1.全局变量 -- 2.获取dom -- 3.列表字符串模板 -- 4.实例 -- 5.事件 -- 6.函数 -- 7.请求 -- 8.启动函数 -------------------------------


// -------------------------------------------------- 1.全局变量 --------------------------------------------------
// 当前页
var page_cur = 1;
// 总页数
var total_page = 0;
// 报告列表数据
var report_list = [];
// -------------------------------------------------- 2.获取dom --------------------------------------------------

var dom = {
  report_list: $('.report_list'), // 列表
  final_page: $('.final_page'), // 末页
  first_page: $('.first_page'), // 末页
  page_search: $('.page_search'), // 跳转到第几页
  pagination: $('#pagination'), // 分页
  have_data: $('.have_data'), // 列表有数据
  no_data: $('.no_data'), // 列表无数据
  loading: $('.loading'), // loading
  total: $('.total'), // 总页数
  date_now: $('.date_now'), // 当前年
}
// --------------------------------------------------- 3.列表字符串模板 -------------------------------------------------
var str = '{@ for(var i = 0; i < report_list.length; i++) { @}' +
        '<div class="report_item fl"> ' +
            '<div class="subject">' +
                '<p class="text_overflow">{{ report_list[i].subjectName }}</p>' +
            '</div>' +
            '<div class="content" onclick="click_item(&apos;{{report_list[i].actionname}}&apos;, {{report_list[i].classid}}, {{report_list[i].reportid}}, {{report_list[i].studentid}})">' +
                '<p class="text_overflow" title="{{report_list[i].actionname}}">{{ report_list[i].actionname }}</p>' +
            '</div>' +
            '<div class="info">' +
                '<p class="teacher">讲师：{{ report_list[i].teacherName }}</p>' +
                '<div class="clearfix">' +
                    '<div class="fl">' +
                        '<img src="./img/time.png">' +
                    '</div>' +
                    '<p class="time">{{ report_list[i].createAt }}</p>' +
                '</div>' +
            '</div>' +
        '</div>' +
    '{@ } @}';

// --------------------------------------------------- 4.实例 -------------------------------------------------
/** 分页插件 */
var my_page = new Pagination(dom.pagination, {
  length: 0,
  every: 12,
  onClick: function(page) {
    ajax_require.getList(page.num.current, TOKEN);
    dom.page_search.val(page.num.current);
  }
});
var loading = new Loading(dom.loading);
// --------------------------------------------------- 5.事件 -------------------------------------------------
/** 点击末页 */
dom.final_page.on('click', function() {
  if (page_cur !== total_page) {
    my_page.num.current = total_page;
    my_page.show();
    ajax_require.getList(total_page, TOKEN);
    dom.page_search.val(total_page);
  }
});

/** 点击首页 */
dom.first_page.on('click', function() {
  if (page_cur !== 1) {
    my_page.num.current = 1;
    my_page.show();
    ajax_require.getList(1, TOKEN);
    dom.page_search.val(1);
  }
});

/** 回车确认 */
dom.page_search.on('keyup', function(e) {
  if (e.code === 'Enter') {
    var cur = dom.page_search.val();
    if (Number(cur) === page_cur) {
      return;
    }
    my_page.num.current = cur;
    my_page.show();
    ajax_require.getList(cur, TOKEN);
  }
});


/** 搜索特定页 */
// dom.page_search.blur(function(e) {
//   var cur = dom.page_search.val();
//   if (Number(cur) === page_cur) {
//     return;
//   }
//   if (cur < total_page) {
//     my_page.num.current = cur;
//     my_page.show();
//     ajax_require.getList(cur, TOKEN);
//   } else {
//     my_page.num.current = total_page;
//     my_page.show();
//     ajax_require.getList(total_page, TOKEN);
//     dom.page_search.val(total_page);
//   }
// });

// --------------------------------------------------- 6.函数 -------------------------------------------------

/** 点击跳转 */
function click_item(name, classid, reportid, studentid) {
  window.open("file:///D:/project/class/detail.html?logintoken=" + TOKEN +'&classid='+ classid +'&name='+ name +'&reportid='+ reportid +'&studentid=' + studentid, '_blank');
}
// --------------------------------------------------- 7.请求 -------------------------------------------------
var ajax_require = {

  /** 获取token */
  getToken: function(userid) {
    var api = MAIN_CONFIG.AUTH_API_ROOT + '/get-user-token?userid=' + userid;
    ajax_get(api, null, function(result) {
      TOKEN = result.data;
      ajax_require.getList(1, TOKEN);
    });
  },

  /** 获取列表 */
  getList: function (page, token) {
    var api = MAIN_CONFIG.WORK_API_ROOT + '/api/classreport-stu/list-nb?page='+ page +'&pageline=12&token=' + token;
    loading.show();
    dom.report_list.empty();
    dom.have_data.hide();

    ajax_get(api, null, function(result) {
      if (result.code === 200) {
        report_list = result.data.itemList;
        if (report_list && report_list.length !== 0) {
          // 填入数据
          dom.report_list.append(tpl(str, report_list));

          // 分页
          my_page.num.length = result.data.page.total;
          page_cur = result.data.page.cur;
          total_page = Math.ceil(result.data.page.total / 12);
          dom.total.text('共'+ total_page + '页');

          // loading
          setTimeout(function() {
            dom.loading.hide();
            my_page.show();
            dom.have_data.show();
            dom.no_data.hide();
          }, 200);
        } else {
          setTimeout(function() {
            dom.loading.hide();
            dom.have_data.hide();
            dom.no_data.show();
          }, 200)
        }
      } else {
        dom.loading.hide();
        dom.no_data.show();
      }
    });
  },
};

// --------------------------------------------------- 8.启动函数 -------------------------------------------------

$(function() {
  ajax_require.getToken(encodeURIComponent(USERID));
  dom.page_search.val(1);
  dom.date_now.text(new Date().getFullYear());
});
