var request = require("request");
const private_key = 'test_4c90504c9700a5adcbe691a58e';

module.exports = function (context, req) {
    const charge = req.body.charge * 100;
    const id = req.body.id;
    const email = req.body.email;
    context.log(id);
    context.log(charge);

    //charge token  
    var options = {
        method: 'POST',
        url: 'https://api.paymentspring.com/api/v1/charge',
        headers: {
            'cache-control': 'no-cache',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + new Buffer(private_key + ':').toString('base64')
        },
        form: {
            token: id,
            send_receipt: 'false',
            amount: charge, 
            email_address: email
        }
    };

    request(options, function (error, response, body) { 
        if (error) throw new Error(error);

        context.log(body);
        context.done();
    });
}