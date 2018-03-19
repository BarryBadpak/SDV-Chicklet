export default interface IDotNotationAccessor {
    get(propertyPath: string): any;
    set(propertyPath: string, propertyValue: any): ThisType<IDotNotationAccessor>;
    del(propertyPath: string): ThisType<IDotNotationAccessor>;
}