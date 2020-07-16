'use strict'
/**
 * @function: 阿拉伯数字与中文互相转换
 * 如数值过大，建议以字符串的形式传入
 * */
;
//设置一些默认参数
const UNIT_ARRAY = ['千','百','十'];
const POINT = '点';
// let NUM_ARRAY = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
const NUM_ARRAY = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
const NUM_UNIT_ARRAY = ['万', '亿', '兆', '京', '垓', '秭', '穰', '沟', '涧', '正', '载', '极', '恒河沙', '阿僧祗', '那由他', '不可思议', '无量', '大数'];
//匹配连续重复字符
const REG_DEL_REPEAT = /(.)\1+/g;
//反向四位分割字符串
const REG_SPLIT_LEN_R = /(\d{1,4})(?=(?:\d{4})+(?!\d))/g;

//转换成汉字

/**
* 格式化数字，方便后续处理
* */
function formatNum(_NUM) {
    // 过滤掉不是数字的字符
    if (!_NUM || isNaN(_NUM)) return ''
    // 把类1.0，1.00格式的数字处理成1
    // 统一转成字符串
    if (+_NUM === parseInt(_NUM)) return String(parseInt(_NUM))
    return String(_NUM)
}

//分割整数和小数部分
function dealNum(_NUM){
    _NUM = formatNum(_NUM)
    return _NUM.split('.');
}

//每四位分割成一组
function splitNum(_NUM){
    if(!_NUM || isNaN(_NUM)) return [];
    return _NUM.replace(REG_SPLIT_LEN_R,'$1,').split(',');

}

//转化四位数为汉字，加上单位
function switchNum(_NUM, _index){
    // num 需要转换的数字
    //_isFirst 是否为首位
    let _isFirst = !!_index;
    //最终返回结果的数组
    let res = [];
    if(!_NUM) return '';
    //不足四位的补足四位，以便补零
    let num = _NUM.split('').reverse().concat([0,0,0,0]).splice(0,4).reverse();
    num.map(function(n,i){
        if(!n || n == 0){
            res.push((num[i+1] == 0 || !num[i+1] || _isFirst) ? '' : NUM_ARRAY[n]);
        }else{
            res.push(NUM_ARRAY[n] + (n > 0 && i < 3 ? UNIT_ARRAY[i] : ''));
        }

    });
    return res.join('').replace(REG_DEL_REPEAT,'$1');

}
//转换小数部分
function switchDecimal(_NUM){
    if(!_NUM) return;
    let res = [];
    let num = _NUM.split('');
    num.map(function(n,i){
        if(!n || n == 0){
            res.push((num[i+1] == 0 || !num[i+1]) ? '' : NUM_ARRAY[n]);
        }else{
            res.push(NUM_ARRAY[n]);
        }

    });
    return res.join('');
}

//拼接
export const toCn = function  (_NUM) {
    let numArray = dealNum(_NUM);
    let num = splitNum(numArray[0]);
    let len = num.length;
    let reslt = '';
    num.map(function(n,i){
        let temp = switchNum(n, i == 0);
        if(!temp) temp = NUM_ARRAY[0];
        if(len - 1 == i || temp == NUM_ARRAY[0]){
            reslt += temp;
        }else{
            reslt += (temp + NUM_UNIT_ARRAY[len - i - 2]);
        }
    });
    reslt = reslt.replace(REG_DEL_REPEAT,'$1') + (!numArray[1] ? '' : (POINT + switchDecimal(numArray[1])))
    return reslt;
}

//转换成数字
//分割整数和小数部分
function dealHz(_HZ){
    if(!_HZ) return [];
    return _HZ.split(POINT);
}
//分割成组
function splitHz(_HZ){
    if(!_HZ) return [0];
    //去掉整数部分所有的'零'，然后分割
    _HZ = _HZ.replace(/零/g,'').split('');
    let res = [];
    let temp = '';
    let location = -10000;//设置一个超大数
    _HZ.map(function(n,i){
        let thisLocation = NUM_UNIT_ARRAY.indexOf(n);
        if(thisLocation >= 0){
            if(thisLocation - location < -1){
                for(let loc = 1; loc < location - thisLocation; loc ++){
                    res.push(NUM_ARRAY[0]);
                }
            }
            res.push(temp);
            temp = '';
            location = thisLocation;
        }else{
            temp += n;
            if(i == _HZ.length - 1) res.push(temp);
        }
    });
    return res;
}

function switchHz(_HZ){
    if(!_HZ) return '';
    if(_HZ == NUM_ARRAY[0]) return '0000';
    _HZ = _HZ.split('');
    let res = 0;
    let temp = 0;
    _HZ.map(function(n,i){
        if(i % 2 == 0){
            temp = NUM_ARRAY.indexOf(n);
            if(i == _HZ.length - 1) res += temp;
        }else{
            let z = 3 - UNIT_ARRAY.indexOf(n);
            res += (temp * Math.pow(10,z));
        }
    });
    return res;

}
//转换小数部分
function switchDecimalHz(_HZ){
    if(!_HZ) return '';
    _HZ = _HZ.split('');
    if(_HZ.length === 0) return '';
    let res = ['.'];
    _HZ.map(function(n){
        res.push(NUM_ARRAY.indexOf(n));
    });
    return res.join('');
}

export const toNm = function (_HZ){
    if(!_HZ || _HZ == NUM_ARRAY[0]) return 0;
    _HZ = dealHz(_HZ);
    let HZ_ARRAY = splitHz(_HZ[0]);
    let decimalPart = switchDecimalHz(_HZ[1]);
    let res = '';
    HZ_ARRAY.map(function(n){
        let temp = switchHz(n);
        res = res + '' + temp;
    });
    return res + decimalPart;
}
