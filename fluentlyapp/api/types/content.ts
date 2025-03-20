import { BasicContent } from "./basicContent";
import { ContentData } from "./contentData";
import { ContentSection } from "./contentSection";
import { WordDictionary } from "./wordDictionary";

export class Content extends BasicContent {
    progress: number = 0;
    data: ContentData[] = [];
    sections: ContentSection[] = [];
    words: WordDictionary = {}
}