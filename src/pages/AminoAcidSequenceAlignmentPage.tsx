import { FormCompare } from "../widgets/FormCompare/ui/FormCompare";
import { SearchPanel } from "../widgets/SearchPanel/ui/SearchPanel";
import { VisualizationList } from "../widgets/VisualizationList/ui/VisualizationList";

export const AminoAcidSequenceAlignmentPage = () => {
  return (
    <div className="wrapper flex flex-col gap-10 p-10 items-center">
      <h1 className="header-3">
        Визуализация выравнивания аминокислотных последовательностей
      </h1>
      <FormCompare />
      <SearchPanel />
      <VisualizationList />
    </div>
  );
};
