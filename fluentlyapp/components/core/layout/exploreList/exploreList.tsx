import { FlatList, ScrollView, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import { Txt } from '../txt/Txt';
import { IColours } from '~/lib/themes/colours';
import { useColours } from '~/lib/hooks/useColours';
import { useColouredStyles } from '~/lib/hooks/useColouredStyles';
import { LinearGradient } from 'react-native-linear-gradient';

interface IRenderProps<TContent> {
    render: (content: TContent) => any
    renderKey: string;
}

export interface IExploreListCategory<TContent> {    
    name: string;
    content: TContent[]
}

interface IExploreListProps<TContent> extends IRenderProps<TContent> {
    categories: IExploreListCategory<TContent>[];
}

function CategorySegment<TContent>({ name, content, render, renderKey }: IExploreListCategory<TContent> & IRenderProps<TContent>) {
    const styles = useColouredStyles(styleFunc);
    const colours = useColours();

    return (
        <TouchableWithoutFeedback>
            <LinearGradient
                colors={[colours.Background, colours.BackgroundDeep]} // Top to bottom colors
                style={styles.categoryContainer}
            >
                <Txt type='title' style={{ paddingLeft: 16 }}>{name}</Txt>
                <FlatList
                    data={content}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => (item as any)[renderKey]}
                    renderItem={({ item }) => render(item)}
                />
            </LinearGradient>
        </TouchableWithoutFeedback>
    )
}

export function ExploreList<TContent>({ categories, render, renderKey }: IExploreListProps<TContent>) {
    const styles = useColouredStyles(styleFunc);

    return (
        <ScrollView style={styles.container}>
            {categories.map((category) => (
                <CategorySegment 
                    key={category.name} 
                    {...category}
                    render={render}
                    renderKey={renderKey}
                />
            ))}
        </ScrollView>
    );
};

const styleFunc = (colours: IColours) => StyleSheet.create({
    container: { 
        flex: 1, 
        backgroundColor: colours.Background 
    },
    categoryContainer: { 
        marginBottom: 20,
        paddingTop: 10
    }
});