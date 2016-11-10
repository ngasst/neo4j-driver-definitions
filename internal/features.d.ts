export declare function hasFeature(name: string): FEATURES;

declare interface FEATURES {
    trust_on_first_use: () => boolean;
}