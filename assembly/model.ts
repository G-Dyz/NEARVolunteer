import { context, u128, PersistentVector } from "near-sdk-as";

/** 
 * Exporting a new class PostedCertificate so it can be used outside of this file.
 */
@nearBindgen
export class PostedCertificate {
  premium: boolean;
  sender: string;
  active: boolean;
  constructor(public text: string) {
    this.premium = context.attachedDeposit >= u128.from('10000000000000000000000');
    this.sender = context.sender;
    this.active = true;
  }
}

/**
 * collections.vector is a persistent collection. Any changes to it will
 * be automatically saved in the storage.
 * The parameter to the constructor needs to be unique across a single contract.
 * It will be used as a prefix to all keys required to store data in the storage.
 */
export const certificates = new PersistentVector<PostedCertificate>("m");


/**  */
/** 
 * Exporting a new class PostedEvent so it can be used outside of this file.
 */
@nearBindgen
export class PostedEvent {
  sender: string;
  active: boolean;
  constructor(public text: string, public codeEvent: string, public dateStart: string, public dateEnd: string) {
    this.sender = context.sender;
    this.active = true;
  }
}

/**
* collections.vector is a persistent collection. Any changes to it will
* be automatically saved in the storage.
* The parameter to the constructor needs to be unique across a single contract.
* It will be used as a prefix to all keys required to store data in the storage.
*/
export const events = new PersistentVector<PostedEvent>("n");