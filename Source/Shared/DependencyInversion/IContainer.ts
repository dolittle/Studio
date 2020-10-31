export abstract class IContainer {
    abstract get<T>(source: Function & { prototype: T; }): T;
}
