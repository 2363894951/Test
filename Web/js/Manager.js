layui.use(['laydate', 'laypage', 'layer', 'table', 'carousel', 'upload', 'element', 'slider', 'jquery', 'laytpl', 'util'], function(){
    var laydate = layui.laydate //日期
        , laytpl = layui.laytpl
        , util = layui.util
        ,laypage = layui.laypage //分页
        ,layer = layui.layer //弹层
        ,table = layui.table //表格
        ,carousel = layui.carousel //轮播
        ,upload = layui.upload //上传
        ,element = layui.element //元素操作
        ,slider = layui.slider //滑块
        , $ = layui.jquery;

    laydate.render({
        elem: '#data'
        , value: new Date()
        //或 elem: document.getElementById('test')、elem: lay('#test') 等
    });
   var r= table.render({
        elem: '#test',
        id:'test',
        url: "/Manager/FindManageList",
        toolbar: "default",
        page: true,
        toolbar:"#tools",
        cols:[[
            { type: 'checkbox', fixed: 'left' }
            , { field: 'id', title: 'ID', sort: true, fixed: 'left' }
            , { field: 'name', title: '姓名' }
            , { field: 'addres', title: '收件地址', sort: true }
            , { field: 'phone', title: '电话',  sort: true }
            , { field: 'subject', title: '任教科目',  sort: true }
            , { field: 'class', title: '年级', sort: true }
            , {
                field: 'logDate', title: '时间'
              }
        ]]
    });
    table.on('toolbar(test)', function(obj){ //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
        var data = obj.data //获得当前行数据
            ,layEvent = obj.event; //获得 lay-event 对应的值
        if(layEvent === 'add'){
            layer.msg('添加操作');
            layer.open({
                type: 1,
                area:'900px',
                title:'添加信息',
                content: $('#addPage') //这里content是一个DOM，注意：最好该元素要存放在body最外层，否则可能被其它的相对元素所影响
            });
        } else if(layEvent === 'query'){
            var  name= $("#where").val();
            if(name==""){
                layer.msg("姓名条件不能是空",{icon:3});
            }else{
                table.reload('test', {
                    url: '/Manager/FindManageList'
                    ,where:{
                        name:name
                    },page:{
                        curr:1
                    } //设定异步数据接口的额外参数
                    //,height: 300
                });
            }
           
           // $.ajax({
           //     url:"/Manager/Manager",
           //     type:"get",
           //     data:$("#where").val(),
           //     dataType:'json',
           //     success: function (res) {
           //         r.reload();
           //     },
           //     error:function (res) {
           //         layer.msg('根据姓名查询失败',{"icon":2});
           //     }
           // });
        }
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
        }
        else if (cclass == '')
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

                    layer.msg('添加成功');
                    location.reload();
                },
                error:function (res) {
                    layer.msg('添加失败');
                }
            })
            
        }
        
    })
});


