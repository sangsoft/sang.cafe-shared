import { Photo } from "./Photo";

export abstract class Model {
  private schema: any;
  public path: string;

  constructor() {
    this.schema = this.createSchema();
  }

  abstract createSchema(): any;
  abstract onPrepareData(): any;

  toData(): any {
    let obj = this.onPrepareData();
    delete obj.schema;
    delete obj.path;
    return obj;
  }

  flatten(): any {
    const obj = {
      ...this,
    }
    delete obj.schema;
    delete obj.path;
    return obj;

  }

  getUrl(photo: string | Photo): string {
    if (typeof photo === 'string') {
      return photo;
    } else if (photo) {
      return photo.url;
    } else {
      return '';
    }
  }

  toDataWithTimestamp(firebase: any, ownerId: string): any {
    let obj = this.toData();

    return {
      ...obj,
      createdAt: (this as any).createdAt || firebase.firestore.Timestamp.now(),
      updatedAt: firebase.firestore.Timestamp.now(),
      ownerId
    };
  }

  errorPath(error: any) {
    return error.details[0].path[0];
  }
  errorMessage(error: any) {
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