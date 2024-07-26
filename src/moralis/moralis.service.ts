import { Injectable } from '@nestjs/common';
import Moralis from 'moralis';


@Injectable()
export class MoralisService {
    private isMoralisStarted = false;

    async getNetWorth(accountId: string): Promise<any> {
        if (!this.isMoralisStarted) {
            await Moralis.start({
                apiKey: process.env.MORALIS_API_KEY,
            });
            this.isMoralisStarted = true;
        }

        const response = await Moralis.EvmApi.wallets.getWalletNetWorth({
            "excludeSpam": true,
            "excludeUnverifiedContracts": true,
            "address": accountId
        });

        return response.raw
    }
}
