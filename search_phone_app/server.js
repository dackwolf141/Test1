const express = require('express');
const sql = require('mssql');

const app = express();
const port = 3001; // Hoặc cổng khác nếu cần

const config = {
    user: 'sa',
    password: '52304991Ad',
    server: '14.224.74.196',
    port: 1433,
    database: 'QLPK',
    options: {
        encrypt: false, // Tắt SSL
        trustServerCertificate: true
    }
};

app.use(express.static('public'));
app.use(express.json());

app.post('/search', async (req, res) => {
    const { SDT } = req.body;

    try {
        await sql.connect(config);
        const result = await sql.query`SELECT * FROM QLPK.dbo.BenhNhan WHERE SDT = ${SDT}`;
        res.json(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).send('Lỗi khi kết nối đến cơ sở dữ liệu.');
    }
});

app.listen(port, () => {
    console.log(`Server đang chạy tại http://localhost:${port}`);
});
