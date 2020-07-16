export const addresstypeList = [{
        value: 1,
        name: "小区"
    },
    {
        value: 3,
        name: "单位院"
    },
    {
        value: 0,
        name: "区域性建筑群"
    },
    {
        value: 2,
        name: "单栋建筑物"
    },
    {
        value: 5,
        name: "临街商铺"
    },
    {
        value: 6,
        name: "地下建筑物"
    },
    {
        value: 7,
        name: "城中村楼栋"
    },
    {
        value: 8,
        name: "城中村商铺"
    },
    {
        value: 9,
        name: "院落内商铺"
    }
];

export const szxqList = [{
        value: "1",
        name: "福田区"
    },
    {
        value: "2",
        name: "罗湖区"
    },
    {
        value: "3",
        name: "南山区"
    },
    {
        value: "4",
        name: "盐田区"
    },
    {
        value: "5",
        name: "宝安区"
    },
    {
        value: "6",
        name: "龙岗区"
    },
    {
        value: "7",
        name: "龙华区"
    },
    {
        value: "8",
        name: "坪山区"
    },
    {
        value: "9",
        name: "光明区"
    },
    {
        value: "10",
        name: "大鹏新区"
    },
];

function buildAddresstypeModel() {
    const addresstypeModel = {}
    addresstypeList.forEach(addresst => {
        const addresstType = {};
        const key = addresst.name;
        switch (key) {
            case "小区":
            case "单位院":
                addresstType.mpggList = [{
                    value: 1,
                    name: "大号门牌"
                }];
                break;
            case "单栋建筑物":
                addresstType.mpggList = [{
                        value: 1,
                        name: "大号门牌"
                    },
                    {
                        value: 2,
                        name: "中号门牌"
                    }
                ];
                break;
            case "城中村楼栋":
            case "临街商铺":
            case "院落内商铺":
            case "城中村商铺":
                addresstType.mpggList = [{
                    value: 2,
                    name: "中号门牌"
                }];
                break;
            case "地下建筑物":
                addresstType.mpggList = [{
                    value: 3,
                    name: "小号门牌"
                }];
                break;
            case "区域性建筑群":
                addresstType.mpggList = [{
                    value: 2,
                    name: "中号门牌"
                }];
                break;
            default:
                addresstType.mpggList = [];
                break;
        }

        switch (key) {
            case "小区":
            case "单位院":
                addresstType.enableDy = true;
                addresstType.enableLd = true;
                break;
            case "区域性建筑群":
            case "单栋建筑物":
            case "城中村楼栋":
                addresstType.enableDy = true;
                addresstType.enableLd = false;
                break;
            default:
                addresstType.enableDy = false;
                addresstType.enableLd = false;
                break;
        }


        addresstypeModel[addresst.value] = addresstType
    });
    return addresstypeModel;
}
/**enableDy: 能否新增单元
 * enableLd:  能否新增楼栋
 * 
 */
export const addresstypeModel = buildAddresstypeModel();