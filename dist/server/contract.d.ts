import { IBill } from '../models/Bill';
import { IContract } from '../models/Contract';
import { ServerContext } from '../models/ServerContext';
export declare function getContractsAndBills({ contractId }: {
    contractId: string;
}, ctx: ServerContext): Promise<{
    contract: IContract;
    bill: IBill;
}>;
