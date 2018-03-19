export interface IRecentFile {
    name: string;
    path: string;
}

export interface IRecentFilesStore {
    getLimit(): number;
    getFiles(): Array<IRecentFile>;
    addFile(filePath: string): void;
    clear(): void;
}