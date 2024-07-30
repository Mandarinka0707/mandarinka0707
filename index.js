const { google } = require("googleapis");
function NodeGoogleSheets(file, sheetId, keyMass, callback) {
const auth = new google.auth.GoogleAuth({
keyFile: file,
scopes: "https://www.googleapis.com/auth/spreadsheets",
});
(async () => {
    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: "v4", auth: client });
    const spreadsheetId = sheetId;

    const metaData = await googleSheets.spreadsheets.get({
        auth,
        spreadsheetId,
    });

    const data = {
        auth,
        spreadsheetId,
        valueInputOption: "USER_ENTERED",
        resource: {
            values: keyMass.change,
        },
    };
    if(keyMass.values) {
        data['range'] = keyMass.values;

        delete data.valueInputOption;
        delete data.resource;

        const values = await googleSheets.spreadsheets.values.get(data);

        const jsonData = {
            values: values.data.values,
        };

        callback(jsonData);
    }
})();
}
// Функция для преобразования даты в нужный формат
// Функция для преобразования даты в нужный формат
function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
	
}
NodeGoogleSheets('tests/googlefile.json', '1cxKfCWuQf43zsv36f90WK572F7NzOfWOsmKH7K3GBmA', {values: 'Holidays'}, (data) => {
    const formattedData = data.values.map(item => {
        const dateIndices = item.map((element, index) => {
            if (element.includes('Fri') || element.includes('Sat')|| element.includes('Sun')|| element.includes('Thu')|| element.includes('Mon')|| element.includes('Tue')|| element.includes('Wed') ) {
                return index;
            }
        }).filter(index => index !== undefined);

        dateIndices.forEach(dateIndex => {
            item[dateIndex] = formatDate(item[dateIndex]);
        });

        return item;
    });
});
module.exports = {NodeGoogleSheets}; 