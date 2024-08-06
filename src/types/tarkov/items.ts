export interface ItemBase {
    id?: string;
    _id: string;
    _name: string;
    _parent: string;
    _type: string;
    _props: Props;
    _proto: string;
}

export interface Props {
    Name: string;
    ShortName: string;
    Description: string;
    Weight: number;
    BackgroundColor: string;
    Width: number;
    Height: number;
    StackMaxSize: number;
    ItemSound: string;
    Prefab: Prefab;
    UsePrefab: UsePrefab;
    StackObjectsCount: number;
    NotShownInSlot: boolean;
    ExaminedByDefault: boolean;
    ExamineTime: number;
    IsUndiscardable: boolean;
    IsUnsaleable: boolean;
    IsUnbuyable: boolean;
    IsUngivable: boolean;
    IsLockedafterEquip: boolean;
    QuestItem: boolean;
    LootExperience: number;
    ExamineExperience: number;
    HideEntrails: boolean;
    RepairCost: number;
    RepairSpeed: number;
    ExtraSizeLeft: number;
    ExtraSizeRight: number;
    ExtraSizeUp: number;
    ExtraSizeDown: number;
    ExtraSizeForceAdd: boolean;
    MergesWithChildren: boolean;
    CanSellOnRagfair: boolean;
    CanRequireOnRagfair: boolean;
    ConflictingItems: any[];
    Unlootable: boolean;
    UnlootableFromSlot: string;
    UnlootableFromSide: any[];
    AnimationVariantsNumber: number;
    DiscardingBlock: boolean;
    RagFairCommissionModifier: number;
    IsAlwaysAvailableForInsurance: boolean;
    DiscardLimit: number;
    DropSoundType: string;
    InsuranceDisabled: boolean;
    QuestStashMaxCount: number;
    IsSpecialSlotOnly: boolean;
    IsUnremovable: boolean;
    Grids: any[];
    Slots: Slot[];
    CanPutIntoDuringTheRaid: boolean;
    CantRemoveFromSlotsDuringRaid: any[];
    Durability: number;
    Accuracy: number;
    Recoil: number;
    Loudness: number;
    EffectiveDistance: number;
    Ergonomics: number;
    Velocity: number;
    RaidModdable: boolean;
    ToolModdable: boolean;
    BlocksFolding: boolean;
    BlocksCollapsible: boolean;
    IsAnimated: boolean;
    HasShoulderContact: boolean;
    SightingRange: number;
    DoubleActionAccuracyPenaltyMult: number;
    UniqueAnimationModID: number;
    HeatFactor: number;
    CoolFactor: number;
}

export interface Prefab {
    path: string;
    rcid: string;
}

export interface UsePrefab {
    path: string;
    rcid: string;
}

export interface Slot {
    _name: string;
    _id: string;
    _parent: string;
    _props: Props2;
    _required: boolean;
    _mergeSlotWithChildren: boolean;
    _proto: string;
}

export interface Props2 {
    filters: Filter[];
}

export interface Filter {
    Shift: number;
    Filter: string[];
}
