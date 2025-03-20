import { Selector } from "~/components/core/inputs/selector/selector";
import { BottomSheetModal } from "~/components/core/layout/bottomSheetModal/bottomSheetModal";
import { Flex } from "~/components/core/layout/flex/flex";
import { Txt } from "~/components/core/layout/txt/Txt";
import { VerticalSpacer } from "~/components/core/layout/verticalSpacer/verticalSpacer";
import { revisionStrategies } from "~/lib/constants/revisionStrategies";
import { useColours } from "~/lib/hooks/useColours";
import { useStores } from "~/lib/state/storeProvider";
import { SetReviewStrategy } from "~/lib/types/enums/SetReviewStrategy";

interface IRevisionSettingsBottomSheetProps {
    isOpen?: boolean;
    onClose: (item?: any) => void;
}

const cardsPerSessionOptions = [
    5,
    10,
    15,
    20,
    50,
    100
];

export const RevisionSettingsBottomSheet = ({ isOpen, onClose }: IRevisionSettingsBottomSheetProps) => {
    const { settingStore } = useStores();
    const colours = useColours();

    const selectedRevisionStrategy = () => {
        const enumValue = settingStore.revisionStrategy;
        const index = revisionStrategies.findIndex(x => x.key === enumValue);
        if (index > -1) return revisionStrategies[index];
        return revisionStrategies[0];
    }

    return (
        <BottomSheetModal
            isOpen={isOpen}
            onClose={onClose}
        >
            <Flex column alignStart>
                <Txt type='h2'>Revision Settings</Txt>
                <Txt type='subtitle'>Revision size</Txt>
                <Selector 
                    selected={settingStore.revisionSize}
                    onSelected={settingStore.setRevisionSize}
                    options={cardsPerSessionOptions}
                    horizontal
                    render={(opt, sel) => <Txt disableStandardSpacing type='normal' style={{ color: sel ? colours.White : colours.Text }}>{opt}</Txt>}
                />
                <VerticalSpacer spacing={32} />
                <Txt type='subtitle'>Revision type</Txt>
                <Selector 
                    selected={selectedRevisionStrategy()}
                    onSelected={(s) => settingStore.setRevisionStrategy(s.key as SetReviewStrategy)}
                    options={revisionStrategies}
                    render={(opt, sel) => <Txt disableStandardSpacing type='normal' style={{ color: sel ? colours.White : colours.Text }}>{opt.name}</Txt>}
                />
                <VerticalSpacer spacing={64} />
            </Flex>
        </BottomSheetModal>
    )
}