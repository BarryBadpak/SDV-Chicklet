import IDotNotationAccessor from "../Data-interfaces/IDotNotationAccessor";

export default interface IDataStore extends IDotNotationAccessor {
    save(): void;
    clear(): void;
}