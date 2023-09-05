import { articles } from "../../utils/api";
import { ArticleListActionTypes, ArticleListDispatch } from "./types";

export const fetchArticles = async (dispatch: ArticleListDispatch) => {
  try {
    dispatch({ type: ArticleListActionTypes.FETCH_ARTICLES_REQUEST });
    const response = await articles();
    if (response.errors) {
      throw new Error(response.errors);
    }
    dispatch({
      type: ArticleListActionTypes.FETCH_ARTICLES_SUCCESS,
      payload: response,
    });
  } catch (error: any) {
    dispatch({
      type: ArticleListActionTypes.FETCH_ARTICLES_FAILURE,
      payload: error.message,
    });
  }
};
