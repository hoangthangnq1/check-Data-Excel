const excelToJson = require('convert-excel-to-json');
const fs = require('fs');
function writeData() {
    const result = excelToJson({
        sourceFile: 'data/CTKM-tháng-10.xlsx',
        header: {
            rows: 1
        },
        sheets: ['CTKM tháng 10'],
        columnToKey: {
            A: "{{A1}}",
            B: "{{B1}}",
            C: "{{C1}}",
            D: "{{D1}}",
            E: "{{E1}}",
            F: "{{F1}}",
            G: "{{G1}}",
            H: "{{H1}}",
            I: "{{I1}}",
            J: "{{J1}}",
            K: "{{K1}}",
            L: "{{L1}}",
            M: "{{M1}}",
            N: "{{N1}}",
        }
    });
    const data = JSON.stringify(result, null, 4);
    fs.writeFile('data/CTKM-tháng-10.json', data, (err) => {
        if (err) {
            throw err;
        }
        console.log("dữ liệu file JSON đã được update");
    });
}
module.exports = {
    writeData
};




