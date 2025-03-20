import axios from "axios"
import { Language } from "~/lib/types/enums/Language";
import { LanguageLevel } from "~/lib/types/enums/LanguageLevel";
import { Content } from "./types/content";
import { PageData } from "./types/pageData";
import { BasicContent } from "./types/basicContent";
import { AppSettings } from "~/lib/appSettings";
import { WordDictionary } from "./types/wordDictionary";
import { getHeaders } from "~/lib/utils/apiUtils";
import { LibraryContent } from "./types/libraryContent";

axios.interceptors.request.use(full => {
    console.log('Executed api call to: ', full.url, 'Auth = ', full.headers.Authorization);
    return full;
});

/**
 * Code to reach out to the /content api.
 */
export const useContentApi = (accessToken: string) => {
    const baseUri = `${AppSettings.ApiUrl}/content`;
    const headers = getHeaders(accessToken);

    const list = async (language: Language): Promise<PageData<BasicContent>> => {
        return await axios.get(`${baseUri}?language=${language}`, headers).then(res => res.data);
    }

    const listLibrary = async (language: Language): Promise<PageData<LibraryContent>> => {
        return await axios.get(`${baseUri}/library?language=${language}`, headers).then(res => res.data);
    }

    const get = async (id: string, learnerLanguage: Language, sectionPage = 0, sectionPageSize = 10): Promise<Content> => {
        return await axios.get(
            `${baseUri}/${id}?sectionPage=${sectionPage}&sectionPageSize=${sectionPageSize}&learnerLanguage=${learnerLanguage}`,
            headers
        ).then(res => res.data);
    }

    const generate = async (language: Language, level: LanguageLevel, topic: string): Promise<BasicContent> => {
        return await axios.post(`${baseUri}/generate`,
            {
                language,
                level,
                topic
            },
            headers
        ).then(res => res.data);
    }

    const progress = async (id: string, index: number = 0, length: number = 0): Promise<void> => {
        await axios.post(`${baseUri}/${id}/progress`,
            {
                index,
                length,
            },
            headers
        ).then(res => res.data);
    }

    const enrich = async (language: Language, learnerLanguage: Language, content: string): Promise<WordDictionary> => {
        return await axios.post(`${baseUri}/enrich`,
            {
                language,
                content,
                learnerLanguage
            },
            headers
        ).then(res => res.data);
    }

    return { list, listLibrary, get, generate, enrich, progress }
};