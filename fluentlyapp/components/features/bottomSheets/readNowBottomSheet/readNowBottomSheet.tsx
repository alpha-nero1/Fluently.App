import React, { useState } from 'react'
import { Dimensions } from 'react-native';
import { useContentApi } from '~/api/contentApi';
import { BasicContent } from '~/api/types/basicContent';
import { Button } from '~/components/core/inputs/button/button';
import { BottomSheetModal } from '~/components/core/layout/bottomSheetModal/bottomSheetModal'
import { Flex } from '~/components/core/layout/flex/flex';
import { StaticImage } from '~/components/core/layout/staticImage/staticImage';
import { Txt } from '~/components/core/layout/txt/Txt';
import { VerticalSpacer } from '~/components/core/layout/verticalSpacer/verticalSpacer';
import { useI18 } from '~/lib/hooks/useI18';
import { useStores } from '~/lib/state/storeProvider';
import { showToast } from '~/lib/utils/toastUtils';

const { width } = Dimensions.get('screen');

interface IReadNowBottomSheetProps {
    isOpen?: boolean;
    content: BasicContent;
    onClose: (item?: any) => void;
}

export const ReadNowBottomSheet = ({ isOpen, content, onClose }: IReadNowBottomSheetProps) => {
    const { settingStore } = useStores();
    const contentApi = useContentApi(settingStore.accessToken);
    const [isLoading, setIsLoading] = useState(false);
    const i18 = useI18();

    const readNowOnPress = () => {
        // Close sheet.
        // API save progress to 0.
        setIsLoading(true);
        contentApi.progress(content.contentId, 0)
        .then(() => {
            onClose(content);
            setIsLoading(false);
        })
        .catch((err) => {
            showToast('error', [i18.Something_went_wrong]);
            setIsLoading(false);
        })
    }

    if (!content) return null;

    return (
        <BottomSheetModal
            isOpen={isOpen}
            onClose={onClose}
        >
            <Flex column>
                <Flex justifyCenter>
                    <StaticImage 
                        objectKey={content.coverImageUrl}
                        width={width - 64}
                        height={500}
                        style={{ borderRadius: 8 }}
                    />
                </Flex>
                <VerticalSpacer spacing={16} />
                <Txt type='h1'>{content.title}</Txt>
                <Txt type='subtitle'>by {content.author}</Txt>
                <VerticalSpacer spacing={32} />
                <Button 
                    onPress={readNowOnPress}
                    isLoading={isLoading}
                >
                    Read now
                </Button>
                <VerticalSpacer spacing={32} />
            </Flex>
        </BottomSheetModal>
    )
}
