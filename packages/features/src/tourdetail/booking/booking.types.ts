import { TourBookingBodyDto } from "@icat/contracts";

export type TourBookingProps = Pick<Partial<TourBookingBodyDto>, "tours"> & {
    hideNumberOfAdultsAndChildren?: boolean;
};
