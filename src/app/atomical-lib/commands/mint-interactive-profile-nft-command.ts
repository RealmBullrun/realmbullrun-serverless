import { ElectrumApiInterface } from "../api/electrum-api.interface";
import { CommandInterface } from "./command.interface";
import * as ecc from '@bitcoinerlab/secp256k1';
import { TinySecp256k1Interface } from 'ecpair';
const bitcoin = require('bitcoinjs-lib');
bitcoin.initEccLib(ecc);
import {
  initEccLib,
} from "bitcoinjs-lib";

import { AtomicalOperationBuilder } from "../utils/atomical-operation-builder";
import { BaseRequestOptions } from "../interfaces/api.interface";
import { checkBaseRequestOptions, isValidBitworkString } from "../utils/atomical-format-helpers";
const tinysecp: TinySecp256k1Interface = require('@bitcoinerlab/secp256k1');
initEccLib(tinysecp as any);

export class MintProfileNftCommand implements CommandInterface {

  constructor(
    private electrumApi: ElectrumApiInterface,
    private options: BaseRequestOptions,
    private address: string,
    private fundingWIF: string,
    private json: any,
    private pushInfo: Function,
  ) {
    this.options = checkBaseRequestOptions(this.options);
  }

  async run(): Promise<any> {
    const atomicalBuilder = new AtomicalOperationBuilder({
      electrumApi: this.electrumApi,
      rbf: this.options.rbf,
      satsbyte: this.options.satsbyte,
      address: this.address,
      disableMiningChalk: this.options.disableMiningChalk,
      opType: 'nft',
      nftOptions: {
        satsoutput: this.options.satsoutput as any
      },
      meta: this.options.meta,
      ctx: this.options.ctx,
      init: this.options.init,
    });
    // Attach any default data
    let filesData: any = this.json

    await atomicalBuilder.setData(filesData);
    // Attach a container request
    if (this.options.container)
      atomicalBuilder.setContainerMembership(this.options.container);
    // Attach any requested bitwork
    if (this.options.bitworkc) {
      atomicalBuilder.setBitworkCommit(this.options.bitworkc);
    }
    if (this.options.bitworkr) {
      atomicalBuilder.setBitworkReveal(this.options.bitworkr);
    }
    if (this.options.parent) {
      atomicalBuilder.setInputParent(await AtomicalOperationBuilder.resolveInputParent(this.electrumApi, this.options.parent, this.options.parentOwner as any))
    }

    // The receiver output
    atomicalBuilder.addOutput({
      address: this.address,
      value: this.options.satsoutput as any || 546
    });

    /* atomicalBuilder.addOutput({
      address: "bc1pdvpvwlj3ve4e35v8ezprygj86fczmr0mg546y3x3csknaku728jqlngecq",
      value: 200000
    }) */

    const result = await atomicalBuilder.start(this.fundingWIF, this.pushInfo);
    return {
      success: true,
      data: result
    }
  }
}