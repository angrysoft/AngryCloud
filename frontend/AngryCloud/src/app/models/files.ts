interface FileItem {
  id: string;
  name: string;
  size: number;
  parent: string;
  type: string;
  owner: string;
  path: {name:string, id:string}[]
  created: string | Date;
  updated: string | Date;
}

interface FolderItem extends FileItem {
  children: FileItem[];
}

export type { FileItem, FolderItem };
