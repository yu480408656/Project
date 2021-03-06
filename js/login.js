; $(function () {
    $(".loginSwitch").click(function () { $(this).addClass("active").siblings().removeClass("active"); $(".loginContainer").show().siblings(".registerContainer").hide() }); $(".registerSwitch").click(function () { $(this).addClass("active").siblings().removeClass("active"); $(".registerContainer").show().siblings(".loginContainer").hide(); });

    let regEmail = /^[a-z\d]+(\.[a-z\d]+)*@([\da-z](-[\da-z])?)+(\.{1,2}[a-z]+)+$/;
    let regPw = /^[a-z0-9_-]{6,18}$/;
    $(".registerId").bind("input propertychange",function (e) { 
        if (!regEmail.test($(this).val())) {
            $(".loginAlert1").show();
        } else {
            $(".loginAlert1").hide();
        }
    });
    $(".registerPw").bind("input propertychange",function (e) {
        if (!regPw.test($(this).val())) {
            $(".loginAlert2").show();
        } else {
            $(".loginAlert2").hide();
        }
    });




    $(".loginBtn").click(function () {
        
        let userId = $(".loginId").val();
        let userPw = md5($(".loginPw").val());

        $.ajax({
            type: "get",
            url: "http://localhost:3000/user/" + userId,
        }).then((data) => {
            if (userId == data.id && userPw == data.password) {
                window.location.href = "http://localhost:8080/index.html?uid=" + userId;
            } else {
                alert("用户名或密码错误");
                return false;
            }
        });
    });

    $(".registerBtn").click(function () {
        let userId = $(".registerId").val();
        let userPw = md5($(".registerPw").val());
        $.get("http://localhost:3000/user/" + userId
        ).then(() => {
            alert("用户用已存在");
        }, () => {
            $.ajax({
                type: "post",
                url: "http://localhost:3000/user",
                data: { id: userId, password: userPw },
            });
            alert("注册成功");
        });

    });
});