const fs = require('fs');


class Snack {
    constructor() {
        const data = fs.readFileSync('./model/data.json');
        this.data = JSON.parse(data)
    }

    getSnackList() {
        if (this.data) {
            return this.data;
        }
        else {
            return [];
        }
    }

    addSnack(name, brand, weight, kcal) {
        return new Promise((resolve, reject) => {
            let last = this.data[this.data.length - 1];
            let id = last.id + 1;

            let newSnack = {id:id, name:name, brand:brand, weight:weight, kcal:kcal};
            this.data.push(newSnack);

            resolve(newSnack);
        });
    }

    getSnackDetail(snackId) {
        return new Promise((resolve, reject) => {
            for (var snack of this.data ) {
                if ( snack.id == snackId ) {
                    resolve(snack);
                    return;
                }
            }
            reject({msg:'Can not find snack', code:404});
        });
    }

    deleteSnackDetail(snackId) {
        return new Promise((resolve, reject) => {
            for (var snack of this.data ) {
                if ( snack.id == snackId ) {                    
                    this.data.splice(snackId,1);
                    resolve(snack);
                    return;
                }
            }
            reject({msg:'Can not find snack', code:404});
        });
    }

}

module.exports = new Snack();