interface FileItem {
  id: string;
  name: string;
  size: number;
  parent: string;
  type: string;
  owner: string;
  created: string | Date;
  updated: string | Date;
}

interface FolderItem extends FileItem {
  children: FileItem[];
}

export type { FileItem, FolderItem };
