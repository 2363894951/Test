layui.use(['laydate', 'laypage', 'layer', 'table', 'carousel', 'upload', 'element', 'slider','jquery','form'], function() {
    var laydate = layui.laydate //日期
        , laypage = layui.laypage //分页
        , layer = layui.layer //弹层
        , table = layui.table //表格
        , carousel = layui.carousel //轮播
        , upload = layui.upload //上传
        , element = layui.element //元素操作
        , slider = layui.slider //滑块
        ,form=layui.form
        , $ = layui.jquery;
    
    laydate.render({
        elem: '#data'
        ,value:new Date()
        //或 elem: document.getElementById('test')、elem: lay('#test') 等
    });
    $("#submit").click(function (res) {
       var pattern = /^1[34578]\d{9}$/;
        var myReg = /^[\u4e00-\u9fa5]+$/;
        var name=$("[name='name']").val();
        var addres=$("[name='addres']").val();
        var phone=$("[name='phone']").val();
        var subject=$("[name='subject']").val();
        var cclass=$("[name='class']").val();
        var date=$("[name='logDate']").val();
        if (name==''){
            layer.msg('姓名不能为空',{icon:2});
        }else if(!myReg.test(name)){
            layer.msg('姓名只能是中文',{icon:2});
        }
        else if(addres==''){
            layer.msg('收货地址不能为空',{icon:2});
        }
        else if(!myReg.test(addres)){
            layer.msg('收货地址必须是中文',{icon:2});
        }
        else if(phone.length!==11){
            layer.msg('电话号码必须11位',{icon:2});
        }else if(!pattern.test(phone)){
            layer.msg('请输入正确的手机号',{icon:2});
        }
        else if (subject==''){
            layer.msg('任教科目不能为空', { icon: 2 });
        } else if (!myReg.test(subject)) {
            layer.msg('任教科目必须是中文', { icon: 2 });
        }else if(cclass=='')
        {
            layer.msg('班级不能为空',{icon:2});
        }else if(date==''){
            layer.msg('日期不能为空',{icon:2});
        }else{
            $.ajax({
                url:"/Manager/AddManagerInfo",
                type:"get",
                data:$("#addform").serialize(),
                dataType:'json',
                success: function (res) {
                    layer.msg('添加成功',{icon:1});
                },
                error:function (res) {
                    layer.msg('添加失败');
                }
            })
        }
        
    })

});
