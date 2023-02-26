import axios from "axios"
import { formatDelegationsResponse } from "./helpers";
import {
    IDelegationsResponse,
    INetworkInfoLite,
    INetworksResponse,
    IUserDelegationPreview,
    IValidatorFull,
    IValidatorsResponse
} from "./types";

enum NETWORK_TYPE {
    MAINNET = 'mainnet',
    TESTNET = 'testnet',
}

export class StakingAPI {
    apiUrl = "https://api.stake.hmny.io"

    constructor(params?: { apiUrl: string }) {
        if (params?.apiUrl) {
            this.apiUrl = params.apiUrl;
        }
    }

    fetchNetworks = (): Promise<INetworksResponse> => {
        return axios.get(`${this.apiUrl}/networks`).then(rez => rez.data)
    }

    fetchValidators = (networkType: NETWORK_TYPE): Promise<IValidatorsResponse> => {
        return axios.get(`${this.apiUrl}/networks/${networkType}/validators`).then(rez => rez.data)
    }

    fetchValidatorByAddress(networkType: NETWORK_TYPE, address: string): Promise<IValidatorFull> {
        return axios
            .get(`${this.apiUrl}/networks/${networkType}/validators/${address}`)
            .then(rez => rez.data)
    }

    getValidatorAvatarUrl(networkType: NETWORK_TYPE, address: string): string {
        return `${this.apiUrl}/networks/${networkType}/validators/${address}/avatar`
    }

    fetchValidatorHistory(networkType: NETWORK_TYPE, address: string) {
        return axios
            .get(`${this.apiUrl}/networks/${networkType}/validator_history/${address}`)
            .then(rez => rez.data)
    }

    fetchDelegationsByAddress = async (networkType: NETWORK_TYPE, address: string)
        : Promise<IUserDelegationPreview[]> => {
        const res = await axios.get<IDelegationsResponse>(`${this.apiUrl}/networks/${networkType}/delegations/${address}`);

        return res.data ? res.data.map(formatDelegationsResponse) : [];
    }

    fetchNetworkInfo(networkType: NETWORK_TYPE) {
        return axios
            .get(`${this.apiUrl}/networks/${networkType}/staking_network_info`)
            .then(rez => rez.data)
    }

    fetchNetworkInfoLite(networkType: NETWORK_TYPE): Promise<INetworkInfoLite> {
        return axios
            .get(`${this.apiUrl}/networks/${networkType}/network_info_lite`)
            .then(rez => rez.data)
    }
}