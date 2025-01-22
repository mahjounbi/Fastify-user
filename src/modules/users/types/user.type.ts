export interface ParamsWithId {
    Params: {
        id: string;
    };
}

export interface UpdateUserPayload {
    Body: {
        firstName?: string;
        lastName?: string;
        email?: string;
        birthDate?: string;
    };
}