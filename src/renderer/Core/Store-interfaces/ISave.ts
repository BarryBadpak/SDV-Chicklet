import IDotNotationAccessor from "../Data-interfaces/IDotNotationAccessor";

export default interface ISave extends IDotNotationAccessor {
    openSave(filePath?: string | false): void;
    save(): void;
    reloadSave(): void;
    hasLoadedSave(): boolean;
}