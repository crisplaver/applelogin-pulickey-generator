const NodeRSA = require('node-rsa');
const fs = require('fs');
const axios = require('axios');

// e: exponent
// n: modulus

axios.get('https://appleid.apple.com/auth/keys').then(res => {
    const publicData = res.data.keys;

    publicData.forEach(data => {
        const key = new NodeRSA();
        key.importKey({
            n: Buffer.from(data.n, 'base64'),
            e: Buffer.from(data.e, 'base64')
        })
        const public = key.exportKey('public');
        fs.writeFile(__dirname + `/publickeys/${data.kid}.pem`, public, () => {
            console.log('Public Key Created!\n', public)
        })
    })
})






