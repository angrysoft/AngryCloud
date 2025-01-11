import { Injectable } from '@angular/core';
import { FileItem, FolderItem } from '../models/files';
import { RestResponse } from '../models/rest-response';
import { CrudService } from './crud.service';

@Injectable({
  providedIn: 'root',
})
export class FilesService extends CrudService<FileItem | FolderItem> {
  constructor() {
    super();
    this.api = '/api/folder';
  }

  getFolder(folder: string) {
    return this._get<RestResponse<FolderItem>>(`${this.api}/${folder}`);
  }
}
