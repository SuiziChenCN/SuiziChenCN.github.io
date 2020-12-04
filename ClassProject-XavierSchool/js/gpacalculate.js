function getnum(f, c) {
    var t = Math.pow(10, c);//返回10的c次幂
    return Math.round(f * t) / t//对传入数字+0.5后向下取值 四舍六入
}

$(document).ready(function () {//jqery用法 dom加载完立即调用
	var hideSecColumn = function (){//隐藏列 猜测用于右半边缩略内容
		$('.secColumn').hide();
	}	
    $.random = function (min, max) {//返回0-1间的任意随机数
        var rand = parseInt(Math.random() * (max - min + 1) + min);//rand php取随机数
        return Math.round(rand)//四舍六入
    };
        "rank": [{
            "rank": "A",
            "point": 4
        }, {
            "rank": "A-",
            "point": 3.7
        }, {
            "rank": "B+",
            "point": 3.3
        }, {
            "rank": "B",
            "point": 3
        }, {
            "rank": "B-",
            "point": 2.7
        }, {
            "rank": "C+",
            "point": 2.3
        }, {
            "rank": "C",
            "point": 2
        }, {
            "rank": "C-",
            "point": 1.7
        }, {
            "rank": "D+",
            "point": 1.3
        }, {
            "rank": "D",
            "point": 1
        }, {
            "rank": "F",
            "point": 0
        }]//等级制
    };
   
    var reset = function () {//267行
            var disabled = $($('.name')[0]).attr('disabled');
            if (!disabled) $('.name').attr('disabled', true);.name禁用
            $('.score,.credit').css({分数 学分css
                "color": "#333"
            }).val('');
            $('.name').css({
                "color": "#BBB",
                "background": "#DDD"
            });
        };

	
	createHandredItems();
    makeArithOpts();

    $('.score')[0].focus();
    var getData = function () {
            var arr = new Array();//布局
            $('.gpainput_cn').each(function () {
                var score = $(this).find('.score').val();
                var credit = $(this).find('.credit').val();
                var name = $(this).find('.name').val();
                if (score && credit) arr.push({
                    "name": name,
                    "score": score,
                    "credit": credit
                })
            });
            return arr;
        };
    var data_arr = getData();
    var calculate = function (type) {
            var standard_num = 0,
                standard_sum = 0,
                credit_sum = 0,
                score = 0,
                credit = 0;
            $(data_arr).each(function (i) {
                score = parseFloat($(data_arr)[i].score), credit = parseFloat($(data_arr)[i].credit);
                standard_sum += score * credit;
                credit_sum += credit
            });
            if (credit_sum == 0 || credit_sum < 0) return;//以下下删掉了百分制和五分制的计算
            if (type == "rank") {
                dataObj[2].standardGPA = '--';
                var rankObj = arithmetic.rank;
                var common_num = 0,
                    common_sum = 0;
                $(rankObj).each(function (i) {
                    var rank = rankObj[i].rank,
                        point = rankObj[i].point;
                    $(data_arr).each(function (j) {
                        score = $(data_arr)[j].score, credit = parseFloat($(data_arr)[j].credit);
                        if (rank == score) common_sum += parseFloat(credit * point)
                    })
                });
                common_num = getnum(common_sum / credit_sum, 2);
                dataObj[2].commonGPA = common_num || 0
            }
            return dataObj;
        };
    var changeIntro = function () {//变化函数介绍
            var score_type = $('#rank').val();//当分数种类为分数处选择时
            var index = $('.intro_wrapper').children().index($('.intro_' + score_type));
            $('.intro_item').eq(index).show().siblings().hide()
        };
    var init = function () {
            $('.name').attr('disabled', false).each(function () {
                $(this).attr('title', $(this).val())
            });
           
            $('.score')[0].focus();
            var score_type = $('.scoreType').val();
			if($('.scoreType').val() == 'hundred'){//百分制
				for(var i=1; i<8; i++){				
					$('#showGPA1_' + i).html(score_type == 'rank' ? '--' : 0);
					$('#showGPA2_' + i).html('0');
				}
			}
			else{
				$('#showGPA1_1').html(score_type == 'rank' ? '--' : 0);
				$('#showGPA2_1').html('0');
			}
            $('.name').css("background", "#DDDDDD");
            reset()
        };
    init();
    $('.form_tit1_ri').click(function () {//课程名是否可以编辑处的函数
        if ($('.name').attr('disabled')) {
            $('.name').attr('disabled', false).css({
                "background": "#fff",
                color: "#333"
            });
            $('.name')[0].select()
        } else {
            $('.name').attr('disabled', true).css({
                "background": "#DDD",
                color: "#BBB"
            });
            $('.score')[0].focus()
        }
    });
    $('#calculate').click(function (flag) {//button1点击后的效果 计算程序
        if (flag == 0) return;
		if($('.scoreType').val() == 'hundred'){
			$('.arithmeticType').each(function (index){
				calcHandler($('.scoreType').val(), $(this).val(), '#showGPA1_' + ($('.arithmeticType').size() - parseInt(index)), '#showGPA2_' + ($('.arithmeticType').size() - index ));
			});
		}
		else{
			calcHandler($('.scoreType').val(), $('.arithmeticType').val(), '#showGPA1_1', '#showGPA2_1');
		}
    });
	
	var calcHandler = function (score_type, arith_type, target1, target2) {
		data_arr = getData();
		dataObj = calculate(score_type) || [{
			standardGPA: 0,
			commonGPA: []
		}, {
			standardGPA: 0,
			commonGPA: 0
		}, {
			standardGPA: '--',
			commonGPA: 0
		}];
		var index = score_type == 'hundred' ? 0 : score_type == 'five' ? 1 : score_type == 'rank' ? 2 : 0;
		$(target1).html(dataObj[index].standardGPA);
		$('#showGPA3_2').html(dataObj[index].standardGPA);
		var commonGPA = dataObj[index].commonGPA || 0;
		if (typeof commonGPA == 'object') {
			$(target2).html(arith_type ? commonGPA[arith_type] : '0')
		} else {
			$(target2).html(commonGPA);
		}
		for(var i=1; i <=$('.arithmeticType').size(); i++){
			if($('#spanID' + i).html().indexOf('4.3') != -1){
				if($('#showGPA2_' + i).html() != 0 && $('#showGPA2_' + i).html().indexOf('/') == -1){
					$('#showGPA2_' + i).html($('#showGPA2_' + i).html() + '/4.3');
				}
			}
			else{
				if($('#showGPA2_' + i).html() != 0 && $('#showGPA2_' + i).html().indexOf('/') == -1){
					$('#showGPA2_' + i).html($('#showGPA2_' + i).html() + '/4');
				}
			}
		}
		if($('#showGPA3_2').html() != 0 && $('#showGPA3_2').html().indexOf('/') == -1){		
			$('#showGPA3_2').html($('#showGPA3_2').html() + '/4');
		}
	}
	
    $('#btn2').click(function () {
		var result = window.confirm("确定要清空吗？");
		if(result){
        	init();
		}
    });
    //有删减
    $('.scoreType,.arithmeticType').change(function () {
        if ($(this).hasClass('arithmeticType')) {
           // $('#calculate').trigger('click')
        } else if ($(this).hasClass('scoreType')) {
            makeArithOpts();
            reset();
            var score_type = $('.scoreType').val();
            if (score_type == "rank") {
                $('#showGPA1_1').html("--")
            } else {
				for(var i=1; i<=$('.trLine').size(); i++){
					$('#showGPA1_' + i).html(0);
                	$('#showGPA2_' + i).html(0);
					$('#showGPA3_2').html(0);
				}
            }
        }		
        changeIntro();
        dataObj = calculate(score_type)
    });
    var validate = function (str, target) {
            var str = $.trim(str);
            var reg;
            if (target.hasClass('score')) {
                var score_type = $('.scoreType').val();
                reg = score_type == 'hundred' ? /^([\d]{1,2}|[\d]]+[\.][\d]{1,2}|100|100.0|100.00)$/g : score_type == 'five' ? /^([0-5]{1}|[2-4]+[\.][\d]{1,2}|5.0|5.00)$/g : score_type == 'rank' ?/[A,A\+,A\-,B,B\+,B\-,C,C\+,C\-,D,D\+,D\-,F]{1,2}$/g
            } else if (target.hasClass('credit')) {
                var credit = $.trim(target.val());
                var reg2 = /[\d]$/g;
                if (!reg2.test(credit) && credit) {
                    $(target).val('Wrong information').css("color", "red").click(function () {
                        if ($(target).val() == 'Wrong information') $(target).css("color", "#333").val('')
                    })
                }
                return;
            } else if (target.hasClass('name')) {
                str = str.substring(0, 20);
                target.val(str).attr('title', str);
                return
            }
            if (!reg.test(str) && str) {
                $(target).val('信息输入错误').css("color", "red").click(function () {
                    if ($(target).val() == '信息输入错误') $(target).css("color", "#333").val('')
                })
            }
        };
    $('.name,.score,.credit').blur(function () {
        validate($(this).val(), $(this));
       // $('#calculate').trigger('click')
    });
    var scrollTop = $(document).scrollTop();
    $('#add_item').click(function (e) {
        var index = $('.gpainput_cn').size() + 1;
        var disabled = $($('.name')[0]).attr('disabled');
        var style = $($('.name')[0]).attr('style');
		var txtnum = $('#txtNum').val();
        if (index > 10) {
            alert('You have added 10 items!');
            e.preventDefault();
            return;
        }
		for(var i = 0; i < txtnum; i++){
			var item = $('<div class="gpainput_cn"><input type="text" value="课程' + index + '" name="" id="name' + index + '" class="input_txt name"><input type="text" name="" id="score' + index + '" class="input_txt score"><input type="text" name="" id="credit' + index + '" class="input_txt credit"><div class="clear"></div></div>');
			$('.add').before(item);
			item.find('.name').attr({
				'disabled': disabled,
				"style": style ? style : ""
			}).select();
			scrollTop += 38;
			$(document).scrollTop(scrollTop);
			index++;
		}
		$('#txtNum').val('1');
		$('.name,.score,.credit').blur(function () {
        validate($(this).val(), $(this));
       // $('#calculate').trigger('click')
    	});
        e.preventDefault()
    });
    //  //
    $('#calculate').click(function() {    //  计算，弹窗显示

        var showBox = $('<div id="showBox">');
        var mask = $('<div id="mask">');
        
        var close = $('<spam id="close">').html('×');
        
        mask.css('height', $(document).height());

        $('body').append(mask, showBox);
  
        showBox.find('.intro').remove();
        

        showBox.css({
            left: ($(window).width() - showBox.width()) / 2 + $(document).scrollLeft(),
            top: '80px'  // ($(window).height() - showBox.height()) / 2 + $(document).scrollTop()
        });
        if ($(window).height() <= showBox.height()) {
            showBox.css('top',0);
        }
        if ($(window).width() <= showBox.width()) {
            showBox.css('left',0);
        }
        close.click(function () {     //  关闭窗口
            showBox.remove();
            mask.remove();
        })
        $(window).resize(function () {     //   窗口改变大小里窗口位置保持居中
            showBox.css({
                left: ($(window).width() - showBox.width()) / 2 + $(document).scrollLeft(),
                top: '80px'    //($(window).height() - showBox.height()) / 2 + $(document).scrollTop()
            });
            mask.css('height', $(document).height());
            if ($(window).height() <= showBox.height()) {
                showBox.css('top',0);
            }
            if ($(window).width() <= showBox.width()) {
                showBox.css('left',0);
            }
        })
    })
    
});