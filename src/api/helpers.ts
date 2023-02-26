import { IUserDelegation, IUserDelegationPreview } from "./types";

export const formatDelegationsResponse = (delegation: IUserDelegation): IUserDelegationPreview => {
    return {
        validatorAddress: delegation.validator_address,
        validatorName: delegation.validator_info.name,
        delegatorAddress: delegation.delegator_address,
        reward: delegation.reward,
        delegationAmount: delegation.amount,
        undelegations: delegation.Undelegations.map(ud => ({ amount: ud.Amount, epoch: ud.Epoch }))
    }
}