const chnNumChar = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
const chnUnitSection = ['', '万', '亿', '万亿', '亿亿'];
const chnUnitChar = ['', '十', '百', '千'];

function SectionToChinese(section) {
  let strIns = '',
    chnStr = '';
  let unitPos = 0;
  let zero = true;
  while (section > 0) {
    let v = section % 10;
    if (v === 0) {
      if (!zero) {
        zero = true;
        chnStr = chnNumChar[v] + chnStr;
      }
    } else {
      zero = false;
      strIns = chnNumChar[v];
      strIns += chnUnitChar[unitPos];
      chnStr = strIns + chnStr;
    }
    unitPos++;
    section = Math.floor(section / 10);
  }
  return chnStr;
}

export const numToCn = function NumberToChinese(num) {
  let unitPos = 0;
  let strIns = '',
    chnStr = '';
  let needZero = false;

  if (num === 0) {
    return chnNumChar[0];
  }

  while (num > 0) {
    let section = num % 10000;
    if (needZero) {
      chnStr = chnNumChar[0] + chnStr;
    }
    strIns = SectionToChinese(section);
    strIns += section !== 0 ? chnUnitSection[unitPos] : chnUnitSection[0];
    chnStr = strIns + chnStr;
    needZero = section < 1000 && section > 0;
    num = Math.floor(num / 10000);
    unitPos++;
  }

  return chnStr;
}

const chnNumCharObj = {
    零:0,
    一:1,
    二:2,
    三:3,
    四:4,
    五:5,
    六:6,
    七:7,
    八:8,
    九:9
};

const chnNameValue = {
    十:{value:10, secUnit:false},
    百:{value:100, secUnit:false},
    千:{value:1000, secUnit:false},
    万:{value:10000, secUnit:true},
    亿:{value:100000000, secUnit:true}
}

export const cnToNum = function ChineseToNumber(chnStr){
    var rtn = 0;
    var section = 0;
    var number = 0;
    var secUnit = false;
    var str = chnStr.split('');

    for(var i = 0; i < str.length; i++){
        var num = chnNumCharObj[str[i]];
        if(typeof num !== 'undefined'){
            number = num;
            if(i === str.length - 1){
                section += number;
            }
        }else{
            var unit = chnNameValue[str[i]].value;
            secUnit = chnNameValue[str[i]].secUnit;
            if(secUnit){
                section = (section + number) * unit;
                rtn += section;
                section = 0;
            }else{
                section += (number * unit);
            }
            number = 0;
        }
    }
    return rtn + section;
}
