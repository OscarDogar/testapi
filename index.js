const axios = require('axios');
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
    const { data } = await axios.get('https://api.covid19api.com/summary');
    res.send(data);
});

app.post("/carrito", async (req, res) => {
    try {
        var shortUrl = "";
        // await axios.get('http://35.229.32.178/ipdialbox/api_reports_manager.php?token=7b69645f6469737472697d2d3230323131313330313435333033&report=campaing_3&date_ini=20211201111200&date_end=20211221111300&campaing=5577')
        // .then(response => { 
        //     console.log(response.data);
        // })
        
        shortUrl = await shortenUrl(req.body.rclastcart)
        
        message = {
            "title": "Titulo",
            "text": "Lo que sea",
            "themeColor": "#FFFF02"
            }
        // sendMessage(message);
        var payload = []
        url = "http://35.229.32.178/ipdialbox/api_campaing.php?token=7b69645f6469737472697d2d3230323131313330313435323537&action=insert_json&type_campaing=predictive&campaing=6028"
        payload.push({nombre_cliente: req.body.firstName, 
                        apellido_cliente: req.body.LastName, 
                        tipo_doc: '', 
                        id_cliente: req.body.document, 
                        edad: '',
                        sexo: '',
                        pais: '',
                        departamento: '',
                        ciudad: '',
                        zona: '',
                        direccion: '',
                        opt1: '',
                        opt2: '',
                        opt3: '',
                        opt4: '',
                        opt5: '',
                        opt6: '',
                        opt7: '',
                        opt8: '',
                        opt9: '',
                        opt10: '',
                        opt11: '',
                        opt12: "57"+req.body.homePhone, 
                        tel1: "9"+req.body.homePhone, 
                        tel2: '',
                        tel3: '',
                        tel4: '',
                        tel5: '',
                        tel6: '',
                        tel7: '',
                        tel8: '',
                        tel9: '',
                        tel10: '',
                        tel_extra: '', 
                        email: '',
                        rellamada: '',
                        rellamada_tel: '',
                        rellamada_status: '' },);
        //console.log((payload));

        await axios({
            method: 'get',
            url: url,
            responseType: 'application/json',
            data: payload
            }).then(response => {
                console.log(response.data);
            }).catch(error => {
                console.log(error);
            });

        const newcart=([req.body.firstName, 
                        req.body.LastName, 
                        req.body.document, 
                        req.body.email, 
                        req.body.homePhone, 
                        shortUrl, 
                        req.body.rclastcartvalue]);
        message = {
            "title": "Titulo",
            "text": newcart[0]+" "+newcart[1]+" "+newcart[2]+" "+newcart[3]+" "+newcart[4]+" "+newcart[5]+" "+newcart[6],
            "themeColor": "#FFFF02"
            }
        // sendMessage(message);
        res.json(newcart);
    }
    catch (e) {
        console.error(e.message);
    }
});

const shortenUrl = async (url) => {
    await axios({
        method: 'get',
        url: 'http://tinyurl.com/api-create.php?url='+url,
        responseType: 'application/json'
        }).then(response => {
            console.log(response.data);
            shortUrl = response.data;
        }).catch(error => {
            console.log(error);
        });
    return shortUrl
}

const sendMessage = async (message) => {
    await axios.post('https://offcorss.webhook.office.com/webhookb2/c8e9e9b4-d370-4406-ab75-1a89a3f9140d@0255d32a-2cd0-47a4-a7cf-c8d6e611aa3a/IncomingWebhook/c02c893d37784224a0511893162bcd2e/17cd0e29-a164-49cf-af18-7f6ab6cafffb', (message) )
        .then(response => {
            console.log(response.data);
        })
}

app.listen((process.env.PORT || 8080), () => {
    console.log('Server is running on port 8080');  
});
