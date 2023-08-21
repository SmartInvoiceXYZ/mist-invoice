import Wei, { WeiSource, wei } from "@synthetixio/wei";
import axios from "codegen-graph-ts/build/src/lib/axios";
import generateGql from "codegen-graph-ts/build/src/lib/gql";
export type SingleQueryOptions = {
    id: string;
    block?: {
        "number": number;
    } | {
        hash: string;
    };
};
export type MultiQueryOptions<T, R> = {
    first?: number;
    where?: T;
    block?: {
        "number": number;
    } | {
        hash: string;
    };
    orderBy?: keyof R;
    orderDirection?: "asc" | "desc";
};
const MAX_PAGE = 1000;
export type AgreementFilter = {
    id?: string | null;
    id_not?: string | null;
    id_gt?: string | null;
    id_lt?: string | null;
    id_gte?: string | null;
    id_lte?: string | null;
    id_in?: string[];
    id_not_in?: string[];
    type?: string | null;
    type_not?: string | null;
    type_gt?: string | null;
    type_lt?: string | null;
    type_gte?: string | null;
    type_lte?: string | null;
    type_in?: string[];
    type_not_in?: string[];
    type_contains?: string | null;
    type_contains_nocase?: string | null;
    type_not_contains?: string | null;
    type_not_contains_nocase?: string | null;
    type_starts_with?: string | null;
    type_starts_with_nocase?: string | null;
    type_not_starts_with?: string | null;
    type_not_starts_with_nocase?: string | null;
    type_ends_with?: string | null;
    type_ends_with_nocase?: string | null;
    type_not_ends_with?: string | null;
    type_not_ends_with_nocase?: string | null;
    src?: string | null;
    src_not?: string | null;
    src_gt?: string | null;
    src_lt?: string | null;
    src_gte?: string | null;
    src_lte?: string | null;
    src_in?: string[];
    src_not_in?: string[];
    src_contains?: string | null;
    src_contains_nocase?: string | null;
    src_not_contains?: string | null;
    src_not_contains_nocase?: string | null;
    src_starts_with?: string | null;
    src_starts_with_nocase?: string | null;
    src_not_starts_with?: string | null;
    src_not_starts_with_nocase?: string | null;
    src_ends_with?: string | null;
    src_ends_with_nocase?: string | null;
    src_not_ends_with?: string | null;
    src_not_ends_with_nocase?: string | null;
    createdAt?: WeiSource | null;
    createdAt_not?: WeiSource | null;
    createdAt_gt?: WeiSource | null;
    createdAt_lt?: WeiSource | null;
    createdAt_gte?: WeiSource | null;
    createdAt_lte?: WeiSource | null;
    createdAt_in?: WeiSource[];
    createdAt_not_in?: WeiSource[];
    _change_block?: BlockChangedFilterFilter | null;
};
export type AgreementResult = {
    id: string;
    type: string;
    src: string;
    createdAt: Wei;
};
export type AgreementFields = {
    id: true;
    type: true;
    src: true;
    createdAt: true;
};
export type AgreementArgs<K extends keyof AgreementResult> = {
    [Property in keyof Pick<AgreementFields, K>]: AgreementFields[Property];
};
export const getAgreementById = async function <K extends keyof AgreementResult>(url: string, options: SingleQueryOptions, args: AgreementArgs<K>): Promise<Pick<AgreementResult, K>> {
    const res = await axios.post(url, {
        query: generateGql("agreement", options, args)
    });
    const r = res.data as any;
    if (r.errors && r.errors.length) {
        throw new Error(r.errors[0].message);
    }
    const obj = (r.data[Object.keys(r.data)[0]] as any);
    const formattedObj: any = {};
    if (obj["id"])
        formattedObj["id"] = obj["id"];
    if (obj["type"])
        formattedObj["type"] = obj["type"];
    if (obj["src"])
        formattedObj["src"] = obj["src"];
    if (obj["createdAt"])
        formattedObj["createdAt"] = wei(obj["createdAt"], 0);
    return formattedObj as Pick<AgreementResult, K>;
};
export const getAgreements = async function <K extends keyof AgreementResult>(url: string, options: MultiQueryOptions<AgreementFilter, AgreementResult>, args: AgreementArgs<K>): Promise<Pick<AgreementResult, K>[]> {
    const paginatedOptions: Partial<MultiQueryOptions<AgreementFilter, AgreementResult>> = { ...options };
    let paginationKey: keyof AgreementFilter | null = null;
    let paginationValue = "";
    if (options.first && options.first > MAX_PAGE) {
        paginatedOptions.first = MAX_PAGE;
        paginatedOptions.orderBy = options.orderBy || "id";
        paginatedOptions.orderDirection = options.orderDirection || "asc";
        paginationKey = paginatedOptions.orderBy + (paginatedOptions.orderDirection === "asc" ? "_gt" : "_lt") as keyof AgreementFilter;
        paginatedOptions.where = { ...options.where };
    }
    let results: Pick<AgreementResult, K>[] = [];
    do {
        if (paginationKey && paginationValue)
            paginatedOptions.where![paginationKey] = paginationValue as any;
        const res = await axios.post(url, {
            query: generateGql("agreements", paginatedOptions, args)
        });
        const r = res.data as any;
        if (r.errors && r.errors.length) {
            throw new Error(r.errors[0].message);
        }
        const rawResults = r.data[Object.keys(r.data)[0]] as any[];
        const newResults = rawResults.map((obj) => {
            const formattedObj: any = {};
            if (obj["id"])
                formattedObj["id"] = obj["id"];
            if (obj["type"])
                formattedObj["type"] = obj["type"];
            if (obj["src"])
                formattedObj["src"] = obj["src"];
            if (obj["createdAt"])
                formattedObj["createdAt"] = wei(obj["createdAt"], 0);
            return formattedObj as Pick<AgreementResult, K>;
        });
        results = results.concat(newResults);
        if (newResults.length < 1000) {
            break;
        }
        if (paginationKey) {
            paginationValue = rawResults[rawResults.length - 1][paginatedOptions.orderBy!];
        }
    } while (paginationKey && (options.first && results.length < options.first));
    return options.first ? results.slice(0, options.first) : results;
};
export type DepositFilter = {
    id?: string | null;
    id_not?: string | null;
    id_gt?: string | null;
    id_lt?: string | null;
    id_gte?: string | null;
    id_lte?: string | null;
    id_in?: string[];
    id_not_in?: string[];
    txHash?: string | null;
    txHash_not?: string | null;
    txHash_in?: string[];
    txHash_not_in?: string[];
    txHash_contains?: string | null;
    txHash_not_contains?: string | null;
    sender?: string | null;
    sender_not?: string | null;
    sender_in?: string[];
    sender_not_in?: string[];
    sender_contains?: string | null;
    sender_not_contains?: string | null;
    invoice?: string | null;
    invoice_not?: string | null;
    invoice_gt?: string | null;
    invoice_lt?: string | null;
    invoice_gte?: string | null;
    invoice_lte?: string | null;
    invoice_in?: string[];
    invoice_not_in?: string[];
    invoice_contains?: string | null;
    invoice_contains_nocase?: string | null;
    invoice_not_contains?: string | null;
    invoice_not_contains_nocase?: string | null;
    invoice_starts_with?: string | null;
    invoice_starts_with_nocase?: string | null;
    invoice_not_starts_with?: string | null;
    invoice_not_starts_with_nocase?: string | null;
    invoice_ends_with?: string | null;
    invoice_ends_with_nocase?: string | null;
    invoice_not_ends_with?: string | null;
    invoice_not_ends_with_nocase?: string | null;
    invoice_?: Invoice_filterFilter | null;
    amount?: WeiSource | null;
    amount_not?: WeiSource | null;
    amount_gt?: WeiSource | null;
    amount_lt?: WeiSource | null;
    amount_gte?: WeiSource | null;
    amount_lte?: WeiSource | null;
    amount_in?: WeiSource[];
    amount_not_in?: WeiSource[];
    timestamp?: WeiSource | null;
    timestamp_not?: WeiSource | null;
    timestamp_gt?: WeiSource | null;
    timestamp_lt?: WeiSource | null;
    timestamp_gte?: WeiSource | null;
    timestamp_lte?: WeiSource | null;
    timestamp_in?: WeiSource[];
    timestamp_not_in?: WeiSource[];
    _change_block?: BlockChangedFilterFilter | null;
};
export type DepositResult = {
    id: string;
    txHash: string;
    sender: string;
    invoice: Partial<InvoiceResult>;
    amount: Wei;
    timestamp: Wei;
};
export type DepositFields = {
    id: true;
    txHash: true;
    sender: true;
    invoice: InvoiceFields;
    amount: true;
    timestamp: true;
};
export type DepositArgs<K extends keyof DepositResult> = {
    [Property in keyof Pick<DepositFields, K>]: DepositFields[Property];
};
export const getDepositById = async function <K extends keyof DepositResult>(url: string, options: SingleQueryOptions, args: DepositArgs<K>): Promise<Pick<DepositResult, K>> {
    const res = await axios.post(url, {
        query: generateGql("deposit", options, args)
    });
    const r = res.data as any;
    if (r.errors && r.errors.length) {
        throw new Error(r.errors[0].message);
    }
    const obj = (r.data[Object.keys(r.data)[0]] as any);
    const formattedObj: any = {};
    if (obj["id"])
        formattedObj["id"] = obj["id"];
    if (obj["txHash"])
        formattedObj["txHash"] = obj["txHash"];
    if (obj["sender"])
        formattedObj["sender"] = obj["sender"];
    if (obj["invoice"])
        formattedObj["invoice"] = obj["invoice"];
    if (obj["amount"])
        formattedObj["amount"] = wei(obj["amount"], 0);
    if (obj["timestamp"])
        formattedObj["timestamp"] = wei(obj["timestamp"], 0);
    return formattedObj as Pick<DepositResult, K>;
};
export const getDeposits = async function <K extends keyof DepositResult>(url: string, options: MultiQueryOptions<DepositFilter, DepositResult>, args: DepositArgs<K>): Promise<Pick<DepositResult, K>[]> {
    const paginatedOptions: Partial<MultiQueryOptions<DepositFilter, DepositResult>> = { ...options };
    let paginationKey: keyof DepositFilter | null = null;
    let paginationValue = "";
    if (options.first && options.first > MAX_PAGE) {
        paginatedOptions.first = MAX_PAGE;
        paginatedOptions.orderBy = options.orderBy || "id";
        paginatedOptions.orderDirection = options.orderDirection || "asc";
        paginationKey = paginatedOptions.orderBy + (paginatedOptions.orderDirection === "asc" ? "_gt" : "_lt") as keyof DepositFilter;
        paginatedOptions.where = { ...options.where };
    }
    let results: Pick<DepositResult, K>[] = [];
    do {
        if (paginationKey && paginationValue)
            paginatedOptions.where![paginationKey] = paginationValue as any;
        const res = await axios.post(url, {
            query: generateGql("deposits", paginatedOptions, args)
        });
        const r = res.data as any;
        if (r.errors && r.errors.length) {
            throw new Error(r.errors[0].message);
        }
        const rawResults = r.data[Object.keys(r.data)[0]] as any[];
        const newResults = rawResults.map((obj) => {
            const formattedObj: any = {};
            if (obj["id"])
                formattedObj["id"] = obj["id"];
            if (obj["txHash"])
                formattedObj["txHash"] = obj["txHash"];
            if (obj["sender"])
                formattedObj["sender"] = obj["sender"];
            if (obj["invoice"])
                formattedObj["invoice"] = obj["invoice"];
            if (obj["amount"])
                formattedObj["amount"] = wei(obj["amount"], 0);
            if (obj["timestamp"])
                formattedObj["timestamp"] = wei(obj["timestamp"], 0);
            return formattedObj as Pick<DepositResult, K>;
        });
        results = results.concat(newResults);
        if (newResults.length < 1000) {
            break;
        }
        if (paginationKey) {
            paginationValue = rawResults[rawResults.length - 1][paginatedOptions.orderBy!];
        }
    } while (paginationKey && (options.first && results.length < options.first));
    return options.first ? results.slice(0, options.first) : results;
};
export type DisputeFilter = {
    id?: string | null;
    id_not?: string | null;
    id_gt?: string | null;
    id_lt?: string | null;
    id_gte?: string | null;
    id_lte?: string | null;
    id_in?: string[];
    id_not_in?: string[];
    txHash?: string | null;
    txHash_not?: string | null;
    txHash_in?: string[];
    txHash_not_in?: string[];
    txHash_contains?: string | null;
    txHash_not_contains?: string | null;
    invoice?: string | null;
    invoice_not?: string | null;
    invoice_gt?: string | null;
    invoice_lt?: string | null;
    invoice_gte?: string | null;
    invoice_lte?: string | null;
    invoice_in?: string[];
    invoice_not_in?: string[];
    invoice_contains?: string | null;
    invoice_contains_nocase?: string | null;
    invoice_not_contains?: string | null;
    invoice_not_contains_nocase?: string | null;
    invoice_starts_with?: string | null;
    invoice_starts_with_nocase?: string | null;
    invoice_not_starts_with?: string | null;
    invoice_not_starts_with_nocase?: string | null;
    invoice_ends_with?: string | null;
    invoice_ends_with_nocase?: string | null;
    invoice_not_ends_with?: string | null;
    invoice_not_ends_with_nocase?: string | null;
    invoice_?: Invoice_filterFilter | null;
    sender?: string | null;
    sender_not?: string | null;
    sender_in?: string[];
    sender_not_in?: string[];
    sender_contains?: string | null;
    sender_not_contains?: string | null;
    details?: string | null;
    details_not?: string | null;
    details_in?: string[];
    details_not_in?: string[];
    details_contains?: string | null;
    details_not_contains?: string | null;
    ipfsHash?: string | null;
    ipfsHash_not?: string | null;
    ipfsHash_gt?: string | null;
    ipfsHash_lt?: string | null;
    ipfsHash_gte?: string | null;
    ipfsHash_lte?: string | null;
    ipfsHash_in?: string[];
    ipfsHash_not_in?: string[];
    ipfsHash_contains?: string | null;
    ipfsHash_contains_nocase?: string | null;
    ipfsHash_not_contains?: string | null;
    ipfsHash_not_contains_nocase?: string | null;
    ipfsHash_starts_with?: string | null;
    ipfsHash_starts_with_nocase?: string | null;
    ipfsHash_not_starts_with?: string | null;
    ipfsHash_not_starts_with_nocase?: string | null;
    ipfsHash_ends_with?: string | null;
    ipfsHash_ends_with_nocase?: string | null;
    ipfsHash_not_ends_with?: string | null;
    ipfsHash_not_ends_with_nocase?: string | null;
    disputeToken?: string | null;
    disputeToken_not?: string | null;
    disputeToken_in?: string[];
    disputeToken_not_in?: string[];
    disputeToken_contains?: string | null;
    disputeToken_not_contains?: string | null;
    disputeFee?: WeiSource | null;
    disputeFee_not?: WeiSource | null;
    disputeFee_gt?: WeiSource | null;
    disputeFee_lt?: WeiSource | null;
    disputeFee_gte?: WeiSource | null;
    disputeFee_lte?: WeiSource | null;
    disputeFee_in?: WeiSource[];
    disputeFee_not_in?: WeiSource[];
    disputeId?: WeiSource | null;
    disputeId_not?: WeiSource | null;
    disputeId_gt?: WeiSource | null;
    disputeId_lt?: WeiSource | null;
    disputeId_gte?: WeiSource | null;
    disputeId_lte?: WeiSource | null;
    disputeId_in?: WeiSource[];
    disputeId_not_in?: WeiSource[];
    timestamp?: WeiSource | null;
    timestamp_not?: WeiSource | null;
    timestamp_gt?: WeiSource | null;
    timestamp_lt?: WeiSource | null;
    timestamp_gte?: WeiSource | null;
    timestamp_lte?: WeiSource | null;
    timestamp_in?: WeiSource[];
    timestamp_not_in?: WeiSource[];
    _change_block?: BlockChangedFilterFilter | null;
};
export type DisputeResult = {
    id: string;
    txHash: string;
    invoice: Partial<InvoiceResult>;
    sender: string;
    details: string;
    ipfsHash: string;
    disputeToken: string | null;
    disputeFee: Wei | null;
    disputeId: Wei | null;
    timestamp: Wei;
};
export type DisputeFields = {
    id: true;
    txHash: true;
    invoice: InvoiceFields;
    sender: true;
    details: true;
    ipfsHash: true;
    disputeToken: true;
    disputeFee: true;
    disputeId: true;
    timestamp: true;
};
export type DisputeArgs<K extends keyof DisputeResult> = {
    [Property in keyof Pick<DisputeFields, K>]: DisputeFields[Property];
};
export const getDisputeById = async function <K extends keyof DisputeResult>(url: string, options: SingleQueryOptions, args: DisputeArgs<K>): Promise<Pick<DisputeResult, K>> {
    const res = await axios.post(url, {
        query: generateGql("dispute", options, args)
    });
    const r = res.data as any;
    if (r.errors && r.errors.length) {
        throw new Error(r.errors[0].message);
    }
    const obj = (r.data[Object.keys(r.data)[0]] as any);
    const formattedObj: any = {};
    if (obj["id"])
        formattedObj["id"] = obj["id"];
    if (obj["txHash"])
        formattedObj["txHash"] = obj["txHash"];
    if (obj["invoice"])
        formattedObj["invoice"] = obj["invoice"];
    if (obj["sender"])
        formattedObj["sender"] = obj["sender"];
    if (obj["details"])
        formattedObj["details"] = obj["details"];
    if (obj["ipfsHash"])
        formattedObj["ipfsHash"] = obj["ipfsHash"];
    if (obj["disputeToken"])
        formattedObj["disputeToken"] = obj["disputeToken"];
    if (obj["disputeFee"])
        formattedObj["disputeFee"] = wei(obj["disputeFee"], 0);
    if (obj["disputeId"])
        formattedObj["disputeId"] = wei(obj["disputeId"], 0);
    if (obj["timestamp"])
        formattedObj["timestamp"] = wei(obj["timestamp"], 0);
    return formattedObj as Pick<DisputeResult, K>;
};
export const getDisputes = async function <K extends keyof DisputeResult>(url: string, options: MultiQueryOptions<DisputeFilter, DisputeResult>, args: DisputeArgs<K>): Promise<Pick<DisputeResult, K>[]> {
    const paginatedOptions: Partial<MultiQueryOptions<DisputeFilter, DisputeResult>> = { ...options };
    let paginationKey: keyof DisputeFilter | null = null;
    let paginationValue = "";
    if (options.first && options.first > MAX_PAGE) {
        paginatedOptions.first = MAX_PAGE;
        paginatedOptions.orderBy = options.orderBy || "id";
        paginatedOptions.orderDirection = options.orderDirection || "asc";
        paginationKey = paginatedOptions.orderBy + (paginatedOptions.orderDirection === "asc" ? "_gt" : "_lt") as keyof DisputeFilter;
        paginatedOptions.where = { ...options.where };
    }
    let results: Pick<DisputeResult, K>[] = [];
    do {
        if (paginationKey && paginationValue)
            paginatedOptions.where![paginationKey] = paginationValue as any;
        const res = await axios.post(url, {
            query: generateGql("disputes", paginatedOptions, args)
        });
        const r = res.data as any;
        if (r.errors && r.errors.length) {
            throw new Error(r.errors[0].message);
        }
        const rawResults = r.data[Object.keys(r.data)[0]] as any[];
        const newResults = rawResults.map((obj) => {
            const formattedObj: any = {};
            if (obj["id"])
                formattedObj["id"] = obj["id"];
            if (obj["txHash"])
                formattedObj["txHash"] = obj["txHash"];
            if (obj["invoice"])
                formattedObj["invoice"] = obj["invoice"];
            if (obj["sender"])
                formattedObj["sender"] = obj["sender"];
            if (obj["details"])
                formattedObj["details"] = obj["details"];
            if (obj["ipfsHash"])
                formattedObj["ipfsHash"] = obj["ipfsHash"];
            if (obj["disputeToken"])
                formattedObj["disputeToken"] = obj["disputeToken"];
            if (obj["disputeFee"])
                formattedObj["disputeFee"] = wei(obj["disputeFee"], 0);
            if (obj["disputeId"])
                formattedObj["disputeId"] = wei(obj["disputeId"], 0);
            if (obj["timestamp"])
                formattedObj["timestamp"] = wei(obj["timestamp"], 0);
            return formattedObj as Pick<DisputeResult, K>;
        });
        results = results.concat(newResults);
        if (newResults.length < 1000) {
            break;
        }
        if (paginationKey) {
            paginationValue = rawResults[rawResults.length - 1][paginatedOptions.orderBy!];
        }
    } while (paginationKey && (options.first && results.length < options.first));
    return options.first ? results.slice(0, options.first) : results;
};
export type InvoiceFilter = {
    id?: string | null;
    id_not?: string | null;
    id_gt?: string | null;
    id_lt?: string | null;
    id_gte?: string | null;
    id_lte?: string | null;
    id_in?: string[];
    id_not_in?: string[];
    network?: string | null;
    network_not?: string | null;
    network_gt?: string | null;
    network_lt?: string | null;
    network_gte?: string | null;
    network_lte?: string | null;
    network_in?: string[];
    network_not_in?: string[];
    network_contains?: string | null;
    network_contains_nocase?: string | null;
    network_not_contains?: string | null;
    network_not_contains_nocase?: string | null;
    network_starts_with?: string | null;
    network_starts_with_nocase?: string | null;
    network_not_starts_with?: string | null;
    network_not_starts_with_nocase?: string | null;
    network_ends_with?: string | null;
    network_ends_with_nocase?: string | null;
    network_not_ends_with?: string | null;
    network_not_ends_with_nocase?: string | null;
    address?: string | null;
    address_not?: string | null;
    address_in?: string[];
    address_not_in?: string[];
    address_contains?: string | null;
    address_not_contains?: string | null;
    factoryAddress?: string | null;
    factoryAddress_not?: string | null;
    factoryAddress_in?: string[];
    factoryAddress_not_in?: string[];
    factoryAddress_contains?: string | null;
    factoryAddress_not_contains?: string | null;
    token?: string | null;
    token_not?: string | null;
    token_in?: string[];
    token_not_in?: string[];
    token_contains?: string | null;
    token_not_contains?: string | null;
    client?: string | null;
    client_not?: string | null;
    client_in?: string[];
    client_not_in?: string[];
    client_contains?: string | null;
    client_not_contains?: string | null;
    provider?: string | null;
    provider_not?: string | null;
    provider_in?: string[];
    provider_not_in?: string[];
    provider_contains?: string | null;
    provider_not_contains?: string | null;
    resolverType?: ADRFilter | null;
    resolverType_not?: ADRFilter | null;
    resolverType_in?: ADRFilter[];
    resolverType_not_in?: ADRFilter[];
    resolver?: string | null;
    resolver_not?: string | null;
    resolver_in?: string[];
    resolver_not_in?: string[];
    resolver_contains?: string | null;
    resolver_not_contains?: string | null;
    resolutionRate?: WeiSource | null;
    resolutionRate_not?: WeiSource | null;
    resolutionRate_gt?: WeiSource | null;
    resolutionRate_lt?: WeiSource | null;
    resolutionRate_gte?: WeiSource | null;
    resolutionRate_lte?: WeiSource | null;
    resolutionRate_in?: WeiSource[];
    resolutionRate_not_in?: WeiSource[];
    isLocked?: boolean | null;
    isLocked_not?: boolean | null;
    isLocked_in?: boolean[];
    isLocked_not_in?: boolean[];
    amounts?: WeiSource[];
    amounts_not?: WeiSource[];
    amounts_contains?: WeiSource[];
    amounts_contains_nocase?: WeiSource[];
    amounts_not_contains?: WeiSource[];
    amounts_not_contains_nocase?: WeiSource[];
    numMilestones?: number | null;
    numMilestones_not?: number | null;
    numMilestones_gt?: number | null;
    numMilestones_lt?: number | null;
    numMilestones_gte?: number | null;
    numMilestones_lte?: number | null;
    numMilestones_in?: number[];
    numMilestones_not_in?: number[];
    currentMilestone?: WeiSource | null;
    currentMilestone_not?: WeiSource | null;
    currentMilestone_gt?: WeiSource | null;
    currentMilestone_lt?: WeiSource | null;
    currentMilestone_gte?: WeiSource | null;
    currentMilestone_lte?: WeiSource | null;
    currentMilestone_in?: WeiSource[];
    currentMilestone_not_in?: WeiSource[];
    total?: WeiSource | null;
    total_not?: WeiSource | null;
    total_gt?: WeiSource | null;
    total_lt?: WeiSource | null;
    total_gte?: WeiSource | null;
    total_lte?: WeiSource | null;
    total_in?: WeiSource[];
    total_not_in?: WeiSource[];
    released?: WeiSource | null;
    released_not?: WeiSource | null;
    released_gt?: WeiSource | null;
    released_lt?: WeiSource | null;
    released_gte?: WeiSource | null;
    released_lte?: WeiSource | null;
    released_in?: WeiSource[];
    released_not_in?: WeiSource[];
    createdAt?: WeiSource | null;
    createdAt_not?: WeiSource | null;
    createdAt_gt?: WeiSource | null;
    createdAt_lt?: WeiSource | null;
    createdAt_gte?: WeiSource | null;
    createdAt_lte?: WeiSource | null;
    createdAt_in?: WeiSource[];
    createdAt_not_in?: WeiSource[];
    creationTxHash?: string | null;
    creationTxHash_not?: string | null;
    creationTxHash_in?: string[];
    creationTxHash_not_in?: string[];
    creationTxHash_contains?: string | null;
    creationTxHash_not_contains?: string | null;
    terminationTime?: WeiSource | null;
    terminationTime_not?: WeiSource | null;
    terminationTime_gt?: WeiSource | null;
    terminationTime_lt?: WeiSource | null;
    terminationTime_gte?: WeiSource | null;
    terminationTime_lte?: WeiSource | null;
    terminationTime_in?: WeiSource[];
    terminationTime_not_in?: WeiSource[];
    details?: string | null;
    details_not?: string | null;
    details_in?: string[];
    details_not_in?: string[];
    details_contains?: string | null;
    details_not_contains?: string | null;
    ipfsHash?: string | null;
    ipfsHash_not?: string | null;
    ipfsHash_gt?: string | null;
    ipfsHash_lt?: string | null;
    ipfsHash_gte?: string | null;
    ipfsHash_lte?: string | null;
    ipfsHash_in?: string[];
    ipfsHash_not_in?: string[];
    ipfsHash_contains?: string | null;
    ipfsHash_contains_nocase?: string | null;
    ipfsHash_not_contains?: string | null;
    ipfsHash_not_contains_nocase?: string | null;
    ipfsHash_starts_with?: string | null;
    ipfsHash_starts_with_nocase?: string | null;
    ipfsHash_not_starts_with?: string | null;
    ipfsHash_not_starts_with_nocase?: string | null;
    ipfsHash_ends_with?: string | null;
    ipfsHash_ends_with_nocase?: string | null;
    ipfsHash_not_ends_with?: string | null;
    ipfsHash_not_ends_with_nocase?: string | null;
    disputeId?: WeiSource | null;
    disputeId_not?: WeiSource | null;
    disputeId_gt?: WeiSource | null;
    disputeId_lt?: WeiSource | null;
    disputeId_gte?: WeiSource | null;
    disputeId_lte?: WeiSource | null;
    disputeId_in?: WeiSource[];
    disputeId_not_in?: WeiSource[];
    projectName?: string | null;
    projectName_not?: string | null;
    projectName_gt?: string | null;
    projectName_lt?: string | null;
    projectName_gte?: string | null;
    projectName_lte?: string | null;
    projectName_in?: string[];
    projectName_not_in?: string[];
    projectName_contains?: string | null;
    projectName_contains_nocase?: string | null;
    projectName_not_contains?: string | null;
    projectName_not_contains_nocase?: string | null;
    projectName_starts_with?: string | null;
    projectName_starts_with_nocase?: string | null;
    projectName_not_starts_with?: string | null;
    projectName_not_starts_with_nocase?: string | null;
    projectName_ends_with?: string | null;
    projectName_ends_with_nocase?: string | null;
    projectName_not_ends_with?: string | null;
    projectName_not_ends_with_nocase?: string | null;
    projectDescription?: string | null;
    projectDescription_not?: string | null;
    projectDescription_gt?: string | null;
    projectDescription_lt?: string | null;
    projectDescription_gte?: string | null;
    projectDescription_lte?: string | null;
    projectDescription_in?: string[];
    projectDescription_not_in?: string[];
    projectDescription_contains?: string | null;
    projectDescription_contains_nocase?: string | null;
    projectDescription_not_contains?: string | null;
    projectDescription_not_contains_nocase?: string | null;
    projectDescription_starts_with?: string | null;
    projectDescription_starts_with_nocase?: string | null;
    projectDescription_not_starts_with?: string | null;
    projectDescription_not_starts_with_nocase?: string | null;
    projectDescription_ends_with?: string | null;
    projectDescription_ends_with_nocase?: string | null;
    projectDescription_not_ends_with?: string | null;
    projectDescription_not_ends_with_nocase?: string | null;
    projectAgreement?: string[];
    projectAgreement_not?: string[];
    projectAgreement_contains?: string[];
    projectAgreement_contains_nocase?: string[];
    projectAgreement_not_contains?: string[];
    projectAgreement_not_contains_nocase?: string[];
    projectAgreement_?: Agreement_filterFilter | null;
    startDate?: WeiSource | null;
    startDate_not?: WeiSource | null;
    startDate_gt?: WeiSource | null;
    startDate_lt?: WeiSource | null;
    startDate_gte?: WeiSource | null;
    startDate_lte?: WeiSource | null;
    startDate_in?: WeiSource[];
    startDate_not_in?: WeiSource[];
    endDate?: WeiSource | null;
    endDate_not?: WeiSource | null;
    endDate_gt?: WeiSource | null;
    endDate_lt?: WeiSource | null;
    endDate_gte?: WeiSource | null;
    endDate_lte?: WeiSource | null;
    endDate_in?: WeiSource[];
    endDate_not_in?: WeiSource[];
    deposits?: string[];
    deposits_not?: string[];
    deposits_contains?: string[];
    deposits_contains_nocase?: string[];
    deposits_not_contains?: string[];
    deposits_not_contains_nocase?: string[];
    deposits_?: Deposit_filterFilter | null;
    withdraws?: string[];
    withdraws_not?: string[];
    withdraws_contains?: string[];
    withdraws_contains_nocase?: string[];
    withdraws_not_contains?: string[];
    withdraws_not_contains_nocase?: string[];
    withdraws_?: Withdraw_filterFilter | null;
    releases?: string[];
    releases_not?: string[];
    releases_contains?: string[];
    releases_contains_nocase?: string[];
    releases_not_contains?: string[];
    releases_not_contains_nocase?: string[];
    releases_?: Release_filterFilter | null;
    disputes?: string[];
    disputes_not?: string[];
    disputes_contains?: string[];
    disputes_contains_nocase?: string[];
    disputes_not_contains?: string[];
    disputes_not_contains_nocase?: string[];
    disputes_?: Dispute_filterFilter | null;
    resolutions?: string[];
    resolutions_not?: string[];
    resolutions_contains?: string[];
    resolutions_contains_nocase?: string[];
    resolutions_not_contains?: string[];
    resolutions_not_contains_nocase?: string[];
    resolutions_?: Resolution_filterFilter | null;
    tokenMetadata?: string | null;
    tokenMetadata_not?: string | null;
    tokenMetadata_gt?: string | null;
    tokenMetadata_lt?: string | null;
    tokenMetadata_gte?: string | null;
    tokenMetadata_lte?: string | null;
    tokenMetadata_in?: string[];
    tokenMetadata_not_in?: string[];
    tokenMetadata_contains?: string | null;
    tokenMetadata_contains_nocase?: string | null;
    tokenMetadata_not_contains?: string | null;
    tokenMetadata_not_contains_nocase?: string | null;
    tokenMetadata_starts_with?: string | null;
    tokenMetadata_starts_with_nocase?: string | null;
    tokenMetadata_not_starts_with?: string | null;
    tokenMetadata_not_starts_with_nocase?: string | null;
    tokenMetadata_ends_with?: string | null;
    tokenMetadata_ends_with_nocase?: string | null;
    tokenMetadata_not_ends_with?: string | null;
    tokenMetadata_not_ends_with_nocase?: string | null;
    tokenMetadata_?: Token_filterFilter | null;
    verified?: string[];
    verified_not?: string[];
    verified_contains?: string[];
    verified_contains_nocase?: string[];
    verified_not_contains?: string[];
    verified_not_contains_nocase?: string[];
    verified_?: Verified_filterFilter | null;
    milestonesAdded?: string[];
    milestonesAdded_not?: string[];
    milestonesAdded_contains?: string[];
    milestonesAdded_contains_nocase?: string[];
    milestonesAdded_not_contains?: string[];
    milestonesAdded_not_contains_nocase?: string[];
    milestonesAdded_?: MilestonesAdded_filterFilter | null;
    invoiceType?: string | null;
    invoiceType_not?: string | null;
    invoiceType_gt?: string | null;
    invoiceType_lt?: string | null;
    invoiceType_gte?: string | null;
    invoiceType_lte?: string | null;
    invoiceType_in?: string[];
    invoiceType_not_in?: string[];
    invoiceType_contains?: string | null;
    invoiceType_contains_nocase?: string | null;
    invoiceType_not_contains?: string | null;
    invoiceType_not_contains_nocase?: string | null;
    invoiceType_starts_with?: string | null;
    invoiceType_starts_with_nocase?: string | null;
    invoiceType_not_starts_with?: string | null;
    invoiceType_not_starts_with_nocase?: string | null;
    invoiceType_ends_with?: string | null;
    invoiceType_ends_with_nocase?: string | null;
    invoiceType_not_ends_with?: string | null;
    invoiceType_not_ends_with_nocase?: string | null;
    version?: WeiSource | null;
    version_not?: WeiSource | null;
    version_gt?: WeiSource | null;
    version_lt?: WeiSource | null;
    version_gte?: WeiSource | null;
    version_lte?: WeiSource | null;
    version_in?: WeiSource[];
    version_not_in?: WeiSource[];
    lateFee?: WeiSource | null;
    lateFee_not?: WeiSource | null;
    lateFee_gt?: WeiSource | null;
    lateFee_lt?: WeiSource | null;
    lateFee_gte?: WeiSource | null;
    lateFee_lte?: WeiSource | null;
    lateFee_in?: WeiSource[];
    lateFee_not_in?: WeiSource[];
    lateFeeTimeInterval?: WeiSource | null;
    lateFeeTimeInterval_not?: WeiSource | null;
    lateFeeTimeInterval_gt?: WeiSource | null;
    lateFeeTimeInterval_lt?: WeiSource | null;
    lateFeeTimeInterval_gte?: WeiSource | null;
    lateFeeTimeInterval_lte?: WeiSource | null;
    lateFeeTimeInterval_in?: WeiSource[];
    lateFeeTimeInterval_not_in?: WeiSource[];
    tipAmount?: string[];
    tipAmount_not?: string[];
    tipAmount_contains?: string[];
    tipAmount_contains_nocase?: string[];
    tipAmount_not_contains?: string[];
    tipAmount_not_contains_nocase?: string[];
    tipAmount_?: Tip_filterFilter | null;
    deadline?: WeiSource | null;
    deadline_not?: WeiSource | null;
    deadline_gt?: WeiSource | null;
    deadline_lt?: WeiSource | null;
    deadline_gte?: WeiSource | null;
    deadline_lte?: WeiSource | null;
    deadline_in?: WeiSource[];
    deadline_not_in?: WeiSource[];
    fulfilled?: boolean | null;
    fulfilled_not?: boolean | null;
    fulfilled_in?: boolean[];
    fulfilled_not_in?: boolean[];
    _change_block?: BlockChangedFilterFilter | null;
};
export type InvoiceResult = {
    id: string;
    network: string;
    address: string;
    factoryAddress: string;
    token: string;
    client: string;
    provider: string;
    resolverType: Partial<ADRResult>;
    resolver: string;
    resolutionRate: Wei;
    isLocked: boolean;
    amounts: Wei[];
    numMilestones: number;
    currentMilestone: Wei;
    total: Wei;
    released: Wei;
    createdAt: Wei;
    creationTxHash: string;
    terminationTime: Wei;
    details: string;
    ipfsHash: string;
    disputeId: Wei;
    projectName: string;
    projectDescription: string;
    projectAgreement: Partial<AgreementResult>[];
    startDate: Wei | null;
    endDate: Wei | null;
    deposits: Partial<DepositResult>[];
    withdraws: Partial<WithdrawResult>[];
    releases: Partial<ReleaseResult>[];
    disputes: Partial<DisputeResult>[];
    resolutions: Partial<ResolutionResult>[];
    tokenMetadata: Partial<TokenResult>;
    verified: Partial<VerifiedResult>[];
    milestonesAdded: Partial<MilestonesAddedResult>[];
    invoiceType: string | null;
    version: Wei | null;
    lateFee: Wei | null;
    lateFeeTimeInterval: Wei | null;
    tipAmount: Partial<TipResult>[];
    deadline: Wei | null;
    fulfilled: boolean | null;
};
export type InvoiceFields = {
    id: true;
    network: true;
    address: true;
    factoryAddress: true;
    token: true;
    client: true;
    provider: true;
    resolverType: ADRFields;
    resolver: true;
    resolutionRate: true;
    isLocked: true;
    amounts: true;
    numMilestones: true;
    currentMilestone: true;
    total: true;
    released: true;
    createdAt: true;
    creationTxHash: true;
    terminationTime: true;
    details: true;
    ipfsHash: true;
    disputeId: true;
    projectName: true;
    projectDescription: true;
    projectAgreement: AgreementFields;
    startDate: true;
    endDate: true;
    deposits: DepositFields;
    withdraws: WithdrawFields;
    releases: ReleaseFields;
    disputes: DisputeFields;
    resolutions: ResolutionFields;
    tokenMetadata: TokenFields;
    verified: VerifiedFields;
    milestonesAdded: MilestonesAddedFields;
    invoiceType: true;
    version: true;
    lateFee: true;
    lateFeeTimeInterval: true;
    tipAmount: TipFields;
    deadline: true;
    fulfilled: true;
};
export type InvoiceArgs<K extends keyof InvoiceResult> = {
    [Property in keyof Pick<InvoiceFields, K>]: InvoiceFields[Property];
};
export const getInvoiceById = async function <K extends keyof InvoiceResult>(url: string, options: SingleQueryOptions, args: InvoiceArgs<K>): Promise<Pick<InvoiceResult, K>> {
    const res = await axios.post(url, {
        query: generateGql("invoice", options, args)
    });
    const r = res.data as any;
    if (r.errors && r.errors.length) {
        throw new Error(r.errors[0].message);
    }
    const obj = (r.data[Object.keys(r.data)[0]] as any);
    const formattedObj: any = {};
    if (obj["id"])
        formattedObj["id"] = obj["id"];
    if (obj["network"])
        formattedObj["network"] = obj["network"];
    if (obj["address"])
        formattedObj["address"] = obj["address"];
    if (obj["factoryAddress"])
        formattedObj["factoryAddress"] = obj["factoryAddress"];
    if (obj["token"])
        formattedObj["token"] = obj["token"];
    if (obj["client"])
        formattedObj["client"] = obj["client"];
    if (obj["provider"])
        formattedObj["provider"] = obj["provider"];
    if (obj["resolverType"])
        formattedObj["resolverType"] = obj["resolverType"];
    if (obj["resolver"])
        formattedObj["resolver"] = obj["resolver"];
    if (obj["resolutionRate"])
        formattedObj["resolutionRate"] = wei(obj["resolutionRate"], 0);
    if (obj["isLocked"])
        formattedObj["isLocked"] = obj["isLocked"];
    if (obj["amounts"])
        formattedObj["amounts"] = wei(obj["amounts"], 0);
    if (obj["numMilestones"])
        formattedObj["numMilestones"] = obj["numMilestones"];
    if (obj["currentMilestone"])
        formattedObj["currentMilestone"] = wei(obj["currentMilestone"], 0);
    if (obj["total"])
        formattedObj["total"] = wei(obj["total"], 0);
    if (obj["released"])
        formattedObj["released"] = wei(obj["released"], 0);
    if (obj["createdAt"])
        formattedObj["createdAt"] = wei(obj["createdAt"], 0);
    if (obj["creationTxHash"])
        formattedObj["creationTxHash"] = obj["creationTxHash"];
    if (obj["terminationTime"])
        formattedObj["terminationTime"] = wei(obj["terminationTime"], 0);
    if (obj["details"])
        formattedObj["details"] = obj["details"];
    if (obj["ipfsHash"])
        formattedObj["ipfsHash"] = obj["ipfsHash"];
    if (obj["disputeId"])
        formattedObj["disputeId"] = wei(obj["disputeId"], 0);
    if (obj["projectName"])
        formattedObj["projectName"] = obj["projectName"];
    if (obj["projectDescription"])
        formattedObj["projectDescription"] = obj["projectDescription"];
    if (obj["projectAgreement"])
        formattedObj["projectAgreement"] = obj["projectAgreement"];
    if (obj["startDate"])
        formattedObj["startDate"] = wei(obj["startDate"], 0);
    if (obj["endDate"])
        formattedObj["endDate"] = wei(obj["endDate"], 0);
    if (obj["deposits"])
        formattedObj["deposits"] = obj["deposits"];
    if (obj["withdraws"])
        formattedObj["withdraws"] = obj["withdraws"];
    if (obj["releases"])
        formattedObj["releases"] = obj["releases"];
    if (obj["disputes"])
        formattedObj["disputes"] = obj["disputes"];
    if (obj["resolutions"])
        formattedObj["resolutions"] = obj["resolutions"];
    if (obj["tokenMetadata"])
        formattedObj["tokenMetadata"] = obj["tokenMetadata"];
    if (obj["verified"])
        formattedObj["verified"] = obj["verified"];
    if (obj["milestonesAdded"])
        formattedObj["milestonesAdded"] = obj["milestonesAdded"];
    if (obj["invoiceType"])
        formattedObj["invoiceType"] = obj["invoiceType"];
    if (obj["version"])
        formattedObj["version"] = wei(obj["version"], 0);
    if (obj["lateFee"])
        formattedObj["lateFee"] = wei(obj["lateFee"], 0);
    if (obj["lateFeeTimeInterval"])
        formattedObj["lateFeeTimeInterval"] = wei(obj["lateFeeTimeInterval"], 0);
    if (obj["tipAmount"])
        formattedObj["tipAmount"] = obj["tipAmount"];
    if (obj["deadline"])
        formattedObj["deadline"] = wei(obj["deadline"], 0);
    if (obj["fulfilled"])
        formattedObj["fulfilled"] = obj["fulfilled"];
    return formattedObj as Pick<InvoiceResult, K>;
};
export const getInvoices = async function <K extends keyof InvoiceResult>(url: string, options: MultiQueryOptions<InvoiceFilter, InvoiceResult>, args: InvoiceArgs<K>): Promise<Pick<InvoiceResult, K>[]> {
    const paginatedOptions: Partial<MultiQueryOptions<InvoiceFilter, InvoiceResult>> = { ...options };
    let paginationKey: keyof InvoiceFilter | null = null;
    let paginationValue = "";
    if (options.first && options.first > MAX_PAGE) {
        paginatedOptions.first = MAX_PAGE;
        paginatedOptions.orderBy = options.orderBy || "id";
        paginatedOptions.orderDirection = options.orderDirection || "asc";
        paginationKey = paginatedOptions.orderBy + (paginatedOptions.orderDirection === "asc" ? "_gt" : "_lt") as keyof InvoiceFilter;
        paginatedOptions.where = { ...options.where };
    }
    let results: Pick<InvoiceResult, K>[] = [];
    do {
        if (paginationKey && paginationValue)
            paginatedOptions.where![paginationKey] = paginationValue as any;
        const res = await axios.post(url, {
            query: generateGql("invoices", paginatedOptions, args)
        });
        const r = res.data as any;
        if (r.errors && r.errors.length) {
            throw new Error(r.errors[0].message);
        }
        const rawResults = r.data[Object.keys(r.data)[0]] as any[];
        const newResults = rawResults.map((obj) => {
            const formattedObj: any = {};
            if (obj["id"])
                formattedObj["id"] = obj["id"];
            if (obj["network"])
                formattedObj["network"] = obj["network"];
            if (obj["address"])
                formattedObj["address"] = obj["address"];
            if (obj["factoryAddress"])
                formattedObj["factoryAddress"] = obj["factoryAddress"];
            if (obj["token"])
                formattedObj["token"] = obj["token"];
            if (obj["client"])
                formattedObj["client"] = obj["client"];
            if (obj["provider"])
                formattedObj["provider"] = obj["provider"];
            if (obj["resolverType"])
                formattedObj["resolverType"] = obj["resolverType"];
            if (obj["resolver"])
                formattedObj["resolver"] = obj["resolver"];
            if (obj["resolutionRate"])
                formattedObj["resolutionRate"] = wei(obj["resolutionRate"], 0);
            if (obj["isLocked"])
                formattedObj["isLocked"] = obj["isLocked"];
            if (obj["amounts"])
                formattedObj["amounts"] = wei(obj["amounts"], 0);
            if (obj["numMilestones"])
                formattedObj["numMilestones"] = obj["numMilestones"];
            if (obj["currentMilestone"])
                formattedObj["currentMilestone"] = wei(obj["currentMilestone"], 0);
            if (obj["total"])
                formattedObj["total"] = wei(obj["total"], 0);
            if (obj["released"])
                formattedObj["released"] = wei(obj["released"], 0);
            if (obj["createdAt"])
                formattedObj["createdAt"] = wei(obj["createdAt"], 0);
            if (obj["creationTxHash"])
                formattedObj["creationTxHash"] = obj["creationTxHash"];
            if (obj["terminationTime"])
                formattedObj["terminationTime"] = wei(obj["terminationTime"], 0);
            if (obj["details"])
                formattedObj["details"] = obj["details"];
            if (obj["ipfsHash"])
                formattedObj["ipfsHash"] = obj["ipfsHash"];
            if (obj["disputeId"])
                formattedObj["disputeId"] = wei(obj["disputeId"], 0);
            if (obj["projectName"])
                formattedObj["projectName"] = obj["projectName"];
            if (obj["projectDescription"])
                formattedObj["projectDescription"] = obj["projectDescription"];
            if (obj["projectAgreement"])
                formattedObj["projectAgreement"] = obj["projectAgreement"];
            if (obj["startDate"])
                formattedObj["startDate"] = wei(obj["startDate"], 0);
            if (obj["endDate"])
                formattedObj["endDate"] = wei(obj["endDate"], 0);
            if (obj["deposits"])
                formattedObj["deposits"] = obj["deposits"];
            if (obj["withdraws"])
                formattedObj["withdraws"] = obj["withdraws"];
            if (obj["releases"])
                formattedObj["releases"] = obj["releases"];
            if (obj["disputes"])
                formattedObj["disputes"] = obj["disputes"];
            if (obj["resolutions"])
                formattedObj["resolutions"] = obj["resolutions"];
            if (obj["tokenMetadata"])
                formattedObj["tokenMetadata"] = obj["tokenMetadata"];
            if (obj["verified"])
                formattedObj["verified"] = obj["verified"];
            if (obj["milestonesAdded"])
                formattedObj["milestonesAdded"] = obj["milestonesAdded"];
            if (obj["invoiceType"])
                formattedObj["invoiceType"] = obj["invoiceType"];
            if (obj["version"])
                formattedObj["version"] = wei(obj["version"], 0);
            if (obj["lateFee"])
                formattedObj["lateFee"] = wei(obj["lateFee"], 0);
            if (obj["lateFeeTimeInterval"])
                formattedObj["lateFeeTimeInterval"] = wei(obj["lateFeeTimeInterval"], 0);
            if (obj["tipAmount"])
                formattedObj["tipAmount"] = obj["tipAmount"];
            if (obj["deadline"])
                formattedObj["deadline"] = wei(obj["deadline"], 0);
            if (obj["fulfilled"])
                formattedObj["fulfilled"] = obj["fulfilled"];
            return formattedObj as Pick<InvoiceResult, K>;
        });
        results = results.concat(newResults);
        if (newResults.length < 1000) {
            break;
        }
        if (paginationKey) {
            paginationValue = rawResults[rawResults.length - 1][paginatedOptions.orderBy!];
        }
    } while (paginationKey && (options.first && results.length < options.first));
    return options.first ? results.slice(0, options.first) : results;
};
export type MilestonesAddedFilter = {
    id?: string | null;
    id_not?: string | null;
    id_gt?: string | null;
    id_lt?: string | null;
    id_gte?: string | null;
    id_lte?: string | null;
    id_in?: string[];
    id_not_in?: string[];
    sender?: string | null;
    sender_not?: string | null;
    sender_in?: string[];
    sender_not_in?: string[];
    sender_contains?: string | null;
    sender_not_contains?: string | null;
    invoice?: string | null;
    invoice_not?: string | null;
    invoice_in?: string[];
    invoice_not_in?: string[];
    invoice_contains?: string | null;
    invoice_not_contains?: string | null;
    milestones?: WeiSource[];
    milestones_not?: WeiSource[];
    milestones_contains?: WeiSource[];
    milestones_contains_nocase?: WeiSource[];
    milestones_not_contains?: WeiSource[];
    milestones_not_contains_nocase?: WeiSource[];
    _change_block?: BlockChangedFilterFilter | null;
};
export type MilestonesAddedResult = {
    id: string;
    sender: string;
    invoice: string;
    milestones: Wei[];
};
export type MilestonesAddedFields = {
    id: true;
    sender: true;
    invoice: true;
    milestones: true;
};
export type MilestonesAddedArgs<K extends keyof MilestonesAddedResult> = {
    [Property in keyof Pick<MilestonesAddedFields, K>]: MilestonesAddedFields[Property];
};
export const getMilestonesAddedById = async function <K extends keyof MilestonesAddedResult>(url: string, options: SingleQueryOptions, args: MilestonesAddedArgs<K>): Promise<Pick<MilestonesAddedResult, K>> {
    const res = await axios.post(url, {
        query: generateGql("milestonesAdded", options, args)
    });
    const r = res.data as any;
    if (r.errors && r.errors.length) {
        throw new Error(r.errors[0].message);
    }
    const obj = (r.data[Object.keys(r.data)[0]] as any);
    const formattedObj: any = {};
    if (obj["id"])
        formattedObj["id"] = obj["id"];
    if (obj["sender"])
        formattedObj["sender"] = obj["sender"];
    if (obj["invoice"])
        formattedObj["invoice"] = obj["invoice"];
    if (obj["milestones"])
        formattedObj["milestones"] = wei(obj["milestones"], 0);
    return formattedObj as Pick<MilestonesAddedResult, K>;
};
export const getMilestonesAddeds = async function <K extends keyof MilestonesAddedResult>(url: string, options: MultiQueryOptions<MilestonesAddedFilter, MilestonesAddedResult>, args: MilestonesAddedArgs<K>): Promise<Pick<MilestonesAddedResult, K>[]> {
    const paginatedOptions: Partial<MultiQueryOptions<MilestonesAddedFilter, MilestonesAddedResult>> = { ...options };
    let paginationKey: keyof MilestonesAddedFilter | null = null;
    let paginationValue = "";
    if (options.first && options.first > MAX_PAGE) {
        paginatedOptions.first = MAX_PAGE;
        paginatedOptions.orderBy = options.orderBy || "id";
        paginatedOptions.orderDirection = options.orderDirection || "asc";
        paginationKey = paginatedOptions.orderBy + (paginatedOptions.orderDirection === "asc" ? "_gt" : "_lt") as keyof MilestonesAddedFilter;
        paginatedOptions.where = { ...options.where };
    }
    let results: Pick<MilestonesAddedResult, K>[] = [];
    do {
        if (paginationKey && paginationValue)
            paginatedOptions.where![paginationKey] = paginationValue as any;
        const res = await axios.post(url, {
            query: generateGql("milestonesAddeds", paginatedOptions, args)
        });
        const r = res.data as any;
        if (r.errors && r.errors.length) {
            throw new Error(r.errors[0].message);
        }
        const rawResults = r.data[Object.keys(r.data)[0]] as any[];
        const newResults = rawResults.map((obj) => {
            const formattedObj: any = {};
            if (obj["id"])
                formattedObj["id"] = obj["id"];
            if (obj["sender"])
                formattedObj["sender"] = obj["sender"];
            if (obj["invoice"])
                formattedObj["invoice"] = obj["invoice"];
            if (obj["milestones"])
                formattedObj["milestones"] = wei(obj["milestones"], 0);
            return formattedObj as Pick<MilestonesAddedResult, K>;
        });
        results = results.concat(newResults);
        if (newResults.length < 1000) {
            break;
        }
        if (paginationKey) {
            paginationValue = rawResults[rawResults.length - 1][paginatedOptions.orderBy!];
        }
    } while (paginationKey && (options.first && results.length < options.first));
    return options.first ? results.slice(0, options.first) : results;
};
export type ReleaseFilter = {
    id?: string | null;
    id_not?: string | null;
    id_gt?: string | null;
    id_lt?: string | null;
    id_gte?: string | null;
    id_lte?: string | null;
    id_in?: string[];
    id_not_in?: string[];
    txHash?: string | null;
    txHash_not?: string | null;
    txHash_in?: string[];
    txHash_not_in?: string[];
    txHash_contains?: string | null;
    txHash_not_contains?: string | null;
    invoice?: string | null;
    invoice_not?: string | null;
    invoice_gt?: string | null;
    invoice_lt?: string | null;
    invoice_gte?: string | null;
    invoice_lte?: string | null;
    invoice_in?: string[];
    invoice_not_in?: string[];
    invoice_contains?: string | null;
    invoice_contains_nocase?: string | null;
    invoice_not_contains?: string | null;
    invoice_not_contains_nocase?: string | null;
    invoice_starts_with?: string | null;
    invoice_starts_with_nocase?: string | null;
    invoice_not_starts_with?: string | null;
    invoice_not_starts_with_nocase?: string | null;
    invoice_ends_with?: string | null;
    invoice_ends_with_nocase?: string | null;
    invoice_not_ends_with?: string | null;
    invoice_not_ends_with_nocase?: string | null;
    invoice_?: Invoice_filterFilter | null;
    milestone?: WeiSource | null;
    milestone_not?: WeiSource | null;
    milestone_gt?: WeiSource | null;
    milestone_lt?: WeiSource | null;
    milestone_gte?: WeiSource | null;
    milestone_lte?: WeiSource | null;
    milestone_in?: WeiSource[];
    milestone_not_in?: WeiSource[];
    amount?: WeiSource | null;
    amount_not?: WeiSource | null;
    amount_gt?: WeiSource | null;
    amount_lt?: WeiSource | null;
    amount_gte?: WeiSource | null;
    amount_lte?: WeiSource | null;
    amount_in?: WeiSource[];
    amount_not_in?: WeiSource[];
    timestamp?: WeiSource | null;
    timestamp_not?: WeiSource | null;
    timestamp_gt?: WeiSource | null;
    timestamp_lt?: WeiSource | null;
    timestamp_gte?: WeiSource | null;
    timestamp_lte?: WeiSource | null;
    timestamp_in?: WeiSource[];
    timestamp_not_in?: WeiSource[];
    _change_block?: BlockChangedFilterFilter | null;
};
export type ReleaseResult = {
    id: string;
    txHash: string;
    invoice: Partial<InvoiceResult>;
    milestone: Wei;
    amount: Wei;
    timestamp: Wei;
};
export type ReleaseFields = {
    id: true;
    txHash: true;
    invoice: InvoiceFields;
    milestone: true;
    amount: true;
    timestamp: true;
};
export type ReleaseArgs<K extends keyof ReleaseResult> = {
    [Property in keyof Pick<ReleaseFields, K>]: ReleaseFields[Property];
};
export const getReleaseById = async function <K extends keyof ReleaseResult>(url: string, options: SingleQueryOptions, args: ReleaseArgs<K>): Promise<Pick<ReleaseResult, K>> {
    const res = await axios.post(url, {
        query: generateGql("release", options, args)
    });
    const r = res.data as any;
    if (r.errors && r.errors.length) {
        throw new Error(r.errors[0].message);
    }
    const obj = (r.data[Object.keys(r.data)[0]] as any);
    const formattedObj: any = {};
    if (obj["id"])
        formattedObj["id"] = obj["id"];
    if (obj["txHash"])
        formattedObj["txHash"] = obj["txHash"];
    if (obj["invoice"])
        formattedObj["invoice"] = obj["invoice"];
    if (obj["milestone"])
        formattedObj["milestone"] = wei(obj["milestone"], 0);
    if (obj["amount"])
        formattedObj["amount"] = wei(obj["amount"], 0);
    if (obj["timestamp"])
        formattedObj["timestamp"] = wei(obj["timestamp"], 0);
    return formattedObj as Pick<ReleaseResult, K>;
};
export const getReleases = async function <K extends keyof ReleaseResult>(url: string, options: MultiQueryOptions<ReleaseFilter, ReleaseResult>, args: ReleaseArgs<K>): Promise<Pick<ReleaseResult, K>[]> {
    const paginatedOptions: Partial<MultiQueryOptions<ReleaseFilter, ReleaseResult>> = { ...options };
    let paginationKey: keyof ReleaseFilter | null = null;
    let paginationValue = "";
    if (options.first && options.first > MAX_PAGE) {
        paginatedOptions.first = MAX_PAGE;
        paginatedOptions.orderBy = options.orderBy || "id";
        paginatedOptions.orderDirection = options.orderDirection || "asc";
        paginationKey = paginatedOptions.orderBy + (paginatedOptions.orderDirection === "asc" ? "_gt" : "_lt") as keyof ReleaseFilter;
        paginatedOptions.where = { ...options.where };
    }
    let results: Pick<ReleaseResult, K>[] = [];
    do {
        if (paginationKey && paginationValue)
            paginatedOptions.where![paginationKey] = paginationValue as any;
        const res = await axios.post(url, {
            query: generateGql("releases", paginatedOptions, args)
        });
        const r = res.data as any;
        if (r.errors && r.errors.length) {
            throw new Error(r.errors[0].message);
        }
        const rawResults = r.data[Object.keys(r.data)[0]] as any[];
        const newResults = rawResults.map((obj) => {
            const formattedObj: any = {};
            if (obj["id"])
                formattedObj["id"] = obj["id"];
            if (obj["txHash"])
                formattedObj["txHash"] = obj["txHash"];
            if (obj["invoice"])
                formattedObj["invoice"] = obj["invoice"];
            if (obj["milestone"])
                formattedObj["milestone"] = wei(obj["milestone"], 0);
            if (obj["amount"])
                formattedObj["amount"] = wei(obj["amount"], 0);
            if (obj["timestamp"])
                formattedObj["timestamp"] = wei(obj["timestamp"], 0);
            return formattedObj as Pick<ReleaseResult, K>;
        });
        results = results.concat(newResults);
        if (newResults.length < 1000) {
            break;
        }
        if (paginationKey) {
            paginationValue = rawResults[rawResults.length - 1][paginatedOptions.orderBy!];
        }
    } while (paginationKey && (options.first && results.length < options.first));
    return options.first ? results.slice(0, options.first) : results;
};
export type ResolutionFilter = {
    id?: string | null;
    id_not?: string | null;
    id_gt?: string | null;
    id_lt?: string | null;
    id_gte?: string | null;
    id_lte?: string | null;
    id_in?: string[];
    id_not_in?: string[];
    txHash?: string | null;
    txHash_not?: string | null;
    txHash_in?: string[];
    txHash_not_in?: string[];
    txHash_contains?: string | null;
    txHash_not_contains?: string | null;
    details?: string | null;
    details_not?: string | null;
    details_in?: string[];
    details_not_in?: string[];
    details_contains?: string | null;
    details_not_contains?: string | null;
    ipfsHash?: string | null;
    ipfsHash_not?: string | null;
    ipfsHash_gt?: string | null;
    ipfsHash_lt?: string | null;
    ipfsHash_gte?: string | null;
    ipfsHash_lte?: string | null;
    ipfsHash_in?: string[];
    ipfsHash_not_in?: string[];
    ipfsHash_contains?: string | null;
    ipfsHash_contains_nocase?: string | null;
    ipfsHash_not_contains?: string | null;
    ipfsHash_not_contains_nocase?: string | null;
    ipfsHash_starts_with?: string | null;
    ipfsHash_starts_with_nocase?: string | null;
    ipfsHash_not_starts_with?: string | null;
    ipfsHash_not_starts_with_nocase?: string | null;
    ipfsHash_ends_with?: string | null;
    ipfsHash_ends_with_nocase?: string | null;
    ipfsHash_not_ends_with?: string | null;
    ipfsHash_not_ends_with_nocase?: string | null;
    invoice?: string | null;
    invoice_not?: string | null;
    invoice_gt?: string | null;
    invoice_lt?: string | null;
    invoice_gte?: string | null;
    invoice_lte?: string | null;
    invoice_in?: string[];
    invoice_not_in?: string[];
    invoice_contains?: string | null;
    invoice_contains_nocase?: string | null;
    invoice_not_contains?: string | null;
    invoice_not_contains_nocase?: string | null;
    invoice_starts_with?: string | null;
    invoice_starts_with_nocase?: string | null;
    invoice_not_starts_with?: string | null;
    invoice_not_starts_with_nocase?: string | null;
    invoice_ends_with?: string | null;
    invoice_ends_with_nocase?: string | null;
    invoice_not_ends_with?: string | null;
    invoice_not_ends_with_nocase?: string | null;
    invoice_?: Invoice_filterFilter | null;
    resolverType?: ADRFilter | null;
    resolverType_not?: ADRFilter | null;
    resolverType_in?: ADRFilter[];
    resolverType_not_in?: ADRFilter[];
    resolver?: string | null;
    resolver_not?: string | null;
    resolver_in?: string[];
    resolver_not_in?: string[];
    resolver_contains?: string | null;
    resolver_not_contains?: string | null;
    clientAward?: WeiSource | null;
    clientAward_not?: WeiSource | null;
    clientAward_gt?: WeiSource | null;
    clientAward_lt?: WeiSource | null;
    clientAward_gte?: WeiSource | null;
    clientAward_lte?: WeiSource | null;
    clientAward_in?: WeiSource[];
    clientAward_not_in?: WeiSource[];
    providerAward?: WeiSource | null;
    providerAward_not?: WeiSource | null;
    providerAward_gt?: WeiSource | null;
    providerAward_lt?: WeiSource | null;
    providerAward_gte?: WeiSource | null;
    providerAward_lte?: WeiSource | null;
    providerAward_in?: WeiSource[];
    providerAward_not_in?: WeiSource[];
    resolutionDetails?: string | null;
    resolutionDetails_not?: string | null;
    resolutionDetails_in?: string[];
    resolutionDetails_not_in?: string[];
    resolutionDetails_contains?: string | null;
    resolutionDetails_not_contains?: string | null;
    resolutionFee?: WeiSource | null;
    resolutionFee_not?: WeiSource | null;
    resolutionFee_gt?: WeiSource | null;
    resolutionFee_lt?: WeiSource | null;
    resolutionFee_gte?: WeiSource | null;
    resolutionFee_lte?: WeiSource | null;
    resolutionFee_in?: WeiSource[];
    resolutionFee_not_in?: WeiSource[];
    ruling?: WeiSource | null;
    ruling_not?: WeiSource | null;
    ruling_gt?: WeiSource | null;
    ruling_lt?: WeiSource | null;
    ruling_gte?: WeiSource | null;
    ruling_lte?: WeiSource | null;
    ruling_in?: WeiSource[];
    ruling_not_in?: WeiSource[];
    timestamp?: WeiSource | null;
    timestamp_not?: WeiSource | null;
    timestamp_gt?: WeiSource | null;
    timestamp_lt?: WeiSource | null;
    timestamp_gte?: WeiSource | null;
    timestamp_lte?: WeiSource | null;
    timestamp_in?: WeiSource[];
    timestamp_not_in?: WeiSource[];
    _change_block?: BlockChangedFilterFilter | null;
};
export type ResolutionResult = {
    id: string;
    txHash: string;
    details: string;
    ipfsHash: string;
    invoice: Partial<InvoiceResult>;
    resolverType: Partial<ADRResult>;
    resolver: string;
    clientAward: Wei;
    providerAward: Wei;
    resolutionDetails: string | null;
    resolutionFee: Wei | null;
    ruling: Wei | null;
    timestamp: Wei;
};
export type ResolutionFields = {
    id: true;
    txHash: true;
    details: true;
    ipfsHash: true;
    invoice: InvoiceFields;
    resolverType: ADRFields;
    resolver: true;
    clientAward: true;
    providerAward: true;
    resolutionDetails: true;
    resolutionFee: true;
    ruling: true;
    timestamp: true;
};
export type ResolutionArgs<K extends keyof ResolutionResult> = {
    [Property in keyof Pick<ResolutionFields, K>]: ResolutionFields[Property];
};
export const getResolutionById = async function <K extends keyof ResolutionResult>(url: string, options: SingleQueryOptions, args: ResolutionArgs<K>): Promise<Pick<ResolutionResult, K>> {
    const res = await axios.post(url, {
        query: generateGql("resolution", options, args)
    });
    const r = res.data as any;
    if (r.errors && r.errors.length) {
        throw new Error(r.errors[0].message);
    }
    const obj = (r.data[Object.keys(r.data)[0]] as any);
    const formattedObj: any = {};
    if (obj["id"])
        formattedObj["id"] = obj["id"];
    if (obj["txHash"])
        formattedObj["txHash"] = obj["txHash"];
    if (obj["details"])
        formattedObj["details"] = obj["details"];
    if (obj["ipfsHash"])
        formattedObj["ipfsHash"] = obj["ipfsHash"];
    if (obj["invoice"])
        formattedObj["invoice"] = obj["invoice"];
    if (obj["resolverType"])
        formattedObj["resolverType"] = obj["resolverType"];
    if (obj["resolver"])
        formattedObj["resolver"] = obj["resolver"];
    if (obj["clientAward"])
        formattedObj["clientAward"] = wei(obj["clientAward"], 0);
    if (obj["providerAward"])
        formattedObj["providerAward"] = wei(obj["providerAward"], 0);
    if (obj["resolutionDetails"])
        formattedObj["resolutionDetails"] = obj["resolutionDetails"];
    if (obj["resolutionFee"])
        formattedObj["resolutionFee"] = wei(obj["resolutionFee"], 0);
    if (obj["ruling"])
        formattedObj["ruling"] = wei(obj["ruling"], 0);
    if (obj["timestamp"])
        formattedObj["timestamp"] = wei(obj["timestamp"], 0);
    return formattedObj as Pick<ResolutionResult, K>;
};
export const getResolutions = async function <K extends keyof ResolutionResult>(url: string, options: MultiQueryOptions<ResolutionFilter, ResolutionResult>, args: ResolutionArgs<K>): Promise<Pick<ResolutionResult, K>[]> {
    const paginatedOptions: Partial<MultiQueryOptions<ResolutionFilter, ResolutionResult>> = { ...options };
    let paginationKey: keyof ResolutionFilter | null = null;
    let paginationValue = "";
    if (options.first && options.first > MAX_PAGE) {
        paginatedOptions.first = MAX_PAGE;
        paginatedOptions.orderBy = options.orderBy || "id";
        paginatedOptions.orderDirection = options.orderDirection || "asc";
        paginationKey = paginatedOptions.orderBy + (paginatedOptions.orderDirection === "asc" ? "_gt" : "_lt") as keyof ResolutionFilter;
        paginatedOptions.where = { ...options.where };
    }
    let results: Pick<ResolutionResult, K>[] = [];
    do {
        if (paginationKey && paginationValue)
            paginatedOptions.where![paginationKey] = paginationValue as any;
        const res = await axios.post(url, {
            query: generateGql("resolutions", paginatedOptions, args)
        });
        const r = res.data as any;
        if (r.errors && r.errors.length) {
            throw new Error(r.errors[0].message);
        }
        const rawResults = r.data[Object.keys(r.data)[0]] as any[];
        const newResults = rawResults.map((obj) => {
            const formattedObj: any = {};
            if (obj["id"])
                formattedObj["id"] = obj["id"];
            if (obj["txHash"])
                formattedObj["txHash"] = obj["txHash"];
            if (obj["details"])
                formattedObj["details"] = obj["details"];
            if (obj["ipfsHash"])
                formattedObj["ipfsHash"] = obj["ipfsHash"];
            if (obj["invoice"])
                formattedObj["invoice"] = obj["invoice"];
            if (obj["resolverType"])
                formattedObj["resolverType"] = obj["resolverType"];
            if (obj["resolver"])
                formattedObj["resolver"] = obj["resolver"];
            if (obj["clientAward"])
                formattedObj["clientAward"] = wei(obj["clientAward"], 0);
            if (obj["providerAward"])
                formattedObj["providerAward"] = wei(obj["providerAward"], 0);
            if (obj["resolutionDetails"])
                formattedObj["resolutionDetails"] = obj["resolutionDetails"];
            if (obj["resolutionFee"])
                formattedObj["resolutionFee"] = wei(obj["resolutionFee"], 0);
            if (obj["ruling"])
                formattedObj["ruling"] = wei(obj["ruling"], 0);
            if (obj["timestamp"])
                formattedObj["timestamp"] = wei(obj["timestamp"], 0);
            return formattedObj as Pick<ResolutionResult, K>;
        });
        results = results.concat(newResults);
        if (newResults.length < 1000) {
            break;
        }
        if (paginationKey) {
            paginationValue = rawResults[rawResults.length - 1][paginatedOptions.orderBy!];
        }
    } while (paginationKey && (options.first && results.length < options.first));
    return options.first ? results.slice(0, options.first) : results;
};
export type TipFilter = {
    id?: string | null;
    id_not?: string | null;
    id_gt?: string | null;
    id_lt?: string | null;
    id_gte?: string | null;
    id_lte?: string | null;
    id_in?: string[];
    id_not_in?: string[];
    sender?: string | null;
    sender_not?: string | null;
    sender_in?: string[];
    sender_not_in?: string[];
    sender_contains?: string | null;
    sender_not_contains?: string | null;
    amount?: WeiSource | null;
    amount_not?: WeiSource | null;
    amount_gt?: WeiSource | null;
    amount_lt?: WeiSource | null;
    amount_gte?: WeiSource | null;
    amount_lte?: WeiSource | null;
    amount_in?: WeiSource[];
    amount_not_in?: WeiSource[];
    _change_block?: BlockChangedFilterFilter | null;
};
export type TipResult = {
    id: string;
    sender: string;
    amount: Wei;
};
export type TipFields = {
    id: true;
    sender: true;
    amount: true;
};
export type TipArgs<K extends keyof TipResult> = {
    [Property in keyof Pick<TipFields, K>]: TipFields[Property];
};
export const getTipById = async function <K extends keyof TipResult>(url: string, options: SingleQueryOptions, args: TipArgs<K>): Promise<Pick<TipResult, K>> {
    const res = await axios.post(url, {
        query: generateGql("tip", options, args)
    });
    const r = res.data as any;
    if (r.errors && r.errors.length) {
        throw new Error(r.errors[0].message);
    }
    const obj = (r.data[Object.keys(r.data)[0]] as any);
    const formattedObj: any = {};
    if (obj["id"])
        formattedObj["id"] = obj["id"];
    if (obj["sender"])
        formattedObj["sender"] = obj["sender"];
    if (obj["amount"])
        formattedObj["amount"] = wei(obj["amount"], 0);
    return formattedObj as Pick<TipResult, K>;
};
export const getTips = async function <K extends keyof TipResult>(url: string, options: MultiQueryOptions<TipFilter, TipResult>, args: TipArgs<K>): Promise<Pick<TipResult, K>[]> {
    const paginatedOptions: Partial<MultiQueryOptions<TipFilter, TipResult>> = { ...options };
    let paginationKey: keyof TipFilter | null = null;
    let paginationValue = "";
    if (options.first && options.first > MAX_PAGE) {
        paginatedOptions.first = MAX_PAGE;
        paginatedOptions.orderBy = options.orderBy || "id";
        paginatedOptions.orderDirection = options.orderDirection || "asc";
        paginationKey = paginatedOptions.orderBy + (paginatedOptions.orderDirection === "asc" ? "_gt" : "_lt") as keyof TipFilter;
        paginatedOptions.where = { ...options.where };
    }
    let results: Pick<TipResult, K>[] = [];
    do {
        if (paginationKey && paginationValue)
            paginatedOptions.where![paginationKey] = paginationValue as any;
        const res = await axios.post(url, {
            query: generateGql("tips", paginatedOptions, args)
        });
        const r = res.data as any;
        if (r.errors && r.errors.length) {
            throw new Error(r.errors[0].message);
        }
        const rawResults = r.data[Object.keys(r.data)[0]] as any[];
        const newResults = rawResults.map((obj) => {
            const formattedObj: any = {};
            if (obj["id"])
                formattedObj["id"] = obj["id"];
            if (obj["sender"])
                formattedObj["sender"] = obj["sender"];
            if (obj["amount"])
                formattedObj["amount"] = wei(obj["amount"], 0);
            return formattedObj as Pick<TipResult, K>;
        });
        results = results.concat(newResults);
        if (newResults.length < 1000) {
            break;
        }
        if (paginationKey) {
            paginationValue = rawResults[rawResults.length - 1][paginatedOptions.orderBy!];
        }
    } while (paginationKey && (options.first && results.length < options.first));
    return options.first ? results.slice(0, options.first) : results;
};
export type TokenFilter = {
    id?: string | null;
    id_not?: string | null;
    id_gt?: string | null;
    id_lt?: string | null;
    id_gte?: string | null;
    id_lte?: string | null;
    id_in?: string[];
    id_not_in?: string[];
    name?: string | null;
    name_not?: string | null;
    name_gt?: string | null;
    name_lt?: string | null;
    name_gte?: string | null;
    name_lte?: string | null;
    name_in?: string[];
    name_not_in?: string[];
    name_contains?: string | null;
    name_contains_nocase?: string | null;
    name_not_contains?: string | null;
    name_not_contains_nocase?: string | null;
    name_starts_with?: string | null;
    name_starts_with_nocase?: string | null;
    name_not_starts_with?: string | null;
    name_not_starts_with_nocase?: string | null;
    name_ends_with?: string | null;
    name_ends_with_nocase?: string | null;
    name_not_ends_with?: string | null;
    name_not_ends_with_nocase?: string | null;
    symbol?: string | null;
    symbol_not?: string | null;
    symbol_gt?: string | null;
    symbol_lt?: string | null;
    symbol_gte?: string | null;
    symbol_lte?: string | null;
    symbol_in?: string[];
    symbol_not_in?: string[];
    symbol_contains?: string | null;
    symbol_contains_nocase?: string | null;
    symbol_not_contains?: string | null;
    symbol_not_contains_nocase?: string | null;
    symbol_starts_with?: string | null;
    symbol_starts_with_nocase?: string | null;
    symbol_not_starts_with?: string | null;
    symbol_not_starts_with_nocase?: string | null;
    symbol_ends_with?: string | null;
    symbol_ends_with_nocase?: string | null;
    symbol_not_ends_with?: string | null;
    symbol_not_ends_with_nocase?: string | null;
    decimals?: number | null;
    decimals_not?: number | null;
    decimals_gt?: number | null;
    decimals_lt?: number | null;
    decimals_gte?: number | null;
    decimals_lte?: number | null;
    decimals_in?: number[];
    decimals_not_in?: number[];
    _change_block?: BlockChangedFilterFilter | null;
};
export type TokenResult = {
    id: string;
    name: string;
    symbol: string;
    decimals: number;
};
export type TokenFields = {
    id: true;
    name: true;
    symbol: true;
    decimals: true;
};
export type TokenArgs<K extends keyof TokenResult> = {
    [Property in keyof Pick<TokenFields, K>]: TokenFields[Property];
};
export const getTokenById = async function <K extends keyof TokenResult>(url: string, options: SingleQueryOptions, args: TokenArgs<K>): Promise<Pick<TokenResult, K>> {
    const res = await axios.post(url, {
        query: generateGql("token", options, args)
    });
    const r = res.data as any;
    if (r.errors && r.errors.length) {
        throw new Error(r.errors[0].message);
    }
    const obj = (r.data[Object.keys(r.data)[0]] as any);
    const formattedObj: any = {};
    if (obj["id"])
        formattedObj["id"] = obj["id"];
    if (obj["name"])
        formattedObj["name"] = obj["name"];
    if (obj["symbol"])
        formattedObj["symbol"] = obj["symbol"];
    if (obj["decimals"])
        formattedObj["decimals"] = obj["decimals"];
    return formattedObj as Pick<TokenResult, K>;
};
export const getTokens = async function <K extends keyof TokenResult>(url: string, options: MultiQueryOptions<TokenFilter, TokenResult>, args: TokenArgs<K>): Promise<Pick<TokenResult, K>[]> {
    const paginatedOptions: Partial<MultiQueryOptions<TokenFilter, TokenResult>> = { ...options };
    let paginationKey: keyof TokenFilter | null = null;
    let paginationValue = "";
    if (options.first && options.first > MAX_PAGE) {
        paginatedOptions.first = MAX_PAGE;
        paginatedOptions.orderBy = options.orderBy || "id";
        paginatedOptions.orderDirection = options.orderDirection || "asc";
        paginationKey = paginatedOptions.orderBy + (paginatedOptions.orderDirection === "asc" ? "_gt" : "_lt") as keyof TokenFilter;
        paginatedOptions.where = { ...options.where };
    }
    let results: Pick<TokenResult, K>[] = [];
    do {
        if (paginationKey && paginationValue)
            paginatedOptions.where![paginationKey] = paginationValue as any;
        const res = await axios.post(url, {
            query: generateGql("tokens", paginatedOptions, args)
        });
        const r = res.data as any;
        if (r.errors && r.errors.length) {
            throw new Error(r.errors[0].message);
        }
        const rawResults = r.data[Object.keys(r.data)[0]] as any[];
        const newResults = rawResults.map((obj) => {
            const formattedObj: any = {};
            if (obj["id"])
                formattedObj["id"] = obj["id"];
            if (obj["name"])
                formattedObj["name"] = obj["name"];
            if (obj["symbol"])
                formattedObj["symbol"] = obj["symbol"];
            if (obj["decimals"])
                formattedObj["decimals"] = obj["decimals"];
            return formattedObj as Pick<TokenResult, K>;
        });
        results = results.concat(newResults);
        if (newResults.length < 1000) {
            break;
        }
        if (paginationKey) {
            paginationValue = rawResults[rawResults.length - 1][paginatedOptions.orderBy!];
        }
    } while (paginationKey && (options.first && results.length < options.first));
    return options.first ? results.slice(0, options.first) : results;
};
export type VerifiedFilter = {
    id?: string | null;
    id_not?: string | null;
    id_gt?: string | null;
    id_lt?: string | null;
    id_gte?: string | null;
    id_lte?: string | null;
    id_in?: string[];
    id_not_in?: string[];
    client?: string | null;
    client_not?: string | null;
    client_in?: string[];
    client_not_in?: string[];
    client_contains?: string | null;
    client_not_contains?: string | null;
    invoice?: string | null;
    invoice_not?: string | null;
    invoice_in?: string[];
    invoice_not_in?: string[];
    invoice_contains?: string | null;
    invoice_not_contains?: string | null;
    _change_block?: BlockChangedFilterFilter | null;
};
export type VerifiedResult = {
    id: string;
    client: string;
    invoice: string;
};
export type VerifiedFields = {
    id: true;
    client: true;
    invoice: true;
};
export type VerifiedArgs<K extends keyof VerifiedResult> = {
    [Property in keyof Pick<VerifiedFields, K>]: VerifiedFields[Property];
};
export const getVerifiedById = async function <K extends keyof VerifiedResult>(url: string, options: SingleQueryOptions, args: VerifiedArgs<K>): Promise<Pick<VerifiedResult, K>> {
    const res = await axios.post(url, {
        query: generateGql("verified", options, args)
    });
    const r = res.data as any;
    if (r.errors && r.errors.length) {
        throw new Error(r.errors[0].message);
    }
    const obj = (r.data[Object.keys(r.data)[0]] as any);
    const formattedObj: any = {};
    if (obj["id"])
        formattedObj["id"] = obj["id"];
    if (obj["client"])
        formattedObj["client"] = obj["client"];
    if (obj["invoice"])
        formattedObj["invoice"] = obj["invoice"];
    return formattedObj as Pick<VerifiedResult, K>;
};
export const getVerifieds = async function <K extends keyof VerifiedResult>(url: string, options: MultiQueryOptions<VerifiedFilter, VerifiedResult>, args: VerifiedArgs<K>): Promise<Pick<VerifiedResult, K>[]> {
    const paginatedOptions: Partial<MultiQueryOptions<VerifiedFilter, VerifiedResult>> = { ...options };
    let paginationKey: keyof VerifiedFilter | null = null;
    let paginationValue = "";
    if (options.first && options.first > MAX_PAGE) {
        paginatedOptions.first = MAX_PAGE;
        paginatedOptions.orderBy = options.orderBy || "id";
        paginatedOptions.orderDirection = options.orderDirection || "asc";
        paginationKey = paginatedOptions.orderBy + (paginatedOptions.orderDirection === "asc" ? "_gt" : "_lt") as keyof VerifiedFilter;
        paginatedOptions.where = { ...options.where };
    }
    let results: Pick<VerifiedResult, K>[] = [];
    do {
        if (paginationKey && paginationValue)
            paginatedOptions.where![paginationKey] = paginationValue as any;
        const res = await axios.post(url, {
            query: generateGql("verifieds", paginatedOptions, args)
        });
        const r = res.data as any;
        if (r.errors && r.errors.length) {
            throw new Error(r.errors[0].message);
        }
        const rawResults = r.data[Object.keys(r.data)[0]] as any[];
        const newResults = rawResults.map((obj) => {
            const formattedObj: any = {};
            if (obj["id"])
                formattedObj["id"] = obj["id"];
            if (obj["client"])
                formattedObj["client"] = obj["client"];
            if (obj["invoice"])
                formattedObj["invoice"] = obj["invoice"];
            return formattedObj as Pick<VerifiedResult, K>;
        });
        results = results.concat(newResults);
        if (newResults.length < 1000) {
            break;
        }
        if (paginationKey) {
            paginationValue = rawResults[rawResults.length - 1][paginatedOptions.orderBy!];
        }
    } while (paginationKey && (options.first && results.length < options.first));
    return options.first ? results.slice(0, options.first) : results;
};
export type WithdrawFilter = {
    id?: string | null;
    id_not?: string | null;
    id_gt?: string | null;
    id_lt?: string | null;
    id_gte?: string | null;
    id_lte?: string | null;
    id_in?: string[];
    id_not_in?: string[];
    txHash?: string | null;
    txHash_not?: string | null;
    txHash_in?: string[];
    txHash_not_in?: string[];
    txHash_contains?: string | null;
    txHash_not_contains?: string | null;
    invoice?: string | null;
    invoice_not?: string | null;
    invoice_gt?: string | null;
    invoice_lt?: string | null;
    invoice_gte?: string | null;
    invoice_lte?: string | null;
    invoice_in?: string[];
    invoice_not_in?: string[];
    invoice_contains?: string | null;
    invoice_contains_nocase?: string | null;
    invoice_not_contains?: string | null;
    invoice_not_contains_nocase?: string | null;
    invoice_starts_with?: string | null;
    invoice_starts_with_nocase?: string | null;
    invoice_not_starts_with?: string | null;
    invoice_not_starts_with_nocase?: string | null;
    invoice_ends_with?: string | null;
    invoice_ends_with_nocase?: string | null;
    invoice_not_ends_with?: string | null;
    invoice_not_ends_with_nocase?: string | null;
    invoice_?: Invoice_filterFilter | null;
    amount?: WeiSource | null;
    amount_not?: WeiSource | null;
    amount_gt?: WeiSource | null;
    amount_lt?: WeiSource | null;
    amount_gte?: WeiSource | null;
    amount_lte?: WeiSource | null;
    amount_in?: WeiSource[];
    amount_not_in?: WeiSource[];
    timestamp?: WeiSource | null;
    timestamp_not?: WeiSource | null;
    timestamp_gt?: WeiSource | null;
    timestamp_lt?: WeiSource | null;
    timestamp_gte?: WeiSource | null;
    timestamp_lte?: WeiSource | null;
    timestamp_in?: WeiSource[];
    timestamp_not_in?: WeiSource[];
    _change_block?: BlockChangedFilterFilter | null;
};
export type WithdrawResult = {
    id: string;
    txHash: string;
    invoice: Partial<InvoiceResult>;
    amount: Wei;
    timestamp: Wei;
};
export type WithdrawFields = {
    id: true;
    txHash: true;
    invoice: InvoiceFields;
    amount: true;
    timestamp: true;
};
export type WithdrawArgs<K extends keyof WithdrawResult> = {
    [Property in keyof Pick<WithdrawFields, K>]: WithdrawFields[Property];
};
export const getWithdrawById = async function <K extends keyof WithdrawResult>(url: string, options: SingleQueryOptions, args: WithdrawArgs<K>): Promise<Pick<WithdrawResult, K>> {
    const res = await axios.post(url, {
        query: generateGql("withdraw", options, args)
    });
    const r = res.data as any;
    if (r.errors && r.errors.length) {
        throw new Error(r.errors[0].message);
    }
    const obj = (r.data[Object.keys(r.data)[0]] as any);
    const formattedObj: any = {};
    if (obj["id"])
        formattedObj["id"] = obj["id"];
    if (obj["txHash"])
        formattedObj["txHash"] = obj["txHash"];
    if (obj["invoice"])
        formattedObj["invoice"] = obj["invoice"];
    if (obj["amount"])
        formattedObj["amount"] = wei(obj["amount"], 0);
    if (obj["timestamp"])
        formattedObj["timestamp"] = wei(obj["timestamp"], 0);
    return formattedObj as Pick<WithdrawResult, K>;
};
export const getWithdraws = async function <K extends keyof WithdrawResult>(url: string, options: MultiQueryOptions<WithdrawFilter, WithdrawResult>, args: WithdrawArgs<K>): Promise<Pick<WithdrawResult, K>[]> {
    const paginatedOptions: Partial<MultiQueryOptions<WithdrawFilter, WithdrawResult>> = { ...options };
    let paginationKey: keyof WithdrawFilter | null = null;
    let paginationValue = "";
    if (options.first && options.first > MAX_PAGE) {
        paginatedOptions.first = MAX_PAGE;
        paginatedOptions.orderBy = options.orderBy || "id";
        paginatedOptions.orderDirection = options.orderDirection || "asc";
        paginationKey = paginatedOptions.orderBy + (paginatedOptions.orderDirection === "asc" ? "_gt" : "_lt") as keyof WithdrawFilter;
        paginatedOptions.where = { ...options.where };
    }
    let results: Pick<WithdrawResult, K>[] = [];
    do {
        if (paginationKey && paginationValue)
            paginatedOptions.where![paginationKey] = paginationValue as any;
        const res = await axios.post(url, {
            query: generateGql("withdraws", paginatedOptions, args)
        });
        const r = res.data as any;
        if (r.errors && r.errors.length) {
            throw new Error(r.errors[0].message);
        }
        const rawResults = r.data[Object.keys(r.data)[0]] as any[];
        const newResults = rawResults.map((obj) => {
            const formattedObj: any = {};
            if (obj["id"])
                formattedObj["id"] = obj["id"];
            if (obj["txHash"])
                formattedObj["txHash"] = obj["txHash"];
            if (obj["invoice"])
                formattedObj["invoice"] = obj["invoice"];
            if (obj["amount"])
                formattedObj["amount"] = wei(obj["amount"], 0);
            if (obj["timestamp"])
                formattedObj["timestamp"] = wei(obj["timestamp"], 0);
            return formattedObj as Pick<WithdrawResult, K>;
        });
        results = results.concat(newResults);
        if (newResults.length < 1000) {
            break;
        }
        if (paginationKey) {
            paginationValue = rawResults[rawResults.length - 1][paginatedOptions.orderBy!];
        }
    } while (paginationKey && (options.first && results.length < options.first));
    return options.first ? results.slice(0, options.first) : results;
};
