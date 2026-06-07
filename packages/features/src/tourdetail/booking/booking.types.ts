import { TourBookingBodyDto } from "@icat/contracts";

export type TourBookingProps = Pick<TourBookingBodyDto, "tours"> & {
    hideNumberOfAdultsAndChildren?: boolean;
};
