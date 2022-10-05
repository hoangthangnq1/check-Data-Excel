const excelToJson = require('convert-excel-to-json');
const fs = require('fs');
function writeData() {
    const result = excelToJson({
        sourceFile: 'data/CTKM-tháng-10.xlsx',
        header: {
            rows: 2 
        },
        sheets: ['CTKM tháng 09'],
        columnToKey: {
            A: "{{A2}}",
            B: "{{B2}}",
            C: "{{C2}}",
            D: "{{D2}}",
            E: "{{E2}}",
            F: "{{F2}}",
            G: "{{G2}}",
            H: "{{H2}}",
            I: "{{I2}}",
            J: "{{J2}}",
            K: "{{K2}}",
            L: "{{L2}}",
            M: "{{M2}}",
            N: "{{N2}}",
        }
    });
    const data = JSON.stringify(result, null, 4);
    fs.writeFile('data/dataExcel.json', data, (err) => {
        if (err) {
            throw err;
        }
        console.log("dữ liệu file JSON đã được update");
    });
}
module.exports = {
    writeData
};




