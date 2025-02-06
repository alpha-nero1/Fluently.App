import axios from "axios"
import { Language } from "~/lib/types/enums/Language";
import { PageData } from "./types/pageData";
import { AppSettings } from "~/lib/appSettings";
import { Set } from "./types/set";
import { SetCard } from "./types/setCard";
import { createQueryParamsString } from "~/lib/utils/apiUtils";
import { SetReviewStrategy } from "~/lib/types/enums/SetReviewStrategy";
import { SetCardReviewResult } from "./types/setCardReviewResult";

/**
 * Code to reach out to the /set api.
 */
export const SetApi = (() => {
    const baseUri = `${AppSettings.ApiUrl}/set`;

    const list = async (): Promise<PageData<Set>> => {
        return await axios.get(`${baseUri}`)
            .then(res => res.data);
    }

    const get = async (setId: number, includeCards: boolean = false): Promise<Set> => {
        return await axios.get(`${baseUri}/${setId}?includeCards=${includeCards}`)
            .then(res => res.data);
    }

    const listCards = async (setId: number, grade: any, page: number, pageSize: number): Promise<PageData<SetCard>> => {
      return await axios.get(`${baseUri}/${setId}/card${createQueryParamsString({
        grade,
        page,
        pageSize
      })}`)
          .then(res => res.data);
    }

    const startReview = async (
        id: number, 
        pageSize: number = 20, 
        strategy: SetReviewStrategy = SetReviewStrategy.FluentlySsr
    ): Promise<SetCard[]> => {

        return await axios.get(`${baseUri}/${id}/review/start${createQueryParamsString({
          strategy,
          pageSize
        })}`)
            .then(res => res.data);
    }

    const endReview = async (id: number, results: SetCardReviewResult[]): Promise<void> => {
      return await axios.post(`${baseUri}/${id}/review/end`, { results })
          .then(res => res.data);
    }

    const create = async (title: string, desc: string, language: Language): Promise<Set> => {
        return await axios.post(`${baseUri}`, {
            title,
            description: desc,
            language
        })
        .then(res => res.data);
    }

    const addToSet = async (setId: number, setCards: SetCard[]): Promise<SetCard[]> => {
      return await axios.post(`${baseUri}/${setId}/card`, {
        setCards
      })
        .then((res: any) => setCards);
    }

    const removeFromSet = async (setId: number, setCardIds: number): Promise<void> => {
      return await axios.delete(`${baseUri}/${setId}/card${createQueryParamsString({ setCardIds })}`)
        .then(res => res.data);
    }

    return {
      list,
      get,
      create,
      listCards,
      startReview,
      endReview,
      addToSet,
      removeFromSet
    };
})();