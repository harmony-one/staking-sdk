export interface IDelegation {
    ["delegator-address"]: string;
    amount: number;
    reward: number;
    undelegations: any[]; // not sure about the type
}

export interface IEpochAPR {
    epoch: number;
    apr: string;
}

export interface IValidator {
    active: boolean;
    apr: number;
    address: string;
    name: string;
    rate: string;
    total_stake: number;
    uptime_percentage: number | null;
    identity: string;
    hasLogo: boolean;
}

export interface IValidatorsResponse {
    total: number;
    totalFound: number;
    total_active: number;
    validators: IValidator[];
}

export interface IValidatorFull extends IValidator {
    bls_public_keys: string[];
    last_epoch_in_committee: number;
    min_self_delegation: number;
    max_total_delegation: number;
    rate: string;
    max_rate: string;
    max_change_rate: string;
    update_height: number;
    name: string;
    identity: string;
    website: string;
    security_contact: string;
    details: string;
    creation_height: number;
    address: string;
    delegations: IDelegation[];
    hasLogo: boolean;
    self_stake: number;
    total_stake: number;
    average_stake: number;
    average_stake_by_bls: number;
    remainder: string;
    voting_power: any; // not sure about the type
    signed_blocks: number;
    blocks_should_sign: number;
    uctDate: string;
    index: number;
    active_nodes: number;
    elected_nodes: number;
    active: boolean;
    last_apr: string;
    epoch_apr: IEpochAPR[];
    lifetime_reward_accumulated: number;
    uptime_percentage: number;
    apr: number;
}

export interface INetwork {
    id: string;
    title: string;
    chain_title: string;
    testnet: boolean;
    explorer_url: string;
    logo_url: string;
    rpc_url: string;
    chain_id: number;
}

export interface INetworksResponse {
    networks: INetwork[];
}

export interface INetworkInfoLite {
    circulating_supply: string;
    epoch_last_block: number;
    median_raw_stake: string;
    total_staking: number;
    total_supply: string;
    current_block_number: number;
    current_block_hash: string;
    current_epoch: number;
    time_next_epoch: number;
    effective_median_stake: string;
    total_seats: number;
    total_seats_used: number;
    externalShards: {
        total: number;
        external: number;
        external_effective_stake_total: number;
    }[];
    effective_median_stake_changed: number;
    total_staking_changed: number;
    history: {
        [key: number]: {
            circulating_supply: string;
            epoch_last_block: number;
            median_raw_stake: string;
            total_staking: number;
            total_supply: string;
            current_block_number: number;
            current_block_hash: string;
            current_epoch: number;
            time_next_epoch: number;
            effective_median_stake: string;
            total_seats: number;
            total_seats_used: number;
            externalShards: {
                total: number;
                external: number;
                external_effective_stake_total: number;
            }[];
            effective_median_stake_changed: number;
            total_staking_changed: number;
        };
    };
    lastEpochTotalStake: number;
    lastEpochEffectiveStake: number;
    liveEpochTotalStake: number;
    liveExternalShards: {
        external: number;
        total: number;
    }[];
    liveTotalSeatsUsed: number;
    liveTotalSeats: number;
}

export interface IUserDelegation {
    "Undelegations": Array<{
        Amount: number;
        Epoch: number;
    }>;
    "amount": number;
    "delegator_address": string;
    "reward": number;
    "validator_address": string;
    "validator_info": IValidatorFull;
}

export interface IUserDelegationPreview {
    validatorAddress: string;
    validatorName: string;
    delegatorAddress: string;
    reward: number;
    delegationAmount: number;
    undelegations: Array<{
        amount: number;
        epoch: number;
    }>;
}

export type IDelegationsResponse = IUserDelegation[];