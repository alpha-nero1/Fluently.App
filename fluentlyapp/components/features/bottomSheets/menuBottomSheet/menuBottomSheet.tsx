import { FlatList, View } from 'react-native';
import { ContentSection } from '~/api/types/contentSection';
import { Button } from '~/components/core/inputs/button/button';
import { BottomSheetModal } from '~/components/core/layout/bottomSheetModal/bottomSheetModal'
import { Flex } from '~/components/core/layout/flex/flex';

interface IMenuBottomSheetProps {
    isOpen?: boolean;
    sections?: ContentSection[];
    onClose: (item?: any) => void;
}

export const MenuBottomSheet = ({ isOpen, onClose, sections }: IMenuBottomSheetProps) => {
    const sectionOnPress = (section: ContentSection) => {
        onClose(section);
    }
    
    return (
        <BottomSheetModal isOpen={isOpen} onClose={onClose}>
            <View>
                <FlatList
                    data={sections || []}
                    renderItem={({ item }) => (
                        <Flex justifyStart>
                            <Button type='text-info' onPress={() => sectionOnPress(item)}>
                                {item.title}
                            </Button>
                        </Flex>
                    )} 
                />
            </View>
        </BottomSheetModal>
    );
}