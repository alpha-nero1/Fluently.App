import axios from "axios"
import { Language } from "~/lib/types/enums/Language";
import { LanguageLevel } from "~/lib/types/enums/LanguageLevel";
import { Content } from "./types/content";
import { PageData } from "./types/pageData";
import { BasicContent } from "./types/basicContent";
import { AppSettings } from "~/lib/appSettings";
import { WordDictionary } from "./types/wordDictionary";

axios.interceptors.request.use(full => {
    console.log('Executed api call to: ', full.url);
    return full;
});

/**
 * Code to reach out to the /content api.
 */
export const ContentApi = (() => {
    const baseUri = `${AppSettings.ApiUrl}/content`;

    const list = async (language: Language): Promise<PageData<BasicContent>> => {
        return await axios.get(`${baseUri}?language=${language}`).then(res => res.data);
    }

    const get = async (id: string, sectionPage = 0, sectionPageSize = 10): Promise<Content> => {
        return await axios.get(
            `${baseUri}/${id}?sectionPage=${sectionPage}&sectionPageSize=${sectionPageSize}`
        ).then(res => res.data);
    }

    const generate = async (language: Language, level: LanguageLevel, topic: string): Promise<BasicContent> => {
        return await axios.post(`${baseUri}/generate`,
            {
                language,
                level,
                topic
            }
        ).then(res => res.data);
    }

    const enrich = async (language: Language, content: string): Promise<WordDictionary> => {
        return await axios.post(`${baseUri}/enrich`,
            {
                language,
                content
            }
        ).then(res => res.data);
    }

    return { list, get, generate, enrich }
})();