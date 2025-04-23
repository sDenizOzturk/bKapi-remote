import { FC } from "react";
import { BaseWrapper } from "binak-react-components";
import ViewWrapper from "../components/layout/ViewWrapper";
import ListVehiclesInside from "../components/vehiclesInside/ListVehiclesInside";

const ListVehiclesInsideView: FC = () => {
  return (
    <ViewWrapper>
      <BaseWrapper style={{ minHeight: "60vh" }} mode={["vertical"]}>
        <ListVehiclesInside />
      </BaseWrapper>
    </ViewWrapper>
  );
};
export default ListVehiclesInsideView;
