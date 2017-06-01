'use strict';

const {app} = require('electron');
const path = require('path');
const fs = require('fs');
const dataPath = app.getPath('userData');
const target = path.join(dataPath, 'preferences.json');
const _ = require('lodash');

class Preferences {

    constructor() {
        try {
            this.preferences = require(target);
        } catch(e) {
            this.preferences = {};
        }
    }

    get(k) {
        return this.preferences[k];
    }

    set(k, v) {
        if (_.isObject(k)) {
            _.extend(this.preferences, k);
        } else {
            this.preferences[k] = v;
        }
        fs.writeFileSync(target, JSON.stringify(this.preferences, null, 4));
    }

}

module.exports = new Preferences();
