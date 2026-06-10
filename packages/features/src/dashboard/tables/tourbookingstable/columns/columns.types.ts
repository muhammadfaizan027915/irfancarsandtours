import { Row } from "@tanstack/react-table";

import { TourBookingWithUserListItemResponseDto } from "@icat/contracts";

export type TourBookingCellProps = {
  row: Row<TourBookingWithUserListItemResponseDto>;
}
