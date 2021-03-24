import { IBill } from '../models/Bill';
import { IContract } from '../models/Contract';
import { IRestaurant } from '../models/Restaurant';
import { ServerContext } from '../models/ServerContext';
import { objFromSnap } from './data';
import { firestore } from './firebase';

export async function getContractsAndBills({ contractId }: {
  contractId: string
}, ctx: ServerContext): Promise<{ contract: IContract, bill: IBill, restaurant: IRestaurant }> {
  const contract: IContract = await firestore()
    .collection('CONTRACTS')
    .doc(contractId)
    .get()
    .then(snap => objFromSnap(snap))

  const bill: IBill = await firestore()
    .doc(contract.billPath)
    .get()
    .then(snap => objFromSnap(snap))

  const restaurant: IRestaurant = await firestore()
    .collection('RESTAURANTS')
    .doc(bill.items[contract.itemId].restaurantId)
    .get()
    .then(snap => objFromSnap(snap))

  return {
    contract, bill, restaurant
  }
}