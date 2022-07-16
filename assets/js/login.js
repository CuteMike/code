$(function () {
  // 点击切换到注册页面
  $('#link_reg').on('click', function () {
    $('.login').hide()
    $('.reg').show()
  })
  //点击切换到登录页面
  $('#link_login').on('click', function () {
    $('.login').show()
    $('.reg').hide()
  })
  // 引入layui.form进行表单验证
  const form = layui.form
  // 引入layui.layer进行信息提示
  const layer = layui.layer
  //自定义验证规则
  form.verify({
    pwd: [
      /^[\S]{6,12}$/
      , '密码必须6到12位，且不能出现空格'
    ],
    repwd: function (value) {
      let pwd = $('.pwdval').val()
      if (pwd !== value) {
        return '两次密码不一致！'
      }
    }
  })



  // 点击注册账号发起请求
  $('#form_reg').on('submit', function (e) {
    //阻止默认提交行为
    e.preventDefault()
    // console.log($(this).serialize());
    // console.log($('#form_reg [name=user]').val());
    //发起注册请求
    $.ajax({
      url: '/api/reguser',
      method: 'POST',
      data: {
        username: $('#form_reg [name=user]').val(),
        password: $('#form_reg [name=password]').val()
      },
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        $('#link_login').click()
        return layer.msg("注册成功，请登录")
      }
    })
  })
  // 点击登录账号发起请求
  $('#form_login').on('submit', function (e) {
    //阻止默认提交行为
    e.preventDefault()
    // 发起登录请求
    $.ajax({
      url: '/api/login',
      method: 'POST',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        layer.msg('登录成功')
        localStorage.setItem('token', res.token)
        location.href = '/index.html'
      }
    })
  })



})