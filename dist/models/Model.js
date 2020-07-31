"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Model {
    constructor() {
        this.schema = this.createSchema();
    }
    toData() {
        let obj = this.onPrepareData();
        delete obj.schema;
        delete obj.path;
        return obj;
    }
    flatten() {
        const obj = Object.assign({}, this);
        delete obj.schema;
        delete obj.path;
        return obj;
    }
    getUrl(photo) {
        if (typeof photo === 'string') {
            return photo;
        }
        else if (photo) {
            return photo.url;
        }
        else {
            return '';
        }
    }
    toDataWithTimestamp(firebase, ownerId) {
        let obj = this.toData();
        return Object.assign(Object.assign({}, obj), { createdAt: this.createdAt || firebase.firestore.Timestamp.now(), updatedAt: firebase.firestore.Timestamp.now(), ownerId });
    }
    errorPath(error) {
        return error.details[0].path[0];
    }
    errorMessage(error) {
        let path = this.errorPath(error);
        let type = error.details[0].type;
        return `Thiếu thông tin ${path} hoặc sai cấu trúc (${type})`;
    }
    validate() {
        let result = this.schema.validate(this.toData());
        console.log('validate', result);
        if (!result.error) {
            return {};
        }
        let error = result.error;
        return {
            [this.errorPath(error)]: new Error(this.errorMessage(error))
        };
    }
}
exports.Model = Model;
//# sourceMappingURL=Model.js.map