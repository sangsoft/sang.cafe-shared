import { IBill } from '../models/Bill';
import { IContract } from '../models/Contract';
import { ServerContext } from '../models/ServerContext';
import { objFromSnap } from './data';
import { firestore } from './firebase';

export async function getContractsAndBills({ contractId }: {
  contractId: string
}, ctx: ServerContext): Promise<{ contract: IContract, bill: IBill }> {
  const contract = await firestore()
    .collection('CONTRACTS')
    .doc(contractId)
    .get()
    .then(snap => objFromSnap(snap))

  const bill = await firestore()
    .doc(contract.billPath)
    .get()
    .then(snap => objFromSnap(snap))
    
  return {
    contract, bill
  }
}