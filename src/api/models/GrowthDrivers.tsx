export interface IGrowthDriver {
    id: number;
    name: string;
}

export interface IGrowthDriverGroup {
    id: number;
    name: string;
    ecosystemId: number;
    growthDrivers: IGrowthDriver[];
}

export interface IGrowthDriverGroupResponse {
    growthDriverGroups: IGrowthDriverGroup[];
}

export interface IAllGrowthDriverGroupResponse {
    growthDriverGroups: IGrowthDriver[];
}
