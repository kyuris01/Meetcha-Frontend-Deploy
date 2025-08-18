export interface UISlot{
    startISO:string;
    endISO:string;
};

export interface SubmitAvailabilityBody{
    nickname?:string;
    selectedTimes:{
        startAt:string;
        endAt: string;
    }[];
};



