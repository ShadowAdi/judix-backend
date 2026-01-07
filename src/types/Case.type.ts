
export interface CreateCaseDTO {
    title: string;
    description?: string;
    clientName: string;
    clientEmail?: string;
    caseType: "civil" | "criminal" | "contract" | "corporate" | "other";
    status: "draft" | "active" | "closed";
    filedAt: Date;
}

export interface UpdateCaseDTO {
    title?: string;
    description?: string;
    clientName?: string;
    clientEmail?: string;
    caseType?: "civil" | "criminal" | "contract" | "corporate" | "other";
    status?: "draft" | "active" | "closed";
    filedAt?: Date;
    isArchived?: boolean
}
