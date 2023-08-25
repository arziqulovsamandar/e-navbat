type Args = {
    password: string;
};
export declare const generatePasswordSaltHash: ({ password, }: Args) => Promise<{
    salt: string;
    hash: string;
}>;
export {};
